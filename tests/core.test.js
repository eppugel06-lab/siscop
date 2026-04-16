const util = require('../app/2_core.js');

describe('Pruebas Core (Matemáticas de Programación)', () => {

  describe('_calcGenerico (Motor de Proyección Lineal)', () => {
    it('debe heredar ejecución y proyectar saldo a los meses activos restantes', () => {
      // (pim, cant, eMs, tEje, mesCorte, lbl)
      // PIM = 1000
      // cant = meses activos (1 en ene, 0 en feb, 1 en mar... etc)
      const cant = [1, 0, 1, 0, 0, 0,  0, 0, 0, 0, 0, 0];
      // eMs = ejecución hasta mes de corte (Ej. Ene = 400)
      const eMs = [400, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      // mesCorte = 0 (Enero)
      const mesCorte = 0;
      
      const res = util._calcGenerico(1000, cant, eMs, 400, mesCorte, 'CERT');
      
      // Esperamos que en Enero tenga 400, en febrero 0, en marzo el saldo total de 600
      expect(res.ms[0]).toBe(400);
      expect(res.ms[1]).toBe(0);
      expect(res.ms[2]).toBe(600);
      expect(res.obs).toBe('');
    });

    it('debe arrojar observación si no hay meses físicos suficientes para proyectar el saldo', () => {
      // PIM = 1000, eMs = 400 en enero. Saldo = 600.
      const cant = [1, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0]; // Ningún mes activo posterior al corte
      const eMs  = [400, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      
      const res = util._calcGenerico(1000, cant, eMs, 400, 0, 'DEVE');
      
      // La observación obligatoria se adjunta a res.obs
      expect(res.obs).toContain('DEVE: Sin meses activos. Saldo S/ 600 acumulado en DIC.');
      expect(res.ms[11]).toBe(600); // El sistema lo aloja en diciembre por fallback
    });

    it('debe anular todos los valores si PIM es 0', () => {
      const cant = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
      const eMs  = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      
      const res = util._calcGenerico(0, cant, eMs, 0, 5, 'CERT');
      const total = res.ms.reduce((a,b)=>a+b, 0);
      
      expect(total).toBe(0);
      expect(res.obs).toBe('');
    });
  });

});
