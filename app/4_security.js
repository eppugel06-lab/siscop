// SECCIÓN 4 — SEGURIDAD Y GESTIÓN DE USUARIOS
// =============================================================================

function obtenerPerfilUsuario() {
  try {
    var email=Session.getActiveUser().getEmail();
    if(!email) throw new Error('No se pudo detectar la cuenta de Google.');
    var emailLower=email.toLowerCase();
    if(emailLower===CONFIG.superAdminEmail.toLowerCase()){
      _registrarUltimoAcceso(emailLower,'Super Admin');
      return {ok:true,perfil:{email:emailLower,nombre:'Super Administrador',rol:'Admin',estado:'Activo'},mensaje:'Bienvenido Super Admin'};
    }
    var ssUsuarios=SpreadsheetApp.openById(CONFIG.idBaseDatosUsuarios);
    var hoja=ssUsuarios.getSheetByName(CONFIG.hojas.usuarios);
    if(!hoja){
      hoja=ssUsuarios.insertSheet(CONFIG.hojas.usuarios);
      hoja.appendRow(['EMAIL','NOMBRES','ROL','ESTADO','ULTIMO_ACCESO']);
      hoja.getRange('A1:E1').setFontWeight('bold').setBackground('#1B4FD8').setFontColor('white');
    }
    var datos=hoja.getDataRange().getValues();
    for(var i=1;i<datos.length;i++){
      if(String(datos[i][0]).toLowerCase()===emailLower){
        var estado=String(datos[i][3]).trim(), rol=String(datos[i][2]).trim(), nombre=String(datos[i][1]).trim();
        if(estado.toLowerCase()!=='activo') return {ok:false,error:'ACCESO_DENEGADO',mensaje:'Tu usuario está inactivo. Contacta al administrador.'};
        _registrarUltimoAcceso(emailLower,nombre);
        return {ok:true,perfil:{email:emailLower,nombre:nombre,rol:rol,estado:estado},mensaje:'Acceso autorizado'};
      }
    }
    return {ok:false,error:'NO_REGISTRADO',mensaje:'El correo '+email+' no tiene acceso al sistema.'};
  } catch(e){
    Logger.log('Error en obtenerPerfilUsuario: '+e.message);
    return {ok:false,error:'SISTEMA',mensaje:e.message};
  }
}

function obtenerListaUsuarios() {
  try {
    var ssUsuarios=SpreadsheetApp.openById(CONFIG.idBaseDatosUsuarios);
    var hoja=ssUsuarios.getSheetByName(CONFIG.hojas.usuarios);
    if(!hoja) return {ok:true,usuarios:[]};
    var datos=hoja.getDataRange().getValues(), lista=[];
    for(var i=1;i<datos.length;i++){
      if(datos[i][0]) lista.push({email:String(datos[i][0]),nombre:String(datos[i][1]),rol:String(datos[i][2]),estado:String(datos[i][3]),ultimoAcceso:String(datos[i][4])});
    }
    return {ok:true,usuarios:lista};
  } catch(e){return {ok:false,mensaje:'Error al leer usuarios: '+e.message};}
}

function registrarNuevoUsuario(nuevoEmail, nombre, rol) {
  try {
    var emailLimpio = String(nuevoEmail).toLowerCase().trim();
    var ssUsuarios = SpreadsheetApp.openById(CONFIG.idBaseDatosUsuarios);
    var hoja = ssUsuarios.getSheetByName(CONFIG.hojas.usuarios);
    var datos = hoja.getDataRange().getValues();

    for (var i = 1; i < datos.length; i++) {
      if (String(datos[i][0]).toLowerCase() === emailLimpio) 
        return { ok: false, mensaje: 'El usuario ' + emailLimpio + ' ya existe.' };
    }

    hoja.appendRow([emailLimpio, nombre, rol, 'Activo', 'Nunca']);

    // --- CONFIGURACIÓN DE IDENTIDAD VISUAL (UX PRO) ---
    var asunto = '🔑 Acceso Concedido — SISCOP UGEL 06';
    var sisName = 'Sistema de Consolidación y Programación Presupuestal';
    
    var col = {
      bg: '#F8F9FA',      // Fondo gris muy tenue (Stitch)
      surface: '#FFFFFF', // Tarjeta blanca
      primary: '#1A73E8', // Azul Google
      text: '#202124',    // Texto principal casi negro
      text2: '#5F6368',   // Texto secundario
      border: '#DADCE0'   // Bordes sutiles
    };

    var cuerpoHtml = 
    '<div style="background-color:' + col.bg + '; padding: 40px 10px; font-family: \'Google Sans\', Roboto, Segoe UI, Arial, sans-serif;">' +
      '<table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color:' + col.surface + '; border: 1px solid ' + col.border + '; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">' +
        
        // 1. HEADER INSTITUCIONAL
        '<tr>' +
          '<td style="padding: 24px 30px; border-bottom: 1px solid #F1F3F4;">' +
            '<table width="100%">' +
              '<tr>' +
                '<td>' +
                  '<div style="font-size: 22px; font-weight: 800; color:' + col.primary + '; letter-spacing: -0.5px; line-height: 1;">SISCOP</div>' +
                  '<div style="font-size: 10px; color:' + col.text2 + '; text-transform: uppercase; letter-spacing: 0.8px; margin-top: 4px; font-weight: 600;">Programación Presupuestal</div>' +
                '</td>' +
                '<td align="right" style="font-size: 10px; color:' + col.text2 + '; text-transform: uppercase; letter-spacing: 0.5px; line-height: 1.4;">' +
                  '<b>UGEL 06</b><br>' +
                  '<span style="color:' + col.primary + ';">Área de Planificación y Presupuesto</span>' +
                '</td>' +
              '</tr>' +
            '</table>' +
          '</td>' +
        '</tr>' +

        // 2. BIENVENIDA Y ACCESO
        '<tr>' +
          '<td style="padding: 40px 30px 20px;">' +
            '<div style="display: inline-block; background-color: #E8F0FE; color:' + col.primary + '; padding: 6px 14px; border-radius: 20px; font-size: 12px; font-weight: 700; margin-bottom: 20px;">' +
              '🛡️ Acceso Concedido' +
            '</div>' +
            '<h1 style="font-size: 28px; font-weight: 700; color:' + col.text + '; margin: 0; line-height: 1.2;">Bienvenido al sistema,<br>' + nombre + '</h1>' +
          '</td>' +
        '</tr>' +

        // 3. TEXTO DE VALOR (UX REFINADO)
        '<tr>' +
          '<td style="padding: 0 30px 30px;">' +
            '<p style="font-size: 15px; color:' + col.text2 + '; line-height: 1.6; margin: 0;">' +
              'Se te ha otorgado acceso oficial al <b>' + sisName + '</b>. ' +
              'Esta plataforma ha sido diseñada para centralizar la gestión de insumos y facilitar la toma de decisiones financieras en tiempo real. ' +
              'Ahora puedes acceder a las herramientas de control y seguimiento financiero correspondientes a tu unidad.' +
            '</p>' +
          '</td>' +
        '</tr>' +

        // 4. INFO BOX (ROL)
        '<tr>' +
          '<td style="padding: 0 30px;">' +
            '<table width="100%" style="background-color: #F8F9FA; border-radius: 12px; border: 1px solid ' + col.border + ';">' +
              '<tr>' +
                '<td style="padding: 20px;">' +
                  '<table width="100%">' +
                    '<tr>' +
                      '<td width="40"><span style="font-size: 24px;">👤</span></td>' +
                      '<td>' +
                        '<div style="font-size: 11px; color:' + col.text2 + '; text-transform: uppercase; letter-spacing: 1px; font-weight: 700;">Credenciales de Acceso</div>' +
                        '<div style="font-size: 15px; color:' + col.text + '; margin-top: 2px;">' +
                          'Rol asignado: <strong style="color:' + col.primary + ';">' + rol + '</strong>' +
                        '</div>' +
                      '</td>' +
                    '</tr>' +
                  '</table>' +
                '</td>' +
              '</tr>' +
            '</table>' +
          '</td>' +
        '</tr>' +

        // 5. BOTÓN DE ACCIÓN
        '<tr>' +
          '<td align="center" style="padding: 40px 30px;">' +
            '<a href="' + CONFIG.urlWebApp + '" style="background-color:' + col.primary + '; color: #ffffff; padding: 16px 36px; border-radius: 24px; text-decoration: none; font-weight: 700; font-size: 16px; display: inline-block; box-shadow: 0 4px 10px rgba(26, 115, 232, 0.25);">' +
              'Acceder al SISCOP &nbsp; →' +
            '</a>' +
            '<div style="margin-top: 20px; font-size: 12px; color:' + col.text2 + '; font-style: italic;">' +
              'Este enlace es personal y vinculado a tu cuenta institucional.' +
            '</div>' +
          '</td>' +
        '</tr>' +

        // 6. FOOTER
        '<tr>' +
          '<td style="padding: 24px; background-color: #F1F3F4; text-align: center; font-size: 11px; color:' + col.text2 + ';">' +
            '<strong>UGEL 06</strong> · Área de Planificación y Presupuesto<br>' +
            'Sistema de Consolidación y Programación Presupuestal' +
          '</td>' +
        '</tr>' +

      '</table>' +
    '</div>';

    MailApp.sendEmail({ 
      to: emailLimpio, 
      subject: asunto, 
      htmlBody: cuerpoHtml,
      name: 'SISCOP - UGEL 06' 
    });
    
    return { ok: true, mensaje: 'Usuario creado y correo de bienvenida enviado.' };
    
  } catch (e) { 
    return { ok: false, mensaje: 'Error al crear usuario: ' + e.message }; 
  }
}

function cambiarEstadoUsuario(email,nuevoEstado,nuevoRol) {
  try {
    var emailLimpio=String(email).toLowerCase().trim();
    if(emailLimpio===CONFIG.superAdminEmail.toLowerCase()) return {ok:false,mensaje:'No se puede modificar al Super Administrador.'};
    var ssUsuarios=SpreadsheetApp.openById(CONFIG.idBaseDatosUsuarios);
    var hoja=ssUsuarios.getSheetByName(CONFIG.hojas.usuarios);
    var datos=hoja.getDataRange().getValues();
    for(var i=1;i<datos.length;i++){
      if(String(datos[i][0]).toLowerCase()===emailLimpio){
        if(nuevoRol)    hoja.getRange(i+1,3).setValue(nuevoRol);
        if(nuevoEstado) hoja.getRange(i+1,4).setValue(nuevoEstado);
        return {ok:true,mensaje:'Usuario actualizado.'};
      }
    }
    return {ok:false,mensaje:'Usuario no encontrado.'};
  } catch(e){return {ok:false,mensaje:'Error: '+e.message};}
}

function editarUsuario(email,nuevoNombre,nuevoRol) {
  try {
    var emailLimpio=String(email).toLowerCase().trim();
    if(emailLimpio===CONFIG.superAdminEmail.toLowerCase()) return {ok:false,mensaje:'No se puede modificar al Super Administrador.'};
    var ssUsuarios=SpreadsheetApp.openById(CONFIG.idBaseDatosUsuarios);
    var hoja=ssUsuarios.getSheetByName(CONFIG.hojas.usuarios);
    var datos=hoja.getDataRange().getValues();
    for(var i=1;i<datos.length;i++){
      if(String(datos[i][0]).toLowerCase()===emailLimpio){
        hoja.getRange(i+1,2).setValue(nuevoNombre);
        hoja.getRange(i+1,3).setValue(nuevoRol);
        return {ok:true,mensaje:'Usuario actualizado.'};
      }
    }
    return {ok:false,mensaje:'Usuario no encontrado.'};
  } catch(e){return {ok:false,mensaje:'Error: '+e.message};}
}

function eliminarUsuario(email) {
  try {
    var emailLimpio=String(email).toLowerCase().trim();
    if(emailLimpio===CONFIG.superAdminEmail.toLowerCase()) return {ok:false,mensaje:'El Super Administrador no puede ser eliminado.'};
    var ssUsuarios=SpreadsheetApp.openById(CONFIG.idBaseDatosUsuarios);
    var hoja=ssUsuarios.getSheetByName(CONFIG.hojas.usuarios);
    var datos=hoja.getDataRange().getValues();
    for(var i=1;i<datos.length;i++){
      if(String(datos[i][0]).toLowerCase()===emailLimpio){ hoja.deleteRow(i+1); return {ok:true,mensaje:'Usuario eliminado.'}; }
    }
    return {ok:false,mensaje:'Usuario no encontrado.'};
  } catch(e){return {ok:false,mensaje:'Error: '+e.message};}
}

function reenviarCorreoBienvenida(email, nombre, rol) {
  try {
    // --- CONFIGURACIÓN DE IDENTIDAD VISUAL (UX PRO) ---
    var asunto = '🔄 Reenvío de acceso — SISCOP UGEL 06';
    var sisName = 'Sistema de Consolidación y Programación Presupuestal';
    
    var col = {
      bg: '#F8F9FA',      // Fondo gris tenue
      surface: '#FFFFFF', // Tarjeta blanca
      primary: '#1A73E8', // Azul Google
      text: '#202124',    // Texto principal
      text2: '#5F6368',   // Texto secundario
      border: '#DADCE0'   // Bordes sutiles
    };

    var cuerpoHtml = 
    '<div style="background-color:' + col.bg + '; padding: 40px 10px; font-family: \'Google Sans\', Roboto, Segoe UI, Arial, sans-serif;">' +
      '<table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color:' + col.surface + '; border: 1px solid ' + col.border + '; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">' +
        
        // 1. HEADER INSTITUCIONAL (Sincronizado con registro)
        '<tr>' +
          '<td style="padding: 24px 30px; border-bottom: 1px solid #F1F3F4;">' +
            '<table width="100%">' +
              '<tr>' +
                '<td>' +
                  '<div style="font-size: 22px; font-weight: 800; color:' + col.primary + '; letter-spacing: -0.5px; line-height: 1;">SISCOP</div>' +
                  '<div style="font-size: 10px; color:' + col.text2 + '; text-transform: uppercase; letter-spacing: 0.8px; margin-top: 4px; font-weight: 600;">Programación Presupuestal</div>' +
                '</td>' +
                '<td align="right" style="font-size: 10px; color:' + col.text2 + '; text-transform: uppercase; letter-spacing: 0.5px; line-height: 1.4;">' +
                  '<b>UGEL 06</b><br>' +
                  '<span style="color:' + col.primary + ';">Área de Planificación y Presupuesto</span>' +
                '</td>' +
              '</tr>' +
            '</table>' +
          '</td>' +
        '</tr>' +

        // 2. AVISO DE REENVÍO
        '<tr>' +
          '<td style="padding: 40px 30px 20px;">' +
            '<div style="display: inline-block; background-color: #F1F3F4; color:' + col.text2 + '; padding: 6px 14px; border-radius: 20px; font-size: 12px; font-weight: 700; margin-bottom: 20px;">' +
              '🔄 Acceso Reenviado' +
            '</div>' +
            '<h1 style="font-size: 28px; font-weight: 700; color:' + col.text + '; margin: 0; line-height: 1.2;">Hola de nuevo,<br>' + nombre + '</h1>' +
          '</td>' +
        '</tr>' +

        // 3. TEXTO DE CONTEXTO
        '<tr>' +
          '<td style="padding: 0 30px 30px;">' +
            '<p style="font-size: 15px; color:' + col.text2 + '; line-height: 1.6; margin: 0;">' +
              'Se te reenvían tus credenciales de acceso al <b>' + sisName + '</b> para que puedas continuar con el control y seguimiento financiero de tu unidad de manera regular.' +
            '</p>' +
          '</td>' +
        '</tr>' +

        // 4. INFO BOX (ROL)
        '<tr>' +
          '<td style="padding: 0 30px;">' +
            '<table width="100%" style="background-color: #F8F9FA; border-radius: 12px; border: 1px solid ' + col.border + ';">' +
              '<tr>' +
                '<td style="padding: 20px;">' +
                  '<table width="100%">' +
                    '<tr>' +
                      '<td width="40"><span style="font-size: 24px;">🔑</span></td>' +
                      '<td>' +
                        '<div style="font-size: 11px; color:' + col.text2 + '; text-transform: uppercase; letter-spacing: 1px; font-weight: 700;">Recordatorio de Perfil</div>' +
                        '<div style="font-size: 15px; color:' + col.text + '; margin-top: 2px;">' +
                          'Rol asignado: <strong style="color:' + col.primary + ';">' + rol + '</strong>' +
                        '</div>' +
                      '</td>' +
                    '</tr>' +
                  '</table>' +
                '</td>' +
              '</tr>' +
            '</table>' +
          '</td>' +
        '</tr>' +

        // 5. BOTÓN DE ACCIÓN (ESTILO PILL)
        '<tr>' +
          '<td align="center" style="padding: 40px 30px;">' +
            '<a href="' + CONFIG.urlWebApp + '" style="background-color:' + col.primary + '; color: #ffffff; padding: 16px 36px; border-radius: 24px; text-decoration: none; font-weight: 700; font-size: 16px; display: inline-block; box-shadow: 0 4px 10px rgba(26, 115, 232, 0.25);">' +
              'Acceder al SISCOP &nbsp; →' +
            '</a>' +
            '<div style="margin-top: 20px; font-size: 11px; color:' + col.text2 + ';">' +
              'Si no solicitaste este reenvío, por favor ignora este mensaje.' +
            '</div>' +
          '</td>' +
        '</tr>' +

        // 6. FOOTER
        '<tr>' +
          '<td style="padding: 24px; background-color: #F1F3F4; text-align: center; font-size: 11px; color:' + col.text2 + ';">' +
            '<strong>UGEL 06</strong> · Área de Planificación y Presupuesto<br>' +
            'Sistema de Consolidación y Programación Presupuestal' +
          '</td>' +
        '</tr>' +

      '</table>' +
    '</div>';

    MailApp.sendEmail({ 
      to: email, 
      subject: asunto, 
      htmlBody: cuerpoHtml,
      name: 'SISCOP - UGEL 06'
    });

    return { ok: true, mensaje: 'Correo reenviado a ' + email };

  } catch (e) {
    return { ok: false, mensaje: 'Error al reenviar correo: ' + e.message };
  }
}

function _registrarUltimoAcceso(email,nombre) {
  try {
    var emailLimpio=String(email).toLowerCase().trim();
    if(emailLimpio===CONFIG.superAdminEmail.toLowerCase()) return;
    var ssUsuarios=SpreadsheetApp.openById(CONFIG.idBaseDatosUsuarios);
    var hoja=ssUsuarios.getSheetByName(CONFIG.hojas.usuarios);
    if(!hoja) return;
    var datos=hoja.getDataRange().getValues();
    var ts=Utilities.formatDate(new Date(),Session.getScriptTimeZone(),'dd/MM/yyyy HH:mm');
    for(var i=1;i<datos.length;i++){
      if(String(datos[i][0]).toLowerCase()===emailLimpio){ hoja.getRange(i+1,5).setValue(ts); return; }
    }
  } catch(e){Logger.log('Error en tracking: '+e.message);}
}

function crearNuevoUsuario(nuevoEmail, nombre, rol) {
  return registrarNuevoUsuario(nuevoEmail, nombre, rol);
}

// ─── ACTUALIZAR CANTIDAD MENSUAL (PROGRAMACIÓN) ───────────────────────────────

function actualizarCantMensual(secFunc, clasificador, nuevasCants, mesCorteStr) {
  try {
    var perfilStatus = obtenerPerfilUsuario();
    if (!perfilStatus.ok || perfilStatus.perfil.rol === 'Lector') throw new Error('Sin permisos.');
    var ss  = SpreadsheetApp.openById(_getSpreadsheetIdActivo());
    var hC  = ss.getSheetByName(CONFIG.hojas.consolidado);
    if (!hC) throw new Error('Hoja CONSOLIDADO no encontrada.');

    var enc    = _getEnc(hC, CONFIG.filasEnc.consolidado);
    var iSF    = _idx(enc, 'SEC_FUNC');
    var iCL    = _idx(enc, 'CLASIFICADOR_CODIGO');
    var iCants = CONFIG.mesesCants.map(function(n){ return _idx(enc, n); });
    var iTot   = _idx(enc, 'TOTAL_FISICO');

    var mc = parseInt(mesCorteStr, 10);
    if (isNaN(mc)) mc = -1;

    var data   = hC.getDataRange().getValues();
    var filaIdx = -1;
    for (var r = CONFIG.filasEnc.consolidado; r < data.length; r++) {
      if (String(data[r][iSF]).trim() === secFunc && String(data[r][iCL]).replace(/\s+/g,'') === clasificador.replace(/\s+/g,'')) {
        filaIdx = r; break;
      }
    }
    if (filaIdx < 0) throw new Error('Clasificador no encontrado.');

    var filaGS = filaIdx + 1;
    var filaActual = hC.getRange(filaGS, 1, 1, hC.getLastColumn()).getValues()[0];

    // BARRERA DE HIERRO EN BACKEND: Forzar la lectura de CANT real en meses cerrados
    var cantsSanitizadas = [];
    for (var m = 0; m < 12; m++) {
        if (m <= mc) {
            // Usa el valor original de la base de datos (inviolable)
            cantsSanitizadas.push(Number(filaActual[iCants[m]]) || 0);
        } else {
            // Usa el valor configurado por el usuario
            cantsSanitizadas.push(Number(nuevasCants[m]) || 0);
        }
    }

    // Escribir cantidades sanitizadas
    for (var m = 0; m < 12; m++) hC.getRange(filaGS, iCants[m] + 1).setValue(cantsSanitizadas[m]);
    var totalFisico = cantsSanitizadas.reduce(function(a, b){ return a + b; }, 0);
    hC.getRange(filaGS, iTot + 1).setValue(totalFisico);
    SpreadsheetApp.flush();

    var fila = hC.getRange(filaGS, 1, 1, hC.getLastColumn()).getValues()[0];
    var pim  = _n(fila[_idx(enc,'MTO_PIM')]);

    var idxECe = ['EJE_CERT_ENE','EJE_CERT_FEB','EJE_CERT_MAR','EJE_CERT_ABR','EJE_CERT_MAY','EJE_CERT_JUN','EJE_CERT_JUL','EJE_CERT_AGO','EJE_CERT_SET','EJE_CERT_OCT','EJE_CERT_NOV','EJE_CERT_DIC'].map(function(n){ return _idx(enc,n); });
    var idxEDe = ['EJE_DEVE_ENE','EJE_DEVE_FEB','EJE_DEVE_MAR','EJE_DEVE_ABR','EJE_DEVE_MAY','EJE_DEVE_JUN','EJE_DEVE_JUL','EJE_DEVE_AGO','EJE_DEVE_SET','EJE_DEVE_OCT','EJE_DEVE_NOV','EJE_DEVE_DIC'].map(function(n){ return _idx(enc,n); });
    var idxCMs = ['CERT_ENE','CERT_FEB','CERT_MAR','CERT_ABR','CERT_MAY','CERT_JUN','CERT_JUL','CERT_AGO','CERT_SET','CERT_OCT','CERT_NOV','CERT_DIC'].map(function(n){ return _idx(enc,n); });
    var idxDMs = ['DEVE_ENE','DEVE_FEB','DEVE_MAR','DEVE_ABR','DEVE_MAY','DEVE_JUN','DEVE_JUL','DEVE_AGO','DEVE_SET','DEVE_OCT','DEVE_NOV','DEVE_DIC'].map(function(n){ return _idx(enc,n); });

    var eCe = idxECe.map(function(i){ return _n(fila[i]); });
    var eDe = idxEDe.map(function(i){ return _n(fila[i]); });
    var tCe = _n(fila[_idx(enc,'TOTAL_EJEC_CERTIF')]);
    var tDe = _n(fila[_idx(enc,'TOTAL_EJEC_DEV')]);

    var calcC = _calcGenerico(pim, cantsSanitizadas, eCe, tCe, mc, 'CERT');
    var calcD = _calcGenerico(pim, cantsSanitizadas, eDe, tDe, mc, 'DEVE');

    for (var m2 = 0; m2 < 12; m2++) {
      hC.getRange(filaGS, idxCMs[m2]+1).setValue(calcC.ms[m2]);
      hC.getRange(filaGS, idxDMs[m2]+1).setValue(calcD.ms[m2]);
    }
    
    var certTotal = Math.round(calcC.ms.reduce(function(a,b){return a+b;},0)*100)/100;
    var deveTotal = Math.round(calcD.ms.reduce(function(a,b){return a+b;},0)*100)/100;
    hC.getRange(filaGS, _idx(enc,'TOTAL_CERTIF_PROG')+1).setValue(certTotal);
    hC.getRange(filaGS, _idx(enc,'TOTAL_DEV_PROG')+1).setValue(deveTotal);
    SpreadsheetApp.flush();

    return { ok: true, mensaje: 'Actualizado', totalFisico: totalFisico, cantM: cantsSanitizadas, certM: calcC.ms, deveM: calcD.ms, certTotal: certTotal, deveTotal: deveTotal };
  } catch(e) {
    return { ok: false, mensaje: e.message };
  }
}
// ─── OBTENER DATOS PARA ENRIQUECER PLANTILLA SISPLAN ─────────────────────────
function obtenerDatosParaSisplan() {
  try {
    var perfilStatus = obtenerPerfilUsuario();
    if (!perfilStatus.ok) return { ok: false, mensaje: 'ACCESO DENEGADO: ' + perfilStatus.mensaje };

    var ss = SpreadsheetApp.openById(_getSpreadsheetIdActivo());
    var hC = ss.getSheetByName(CONFIG.hojas.consolidado);
    if (!hC) return { ok: false, mensaje: 'Hoja CONSOLIDADO no encontrada.' };

    var enc  = _getEnc(hC, CONFIG.filasEnc.consolidado);
    var data = hC.getDataRange().getValues();

    var iSF  = enc.indexOf('SEC_FUNC');
    var iCL  = enc.indexOf('CLASIFICADOR_CODIGO');

    if (iSF < 0) return { ok: false, mensaje: 'Columna SEC_FUNC no encontrada en CONSOLIDADO.' };
    if (iCL < 0) return { ok: false, mensaje: 'Columna CLASIFICADOR_CODIGO no encontrada en CONSOLIDADO.' };

    var MESES = ['ENE','FEB','MAR','ABR','MAY','JUN','JUL','AGO','SET','OCT','NOV','DIC'];

    var iCert    = MESES.map(function(m){ return enc.indexOf('CERT_'    + m); });
    var iDeve    = MESES.map(function(m){ return enc.indexOf('DEVE_'    + m); });
    var iEjeCert = MESES.map(function(m){ return enc.indexOf('EJE_CERT_'+ m); });
    var iEjeDeve = MESES.map(function(m){ return enc.indexOf('EJE_DEVE_'+ m); });

    var iCertTot    = enc.indexOf('TOTAL_CERTIF_PROG');
    var iDeveTot    = enc.indexOf('TOTAL_DEV_PROG');
    var iEjeCertTot = enc.indexOf('TOTAL_EJEC_CERTIF');
    var iEjeDeveTot = enc.indexOf('TOTAL_EJEC_DEV');

    var faltantes = [];
    iCert.forEach(function(v,i){ if(v<0) faltantes.push('CERT_'+MESES[i]); });
    iDeve.forEach(function(v,i){ if(v<0) faltantes.push('DEVE_'+MESES[i]); });
    iEjeCert.forEach(function(v,i){ if(v<0) faltantes.push('EJE_CERT_'+MESES[i]); });
    iEjeDeve.forEach(function(v,i){ if(v<0) faltantes.push('EJE_DEVE_'+MESES[i]); });
    if (iCertTot < 0)    faltantes.push('TOTAL_CERTIF_PROG');
    if (iDeveTot < 0)    faltantes.push('TOTAL_DEV_PROG');
    if (iEjeCertTot < 0) faltantes.push('TOTAL_EJEC_CERTIF');
    if (iEjeDeveTot < 0) faltantes.push('TOTAL_EJEC_DEV');

    if (faltantes.length > 0) {
      Logger.log('obtenerDatosParaSisplan — columnas no encontradas: ' + faltantes.join(', '));
      return { ok: false, mensaje: 'Columnas no encontradas: ' + faltantes.join(', ') + '. Ejecuta el proceso primero.' };
    }

    function normSF(v) {
      var s = String(v || '').trim();
      var n = parseInt(s.replace(/\D/g, ''), 10);
      return isNaN(n) ? s : ('0000' + n).slice(-4);
    }
    function normCL(v) {
      return String(v || '').replace(/\s+/g, '').toUpperCase();
    }

    var datos = {};
    var filasDatos = 0;

    for (var r = CONFIG.filasEnc.consolidado; r < data.length; r++) {
      var f  = data[r];
      var sf = normSF(f[iSF]);
      var cl = normCL(f[iCL]);
      if (!sf || !cl || sf === '0000') continue;

      var key = sf + '|' + cl;
      filasDatos++;

      datos[key] = {
        cert:        iCert.map(function(i){ return _n(f[i]); }),
        deve:        iDeve.map(function(i){ return _n(f[i]); }),
        ejeCert:     iEjeCert.map(function(i){ return _n(f[i]); }),
        ejeDeve:     iEjeDeve.map(function(i){ return _n(f[i]); }),
        certTotal:    _n(f[iCertTot]),
        deveTotal:    _n(f[iDeveTot]),
        ejeCertTotal: _n(f[iEjeCertTot]),
        ejeDeveTotal: _n(f[iEjeDeveTot])
      };
    }

    Logger.log('obtenerDatosParaSisplan OK — claves: ' + Object.keys(datos).length + ' de ' + filasDatos + ' filas');
    return { ok: true, datos: datos, total: Object.keys(datos).length };

  } catch(e) {
    Logger.log('obtenerDatosParaSisplan error: ' + e.message + ' | stack: ' + e.stack);
    return { ok: false, mensaje: 'Error interno: ' + (e.message || 'desconocido') };
  }
}

// =============================================================================
