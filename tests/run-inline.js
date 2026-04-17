// Micro test runner — ejecuta core.test.js sin Jest cuando npm no está disponible
// Uso: node tests/run-inline.js

var passed = 0, failed = 0, errors = [];
var currentDescribe = '';

function describe(name, fn) { currentDescribe = name; fn(); }
function it(name, fn) {
  var label = currentDescribe + ' > ' + name;
  try { fn(); passed++; }
  catch(e) { failed++; errors.push({ label: label, msg: e.message }); }
}

function expect(val) {
  return {
    toBe: function(expected) {
      if (val !== expected) throw new Error('Expected ' + JSON.stringify(expected) + ' but got ' + JSON.stringify(val));
    },
    toBeCloseTo: function(expected, digits) {
      var d = digits || 2;
      var diff = Math.abs(val - expected);
      if (diff > Math.pow(10, -d) / 2) throw new Error('Expected ~' + expected + ' (±' + Math.pow(10,-d)/2 + ') but got ' + val);
    },
    toContain: function(sub) {
      if (String(val).indexOf(sub) === -1) throw new Error('Expected "' + val + '" to contain "' + sub + '"');
    }
  };
}

// Ejecutar
try {
  // Cargar módulos
  var core = require('../app/2_core.js');
  var utils = require('../app/3_utils.js');
  var _calcGenerico = core._calcGenerico;
  var _normSF = utils._normSF;
  var _n = utils._n;

  // ═══ _normSF ═══
  describe('_normSF', function() {
    it('entero a 4 dígitos', function() { expect(_normSF(16)).toBe('0016'); });
    it('string con espacios', function() { expect(_normSF(' 16 ')).toBe('0016'); });
    it('ya 4 dígitos', function() { expect(_normSF('0016')).toBe('0016'); });
    it('con ceros', function() { expect(_normSF('0007')).toBe('0007'); });
    it('vacío → 0000', function() { expect(_normSF('')).toBe('0000'); expect(_normSF(null)).toBe('0000'); });
    it('no numérico → 0000', function() { expect(_normSF('abc')).toBe('0000'); });
    it('decimal', function() { expect(_normSF(16.0)).toBe('0016'); });
    it('grande', function() { expect(_normSF(12345)).toBe('12345'); });
  });

  // ═══ _n ═══
  describe('_n', function() {
    it('string numérico', function() { expect(_n('500')).toBe(500); });
    it('vacío → 0', function() { expect(_n('')).toBe(0); });
    it('null → 0', function() { expect(_n(null)).toBe(0); });
    it('texto → 0', function() { expect(_n('abc')).toBe(0); });
  });

  // ═══ _calcGenerico NORMAL ═══
  describe('_calcGenerico NORMAL', function() {
    it('hereda ejecución + proyecta saldo', function() {
      var res = _calcGenerico(1000, [1,0,1,0,0,0,0,0,0,0,0,0], [400,0,0,0,0,0,0,0,0,0,0,0], 400, 0, 'CERT');
      expect(res.ms[0]).toBe(400);
      expect(res.ms[2]).toBe(600);
      expect(res.obs).toBe('');
    });

    it('distribuye equitativamente entre meses activos', function() {
      var res = _calcGenerico(1000, [1,0,1,1,1,0,0,0,0,0,0,0], [200,0,0,0,0,0,0,0,0,0,0,0], 200, 0, 'CERT');
      expect(res.ms[0]).toBe(200);
      expect(res.ms[2]).toBe(266.66);
      expect(res.ms[3]).toBe(266.66);
      expect(res.ms[4]).toBeCloseTo(266.68, 2);
    });

    it('fallback a DIC sin meses activos', function() {
      var res = _calcGenerico(1000, [1,0,0,0,0,0,0,0,0,0,0,0], [400,0,0,0,0,0,0,0,0,0,0,0], 400, 0, 'DEVE');
      expect(res.ms[11]).toBe(600);
      expect(res.obs).toContain('Sin meses activos');
    });

    it('PIM=0 → todo 0', function() {
      var res = _calcGenerico(0, [1,1,1,1,1,1,1,1,1,1,1,1], [0,0,0,0,0,0,0,0,0,0,0,0], 0, 5, 'CERT');
      var total = res.ms.reduce(function(a,b){return a+b;}, 0);
      expect(total).toBe(0);
    });

    it('saldo negativo → clamp a 0', function() {
      var res = _calcGenerico(1000, [1,1,0,0,0,0,0,0,0,0,0,0], [800,400,0,0,0,0,0,0,0,0,0,0], 1200, 1, 'CERT');
      expect(res.ms[0]).toBe(800);
      expect(res.ms[1]).toBe(400);
      for (var m = 2; m < 12; m++) expect(res.ms[m]).toBe(0);
    });

    it('ignora _totEjeIgnorado (H-10)', function() {
      var res = _calcGenerico(1000, [1,0,1,0,0,0,0,0,0,0,0,0], [300,0,0,0,0,0,0,0,0,0,0,0], 999, 0, 'CERT');
      expect(res.ms[0]).toBe(300);
      expect(res.ms[2]).toBe(700);
    });
  });

  // ═══ Distribución PIA ═══
  describe('Distribución PIA', function() {
    function calcPIA(pia, cants) {
      var totFis = cants.reduce(function(a,b){return a+b;}, 0);
      var certArray = new Array(12).fill(0);
      var deveArray = new Array(12).fill(0);
      var obs = '';
      certArray[0] = pia;
      if (totFis > 0 && pia > 0) {
        var acum = 0, ultActivo = -1;
        for (var m = 0; m < 12; m++) {
          if (cants[m] > 0) {
            var cuota = Math.floor((pia * (cants[m] / totFis)) * 100) / 100;
            deveArray[m] = cuota;
            acum += cuota; ultActivo = m;
          }
        }
        var delta = Math.round((pia - acum) * 100) / 100;
        if (ultActivo >= 0) {
          deveArray[ultActivo] = Math.round((deveArray[ultActivo] + delta) * 100) / 100;
        }
      } else if (pia > 0) {
        deveArray[0] = pia;
        obs = 'Sin meses activos en SISPLAN. PIA asignado a Enero.';
      }
      return { cert: certArray, deve: deveArray, obs: obs };
    }

    it('distribución asimétrica — CERT 100% Ene, DEVE 12 meses', function() {
      var res = calcPIA(12000, [1,1,1,1,1,1,1,1,1,1,1,1]);
      expect(res.cert[0]).toBe(12000);
      for (var m = 1; m < 12; m++) expect(res.cert[m]).toBe(0);
      for (var m2 = 0; m2 < 12; m2++) expect(res.deve[m2]).toBe(1000);
    });

    it('distribución asimétrica con cantidades variables', function() {
      var res = calcPIA(10000, [3,0,7,0,0,0,0,0,0,0,0,0]);
      expect(res.cert[0]).toBe(10000);
      expect(res.cert[2]).toBe(0);
      expect(res.deve[0]).toBe(3000);
      expect(res.deve[2]).toBe(7000);
    });

    it('cuadre exacto con residuo (solo DEVE modificado)', function() {
      var res = calcPIA(10000, [1,1,1,0,0,0,0,0,0,0,0,0]);
      expect(res.cert[0]).toBe(10000);
      expect(res.deve[0]).toBe(3333.33);
      expect(res.deve[2]).toBeCloseTo(3333.34, 2);
    });

    it('totFis=0 → todo a Enero + obs (H-14)', function() {
      var res = calcPIA(5000, [0,0,0,0,0,0,0,0,0,0,0,0]);
      expect(res.cert[0]).toBe(5000);
      expect(res.deve[0]).toBe(5000);
      expect(res.obs).toContain('Sin meses activos');
    });

    it('PIA=0 → todo 0', function() {
      var res = calcPIA(0, [1,1,1,1,1,1,1,1,1,1,1,1]);
      expect(res.cert.reduce(function(a,b){return a+b;},0)).toBe(0);
    });

    it('PIA grande (millones)', function() {
      var res = calcPIA(15000000, [10,5,15,20,10,5,5,10,5,5,5,5]);
      expect(res.cert.reduce(function(a,b){return a+b;},0)).toBeCloseTo(15000000, 0);
    });
  });

  // ═══ Reglas de Estado PIA ═══
  describe('Reglas de Estado PIA', function() {
    function decidirEstado(pia, est, obs) {
      if (pia === 0) {
        est = 'Eliminar';
        var nota = 'PIA es 0 en DEVENGADO. Eliminar de SISPLAN.';
        obs = obs ? obs + ' | ' + nota : nota;
        return { est: est, obs: obs };
      }
      var l = est.toLowerCase();
      if (l === '' || l === '0' || l === 'false' || l === 'eliminar') est = 'Ok';
      var n2 = 'PIA Proyectado Automáticamente';
      if (obs.indexOf(n2) === -1) obs = obs ? obs + ' | ' + n2 : n2;
      return { est: est, obs: obs };
    }

    it('PIA=0 → Eliminar sin importar estado previo', function() {
      expect(decidirEstado(0, 'Ok', '').est).toBe('Eliminar');
      expect(decidirEstado(0, 'Agregar', '').est).toBe('Eliminar');
      expect(decidirEstado(0, '', '').est).toBe('Eliminar');
    });

    it('PIA=0 → preserva obs previa', function() {
      var r = decidirEstado(0, 'Ok', 'AO difiere');
      expect(r.obs).toContain('AO difiere');
      expect(r.obs).toContain('PIA es 0');
    });

    it('PIA>0 + Agregar → preserva Agregar', function() {
      var r = decidirEstado(50000, 'Agregar', 'Agregado desde DEVENGADO.');
      expect(r.est).toBe('Agregar');
      expect(r.obs).toContain('PIA Proyectado');
    });

    it('PIA>0 + Observado → preserva Observado', function() {
      var r = decidirEstado(50000, 'Observado', 'UM difiere: ALGO');
      expect(r.est).toBe('Observado');
      expect(r.obs).toContain('UM difiere');
    });

    it('PIA>0 + Ok → Ok + nota', function() {
      var r = decidirEstado(50000, 'Ok', '');
      expect(r.est).toBe('Ok');
      expect(r.obs).toBe('PIA Proyectado Automáticamente');
    });

    it('PIA>0 + Eliminar → Ok (contradice PIA>0)', function() {
      var r = decidirEstado(50000, 'Eliminar', '');
      expect(r.est).toBe('Ok');
    });

    it('no duplica nota PIA', function() {
      var r = decidirEstado(50000, 'Ok', 'PIA Proyectado Automáticamente');
      expect(r.obs).toBe('PIA Proyectado Automáticamente');
    });
  });

} catch(e) {
  console.error('ERROR FATAL:', e.message);
  process.exit(1);
}

// Reporte
console.log('\n═══════════════════════════════════════');
console.log('  SISCOP Test Results');
console.log('═══════════════════════════════════════');
console.log('  ✅ Passed: ' + passed);
console.log('  ❌ Failed: ' + failed);
if (errors.length > 0) {
  console.log('\n  Failures:');
  errors.forEach(function(e, i) {
    console.log('  ' + (i+1) + ') ' + e.label);
    console.log('     ' + e.msg);
  });
}
console.log('═══════════════════════════════════════\n');
process.exit(failed > 0 ? 1 : 0);
