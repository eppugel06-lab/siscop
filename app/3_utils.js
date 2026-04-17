// SECCIÓN 3 — UTILIDADES INTERNAS
// =============================================================================
function _getHoja(ss,nombre){var h=ss.getSheetByName(nombre);if(!h) throw new Error('Hoja "'+nombre+'" no encontrada.');return h;}
function _getEnc(hoja,filaNum){var ult=hoja.getLastColumn();if(ult===0) return [];return hoja.getRange(filaNum,1,1,ult).getValues()[0].map(function(h){return String(h).trim().toUpperCase();});}
function _idx(enc,nombre){var i=enc.indexOf(nombre.trim().toUpperCase());if(i===-1) throw new Error('Columna "'+nombre+'" no encontrada.');return i;}
function _getObsIdx(enc){var i1=enc.indexOf('OBSERVACION'),i2=enc.indexOf('OBSERVACI\u00d3N');return i1!==-1?i1:i2;}
function _n(v){return Number(v)||0;}
function _normSF(val){var n=parseInt(Number(val),10);return isNaN(n)?'0000':String(n).padStart(4,'0');}

function _leerResumenEstados(ss) {
  try {
    var hC=ss.getSheetByName(CONFIG.hojas.consolidado);
    if(!hC) return {ok:0,observado:0,agregar:0,eliminar:0};
    var enc=_getEnc(hC,CONFIG.filasEnc.consolidado), iE=enc.indexOf('ESTADO');
    if(iE<0) return {ok:0,observado:0,agregar:0,eliminar:0};
    var data=hC.getDataRange().getValues(), res={ok:0,observado:0,agregar:0,eliminar:0};
    for(var r=CONFIG.filasEnc.consolidado;r<data.length;r++){
      var e=String(data[r][iE]||'').trim().toLowerCase();
      if(e==='ok') res.ok++;
      else if(e.indexOf('observ')>-1) res.observado++;
      else if(e.indexOf('agr')>-1)    res.agregar++;
      else if(e.indexOf('elim')>-1)   res.eliminar++;
    }
    return res;
  } catch(e2){return {ok:0,observado:0,agregar:0,eliminar:0};}
}

function _logEjecucion(ss, entry) {
  try {
    var hL=ss.getSheetByName(CONFIG.hojas.auditLog);
    if(!hL){
      hL=ss.insertSheet(CONFIG.hojas.auditLog); hL.hideSheet();
      hL.getRange(1,1,1,7).setValues([['TIMESTAMP','USUARIO','MES_CORTE','DURACION_SEG','OK','RESUMEN_JSON','DETALLE']]);
    }
    hL.appendRow([entry.ts,entry.user,entry.mesCorte,entry.duracion,entry.ok,
      JSON.stringify(entry.resumen),entry.error||'']);
  } catch(e2){Logger.log('_logEjecucion error: '+e2.message);}
}

// ─── 1.10 HISTORIAL DE EXPORTACIONES (ACTUALIZADO A BD EXTERNA) ──────────────

// 1. Guardar log de exportación
function _logExport(ssLocal, entry) {
  try {
    // IGNORAMOS el ssLocal del periodo activo y apuntamos a la BD Historial
    var ssDb = SpreadsheetApp.openById(CONFIG.idBaseDatosHistorial);
    var hL = ssDb.getSheetByName(CONFIG.hojas.exportLog);
    
    // Si la hoja no existe en el nuevo Excel, la creamos al vuelo por seguridad
    if(!hL){
      hL = ssDb.insertSheet(CONFIG.hojas.exportLog);
      hL.getRange(1,1,1,5).setValues([['TIMESTAMP','USUARIO','TIPO','FILAS','ARCHIVO']]);
      hL.getRange('A1:E1').setFontWeight('bold').setBackground('#f3f4f6');
    }
    
    // Guardamos la transacción rapidísimo
    hL.appendRow([entry.ts, entry.user, entry.tipo, entry.filas, entry.fileName]);
    
  } catch(e2){
    Logger.log('_logExport error crítico: '+e2.message);
  }
}

// 2. Leer log de exportación para el Frontend
function getExportLog(limit) {
  try {
    var perfilStatus = obtenerPerfilUsuario();
    if (!perfilStatus.ok) return [];
    
    var esAdmin = perfilStatus.perfil.rol === 'Admin';
    var miEmail = perfilStatus.perfil.email.toLowerCase();

    // APUNTAMOS a la BD Historial
    var ssDb = SpreadsheetApp.openById(CONFIG.idBaseDatosHistorial);
    var hL = ssDb.getSheetByName(CONFIG.hojas.exportLog);
    
    if (!hL || hL.getLastRow() < 2) return [];

    var data = hL.getDataRange().getValues();
    var rows = data.slice(1).reverse(); // Invertimos para ver lo más reciente primero
    var lim  = limit || 30;

    // Filtro de seguridad: Lectores solo ven sus propias descargas, Admins ven todo
    var filtradas = esAdmin ? rows : rows.filter(function(r){
      return String(r[1]||'').toLowerCase() === miEmail;
    });

    return filtradas.slice(0, lim).map(function(r){
      return {
        ts: String(r[0]||''), 
        user: String(r[1]||''),
        tipo: String(r[2]||''), 
        filas: Number(r[3]||0),
        fileName: String(r[4]||'')
      };
    });
  } catch(e) {
    Logger.log('getExportLog error: '+e.message);
    return [];
  }
}

function _getUltimoPeriodo(ss) {
  try {
    var hL=ss.getSheetByName(CONFIG.hojas.auditLog);
    if(!hL||hL.getLastRow()<2) return {periodo:'Sin datos',user:'',fecha:''};
    // Buscar último registro exitoso de proceso real (mesCorte >= 0)
    var data=hL.getDataRange().getValues();
    for(var i=data.length-1;i>=1;i--){
      var row=data[i];
      var mc=Number(row[2]||0);
      if(mc>=0&&(row[4]===true||row[4]==='TRUE')){
        var ts=row[0]?new Date(row[0]):null;
        var fecha=ts?Utilities.formatDate(ts,Session.getScriptTimeZone(),'dd/MM/yyyy HH:mm'):'';
        var anio=ts?ts.getFullYear():new Date().getFullYear();
        return {periodo:CONFIG.mesesNombres[mc]+' '+anio, user:String(row[1]||''), fecha:fecha};
      }
    }
    return {periodo:'Sin datos',user:'',fecha:''};
  } catch(e){return {periodo:'Sin datos',user:'',fecha:''};}
}

// =============================================================================
if (typeof module !== 'undefined') { module.exports = { _normSF: typeof _normSF !== 'undefined' ? _normSF : null, _n: typeof _n !== 'undefined' ? _n : null }; }
