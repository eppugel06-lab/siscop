const { _calcGenerico } = require('../app/2_core.js');
const { _normSF, _n } = require('../app/3_utils.js');

// =============================================================================
// SISCOP — Suite de pruebas unitarias
// Cubre: _calcGenerico (flujo NORMAL), _normSF (normalización), _n (cast numérico),
//        y simulación de reglas PIA (distribución proporcional).
// =============================================================================

describe('Utilidades (_normSF, _n)', () => {

  describe('_normSF — Normalización de SEC_FUNC', () => {
    it('debe normalizar entero a string de 4 dígitos', () => {
      expect(_normSF(16)).toBe('0016');
    });

    it('debe normalizar string numérico con espacios', () => {
      expect(_normSF(' 16 ')).toBe('0016');
    });

    it('debe mantener string de 4 dígitos sin cambios', () => {
      expect(_normSF('0016')).toBe('0016');
    });

    it('debe normalizar string con ceros a la izquierda', () => {
      expect(_normSF('0007')).toBe('0007');
    });

    it('debe retornar 0000 para valores vacíos', () => {
      expect(_normSF('')).toBe('0000');
      expect(_normSF(null)).toBe('0000');
      expect(_normSF(undefined)).toBe('0000');
    });

    it('debe retornar 0000 para valores no numéricos', () => {
      expect(_normSF('abc')).toBe('0000');
    });

    it('debe manejar números decimales (de Sheets)', () => {
      expect(_normSF(16.0)).toBe('0016');
      expect(_normSF('16.0')).toBe('0016');
    });

    it('debe manejar números grandes (>4 dígitos)', () => {
      expect(_normSF(12345)).toBe('12345');
    });
  });

  describe('_n — Cast numérico seguro', () => {
    it('debe retornar número de string numérico', () => {
      expect(_n('500')).toBe(500);
    });

    it('debe retornar 0 para string vacío', () => {
      expect(_n('')).toBe(0);
    });

    it('debe retornar 0 para null/undefined', () => {
      expect(_n(null)).toBe(0);
      expect(_n(undefined)).toBe(0);
    });

    it('debe retornar 0 para texto no numérico', () => {
      expect(_n('abc')).toBe(0);
    });

    it('debe manejar decimales', () => {
      expect(_n('123.45')).toBeCloseTo(123.45);
    });
  });
});

describe('Flujo NORMAL — _calcGenerico (Motor de Distribución de Saldo)', () => {

  it('debe heredar ejecución y proyectar saldo a los meses activos restantes', () => {
    const cant = [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const eMs = [400, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    const res = _calcGenerico(1000, cant, eMs, 400, 0, 'CERT');

    expect(res.ms[0]).toBe(400);  // Heredado de ejecución
    expect(res.ms[1]).toBe(0);    // Sin cant física → 0
    expect(res.ms[2]).toBe(600);  // Saldo = 1000-400 = 600 → todo a marzo (único activo)
    expect(res.obs).toBe('');
  });

  it('debe distribuir saldo equitativamente entre múltiples meses activos', () => {
    const cant = [1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0];
    const eMs = [200, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    const res = _calcGenerico(1000, cant, eMs, 200, 0, 'CERT');

    // Saldo = 800, 3 meses activos (mar, abr, may)
    // Cuota = floor(800/3 * 100) / 100 = 266.66
    expect(res.ms[0]).toBe(200);            // Ejecución heredada
    expect(res.ms[2]).toBe(266.66);         // Mar
    expect(res.ms[3]).toBe(266.66);         // Abr
    expect(res.ms[4]).toBeCloseTo(266.68);  // May (absorbe residuo)

    const total = res.ms.reduce((a, b) => a + b, 0);
    expect(total).toBeCloseTo(1000, 1);     // Cuadre exacto con PIM
    expect(res.obs).toBe('');
  });

  it('debe acumular saldo en DIC si no hay meses activos', () => {
    const cant = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const eMs = [400, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    const res = _calcGenerico(1000, cant, eMs, 400, 0, 'DEVE');

    expect(res.ms[0]).toBe(400);
    expect(res.ms[11]).toBe(600);   // Fallback a DIC
    expect(res.obs).toContain('DEVE: Sin meses activos');
    expect(res.obs).toContain('Saldo S/ 600 acumulado en DIC');
  });

  it('debe retornar todo en 0 si PIM es 0', () => {
    const cant = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
    const eMs = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    const res = _calcGenerico(0, cant, eMs, 0, 5, 'CERT');

    const total = res.ms.reduce((a, b) => a + b, 0);
    expect(total).toBe(0);
    expect(res.obs).toBe('');
  });

  it('debe manejar saldo negativo (ejecución > PIM) clampeando a 0', () => {
    const cant = [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const eMs = [800, 400, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    const res = _calcGenerico(1000, cant, eMs, 1200, 1, 'CERT');

    expect(res.ms[0]).toBe(800);    // Heredado
    expect(res.ms[1]).toBe(400);    // Heredado
    // Saldo = max(0, 1000-1200) = 0 → nada que distribuir
    for (let m = 2; m < 12; m++) {
      expect(res.ms[m]).toBe(0);
    }
    expect(res.obs).toBe('');
  });

  it('debe manejar mesCorte=11 (todo el año ejecutado)', () => {
    const cant = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
    const eMs = [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100];

    const res = _calcGenerico(1200, cant, eMs, 1200, 11, 'DEVE');

    // Todos los meses son ejecución heredada
    for (let m = 0; m < 12; m++) {
      expect(res.ms[m]).toBe(100);
    }
    // Saldo = 1200 - 1200 = 0 → sin distribución
    expect(res.obs).toBe('');
  });

  it('debe ignorar parámetro _totEjeIgnorado (H-10)', () => {
    const cant = [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const eMs = [300, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    // Pasamos totEje incorrecto deliberadamente
    const res = _calcGenerico(1000, cant, eMs, 999, 0, 'CERT');

    // Debería usar la suma real (300), no el parámetro (999)
    expect(res.ms[0]).toBe(300);
    expect(res.ms[2]).toBe(700);  // 1000 - 300 = 700
  });
});

describe('Flujo PIA — Simulación de distribución proporcional', () => {

  // Simulamos la lógica de _CORE_CALCULAR_PROG_PIA para testear
  // la distribución sin necesitar mocks de SpreadsheetApp
  function calcPIA(pia, cants) {
    var totFis = cants.reduce((a, b) => a + b, 0);
    var certArray = new Array(12).fill(0);
    var deveArray = new Array(12).fill(0);
    var obs = '';

    if (totFis > 0 && pia > 0) {
      var acum = 0, ultActivo = -1;
      for (var m = 0; m < 12; m++) {
        if (cants[m] > 0) {
          var cuota = Math.floor((pia * (cants[m] / totFis)) * 100) / 100;
          deveArray[m] = cuota;
          certArray[m] = cuota;
          acum += cuota;
          ultActivo = m;
        }
      }
      var delta = Math.round((pia - acum) * 100) / 100;
      if (ultActivo >= 0) {
        deveArray[ultActivo] = Math.round((deveArray[ultActivo] + delta) * 100) / 100;
        certArray[ultActivo] = Math.round((certArray[ultActivo] + delta) * 100) / 100;
      }
    } else if (pia > 0) {
      deveArray[0] = pia;
      certArray[0] = pia;
      obs = 'Sin meses activos en SISPLAN. PIA asignado a Enero.';
    }

    return { cert: certArray, deve: deveArray, obs: obs };
  }

  it('debe distribuir PIA proporcionalmente a cantidades físicas', () => {
    // PIA = 12000, cantidades iguales todo el año (1 por mes)
    const cants = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
    const res = calcPIA(12000, cants);

    // 12000 / 12 = 1000 exacto por mes
    for (let m = 0; m < 12; m++) {
      expect(res.cert[m]).toBe(1000);
      expect(res.deve[m]).toBe(1000);
    }
    expect(res.obs).toBe('');
  });

  it('debe distribuir PIA con cantidades desiguales', () => {
    // PIA = 10000, cantidades: 3 en Ene, 0 en Feb, 7 en Mar, 0 en el resto
    const cants = [3, 0, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const res = calcPIA(10000, cants);

    // Ene: 10000 * 3/10 = 3000, Mar: 10000 * 7/10 = 7000
    expect(res.cert[0]).toBe(3000);
    expect(res.cert[2]).toBe(7000);
    expect(res.cert[1]).toBe(0);
    expect(res.deve[0]).toBe(3000);
    expect(res.deve[2]).toBe(7000);
    expect(res.obs).toBe('');
  });

  it('CERT y DEVE deben ser iguales (distribución simétrica)', () => {
    const cants = [2, 3, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0];
    const res = calcPIA(50000, cants);

    for (let m = 0; m < 12; m++) {
      expect(res.cert[m]).toBe(res.deve[m]);
    }
  });

  it('debe cuadrar exacto con PIA (residuo al último mes activo)', () => {
    // PIA = 10000, 3 meses activos → cuota = 3333.33, residuo = 0.01
    const cants = [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const res = calcPIA(10000, cants);

    const totalCert = res.cert.reduce((a, b) => a + b, 0);
    const totalDeve = res.deve.reduce((a, b) => a + b, 0);

    expect(totalCert).toBeCloseTo(10000, 2);
    expect(totalDeve).toBeCloseTo(10000, 2);

    // Ene y Feb = 3333.33, Mar absorbe residuo
    expect(res.cert[0]).toBe(3333.33);
    expect(res.cert[1]).toBe(3333.33);
    expect(res.cert[2]).toBeCloseTo(3333.34, 2);
  });

  it('debe asignar todo a Enero si totFis=0 y PIA>0 (H-14)', () => {
    const cants = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const res = calcPIA(5000, cants);

    expect(res.cert[0]).toBe(5000);
    expect(res.deve[0]).toBe(5000);
    for (let m = 1; m < 12; m++) {
      expect(res.cert[m]).toBe(0);
      expect(res.deve[m]).toBe(0);
    }
    expect(res.obs).toContain('Sin meses activos');
  });

  it('debe retornar todo 0 si PIA=0 (clasificador a Eliminar)', () => {
    const cants = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
    const res = calcPIA(0, cants);

    const totalCert = res.cert.reduce((a, b) => a + b, 0);
    const totalDeve = res.deve.reduce((a, b) => a + b, 0);

    expect(totalCert).toBe(0);
    expect(totalDeve).toBe(0);
  });

  it('debe manejar PIA con decimales sin perder precisión', () => {
    const cants = [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const res = calcPIA(999.99, cants);

    const totalCert = res.cert.reduce((a, b) => a + b, 0);
    expect(totalCert).toBeCloseTo(999.99, 2);
  });

  it('debe manejar PIA grande (millones) sin overflow', () => {
    const cants = [10, 5, 15, 20, 10, 5, 5, 10, 5, 5, 5, 5];
    const res = calcPIA(15000000, cants);

    const totalCert = res.cert.reduce((a, b) => a + b, 0);
    const totalDeve = res.deve.reduce((a, b) => a + b, 0);

    expect(totalCert).toBeCloseTo(15000000, 0);
    expect(totalDeve).toBeCloseTo(15000000, 0);
    expect(res.obs).toBe('');
  });
});

describe('Reglas de estado PIA (lógica de negocio)', () => {

  // Simula la lógica de decisión de estado en _CORE_CALCULAR_PROG_PIA
  function decidirEstadoPIA(pia, estadoPrevio, obsPrevio) {
    var est = estadoPrevio;
    var obs = obsPrevio;

    if (pia === 0) {
      est = 'Eliminar';
      var nota = 'PIA es 0 en DEVENGADO. Eliminar de SISPLAN.';
      obs = obs ? obs + ' | ' + nota : nota;
      return { est, obs };
    }

    var estLower = est.toLowerCase();
    if (estLower === '' || estLower === '0' || estLower === 'false' || estLower === 'eliminar') {
      est = 'Ok';
    }

    var notaPIA = 'PIA Proyectado Automáticamente';
    if (obs.indexOf(notaPIA) === -1) {
      obs = obs ? obs + ' | ' + notaPIA : notaPIA;
    }

    return { est, obs };
  }

  it('PIA=0 → Eliminar, sin importar estado previo', () => {
    expect(decidirEstadoPIA(0, 'Ok', '').est).toBe('Eliminar');
    expect(decidirEstadoPIA(0, 'Agregar', '').est).toBe('Eliminar');
    expect(decidirEstadoPIA(0, 'Observado', '').est).toBe('Eliminar');
    expect(decidirEstadoPIA(0, '', '').est).toBe('Eliminar');
  });

  it('PIA=0 → preserva observación previa + agrega nota', () => {
    const res = decidirEstadoPIA(0, 'Ok', 'AO difiere: ALGO');
    expect(res.obs).toContain('AO difiere: ALGO');
    expect(res.obs).toContain('PIA es 0 en DEVENGADO');
  });

  it('PIA>0 + Agregar (de E2) → preserva Agregar', () => {
    const res = decidirEstadoPIA(50000, 'Agregar', 'Agregado desde DEVENGADO.');
    expect(res.est).toBe('Agregar');
    expect(res.obs).toContain('Agregado desde DEVENGADO.');
    expect(res.obs).toContain('PIA Proyectado Automáticamente');
  });

  it('PIA>0 + Observado (de E2 por AO/UM) → preserva Observado', () => {
    const res = decidirEstadoPIA(50000, 'Observado', 'AO difiere: CONTRATO DOCENTE');
    expect(res.est).toBe('Observado');
    expect(res.obs).toContain('AO difiere');
    expect(res.obs).toContain('PIA Proyectado Automáticamente');
  });

  it('PIA>0 + Ok (match perfecto) → Ok + nota PIA', () => {
    const res = decidirEstadoPIA(50000, 'Ok', '');
    expect(res.est).toBe('Ok');
    expect(res.obs).toBe('PIA Proyectado Automáticamente');
  });

  it('PIA>0 + vacío (sin estado previo) → Ok', () => {
    const res = decidirEstadoPIA(50000, '', '');
    expect(res.est).toBe('Ok');
  });

  it('PIA>0 + Eliminar (contradice PIA>0) → Ok', () => {
    const res = decidirEstadoPIA(50000, 'Eliminar', 'No encontrado en DEVENGADO');
    expect(res.est).toBe('Ok');
    expect(res.obs).toContain('PIA Proyectado Automáticamente');
  });

  it('no debe duplicar nota PIA si ya existe', () => {
    const res = decidirEstadoPIA(50000, 'Ok', 'PIA Proyectado Automáticamente');
    expect(res.obs).toBe('PIA Proyectado Automáticamente');
    // No debe haber duplicado
    expect(res.obs.split('PIA Proyectado').length).toBe(2); // 1 ocurrencia → split en 2 partes
  });
});
