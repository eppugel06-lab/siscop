// =============================================================================
// Code.gs — SISCOP · Sistema de Conciliación y Programación Presupuestal
// UGEL 06 VITARTE · Versión 2.0
// =============================================================================

var CONFIG = {
  spreadsheetId:      "1EA4LoFmdl6wXx8upOtKrXhgp_LeSmKuMGQZFHT22SUQ",
  idBaseDatosUsuarios:"1fH9zvTG59_bUYW6m2PA8licYimCj9uan4Bh2unyBmEM",
  idDbPeriodos:       "1VqVSwbBR_xdQarMvZ8lCBPnDejS5ZDs41HVxoAQvVTk",
  idBaseDatosHistorial:"1D4cuptL6vt7Vv8uGwi9LItNMoEFEA1sM7NyCD1i-icU",
  carpetaHistorico:   "1a-FcRqyDyt8h9WC8xCLd5lDi4GlP6M1e",
  hojaPeriodos:       "DB_PERIODOS",
  superAdminEmail:    "epp.ugel06@gmail.com",
  urlWebApp:          "https://script.google.com/macros/s/AKfycbyqUxhzrCsieK65RNMdwXjcERjarxrDfwfX0-LNNk96UDLY5XXAwK2ZXoxAwrKDUBoD/exec",
  filtroUE:           "006. USE 06 VITARTE",
  hojas: {
    sisplan:     "SISPLAN",
    devengado:   "DEVENGADO",
    certificado: "CERTIFICADO",
    consolidado: "CONSOLIDADO",
    auditLog:    "AUDIT_LOG",
    exportLog:   "EXPORT_LOG",
    usuarios:    "USUARIOS",
    historial:   "BD_Historial"
  },
  filasEnc: { sisplan:1, devengado:1, certificado:1, consolidado:3 },
  colsSisplan: [
    "DENOMINACION_AO","UNIDAD_MEDIDA","SEC_FUNC","CLASIFICADOR_CODIGO","RECURSO",
    "CANT_ENE","CANT_FEB","CANT_MAR","CANT_ABR","CANT_MAY","CANT_JUN",
    "CANT_JUL","CANT_AGO","CANT_SET","CANT_OCT","CANT_NOV","CANT_DIC","TOTAL_FISICO"
  ],
  mesesCants: ["CANT_ENE","CANT_FEB","CANT_MAR","CANT_ABR","CANT_MAY","CANT_JUN",
               "CANT_JUL","CANT_AGO","CANT_SET","CANT_OCT","CANT_NOV","CANT_DIC"],
  mesesNombres: ["Enero","Febrero","Marzo","Abril","Mayo","Junio",
                 "Julio","Agosto","Setiembre","Octubre","Noviembre","Diciembre"],
  colsRequeridas: {
    sisplan:     ["DENOMINACION_AO","UNIDAD_MEDIDA","SEC_FUNC","CLASIFICADOR_CODIGO","RECURSO","CANT_ENE"],
    devengado:   ["UNIDAD_EJECUTORA","SEC_FUNC","UNIDAD_MEDIDA",
                  "TIPO_TRANSACCION","GENERICA","SUBGENERICA","SUBGENERICA_DET","ESPECIFICA","ESPECIFICA_DET",
                  "ACTIV_OBRA_ACCINV","MTO_PIA","MTO_PIM","MTO_DEVENGA_01"],
    certificado: []
  }
};

// ─── WEB APP ENTRY POINT ──────────────────────────────────────────────────────
function doGet(e) {
  var template = HtmlService.createTemplateFromFile('Index');
  
  // 1. Opcional: Define la URL de tu icono aquí para gestionarlo desde el servidor
  template.faviconUrl = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='7' fill='%231B4FD8'/%3E%3Ctext x='50%25' y='52%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial Black,sans-serif' font-size='15' font-weight='900' fill='white'%3ESG%3C/text%3E%3C/svg%3E"; 

  return template.evaluate()
    .setTitle('SISCOP · UGEL 06') // Sugerencia: Nombre más corto para que no se corte en la pestaña
    .addMetaTag('viewport', 'width=device-width, initial-scale=1.0') // Limpiamos el zoom forzado (mejor UX)
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

// NUEVA FUNCIÓN: Permite inyectar archivos HTML dentro de otros
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

// =============================================================================
