// SECCIÓN 5 — SISTEMA HISTÓRICO DE PERIODOS
// =============================================================================

// Helper: obtiene el spreadsheetId activo (del periodo seleccionado o el default)
function _getSpreadsheetIdActivo() {
  try {
    var prop = PropertiesService.getUserProperties().getProperty('sisgep_periodo_ssId');
    return prop || CONFIG.spreadsheetId;
  } catch(e) {
    return CONFIG.spreadsheetId;
  }
}

// ─── 5.1 LEER TODOS LOS PERIODOS ─────────────────────────────────────────────
function obtenerPeriodos() {
  try {
    var ss   = SpreadsheetApp.openById(CONFIG.idDbPeriodos);
    var hoja = ss.getSheetByName(CONFIG.hojaPeriodos);
    if (!hoja) return { ok: true, periodos: [], anioActual: new Date().getFullYear() };

    var data = hoja.getDataRange().getValues();
    var periodos = [];
    for (var i = 1; i < data.length; i++) {
      var fila = data[i];
      if (!fila[0] && !fila[1]) continue;
      var link = String(fila[3] || '');
      var ssId = _extraerIdDeUrl(link);
      periodos.push({
        nombre:    String(fila[0] || ''),
        periodo:   Number(fila[1] || 0),
        mesCorte:  fila[2] !== '' && fila[2] !== null ? Number(fila[2]) : -1,
        link:      link,
        ssId:      ssId,
        fila:      i + 1
      });
    }

    periodos.sort(function(a, b) { return b.periodo - a.periodo; });

    // Recuperar el ssId activo que el usuario guardó en su sesión anterior
    var periodoActivoSsId = '';
    try {
      periodoActivoSsId = PropertiesService.getUserProperties()
                            .getProperty('sisgep_periodo_ssId') || '';
    } catch(e2) {}

    var anioActual = new Date().getFullYear();
    return {
      ok:               true,
      periodos:         periodos,
      anioActual:       anioActual,
      periodoActivoSsId: periodoActivoSsId   // ← NUEVO: el frontend lo usa para restaurar sesión
    };
  } catch(e) {
    Logger.log('obtenerPeriodos error: ' + e.message);
    return { ok: false, mensaje: e.message, periodos: [] };
  }
}

// ─── 5.2 CAMBIAR PERIODO ACTIVO ───────────────────────────────────────────────
function cambiarPeriodoActivo(ssId, periodo) {
  try {
    var perfilStatus = obtenerPerfilUsuario();
    if (!perfilStatus.ok) return { ok: false, mensaje: 'ACCESO DENEGADO.' };

    PropertiesService.getUserProperties().setProperty('sisgep_periodo_ssId', ssId);
    PropertiesService.getUserProperties().setProperty('sisgep_periodo_anio', String(periodo));
    return { ok: true, ssId: ssId, periodo: periodo };
  } catch(e) {
    return { ok: false, mensaje: e.message };
  }
}

// ─── 5.3 AGREGAR NUEVO PERIODO ────────────────────────────────────────────────
function agregarNuevoPeriodo(anio) {
  try {
    var perfilStatus = obtenerPerfilUsuario();
    if (!perfilStatus.ok) return { ok: false, mensaje: 'ACCESO DENEGADO: ' + perfilStatus.mensaje };
    if (perfilStatus.perfil.rol === 'Lector') return { ok: false, mensaje: 'Sin permisos para crear periodos.' };

    anio = parseInt(anio, 10);
    if (!anio || anio < 2020 || anio > 2040) return { ok: false, mensaje: 'Año inválido: ' + anio };

    // Verificar que no exista ya
    var dbSS   = SpreadsheetApp.openById(CONFIG.idDbPeriodos);
    var dbHoja = dbSS.getSheetByName(CONFIG.hojaPeriodos);
    if (!dbHoja) {
      dbHoja = dbSS.insertSheet(CONFIG.hojaPeriodos);
      dbHoja.appendRow(['NOMBRE','PERIODO','MES_CORTE','LINK']);
    }
    var dbData = dbHoja.getDataRange().getValues();
    for (var i = 1; i < dbData.length; i++) {
      if (Number(dbData[i][1]) === anio) {
        return { ok: false, mensaje: 'El periodo ' + anio + ' ya existe.' };
      }
    }

    // Copiar el Sheets actual como plantilla
    var srcFile  = DriveApp.getFileById(CONFIG.spreadsheetId);
    var folder   = DriveApp.getFolderById(CONFIG.carpetaHistorico);
    var nombre   = 'SISCOP ' + anio;
    var newFile  = srcFile.makeCopy(nombre, folder);
    var newSsId  = newFile.getId();

    // Limpiar datos (conservar encabezados)
    _limpiarSheetsNuevoPeriodo(newSsId);

    // Registrar en DB_PERIODOS
    var link = 'https://docs.google.com/spreadsheets/d/' + newSsId + '/edit';
    dbHoja.appendRow([nombre, anio, '', link]);

    Logger.log('agregarNuevoPeriodo OK — ' + nombre + ' → ' + newSsId);
    return {
      ok: true,
      nombre: nombre,
      periodo: anio,
      ssId: newSsId,
      link: link,
      mensaje: 'Periodo ' + anio + ' creado correctamente.'
    };
  } catch(e) {
    Logger.log('agregarNuevoPeriodo error: ' + e.message);
    return { ok: false, mensaje: 'Error al crear periodo: ' + e.message };
  }
}

// ─── 5.4 ACTUALIZAR MES CORTE EN DB_PERIODOS ─────────────────────────────────
// Se llama automáticamente al ejecutar el consolidado
function _actualizarMesCorteEnDb(anio, mesCorte) {
  try {
    var ss   = SpreadsheetApp.openById(CONFIG.idDbPeriodos);
    var hoja = ss.getSheetByName(CONFIG.hojaPeriodos);
    if (!hoja) return;
    var data = hoja.getDataRange().getValues();
    for (var i = 1; i < data.length; i++) {
      if (Number(data[i][1]) === anio) {
        hoja.getRange(i + 1, 3).setValue(mesCorte);
        return;
      }
    }
  } catch(e) {
    Logger.log('_actualizarMesCorteEnDb error: ' + e.message);
  }
}

// ─── Helper: extraer ID de URL de Google Sheets ───────────────────────────────
function _extraerIdDeUrl(url) {
  if (!url) return '';
  var match = url.match(/\/spreadsheets\/d\/([a-zA-Z0-9_-]+)/);
  return match ? match[1] : '';
}

// ─── Helper: limpiar datos del nuevo Sheets (conservar encabezados) ───────────
function _limpiarSheetsNuevoPeriodo(ssId) {
  try {
    var ss = SpreadsheetApp.openById(ssId);
    var hojas = [
      { nombre: CONFIG.hojas.sisplan,     filaEnc: CONFIG.filasEnc.sisplan },
      { nombre: CONFIG.hojas.devengado,   filaEnc: CONFIG.filasEnc.devengado },
      { nombre: CONFIG.hojas.certificado, filaEnc: CONFIG.filasEnc.certificado },
      { nombre: CONFIG.hojas.consolidado, filaEnc: CONFIG.filasEnc.consolidado }
    ];
    hojas.forEach(function(h) {
      var hoja = ss.getSheetByName(h.nombre);
      if (!hoja) return;
      var lastRow = hoja.getLastRow();
      var desdeF  = h.filaEnc + 1;
      if (lastRow >= desdeF) {
        hoja.getRange(desdeF, 1, lastRow - desdeF + 1, hoja.getLastColumn()).clearContent();
      }
    });
    // Limpiar también AUDIT_LOG y EXPORT_LOG
    [CONFIG.hojas.auditLog, CONFIG.hojas.exportLog].forEach(function(nombre) {
      var hoja = ss.getSheetByName(nombre);
      if (hoja && hoja.getLastRow() > 1) {
        hoja.getRange(2, 1, hoja.getLastRow() - 1, hoja.getLastColumn()).clearContent();
      }
    });
    SpreadsheetApp.flush();
  } catch(e) {
    Logger.log('_limpiarSheetsNuevoPeriodo error: ' + e.message);
  }
}

/**
 * ============================================================================
 * MOTOR DE APLANAMIENTO: REPORTE DE EJECUCIÓN (CERTIFICADO)
 * Transforma la estructura jerárquica del SIAF a un formato lineal tabular.
 * ============================================================================
 */
function _procesarReporteCertificadoJerarquico(datosRaw) {
  // SE AÑADIÓ LA COLUMNA 'UNIDAD_MEDIDA' EN LA POSICIÓN CORRECTA
  var HEADERS = [
    'SEC_FUNC', 'PROGRAMA_PPTAL', 'PRODUCTO_PROYECTO', 'ACTIV_OBRA_ACCINV',
    'META', 'FINALIDAD', 'UNIDAD_MEDIDA', 'CANT_META_ANUAL', 'RUBRO', 
    'DEPARTAMENTO_META', 'PROVINCIA_META', 'DISTRITO_META',
    'CLASIFICADOR', 'CLASIFICADOR_DETALLE', 'PIA', 'MODIFIC', 'PIM',
    'ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SET', 'OCT', 'NOV', 'DIC',
    'TOTAL_EJEC_CERTIF', 'SALDO'
  ];
  
  var registros = [];
  
  // RUBRO FIJO: Requerimiento exacto aplicado
  var rubroActual = '00 RECURSOS ORDINARIOS';
  
  // Memoria extendida con 'um' (Unidad Medida)
  var metaActual = { sf: '', prog: '', prod: '', act: '', meta: '', fin: '', um: '', cant: '', dep: '', prov: '', dist: '' };
  
  for (var i = 0; i < datosRaw.length; i++) {
    var fila = datosRaw[i];
    var colB = String(fila[1] || '').trim();
    var colC = String(fila[2] || '').trim();
    
    // Detectar fila principal de META (SEC_FUNC)
    if (/^\d{4}\s+\d{4}/.test(colB) && colB.indexOf('TOTAL') === -1 && colB.indexOf('SECTOR') === -1) {
      var partes = colB.split(/\s+/);
      metaActual.sf = partes[0] || '';
      metaActual.prog = partes[1] || '';
      metaActual.prod = partes[2] || '';
      
      // ✨ LÓGICA: ACTIV_OBRA_ACCINV ✨
      // 1. Borramos los primeros 3 códigos (Ej: "0016 0090 3000385 ")
      var actTexto = colB.replace(/^\d{4}\s+\d{4}\s+\d{7}\s+/, '');
      // 2. Borramos los números del final (Ej: " 22 047 0105")
      actTexto = actTexto.replace(/\s+\d+\s+\d+\s+\d+\s*$/, '');
      // Resultado: "5005629 CONTRATACION OPORTUNA Y PAGO..."
      metaActual.act = actTexto.trim();
      
      // Buscar la fila de "Meta: 00001..." 
      for (var j = 1; j <= 3; j++) {
        if (i + j < datosRaw.length) {
          var det = String(datosRaw[i+j][1] || '').trim();
          if (det.indexOf('Meta:') > -1) {
             
             // ✨ LÓGICA: FINALIDAD, UM y CANTIDAD ✨
             // Separamos por el signo ";"
             var bloques = det.split(';');
             
             // Bloque 1: "Meta: 00003 - 0445312 INTERVENCIONES Y ACCIONES PEDAGOGICAS"
             if (bloques[0]) {
                 var m1 = bloques[0].match(/Meta:\s*(\d+)/);
                 if (m1) metaActual.meta = m1[1];
                 
                 // Extrae a partir del "-" hasta el ";" (que ya fue cortado)
                 var f1 = bloques[0].match(/-\s*(.+)/);
                 if (f1) metaActual.fin = f1[1].trim(); 
             }
             
             // Bloque 2: " INSTITUCION EDUCATIVA: 76.000"
             if (bloques[1]) {
                 // Separamos por el signo ":"
                 var partesUM = bloques[1].split(':');
                 if (partesUM.length >= 2) {
                     metaActual.um = partesUM[0].trim();   // Antes de los ":" (UNIDAD DE MEDIDA)
                     metaActual.cant = partesUM[1].trim(); // Después de los ":" (CANTIDAD)
                 }
             }
             
             // Bloque 3: " LIMA, LIMA, MULTIDISTRITAL"
             if (bloques[2]) {
                 var ubicaciones = bloques[2].split(',');
                 if (ubicaciones.length >= 3) {
                   metaActual.dep = ubicaciones[0].trim(); 
                   metaActual.prov = ubicaciones[1].trim();
                   metaActual.dist = ubicaciones[2].trim();
                 }
             }
             break; 
          }
        }
      }
      continue;
    }
    
    // Detectar fila de DETALLE (Clasificadores)
    if (/^[23]\./.test(colB) && colB.indexOf('TOTAL') === -1) {
      
      var clasificadorLimpio = colB.replace(/\s+/g, '.').replace(/\.+/g, '.');
      if(clasificadorLimpio.endsWith('.')) clasificadorLimpio = clasificadorLimpio.slice(0, -1);
      
      var norm = function(v) { var n = parseFloat(v); return isNaN(n) ? 0 : n; };
      
      // Se añade "metaActual.um" en la posición correspondiente del array
      var reg = [
        metaActual.sf, metaActual.prog, metaActual.prod, metaActual.act,
        metaActual.meta, metaActual.fin, metaActual.um, metaActual.cant, rubroActual,
        metaActual.dep, metaActual.prov, metaActual.dist,
        clasificadorLimpio, colC,
        norm(fila[3]), norm(fila[5]), norm(fila[6]), 
        norm(fila[7]), norm(fila[8]), norm(fila[9]), norm(fila[10]), norm(fila[11]), norm(fila[12]), 
        norm(fila[13]), norm(fila[14]), norm(fila[15]), norm(fila[16]), norm(fila[17]), norm(fila[18]), 
        norm(fila[19]), norm(fila[20])
      ];
      registros.push(reg);
    }
  }
  
  registros.unshift(HEADERS);
  return registros;
}

/**
 * ============================================================================
 * MÓDULO: AUDITORÍA E HISTORIAL DE PROCESOS
 * ============================================================================
 */

// 1. Función interna para registrar acciones (Ultraligera)
function _registrarLog(modulo, accion, detalle, estado) {
  try {
    var ss = SpreadsheetApp.openById(CONFIG.idBaseDatosHistorial);
    var hojaLog = ss.getSheetByName(CONFIG.hojas.historial);
    
    if (!hojaLog) {
      Logger.log("Error _registrarLog: No se encontró la pestaña " + CONFIG.hojas.historial);
      return; 
    }

    // Obtenemos el correo directamente, sin consultar la base de datos de usuarios (más rápido)
    var email = "";
    try { email = Session.getActiveUser().getEmail(); } catch(e){}

    var timestamp = new Date();

    // Inyecta la fila al final rapidísimo
    hojaLog.appendRow([timestamp, email, 'Usuario', modulo, accion, detalle, estado || 'OK']);
    
  } catch (e) {
    Logger.log("Error crítico en _registrarLog: " + e.message);
  }
}

// 2. Función para mandar el historial al Dashboard (Llamada desde el frontend)
function obtenerHistorialProcesos() {
  try {
    var ss = SpreadsheetApp.openById(CONFIG.idBaseDatosHistorial);
    var hojaLog = ss.getSheetByName(CONFIG.hojas.historial);
    if (!hojaLog) throw new Error('No se encontró la hoja BD_Historial');

    var data = hojaLog.getDataRange().getValues();
    if (data.length <= 1) return []; // Está vacía (solo cabeceras)

    var cabeceras = data[0];
    var registros = [];

    // Leemos de abajo hacia arriba (reverso) para mostrar lo más reciente primero
    // Limitamos a los últimos 500 registros para no saturar la memoria del navegador
    var limite = Math.max(1, data.length - 500); 
    
    for (var i = data.length - 1; i >= limite; i--) {
      var fila = data[i];
      registros.push({
        fecha: Utilities.formatDate(new Date(fila[0]), "GMT-5", "dd/MM/yyyy HH:mm:ss"),
        usuario: fila[1],
        rol: fila[2],
        modulo: fila[3],
        accion: fila[4],
        detalle: fila[5],
        estado: fila[6]
      });
    }

    return registros;
  } catch (e) {
    throw new Error('Error al obtener historial: ' + e.message);
  }
}

// ─── HERRAMIENTA DE DIAGNÓSTICO ────────────────────────────────────────────────
function TEST_CONEXION_HISTORIAL() {
  try {
    Logger.log("1. Intentando abrir Excel ID: " + CONFIG.idBaseDatosHistorial);
    var ss = SpreadsheetApp.openById(CONFIG.idBaseDatosHistorial);
    
    Logger.log("2. Excel abierto. Buscando pestaña: " + CONFIG.hojas.historial);
    var hojaLog = ss.getSheetByName(CONFIG.hojas.historial);
    
    if (!hojaLog) {
      throw new Error("❌ EL ARCHIVO SE ABRIÓ, PERO LA PESTAÑA '" + CONFIG.hojas.historial + "' NO EXISTE. Revisa espacios o mayúsculas.");
    }
    
    Logger.log("3. Pestaña encontrada. Intentando escribir...");
    hojaLog.appendRow([new Date(), "test@ugel06.gob.pe", "Admin", "Test", "Prueba de Diagnóstico", "Verificando permisos", "OK"]);
    
    Logger.log("✅ ÉXITO TOTAL. La escritura y lectura funcionan correctamente.");
  } catch (e) {
    Logger.log("🚨 ERROR DETECTADO: " + e.message);
  }
}