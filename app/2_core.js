// SECCIÓN 2 — FUNCIONES CORE (sin cambios en lógica de negocio)
// =============================================================================

function _CORE_IMPORTAR_SISPLAN(ss) {
  var hO=_getHoja(ss,CONFIG.hojas.sisplan), hD=_getHoja(ss,CONFIG.hojas.consolidado);
  var encO=_getEnc(hO,CONFIG.filasEnc.sisplan), encD=_getEnc(hD,CONFIG.filasEnc.consolidado);
  var mapCol={};
  CONFIG.colsSisplan.forEach(function(col){
    var iO=encO.indexOf(col),iD=encD.indexOf(col);
    if(iO!==-1&&iD!==-1) mapCol[col]={o:iO,d:iD};
  });
  var datosO=hO.getRange(CONFIG.filasEnc.sisplan+1,1,hO.getLastRow(),hO.getLastColumn()).getValues();
  if(!datosO||datosO.length===0) return;
  var numCols=encD.length, matriz=[];
  datosO.forEach(function(fila){
    if(fila.every(function(v){return v===''||v==null;})) return;
    var filaD=new Array(numCols).fill('');
    Object.keys(mapCol).forEach(function(col){
      var val=fila[mapCol[col].o];
      if(col==='SEC_FUNC'){val=String(val||'').trim().replace(/^0+/,'')||'0';val=val.padStart(4,'0');}
      else if(col==='CLASIFICADOR_CODIGO'){val=String(val||'').replace(/\s+/g,'');}
      else if(CONFIG.mesesCants.indexOf(col)!==-1){val=(val===''||val==null)?0:Number(val)||0;}
      else if(typeof val==='string'){val=val.trim();}
      filaD[mapCol[col].d]=val;
    });
    matriz.push(filaD);
  });
  var ini=CONFIG.filasEnc.consolidado+1, ult=hD.getLastRow();
  if(ult>=ini) hD.getRange(ini,1,ult-ini+1,hD.getLastColumn()).clearContent();
  if(matriz.length>0){
    hD.getRange(ini,1,matriz.length,numCols).setValues(matriz);
    var iSF=encD.indexOf('SEC_FUNC');
    if(iSF>=0) hD.getRange(ini,iSF+1,matriz.length,1).setNumberFormat('@');
  }
}

function _CORE_IMPORTAR_DEVENGADO(ss) {
  var hO = _getHoja(ss, CONFIG.hojas.devengado), hD = _getHoja(ss, CONFIG.hojas.consolidado);
  var encO = _getEnc(hO, CONFIG.filasEnc.devengado), encD = _getEnc(hD, CONFIG.filasEnc.consolidado);
  
  // 1. LIMPIEZA: Quitamos `progs` que buscaba los meses de programación en el Devengado
  var d = {
    ue: _idx(encO, 'UNIDAD_EJECUTORA'), sf: _idx(encO, 'SEC_FUNC'), um: _idx(encO, 'UNIDAD_MEDIDA'),
    cl: _idx(encO, 'CLASIFICADOR'), cld: _idx(encO, 'CLASIFICADOR_DETALLE'), act: _idx(encO, 'ACTIV_OBRA_ACCINV')
  };
  
  var c = {
    denom: _idx(encD, 'DENOMINACION_AO'), um: _idx(encD, 'UNIDAD_MEDIDA'), sf: _idx(encD, 'SEC_FUNC'),
    cl: _idx(encD, 'CLASIFICADOR_CODIGO'), rec: _idx(encD, 'RECURSO'), tot: _idx(encD, 'TOTAL_FISICO'),
    // Mantenemos cants del Consolidado para inicializarlos en 0 al crear nuevas filas
    cants: CONFIG.mesesCants.map(function (n) { return _idx(encD, n); }),
    est: encD.indexOf('ESTADO'), obs: _getObsIdx(encD)
  };
  
  var datosO = hO.getDataRange().getValues(), datosD = hD.getDataRange().getValues();
  var devMap = {};
  
  for (var i = CONFIG.filasEnc.devengado; i < datosO.length; i++) {
    var f = datosO[i];
    if (String(f[d.ue]).trim() !== CONFIG.filtroUE) continue;
    
    var sf = String(parseInt(Number(f[d.sf]), 10) || 0).padStart(4, '0');
    var cl = String(f[d.cl]).replace(/\s+/g, '');
    var act = String(f[d.act] || ''), umR = String(f[d.um] || ''), det = String(f[d.cld] || '');
    
    // 2. LIMPIEZA: Ya no sumamos los "cants" en base al Devengado. Inicializamos en 0.
    devMap[sf + '|' + cl] = {
      denom: act.indexOf('.') >= 0 ? act.substring(act.indexOf('.') + 1).trim() : act.trim(),
      um: umR.indexOf('.') >= 0 ? umR.substring(umR.indexOf('.') + 1).trim() : umR.trim(),
      rec: det.indexOf(' ') >= 0 ? det.substring(det.indexOf(' ') + 1).trim() : det.trim()
    };
  }
  
  var estadosCols = [], obsCols = [], clavesExist = [];
  
  for (var r = CONFIG.filasEnc.consolidado; r < datosD.length; r++) {
    var fD = datosD[r];
    var sfD = String(fD[c.sf]).trim(), clD = String(fD[c.cl]).replace(/\s+/g, '');
    var clave = sfD + '|' + clD;
    
    if (sfD && clD) clavesExist[clave] = true;
    var est = String(fD[c.est] || '').trim(), obs = c.obs >= 0 ? String(fD[c.obs] || '').trim() : '';
    
    if (devMap[clave]) {
      var dDenom = String(fD[c.denom]).trim() !== devMap[clave].denom;
      var dUm = String(fD[c.um]).trim() !== devMap[clave].um;
      
      if (!dDenom && !dUm) {
        if (est === '' || est === 'Eliminar') est = 'Ok';
      } else {
        if (est === '' || est === 'Eliminar') est = 'Observado';
        var msjs = [];
        if (dDenom) msjs.push('AO difiere: ' + devMap[clave].denom);
        if (dUm) msjs.push('UM difiere: ' + devMap[clave].um);
        var nuevo = msjs.join(' | ');
        if (obs === '') obs = nuevo; else if (obs.indexOf(nuevo) === -1) obs += ' | ' + nuevo;
      }
      
      // 3. LIMPIEZA: Se eliminó todo el bloque que forzaba la reescritura de 
      // "cantActualizar" cuando el "TOTAL_FISICO" era 0.

    } else if (sfD && clD && sfD !== '0000') {
      if (est === '' || est === '0' || est.toUpperCase() === 'FALSE') est = 'Eliminar';
      var nota = 'No encontrado en DEVENGADO, eliminar de SISPLAN.';
      if (obs === '') obs = nota; else if (obs.indexOf(nota) === -1) obs += ' | ' + nota;
    }
    estadosCols.push([est]); obsCols.push([obs]);
  }
  
  var fIni = CONFIG.filasEnc.consolidado + 1;
  if (estadosCols.length > 0 && c.est >= 0) hD.getRange(fIni, c.est + 1, estadosCols.length, 1).setValues(estadosCols);
  if (obsCols.length > 0 && c.obs >= 0) hD.getRange(fIni, c.obs + 1, obsCols.length, 1).setValues(obsCols);
  
  var filasNuevas = [];
  Object.keys(devMap).forEach(function (clave) {
    if (!clavesExist[clave]) {
      var dev = devMap[clave], p = clave.split('|');
      var fila = new Array(encD.length).fill('');
      fila[c.denom] = dev.denom; fila[c.um] = dev.um; fila[c.sf] = p[0]; fila[c.cl] = p[1];
      fila[c.rec] = dev.rec; 
      
      // 4. LIMPIEZA: Si hay un clasificador nuevo en el devengado, se agrega al consolidado 
      // con TOTAL_FISICO = 0 y sus 12 meses en 0 (el usuario lo editará manual luego).
      fila[c.tot] = 0;
      c.cants.forEach(function (col, m) { fila[col] = 0; });
      
      if (c.est >= 0) fila[c.est] = 'Agregar';
      if (c.obs >= 0) fila[c.obs] = 'Agregado desde DEVENGADO.';
      filasNuevas.push(fila);
    }
  });
  
  if (filasNuevas.length > 0) {
    var esc = hD.getLastRow() + 1;
    hD.getRange(esc, 1, filasNuevas.length, encD.length).setValues(filasNuevas);
    hD.getRange(esc, c.sf + 1, filasNuevas.length, 1).setNumberFormat('@');
  }
  
  var uFila = hD.getLastRow();
  if (uFila > 3) hD.getRange(4, 1, uFila - 3, hD.getLastColumn()).sort({ column: c.sf + 1, ascending: true });
}

function _CORE_LLENAR_PIA_PIM(ss, mesCorte) {
  var hC=_getHoja(ss,CONFIG.hojas.consolidado), hD=_getHoja(ss,CONFIG.hojas.devengado);
  var encC=_getEnc(hC,CONFIG.filasEnc.consolidado), encD=_getEnc(hD,CONFIG.filasEnc.devengado);
  var c={sf:_idx(encC,'SEC_FUNC'),cl:_idx(encC,'CLASIFICADOR_CODIGO'),pia:_idx(encC,'MTO_PIA'),
    pim:_idx(encC,'MTO_PIM'),iniDeve:_idx(encC,'EJE_DEVE_ENE'),est:encC.indexOf('ESTADO'),obs:_getObsIdx(encC)};
  var d={sf:_idx(encD,'SEC_FUNC'),cl:_idx(encD,'CLASIFICADOR'),ue:_idx(encD,'UNIDAD_EJECUTORA'),
    pia:_idx(encD,'MTO_PIA'),pim:_idx(encD,'MTO_PIM'),iniM:_idx(encD,'MTO_DEVENGA_01')};
  var datosC=hC.getDataRange().getValues(), datosD=hD.getDataRange().getValues();
  var map={};
  for(var i=CONFIG.filasEnc.devengado;i<datosD.length;i++){
    var f=datosD[i];
    if(String(f[d.ue]).trim()!==CONFIG.filtroUE) continue;
    var sf=String(parseInt(Number(f[d.sf]),10)||0).padStart(4,'0');
    var cl=String(f[d.cl]).replace(/\s+/g,'');
    var key=sf+'|'+cl;
    if(!map[key]) map[key]={pia:0,pim:0,ms:new Array(12).fill(0)};
    map[key].pia+=_n(f[d.pia]); map[key].pim+=_n(f[d.pim]);
    for(var m=0;m<12;m++) map[key].ms[m]+=_n(f[d.iniM+m]);
  }
  var rPia=[],rPim=[],rDeve=[],rEst=[],rObs=[];
  for(var r=CONFIG.filasEnc.consolidado;r<datosC.length;r++){
    var fC=datosC[r];
    var sfC=String(parseInt(Number(fC[c.sf]),10)||0).padStart(4,'0');
    var clC=String(fC[c.cl]).replace(/\s+/g,'');
    var est=String(fC[c.est]||'').trim(), obs=c.obs>=0?String(fC[c.obs]||'').trim():'';
    if(sfC==='0000'||!clC||clC==='UNDEFINED'){
      rPia.push(['']);rPim.push(['']);rDeve.push(new Array(13).fill(0));
      rEst.push([est]);rObs.push([obs]);continue;
    }
    var match=map[sfC+'|'+clC];
    rPia.push([match?match.pia:'']); rPim.push([match?match.pim:'']);
    var arrD=new Array(12).fill(0);
    if(match) for(var m2=0;m2<=mesCorte;m2++) arrD[m2]=match.ms[m2]||0;
    arrD.push(arrD.reduce(function(a,b){return a+b;},0));
    rDeve.push(arrD);
    if(!match){
      if(est===''||est==='0'||est.toUpperCase()==='FALSE') est='Eliminar';
      var msj='No encontrado en DEVENGADO, eliminar de SISPLAN.';
      if(obs===''||obs==='0') obs=msj; else if(obs.indexOf(msj)===-1) obs+=', '+msj;
    }
    rEst.push([est]); rObs.push([obs]);
  }
  var fIni=CONFIG.filasEnc.consolidado+1;
  if(rPia.length>0){
    hC.getRange(fIni,c.pia+1,rPia.length,1).setValues(rPia);
    hC.getRange(fIni,c.pim+1,rPim.length,1).setValues(rPim);
    hC.getRange(fIni,c.iniDeve+1,rDeve.length,13).setValues(rDeve);
    if(c.est>=0) hC.getRange(fIni,c.est+1,rEst.length,1).setValues(rEst);
    if(c.obs>=0) hC.getRange(fIni,c.obs+1,rObs.length,1).setValues(rObs);
  }
}

function _CORE_LLENAR_EJE_CERT(ss, mesCorte) {
  var hC=_getHoja(ss,CONFIG.hojas.consolidado), hCe=_getHoja(ss,CONFIG.hojas.certificado);
  var encC=_getEnc(hC,CONFIG.filasEnc.consolidado), encCe=_getEnc(hCe,CONFIG.filasEnc.certificado);
  var c={sf:_idx(encC,'SEC_FUNC'),cl:_idx(encC,'CLASIFICADOR_CODIGO')};
  var ce={sf:_idx(encCe,'SEC_FUNC'),cl:_idx(encCe,'CLASIFICADOR'),iniM:encCe.indexOf('ENE')};
  var fGrup=hC.getRange(2,1,1,hC.getLastColumn()).getValues()[0].map(function(h){return String(h).trim().toUpperCase();});
  var idxs=[];
  fGrup.forEach(function(v,i){if(v==='CERTIFICACIÓN'||v==='CERTIFICACION') idxs.push(i);});
  if(idxs.length<2) throw new Error('No se encontró el 2do bloque CERTIFICACION en fila 2 del CONSOLIDADO.');
  var colIniCert=idxs[1];
  var dC=hC.getDataRange().getValues(), dCe=hCe.getDataRange().getValues();
  var map={};
  for(var i=CONFIG.filasEnc.certificado;i<dCe.length;i++){
    var f=dCe[i];
    var sf=String(f[ce.sf]).trim().padStart(4,'0');
    var cl=String(f[ce.cl]).replace(/\s+/g,'');
    var key=sf+'|'+cl;
    if(!map[key]) map[key]=new Array(12).fill(0);
    for(var m=0;m<12;m++) map[key][m]+=_n(f[ce.iniM+m]);
  }
  var res=[];
  for(var r=CONFIG.filasEnc.consolidado;r<dC.length;r++){
    var fC=dC[r];
    var sfC=String(fC[c.sf]).trim().padStart(4,'0');
    var clC=String(fC[c.cl]).replace(/\s+/g,'');
    if(!sfC||sfC==='0000'||!clC||clC==='UNDEFINED'){res.push(new Array(13).fill(0));continue;}
    var match=map[sfC+'|'+clC]||new Array(12).fill(0);
    var fila=match.map(function(v,i){return i<=mesCorte?v:0;});
    fila.push(fila.reduce(function(a,b){return a+b;},0));
    res.push(fila);
  }
  if(res.length>0) hC.getRange(CONFIG.filasEnc.consolidado+1,colIniCert+1,res.length,13).setValues(res);
}

function _CORE_CALCULAR_PROG(ss, mesCorte) {
  var hC=_getHoja(ss,CONFIG.hojas.consolidado);
  var enc=_getEnc(hC,CONFIG.filasEnc.consolidado);
  var idx={
    pim:_idx(enc,'MTO_PIM'),
    cants:CONFIG.mesesCants.map(function(n){return _idx(enc,n);}),
    eCeMs:['EJE_CERT_ENE','EJE_CERT_FEB','EJE_CERT_MAR','EJE_CERT_ABR','EJE_CERT_MAY','EJE_CERT_JUN',
           'EJE_CERT_JUL','EJE_CERT_AGO','EJE_CERT_SET','EJE_CERT_OCT','EJE_CERT_NOV','EJE_CERT_DIC'].map(function(n){return _idx(enc,n);}),
    eCeTot:_idx(enc,'TOTAL_EJEC_CERTIF'),
    eDeMs:['EJE_DEVE_ENE','EJE_DEVE_FEB','EJE_DEVE_MAR','EJE_DEVE_ABR','EJE_DEVE_MAY','EJE_DEVE_JUN',
           'EJE_DEVE_JUL','EJE_DEVE_AGO','EJE_DEVE_SET','EJE_DEVE_OCT','EJE_DEVE_NOV','EJE_DEVE_DIC'].map(function(n){return _idx(enc,n);}),
    eDeTot:_idx(enc,'TOTAL_EJEC_DEV'),
    cMs:['CERT_ENE','CERT_FEB','CERT_MAR','CERT_ABR','CERT_MAY','CERT_JUN',
         'CERT_JUL','CERT_AGO','CERT_SET','CERT_OCT','CERT_NOV','CERT_DIC'].map(function(n){return _idx(enc,n);}),
    cTot:_idx(enc,'TOTAL_CERTIF_PROG'),
    dMs:['DEVE_ENE','DEVE_FEB','DEVE_MAR','DEVE_ABR','DEVE_MAY','DEVE_JUN',
         'DEVE_JUL','DEVE_AGO','DEVE_SET','DEVE_OCT','DEVE_NOV','DEVE_DIC'].map(function(n){return _idx(enc,n);}),
    dTot:_idx(enc,'TOTAL_DEV_PROG'),
    est:enc.indexOf('ESTADO'), obs:_getObsIdx(enc)
  };
  var dC=hC.getDataRange().getValues();
  var mC=[],mCTot=[],mD=[],mDTot=[],mEst=[],mObs=[];
  for(var r=CONFIG.filasEnc.consolidado;r<dC.length;r++){
    var f=dC[r];
    var pim=_n(f[idx.pim]);
    var cants=idx.cants.map(function(i2){return _n(f[i2]);});
    var eCe=idx.eCeMs.map(function(i2){return _n(f[i2]);});
    var tCe=_n(f[idx.eCeTot]);
    var eDe=idx.eDeMs.map(function(i2){return _n(f[i2]);});
    var tDe=_n(f[idx.eDeTot]);
    var est=idx.est>=0?String(f[idx.est]||'').trim():'';
    var obs=idx.obs>=0?String(f[idx.obs]||'').trim():'';
    var calcC=_calcGenerico(pim,cants,eCe,tCe,mesCorte,'CERT');
    var calcD=_calcGenerico(pim,cants,eDe,tDe,mesCorte,'DEVE');
    var nObs=[calcC.obs,calcD.obs].filter(Boolean).join(' | ');
    if(nObs){obs=obs?obs+' | '+nObs:nObs; if(est===''||est.toLowerCase()==='ok') est='Observado';}
    
    for(var m=0;m<12;m++){
      dC[r][idx.cMs[m]] = calcC.ms[m];
      dC[r][idx.dMs[m]] = calcD.ms[m];
    }
    dC[r][idx.cTot] = calcC.ms.reduce(function(a,b){return a+b;},0);
    dC[r][idx.dTot] = calcD.ms.reduce(function(a,b){return a+b;},0);
    if(idx.est>=0) dC[r][idx.est] = est;
    if(idx.obs>=0) dC[r][idx.obs] = obs;
  }
  // ESCRITURA ATÓMICA DE ALTO RENDIMIENTO (Mapeo Fase P0)
  hC.getDataRange().setValues(dC);
}

// REEMPLAZAR EN CÓDIGO.GS
function _calcGenerico(pim, cant, eje, _totEjeIgnorado, mesCorte, tipo) {
  var res = new Array(12).fill(0);
  var obs = '';
  var ejeAcum = 0;
  
  for (var m = 0; m <= mesCorte; m++) {
    var v = Number(eje[m]) || 0;
    res[m] = v;
    ejeAcum += v;
  }
  
  var saldo = Math.round((pim - ejeAcum) * 100) / 100;
  if (saldo < 0) saldo = 0;
  
  var mAct = [];
  for (var m2 = mesCorte + 1; m2 < 12; m2++) {
    if (cant[m2] > 0) mAct.push(m2);
  }
  var n = mAct.length;
  
  if (n > 0 && saldo > 0) {
    var cuota = Math.floor((saldo / n) * 100) / 100;
    for (var k = 0; k < n - 1; k++) res[mAct[k]] = cuota;
    var acumFuturo = res.slice(mesCorte + 1).reduce(function(a, b){ return a + b; }, 0);
    var residuo = Math.round((saldo - acumFuturo) * 100) / 100;
    res[mAct[n - 1]] = Math.round((res[mAct[n - 1]] + residuo) * 100) / 100;
  } else if (n === 0 && saldo > 0.005) {
    res[11] = Math.round((res[11] + saldo) * 100) / 100;
    obs = tipo + ': Sin meses activos. Saldo S/ ' + saldo + ' acumulado en DIC.';
  }
  return { ms: res, obs: obs };
}

function _CORE_CALCULAR_PROG_PIA(ss) {
  var hC=_getHoja(ss,CONFIG.hojas.consolidado);
  var enc=_getEnc(hC,CONFIG.filasEnc.consolidado);
  var idx={
    pia:_idx(enc,'MTO_PIA'),
    cants:CONFIG.mesesCants.map(function(n){return _idx(enc,n);}),
    cMs:['CERT_ENE','CERT_FEB','CERT_MAR','CERT_ABR','CERT_MAY','CERT_JUN','CERT_JUL','CERT_AGO','CERT_SET','CERT_OCT','CERT_NOV','CERT_DIC'].map(function(n){return _idx(enc,n);}),
    cTot:_idx(enc,'TOTAL_CERTIF_PROG'),
    dMs:['DEVE_ENE','DEVE_FEB','DEVE_MAR','DEVE_ABR','DEVE_MAY','DEVE_JUN','DEVE_JUL','DEVE_AGO','DEVE_SET','DEVE_OCT','DEVE_NOV','DEVE_DIC'].map(function(n){return _idx(enc,n);}),
    dTot:_idx(enc,'TOTAL_DEV_PROG'),
    eCeMs:['EJE_CERT_ENE','EJE_CERT_FEB','EJE_CERT_MAR','EJE_CERT_ABR','EJE_CERT_MAY','EJE_CERT_JUN','EJE_CERT_JUL','EJE_CERT_AGO','EJE_CERT_SET','EJE_CERT_OCT','EJE_CERT_NOV','EJE_CERT_DIC'].map(function(n){return _idx(enc,n);}),
    eDeMs:['EJE_DEVE_ENE','EJE_DEVE_FEB','EJE_DEVE_MAR','EJE_DEVE_ABR','EJE_DEVE_MAY','EJE_DEVE_JUN','EJE_DEVE_JUL','EJE_DEVE_AGO','EJE_DEVE_SET','EJE_DEVE_OCT','EJE_DEVE_NOV','EJE_DEVE_DIC'].map(function(n){return _idx(enc,n);})
  };
  var dC=hC.getDataRange().getValues();
  var mC=[],mCTot=[],mD=[],mDTot=[],mEe=[],mEd=[];
  for(var r=CONFIG.filasEnc.consolidado;r<dC.length;r++){
    var f=dC[r];
    var pia=_n(f[idx.pia]);
    var cants=idx.cants.map(function(i2){return _n(f[i2]);});
    var certArray=new Array(12).fill(0); certArray[0]=pia;
    var deveArray=new Array(12).fill(0);
    var totFis=cants.reduce(function(a,b){return a+b},0);
    var deveTot=0, ultActivo=-1;
    if(totFis>0 && pia>0){
      for(var m=0;m<12;m++){
        if(cants[m]>0){
           deveArray[m]=Math.floor((pia*(cants[m]/totFis))*100)/100;
           deveTot+=deveArray[m];
           ultActivo=m;
        }
      }
      var delta=Math.round((pia-deveTot)*100)/100;
      if(ultActivo>=0) deveArray[ultActivo]=Math.round((deveArray[ultActivo]+delta)*100)/100;
    } else if(pia>0) {
      deveArray[0]=pia; 
    }
    
    for(var m=0;m<12;m++){
      dC[r][idx.cMs[m]] = certArray[m];
      dC[r][idx.dMs[m]] = deveArray[m];
      dC[r][idx.eCeMs[m]] = 0;
      dC[r][idx.eDeMs[m]] = 0;
    }
    dC[r][idx.cTot] = pia;
    dC[r][idx.dTot] = pia;
  }
  // ESCRITURA ATÓMICA DE ALTO RENDIMIENTO (Mapeo Fase P0)
  hC.getDataRange().setValues(dC);
}

// =============================================================================


if (typeof module !== 'undefined') { module.exports = { _calcGenerico: typeof _calcGenerico !== 'undefined' ? _calcGenerico : null }; }
