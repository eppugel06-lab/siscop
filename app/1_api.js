// SECCIÓN 1 — FUNCIONES LLAMADAS DESDE EL FRONTEND
// =============================================================================

// ─── 1.1 INSPECCIONAR ARCHIVO ─────────────────────────────────────────────────
// Función delegada a Frontend Web Worker / Parser Offline

// ─── 1.2 SUBIR ARCHIVO ────────────────────────────────────────────────────────
function uploadAndSaveToSheet(base64, sheetTarget) {
  try {
    var perfil = obtenerPerfilUsuario();
    if (!perfil.ok) throw new Error('ACCESO DENEGADO: '+perfil.mensaje);
    if (perfil.perfil.rol === 'Lector') throw new Error('ACCESO DENEGADO: Rol Lector no puede cargar insumos.');

    var data = null;
    try {
      data = JSON.parse(base64);
    } catch(e) {
      throw new Error('Formato de datos inválido desde el cliente');
    }

    if (!data || data.length===0) throw new Error('El archivo está vacío: '+sheetTarget);

    // =========================================================================
    // ✨ TRANSFORMACIONES AL VUELO (Aplanamiento y Limpieza) ✨
    // =========================================================================
    
    // CASO 1: CERTIFICADO (Reporte Jerárquico del SIAF/SIGA)
    if (sheetTarget === CONFIG.hojas.certificado) {
       // Verificamos si realmente viene en formato jerárquico (ej. celda B7 tiene 'PLIEGO' o B6 'SECTOR')
       var checkStr = String(data[5] ? data[5][1] : '').toUpperCase() + String(data[6] ? data[6][1] : '').toUpperCase();
       if (checkStr.indexOf('SECTOR') > -1 || checkStr.indexOf('PLIEGO') > -1) {
           data = _procesarReporteCertificadoJerarquico(data);
       }
    }

    // CASO 2: DEVENGADO (Ajuste de Clasificador, el que hicimos anteriormente)
    else if (sheetTarget === CONFIG.hojas.devengado) {
      for (var c = 0; c < data[0].length; c++) {
        data[0][c] = String(data[0][c] || '').trim().toUpperCase();
      }
      var header = data[0]; 
      
      var iTT  = header.indexOf('TIPO_TRANSACCION');
      var iG   = header.indexOf('GENERICA');
      var iSG  = header.indexOf('SUBGENERICA');
      var iSGD = header.indexOf('SUBGENERICA_DET');
      var iE   = header.indexOf('ESPECIFICA');
      var iED  = header.indexOf('ESPECIFICA_DET');
      var iMtoPia = header.indexOf('MTO_PIA');

      if (iTT >= 0 && iMtoPia >= 0) {
        data[0].splice(iMtoPia, 0, 'CLASIFICADOR', 'CLASIFICADOR_DETALLE');
        for (var r = 1; r < data.length; r++) {
          var row = data[r];
          function getNum(val) { return String(val || '').split('.')[0].trim(); }
          function getTexto(val) { 
            var str = String(val || '');
            var idx = str.indexOf('.');
            return idx >= 0 ? str.substring(idx + 1).trim() : str.trim(); 
          }
          var clasificador = [getNum(row[iTT]), getNum(row[iG]), getNum(row[iSG]), getNum(row[iSGD]), getNum(row[iE]), getNum(row[iED])].join('.');
          var detalle = iED >= 0 ? getTexto(row[iED]) : '';
          row.splice(iMtoPia, 0, clasificador, detalle);
        }
      }
    }
    // =========================================================================

    // GUARDADO EN LA HOJA DEFINITIVA
    var ss     = SpreadsheetApp.openById(_getSpreadsheetIdActivo());
    var destSh = ss.getSheetByName(sheetTarget);
    if (!destSh) throw new Error('Hoja "'+sheetTarget+'" no encontrada.');

    // Optimizamos el pegado eliminando duplicidad destructiva (ganancia: +50% vel.)
    destSh.clearContents();
    if (data.length > 0 && data[0].length > 0) {
      destSh.getRange(1, 1, data.length, data[0].length).setValues(data);
    }

    // ✨ ¡NUEVO! Registrar en el historial global ✨
    _registrarLog('Carga de Insumos', 'Subió ' + sheetTarget, 'Filas procesadas: ' + (data.length - 1), 'OK');

    return { rows: data.length - 1, sheet: sheetTarget, warnings: [] };
  } catch(e) {
    Logger.log('uploadAndSaveToSheet error: '+e.message);
    throw new Error(e.message);
  }
}

// ─── 1.3 VERIFICAR HOJAS PRECARGADAS ──────────────────────────────────────────
// Devuelve qué hojas ya tienen datos para permitir carga parcial
function verificarHojasPrecargadas() {
  try {
    var ss = SpreadsheetApp.openById(_getSpreadsheetIdActivo());
    var result = {};
    ['sisplan','devengado','certificado'].forEach(function(key) {
      var nombre = CONFIG.hojas[key];
      var hoja   = ss.getSheetByName(nombre);
      if (hoja && hoja.getLastRow() > 1) {
        var enc   = _getEnc(hoja, CONFIG.filasEnc[key]);
        var filas = hoja.getLastRow() - CONFIG.filasEnc[key];
        result[key] = { tieneData: true, filas: Math.max(0,filas), enc: enc.slice(0,5) };
      } else {
        result[key] = { tieneData: false, filas: 0 };
      }
    });
    return result;
  } catch(e) {
    return { sisplan:{tieneData:false,filas:0}, devengado:{tieneData:false,filas:0}, certificado:{tieneData:false,filas:0} };
  }
}

// ─── 1.4 EJECUTAR CONSOLIDADO ─────────────────────────────────────────────────
function ejecutarConsolidado(mesCorte, tipoProceso) {
  var ss      = SpreadsheetApp.openById(_getSpreadsheetIdActivo());
  var inicio  = new Date();
  var etapas  = [];
  var userEmail = '';
  try { userEmail = Session.getActiveUser().getEmail(); } catch(e2) {}
  var _periodoAnio = parseInt(PropertiesService.getUserProperties().getProperty('sisgep_periodo_anio') || new Date().getFullYear(), 10);
  var esPIA = (tipoProceso === 'PIA');

  try {
    var perfilStatus = obtenerPerfilUsuario();
    if (!perfilStatus.ok) throw new Error('ACCESO DENEGADO: '+perfilStatus.mensaje);
    if (perfilStatus.perfil.rol === 'Lector') throw new Error('ACCESO DENEGADO: Rol Lector no puede procesar datos.');

    var precheck = verificarHojasPrecargadas();
    if (!precheck.sisplan.tieneData) throw new Error('La hoja SISPLAN está vacía. Carga el archivo primero.');
    if (!precheck.devengado.tieneData) throw new Error('La hoja DEVENGADO está vacía. Carga el archivo primero.');
    if (!esPIA && !precheck.certificado.tieneData) throw new Error('La hoja CERTIFICADO está vacía. Carga el archivo primero.');

    var t1=new Date(); _CORE_IMPORTAR_SISPLAN(ss);    SpreadsheetApp.flush(); etapas.push({nombre:'SISPLAN importado',    duracion:Math.round((new Date()-t1)/1000)});
    var t2=new Date(); _CORE_IMPORTAR_DEVENGADO(ss);  SpreadsheetApp.flush(); etapas.push({nombre:'DEVENGADO importado',  duracion:Math.round((new Date()-t2)/1000)});
    
    if (esPIA) {
      var tPia1=new Date(); _CORE_LLENAR_SOLO_PIA(ss); SpreadsheetApp.flush(); etapas.push({nombre:'Lectura PIA',duracion:Math.round((new Date()-tPia1)/1000)});
      var tPia2=new Date(); _CORE_CALCULAR_PROG_PIA(ss);  SpreadsheetApp.flush(); etapas.push({nombre:'Programación PIA',duracion:Math.round((new Date()-tPia2)/1000)});
    } else {
      var t3=new Date(); _CORE_LLENAR_PIA_PIM(ss,mesCorte); SpreadsheetApp.flush(); etapas.push({nombre:'PIA/PIM/Devengado',duracion:Math.round((new Date()-t3)/1000)});
      var t4=new Date(); _CORE_LLENAR_EJE_CERT(ss,mesCorte);SpreadsheetApp.flush(); etapas.push({nombre:'Certificado',       duracion:Math.round((new Date()-t4)/1000)});
      var t5=new Date(); _CORE_CALCULAR_PROG(ss,mesCorte);  SpreadsheetApp.flush(); etapas.push({nombre:'Programación',      duracion:Math.round((new Date()-t5)/1000)});
    }

    var resumen  = _leerResumenEstados(ss);
    var duracion = Math.round((new Date()-inicio)/1000);
    _logEjecucion(ss,{ts:new Date().toISOString(),user:userEmail,mesCorte:mesCorte,duracion:duracion,ok:true,resumen:resumen});
    _actualizarMesCorteEnDb(_periodoAnio, mesCorte);
    
    // ✨ ¡NUEVO! Registrar en el historial global ✨
    _registrarLog('Consolidación', 'Ejecución de Consolidado', 'Mes de corte: ' + mesCorte + ' | Duración: ' + duracion + 's', 'OK');

    return { ok:true, etapas:etapas, resumen:resumen, duracion:duracion };

  } catch(e) {
    Logger.log('ejecutarConsolidado error: '+e.message);
    _logEjecucion(ss,{ts:new Date().toISOString(),user:userEmail,mesCorte:mesCorte,
      duracion:Math.round((new Date()-inicio)/1000),ok:false,
      resumen:{ok:0,observado:0,agregar:0,eliminar:0},error:e.message});
    throw new Error(e.message);
  }
}

// ─── 1.5 RESUMEN GENERAL ──────────────────────────────────────────────────────
function getResumenGeneral() {
  try {
    var ss  = SpreadsheetApp.openById(_getSpreadsheetIdActivo());
    var hC  = ss.getSheetByName(CONFIG.hojas.consolidado);
    if (!hC) return null;

    var enc = _getEnc(hC, CONFIG.filasEnc.consolidado);
    var idx = {
      sf:    _idx(enc,'SEC_FUNC'),
      den:   _idx(enc,'DENOMINACION_AO'),
      pia:   _idx(enc,'MTO_PIA'),
      pim:   _idx(enc,'MTO_PIM'),
      tCert: _idx(enc,'TOTAL_EJEC_CERTIF'),
      tDeve: _idx(enc,'TOTAL_EJEC_DEV'),
      est:   enc.indexOf('ESTADO')
    };

    var data    = hC.getDataRange().getValues();
    var pia=0, pim=0, ejeCert=0, ejeDeve=0;
    var estados = {ok:0,observado:0,agregar:0,eliminar:0};
    var metasMap = {};

    for (var r=CONFIG.filasEnc.consolidado; r<data.length; r++) {
      var f  = data[r];
      var sf = String(f[idx.sf]).trim();
      if (!sf||sf==='0000'||sf==='') continue;

      var fPia  = _n(f[idx.pia]);
      var fPim  = _n(f[idx.pim]);
      var fCert = _n(f[idx.tCert]);
      var fDeve = _n(f[idx.tDeve]);
      var est   = idx.est>=0 ? String(f[idx.est]||'').trim() : '';

      pia     += fPia;
      pim     += fPim;
      ejeCert += fCert;
      ejeDeve += fDeve;

      var el = est.toLowerCase();
      
      // 1. Conteo global (para el dashboard general)
      if (el==='ok')                    estados.ok++;
      else if (el.indexOf('observ')>-1) estados.observado++;
      else if (el.indexOf('agr')>-1)    estados.agregar++;
      else if (el.indexOf('elim')>-1)   estados.eliminar++;

      // 2. NUEVO: Inicializar la meta con contadores exactos
      if (!metasMap[sf]) {
        metasMap[sf] = { 
          sf: sf, 
          den: String(f[idx.den]||'').trim(), 
          pia: 0, pim: 0, ejeCert: 0, ejeDeve: 0,
          counts: { ok: 0, obs: 0, add: 0, del: 0 } 
        };
      }
      metasMap[sf].pia     += fPia;
      metasMap[sf].pim     += fPim;
      metasMap[sf].ejeCert += fCert;
      metasMap[sf].ejeDeve += fDeve;
      
      // 3. NUEVO: Sumar al contador específico de la meta
      if (el==='ok')                    metasMap[sf].counts.ok++;
      else if (el.indexOf('observ')>-1) metasMap[sf].counts.obs++;
      else if (el.indexOf('agr')>-1)    metasMap[sf].counts.add++;
      else if (el.indexOf('elim')>-1)   metasMap[sf].counts.del++;
    }

    // 4. NUEVO: Mapear el resultado final enviando los 'counts' al Frontend
    var metas = Object.keys(metasMap).sort().map(function(sf) {
      var m  = metasMap[sf];
      var pC = m.pim>0 ? Math.round(m.ejeCert/m.pim*1000)/10 : 0;
      var pD = m.pim>0 ? Math.round(m.ejeDeve/m.pim*1000)/10 : 0;
      
      // Mantenemos el "estado" general como fallback lógico de prioridad (Eliminar > Observado > Agregar > Ok)
      var est = m.counts.del > 0 ? 'Eliminar' : m.counts.obs > 0 ? 'Observado' : m.counts.add > 0 ? 'Agregar' : 'Ok';
      
      return {
        sf: m.sf, 
        den: m.den, 
        pia: m.pia,
        pim: m.pim, 
        pctCert: pC, 
        pctDeve: pD, 
        estado: est,
        counts: m.counts 
      };
    });

    var pctCert = pim>0 ? Math.round(ejeCert/pim*1000)/10 : 0;
    var pctDeve = pim>0 ? Math.round(ejeDeve/pim*1000)/10 : 0;
    var logInfo = _getUltimoPeriodo(ss);

    return {
      pia:pia, pim:pim, pctCert:pctCert, pctDeve:pctDeve,
      periodo:logInfo.periodo, procesadoPor:logInfo.user, procesadoEl:logInfo.fecha,
      estadosCount:estados, metas:metas
    };
  } catch(e) {
    Logger.log('getResumenGeneral error: '+e.message);
    return null;
  }
}

// ─── 1.6 LISTA DE METAS ───────────────────────────────────────────────────────
function getSecFuncList() {
  try {
    var ss   = SpreadsheetApp.openById(_getSpreadsheetIdActivo());
    var hC   = ss.getSheetByName(CONFIG.hojas.consolidado);
    if (!hC) return [];
    var enc  = _getEnc(hC, CONFIG.filasEnc.consolidado);
    var iSF  = _idx(enc,'SEC_FUNC');
    var iD   = enc.indexOf('DENOMINACION_AO');
    var data = hC.getDataRange().getValues();
    var seen={}, lista=[];
    for (var r=CONFIG.filasEnc.consolidado; r<data.length; r++) {
      var sf = String(data[r][iSF]).trim();
      if (!sf||sf==='0000'||seen[sf]) continue;
      seen[sf]=true;
      var den = iD>=0?String(data[r][iD]||''):'';
      lista.push({sf:sf, den:den.substring(0,60)+(den.length>60?'...':'')});
    }
    lista.sort(function(a,b){ return a.sf.localeCompare(b.sf); });
    return lista;
  } catch(e) {
    Logger.log('getSecFuncList error: '+e.message);
    return [];
  }
}


// ─── 1.7 DATOS DE UNA META ────────────────────────────────────────────────────
function getDatosSecFunc(secFunc) {
  try {
    var ss  = SpreadsheetApp.openById(_getSpreadsheetIdActivo());
    var hC  = ss.getSheetByName(CONFIG.hojas.consolidado);
    if (!hC) return null;
    var enc  = _getEnc(hC, CONFIG.filasEnc.consolidado);
    var iObs = _getObsIdx(enc);
    var _cCache = {};
    function ci(n){ 
      var nu = n.toUpperCase(); 
      if(_cCache[nu] === undefined) _cCache[nu] = enc.indexOf(nu); 
      return _cCache[nu]; 
    }
    var MESES_C=['ENE','FEB','MAR','ABR','MAY','JUN','JUL','AGO','SET','OCT','NOV','DIC'];
    var data = hC.getDataRange().getValues();
    var result={
      secFunc:secFunc, denominacion:'', unidadMedida:'',
      estadosCount:{ok:0,observado:0,agregar:0,eliminar:0},
      totales:{pia:0,pim:0,ejeCert:0,ejeDeve:0}, clasificadores:[]
    };

    for (var r=CONFIG.filasEnc.consolidado; r<data.length; r++) {
      var f = data[r];
      if (String(f[ci('SEC_FUNC')]).trim()!==secFunc) continue;
      if (!result.denominacion) {
        result.denominacion = String(f[ci('DENOMINACION_AO')]||'');
        result.unidadMedida = String(f[ci('UNIDAD_MEDIDA')]||'');
      }
      var pia=_n(f[ci('MTO_PIA')]),pim=_n(f[ci('MTO_PIM')]);
      var ejeCert=_n(f[ci('TOTAL_EJEC_CERTIF')]),ejeDeve=_n(f[ci('TOTAL_EJEC_DEV')]);
      result.totales.pia+=pia; result.totales.pim+=pim;
      result.totales.ejeCert+=ejeCert; result.totales.ejeDeve+=ejeDeve;
      var estado=String(f[ci('ESTADO')]||'').trim().toLowerCase();
      if (estado==='ok')                   result.estadosCount.ok++;
      else if (estado.indexOf('observ')>-1) result.estadosCount.observado++;
      else if (estado.indexOf('agr')>-1)   result.estadosCount.agregar++;
      else if (estado.indexOf('elim')>-1)  result.estadosCount.eliminar++;
      var cantM=[],certM=[],deveM=[],ejeCertM=[],ejeDeveM=[];
      MESES_C.forEach(function(m){
        cantM.push(_n(f[ci('CANT_'+m)]));
        certM.push(_n(f[ci('CERT_'+m)]));
        deveM.push(_n(f[ci('DEVE_'+m)]));
        ejeCertM.push(_n(f[ci('EJE_CERT_'+m)]));
        ejeDeveM.push(_n(f[ci('EJE_DEVE_'+m)]));
      });
      result.clasificadores.push({
        clasificador: String(f[ci('CLASIFICADOR_CODIGO')]||'').trim(),
        recurso:      String(f[ci('RECURSO')]||'').trim(),
        estado:       String(f[ci('ESTADO')]||'').trim(),
        observacion:  iObs>=0?String(f[iObs]||'').trim():'',
        pia:pia, pim:pim,
        totalFisico:  _n(f[ci('TOTAL_FISICO')]),
        certTotal:    _n(f[ci('TOTAL_CERTIF_PROG')]),
        deveTotal:    _n(f[ci('TOTAL_DEV_PROG')]),
        ejeCertTotal: ejeCert, ejeDeveTotal: ejeDeve,
        cantM:cantM, certM:certM, deveM:deveM, ejeCertM:ejeCertM, ejeDeveM:ejeDeveM
      });
    }
    return result;
  } catch(e) {
    Logger.log('getDatosSecFunc error: '+e.message);
    return null;
  }
}

// ─── 1.8 HISTORIAL DE EJECUCIONES ────────────────────────────────────────────
function getAuditLog(limit) {
  try {
    var ss = SpreadsheetApp.openById(_getSpreadsheetIdActivo());
    var hL = ss.getSheetByName(CONFIG.hojas.auditLog);
    if (!hL||hL.getLastRow()<2) return [];
    var data = hL.getDataRange().getValues();
    var rows = data.slice(1).reverse();
    var lim  = limit||50;
    return rows.slice(0,lim).map(function(r){
      var resumenRaw=r[5]||'{}', resumen;
      try { resumen=JSON.parse(resumenRaw); }
      catch(e2){ resumen={ok:0,observado:0,agregar:0,eliminar:0}; }
      return {
        ts:String(r[0]||''), user:String(r[1]||''),
        mesCorte:Number(r[2]||0), duracion:Number(r[3]||0),
        ok:r[4]===true||r[4]==='TRUE', resumen:resumen,
        error:String(r[6]||'')
      };
    });
  } catch(e) {
    Logger.log('getAuditLog error: '+e.message);
    return [];
  }
}

// ─── 1.9 EXPORTAR CONSOLIDADO ─────────────────────────────────────────────────
function exportConsolidado(filtro) {
  try {
    var perfilStatus = obtenerPerfilUsuario();
    if (!perfilStatus.ok) throw new Error('ACCESO DENEGADO: '+perfilStatus.mensaje);
    if (perfilStatus.perfil.rol === 'Lector') throw new Error('ACCESO DENEGADO: Rol Lector no puede exportar datos.');

    var ss    = SpreadsheetApp.openById(_getSpreadsheetIdActivo());
    var hC    = ss.getSheetByName(CONFIG.hojas.consolidado);
    var ssId  = ss.getId();
    var tipo  = (filtro&&filtro.tipo)||'completo';
    var fecha = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyy-MM');
    var userEmail='';
    try { userEmail=Session.getActiveUser().getEmail(); } catch(e2){}

    var url, fileName, rows=0;

    if (tipo==='completo') {
      rows     = hC?Math.max(0,hC.getLastRow()-CONFIG.filasEnc.consolidado):0;
      fileName = 'SISCOP_CONSOLIDADO_COMPLETO_'+fecha+'.xlsx';
      url      = 'https://docs.google.com/spreadsheets/d/'+ssId+
                 '/export?format=xlsx&sheet='+encodeURIComponent(CONFIG.hojas.consolidado)+'&attachment=true';

    } else if (tipo==='observados') {
      var result = _exportarFiltrado(ss, hC, function(f, encC){
        var iEst = encC.indexOf('ESTADO');
        if (iEst<0) return false;
        var est = String(f[iEst]||'').trim().toLowerCase();
        return est.indexOf('observ')>-1||est.indexOf('agr')>-1||est.indexOf('elim')>-1;
      });
      rows=result.rows; url=result.url;
      fileName='SISCOP_OBSERVADOS_'+fecha+'.xlsx';

    } else if (tipo==='meta') {
      var sf = filtro&&filtro.sf;
      if (!sf) throw new Error('No hay meta seleccionada para exportar.');
      var result2 = _exportarFiltrado(ss, hC, function(f, encC){
        var iSF = encC.indexOf('SEC_FUNC');
        return iSF>=0 && String(f[iSF]).trim()===sf;
      });
      rows=result2.rows; url=result2.url;
      fileName='SISCOP_META_'+sf+'_'+fecha+'.xlsx';

    } else if (tipo==='csv') {
      rows     = hC?Math.max(0,hC.getLastRow()-CONFIG.filasEnc.consolidado):0;
      fileName = 'SISCOP_CONSOLIDADO_'+fecha+'.csv';
      url      = 'https://docs.google.com/spreadsheets/d/'+ssId+
                 '/export?format=csv&sheet='+encodeURIComponent(CONFIG.hojas.consolidado)+'&attachment=true';
    }

    _logExport(ss,{ ts:new Date().toISOString(), user:userEmail, tipo:tipo, filas:rows, fileName:fileName });

    return { url:url, fileName:fileName, rows:rows };
  } catch(e) {
    Logger.log('exportConsolidado error: '+e.message);
    throw new Error(e.message);
  }
}

// Auxiliar: crea hoja temporal filtrada y devuelve URL de descarga
function _exportarFiltrado(ss, hC, filtroFn) {
  if (!hC) return { rows:0, url:'' };
  var enc  = _getEnc(hC, CONFIG.filasEnc.consolidado);
  var data = hC.getDataRange().getValues();
  // Incluir filas de encabezado (1,2,3)
  var cabeceras = data.slice(0, CONFIG.filasEnc.consolidado);
  var filtradas = data.slice(CONFIG.filasEnc.consolidado).filter(function(f){ return filtroFn(f,enc); });
  var total = cabeceras.concat(filtradas);

  var tmpName = 'SISCOP_TMP_'+new Date().getTime();
  var tmpSheet = ss.insertSheet(tmpName);
  if (total.length>0) tmpSheet.getRange(1,1,total.length,total[0].length).setValues(total);
  SpreadsheetApp.flush();

  var url = 'https://docs.google.com/spreadsheets/d/'+ss.getId()+
            '/export?format=xlsx&sheet='+encodeURIComponent(tmpName)+'&attachment=true';

  // Eliminar hoja temporal después de un momento (no podemos esperar, el usuario descarga por URL)
  // La URL ya captura el estado actual del sheet
  Utilities.sleep(1000);
  ss.deleteSheet(tmpSheet);

  return { rows:filtradas.length, url:url };
}

// NOTA: getExportLog activa está en 3_utils.js (lee desde BD Historial).
// La versión legacy que leía del SS local fue eliminada (H-16).

// ─── 1.11 MARCAR OBSERVACIÓN COMO CORREGIDA ───────────────────────────────────
// clasificadores puede ser string (uno) o array (varios, para alertas agrupadas)
function marcarObservacionCorregida(secFunc, clasificadores) {
  try {
    var perfilStatus = obtenerPerfilUsuario();
    if (!perfilStatus.ok) throw new Error('ACCESO DENEGADO: '+perfilStatus.mensaje);
    if (perfilStatus.perfil.rol==='Lector') throw new Error('ACCESO DENEGADO: Rol Lector no puede editar datos.');

    var ss  = SpreadsheetApp.openById(_getSpreadsheetIdActivo());
    var hC  = ss.getSheetByName(CONFIG.hojas.consolidado);
    if (!hC) throw new Error('Hoja CONSOLIDADO no encontrada.');

    var enc  = _getEnc(hC, CONFIG.filasEnc.consolidado);
    var iSF  = _idx(enc,'SEC_FUNC');
    var iCL  = _idx(enc,'CLASIFICADOR_CODIGO');
    var iEst = enc.indexOf('ESTADO');
    var iObs = _getObsIdx(enc);

    var clArray = Array.isArray(clasificadores) ? clasificadores : [clasificadores];
    var clSet = {};
    clArray.forEach(function(cl){ clSet[String(cl).replace(/\s+/g,'')] = true; });

    var data = hC.getDataRange().getValues();
    var cambiados = 0;

    for (var r=CONFIG.filasEnc.consolidado; r<data.length; r++) {
      var sfRow = String(data[r][iSF]).trim();
      var clRow = String(data[r][iCL]).replace(/\s+/g,'');
      if (sfRow===secFunc && clSet[clRow]) {
        var fila = r+1;
        if (iEst>=0) hC.getRange(fila,iEst+1).setValue('Ok');
        if (iObs>=0) hC.getRange(fila,iObs+1).setValue('');
        cambiados++;
      }
    }

    if (cambiados===0) throw new Error('No se encontraron clasificadores en la meta '+secFunc+'.');

    var userEmail='';
    try { userEmail=Session.getActiveUser().getEmail(); } catch(e2){}
    _logEjecucion(ss,{
      ts:new Date().toISOString(), user:userEmail, mesCorte:-1, duracion:0, ok:true,
      resumen:{ok:cambiados,observado:0,agregar:0,eliminar:0},
      error:'Corrección manual: '+secFunc+'|'+clArray.join(',')
    });

    return { ok:true, cambiados:cambiados, mensaje:'Estado actualizado a Ok correctamente.' };
  } catch(e) {
    Logger.log('marcarObservacionCorregida error: '+e.message);
    throw new Error(e.message);
  }
}

// =============================================================================
