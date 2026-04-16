# 📊 Guía de Generación del Dashboard

## Visión General

Genera un dashboard de verificación profesional estilo SDD como archivo único `dashboard.html`.
Visualiza todo el resultado de la auditoría de forma interactiva, en español, responsivo (desktop/tablet/móvil).

---

## ESTRUCTURA DEL DASHBOARD

### 1. Barra de Encabezado (sticky)
```
[Nombre del Proyecto] Dashboard de Auditoría    v1    [proyecto-id]    [fecha]
```

### 2. Pipeline de Agentes (fila superior)
Cada agente como tarjeta con: nombre, conteo de hallazgos, estado (listo/pendiente/crítico).
Conectados con flechas →

```
ARQUITECTO → SEGURIDAD → BD → BACKEND → FRONTEND → UX → UI → DEVOPS → ACCESIB. → QA → PM
    [N]          [N]      [N]    [N]       [N]      [N]  [N]   [N]       [N]      [N]  [N]
   listo        listo    listo  listo     listo    listo listo listo    listo    listo listo
```

### 3. Métricas (4 tarjetas grandes — directamente bajo el pipeline)
```
REQS CON CÓDIGO    REQS CON TESTS    ARTEFACTOS HUÉRFANOS    REFERENCIAS ROTAS
    100%               97%                   3                      7
  35/35 func.        34/35 func.         Sin referencia         Destinos indefinidos
```
Verde para métricas buenas, rojo/naranja para alertas.

### 4. Barra de Filtros
```
[Buscar por ID o título...]  [Todo Estado ▼]  [Toda Prioridad ▼]  [Toda Fase ▼]  [N de N]
```

### 5. Tabla de Hallazgos con filas expandibles
Columnas: ID | TÍTULO | PRIORIDAD | UC | WF | API | BDD | INV | CÓDIGO | TEST | ESTADO

- Clic en fila → se expande inline mostrando artefactos vinculados con badges de colores
- Clic en el ID (link azul) → abre modal de detalle completo
- Artefactos con tipos: CASO DE USO / CONTRATO API / ESCENARIO TEST / INVARIANTE DE NEGOCIO / CÓDIGO

### 6. Modal de Detalle (al clic en ID)
Panel flotante con:
- Encabezado: ruta del archivo fuente
- ID del UC vinculado + título del hallazgo
- Tabla resumen: ID, Trazabilidad (badges), Actor Principal, Prioridad, Estado
- Descripción completa con términos resaltados en monospace
- Evento Disparador
- Lista de artefactos vinculados (con tipo, ID, descripción y ruta)
- Código fuente vinculado (función, ruta, badge de estado)

### 7. Tabs de Fases
Tabs: P0 Fundación | P1 Core | P2 Calidad | P3 Escala
Cada tab: barra de progreso animada + lista de épicas con tareas completadas

---

## TEMPLATE HTML COMPLETO

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Dashboard de Auditoría</title>
  <style>
    :root {
      --bg-primary: #0d1117;
      --bg-secondary: #161b22;
      --bg-card: #1c2128;
      --bg-card-hover: #252c37;
      --bg-modal: #1c2128;
      --border: #30363d;
      --text-primary: #e6edf3;
      --text-secondary: #8b949e;
      --text-muted: #484f58;
      --accent-green: #3fb950;
      --accent-red: #f85149;
      --accent-orange: #d29922;
      --accent-blue: #58a6ff;
      --accent-purple: #bc8cff;
      --agent-bg: #1a4731;
      --agent-border: #238636;
      --priority-must: #da3633;
      --priority-should: #d29922;
      --priority-nice: #388bfd;
      --badge-uc: #1f3a5f; --badge-uc-b: #58a6ff; --badge-uc-t: #58a6ff;
      --badge-api: #1a3a2a; --badge-api-b: #3fb950; --badge-api-t: #3fb950;
      --badge-bdd: #2d1f3a; --badge-bdd-b: #bc8cff; --badge-bdd-t: #bc8cff;
      --badge-inv: #3a2a1a; --badge-inv-b: #d29922; --badge-inv-t: #d29922;
      --badge-code: #1a2a3a; --badge-code-b: #79c0ff; --badge-code-t: #79c0ff;
      --font-mono: 'SF Mono','Fira Code','Cascadia Code',monospace;
      --font-sans: -apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;
    }
    *{margin:0;padding:0;box-sizing:border-box;}
    body{background:var(--bg-primary);color:var(--text-primary);font-family:var(--font-sans);font-size:14px;min-height:100vh;}

    /* ENCABEZADO */
    .header{display:flex;justify-content:space-between;align-items:center;padding:14px 24px;background:var(--bg-secondary);border-bottom:1px solid var(--border);position:sticky;top:0;z-index:200;}
    .header-left{display:flex;align-items:center;gap:10px;}
    .header-title{font-size:18px;font-weight:600;}
    .header-title .sdd{color:var(--accent-blue);}
    .header-badge{background:var(--accent-blue);color:white;font-size:10px;padding:2px 8px;border-radius:20px;font-weight:700;}
    .header-meta{color:var(--text-secondary);font-size:12px;}

    /* CONTENEDOR */
    .container{padding:20px 24px;max-width:1600px;margin:0 auto;}

    /* PIPELINE */
    .pipeline{display:flex;align-items:center;gap:4px;overflow-x:auto;padding:16px 0;scrollbar-width:thin;scrollbar-color:var(--border) transparent;}
    .agent-card{background:var(--agent-bg);border:1px solid var(--agent-border);border-radius:8px;padding:12px 14px;text-align:center;min-width:100px;flex-shrink:0;cursor:pointer;transition:transform 0.2s,box-shadow 0.2s;}
    .agent-card:hover{transform:translateY(-2px);box-shadow:0 4px 16px rgba(63,185,80,0.25);}
    .agent-card.critico{background:#2d1515;border-color:var(--accent-red);}
    .agent-card.critico:hover{box-shadow:0 4px 16px rgba(248,81,73,0.25);}
    .agent-nombre{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.8px;color:var(--text-secondary);}
    .agent-count{font-size:26px;font-weight:700;color:var(--accent-green);margin:4px 0 2px;}
    .agent-card.critico .agent-count{color:var(--accent-red);}
    .agent-estado{font-size:10px;color:var(--text-secondary);}
    .pipeline-arrow{color:var(--text-muted);font-size:16px;flex-shrink:0;}

    /* MÉTRICAS */
    .metrics-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin:20px 0;}
    .metric-card{background:var(--bg-card);border:1px solid var(--border);border-radius:8px;padding:20px;text-align:center;}
    .metric-label{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:var(--text-secondary);margin-bottom:10px;}
    .metric-value{font-size:38px;font-weight:700;line-height:1;}
    .metric-value.verde{color:var(--accent-green);}
    .metric-value.rojo{color:var(--accent-red);}
    .metric-value.naranja{color:var(--accent-orange);}
    .metric-sub{font-size:12px;color:var(--text-secondary);margin-top:6px;}

    /* FILTROS */
    .filter-bar{display:flex;gap:10px;align-items:center;margin:20px 0 10px;flex-wrap:wrap;}
    .search-input{flex:1;min-width:180px;background:var(--bg-card);border:1px solid var(--border);border-radius:6px;padding:8px 14px;color:var(--text-primary);font-size:13px;outline:none;}
    .search-input:focus{border-color:var(--accent-blue);}
    .search-input::placeholder{color:var(--text-muted);}
    .filter-select{background:var(--bg-card);border:1px solid var(--border);border-radius:6px;padding:8px 12px;color:var(--text-primary);font-size:12px;cursor:pointer;outline:none;}
    .filter-select:focus{border-color:var(--accent-blue);}
    .filter-count{margin-left:auto;color:var(--text-secondary);font-size:12px;white-space:nowrap;}

    /* TABLA */
    .table-wrapper{background:var(--bg-card);border:1px solid var(--border);border-radius:8px;overflow-x:auto;-webkit-overflow-scrolling:touch;margin-bottom:24px;}
    table{width:100%;border-collapse:collapse;}
    thead{background:var(--bg-secondary);}
    th{padding:9px 12px;text-align:left;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.8px;color:var(--text-secondary);border-bottom:1px solid var(--border);white-space:nowrap;cursor:pointer;user-select:none;}
    th:hover{color:var(--text-primary);}
    td{padding:9px 12px;border-bottom:1px solid var(--border);vertical-align:middle;}
    tr.fila-dato:hover td{background:var(--bg-card-hover);cursor:pointer;}
    tr.fila-dato.activa td{background:#1a2535;}

    .req-id{color:var(--accent-blue);font-family:var(--font-mono);font-size:12px;white-space:nowrap;cursor:pointer;font-weight:600;text-decoration:none;}
    .req-id:hover{text-decoration:underline;}

    .priority-badge{display:inline-block;padding:2px 10px;border-radius:4px;font-size:11px;font-weight:700;white-space:nowrap;}
    .priority-must{background:var(--priority-must);color:white;}
    .priority-should{background:var(--priority-should);color:white;}
    .priority-nice{background:var(--priority-nice);color:white;}

    .check{color:var(--accent-green);font-size:15px;}
    .cross{color:var(--accent-red);font-size:15px;}
    .status-cubierto{color:var(--accent-green);font-weight:700;font-size:12px;}
    .status-planificado{color:var(--accent-orange);font-weight:700;font-size:12px;}
    .status-faltante{color:var(--accent-red);font-weight:700;font-size:12px;}

    /* FILA EXPANDIDA */
    tr.fila-expandida td{padding:0;}
    .expand-panel{background:#111827;border-top:2px solid var(--accent-blue);padding:16px 20px;display:none;}
    .expand-panel.visible{display:block;}
    .expand-titulo{font-family:var(--font-mono);color:var(--accent-blue);font-size:13px;font-weight:700;margin-bottom:12px;}
    .artefactos-lista{display:flex;flex-direction:column;gap:6px;}
    .artefacto-item{display:flex;align-items:center;gap:10px;font-size:12px;line-height:1.4;flex-wrap:wrap;}
    .artefacto-check{color:var(--accent-green);font-size:13px;flex-shrink:0;}
    .artefacto-badge{display:inline-block;padding:1px 8px;border-radius:4px;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;flex-shrink:0;border:1px solid;}
    .badge-uc{background:var(--badge-uc);border-color:var(--badge-uc-b);color:var(--badge-uc-t);}
    .badge-api{background:var(--badge-api);border-color:var(--badge-api-b);color:var(--badge-api-t);}
    .badge-bdd{background:var(--badge-bdd);border-color:var(--badge-bdd-b);color:var(--badge-bdd-t);}
    .badge-inv{background:var(--badge-inv);border-color:var(--badge-inv-b);color:var(--badge-inv-t);}
    .badge-code{background:var(--badge-code);border-color:var(--badge-code-b);color:var(--badge-code-t);}
    .artefacto-id{font-family:var(--font-mono);color:var(--text-secondary);font-size:11px;}
    .artefacto-desc{color:var(--text-primary);}
    .artefacto-ruta{color:var(--text-muted);font-family:var(--font-mono);font-size:10px;}

    .codigo-fuente-header{margin-top:14px;padding-top:12px;border-top:1px solid var(--border);font-size:12px;color:var(--text-secondary);margin-bottom:8px;}
    .codigo-fuente-header span{color:var(--accent-blue);font-weight:700;}
    .funcion-item{display:flex;align-items:center;gap:10px;background:var(--bg-card);border:1px solid var(--border);border-radius:4px;padding:6px 10px;margin-bottom:4px;}
    .funcion-nombre{font-family:var(--font-mono);color:var(--accent-blue);font-size:12px;font-weight:600;}
    .funcion-ruta{font-family:var(--font-mono);color:var(--text-muted);font-size:10px;flex:1;}
    .funcion-badge{font-size:9px;padding:1px 6px;border-radius:3px;background:#1a3020;color:var(--accent-green);border:1px solid var(--agent-border);font-weight:700;}

    /* MODAL */
    .modal-overlay{display:none;position:fixed;inset:0;background:rgba(0,0,0,0.75);z-index:500;align-items:flex-start;justify-content:center;padding:40px 20px;overflow-y:auto;}
    .modal-overlay.visible{display:flex;}
    .modal{background:var(--bg-modal);border:1px solid var(--border);border-radius:10px;width:100%;max-width:760px;box-shadow:0 20px 60px rgba(0,0,0,0.6);animation:modalIn 0.2s ease;}
    @keyframes modalIn{from{opacity:0;transform:translateY(-16px);}to{opacity:1;transform:translateY(0);}}
    .modal-header{display:flex;justify-content:space-between;align-items:center;padding:14px 18px;border-bottom:1px solid var(--border);background:var(--bg-secondary);border-radius:10px 10px 0 0;}
    .modal-ruta{font-family:var(--font-mono);font-size:12px;color:var(--text-secondary);}
    .modal-cerrar{background:none;border:none;color:var(--text-secondary);font-size:18px;cursor:pointer;padding:4px 8px;border-radius:4px;line-height:1;}
    .modal-cerrar:hover{background:var(--bg-card);color:var(--text-primary);}
    .modal-body{padding:20px 18px;}
    .modal-titulo-hallazgo{font-size:18px;font-weight:700;margin-bottom:16px;display:flex;align-items:center;gap:10px;flex-wrap:wrap;}
    .modal-titulo-hallazgo .uc-id{font-family:var(--font-mono);font-size:13px;color:var(--accent-blue);background:#0d2040;border:1px solid var(--accent-blue);padding:2px 8px;border-radius:4px;}
    .modal-seccion{margin-bottom:18px;}
    .modal-seccion h4{font-size:14px;font-weight:700;margin-bottom:8px;padding-bottom:6px;border-bottom:1px solid var(--border);}
    .modal-seccion p{font-size:13px;color:var(--text-secondary);line-height:1.7;}
    .highlight{font-family:var(--font-mono);background:#1a3020;border:1px solid var(--agent-border);color:var(--accent-green);padding:0 5px;border-radius:3px;font-size:11px;}
    .resumen-tabla{width:100%;border-collapse:collapse;background:var(--bg-secondary);border-radius:6px;overflow:hidden;}
    .resumen-tabla td{padding:8px 14px;font-size:13px;border-bottom:1px solid var(--border);}
    .resumen-tabla tr:last-child td{border-bottom:none;}
    .resumen-tabla td:first-child{color:var(--text-secondary);font-weight:600;width:160px;}
    .traza-badge{display:inline-block;font-family:var(--font-mono);font-size:11px;background:#0d2040;border:1px solid var(--accent-blue);color:var(--accent-blue);padding:1px 7px;border-radius:3px;margin-right:4px;}
    .actor-badge{display:inline-block;font-size:11px;background:#1a2a3a;border:1px solid var(--border);color:var(--text-primary);padding:2px 10px;border-radius:12px;}

    /* FASES */
    .phase-tabs{display:flex;border-bottom:1px solid var(--border);margin:24px 0 0;overflow-x:auto;}
    .phase-tab{padding:10px 18px;cursor:pointer;font-size:13px;font-weight:500;color:var(--text-secondary);border-bottom:2px solid transparent;transition:all 0.2s;white-space:nowrap;}
    .phase-tab.activo{color:var(--accent-blue);border-bottom-color:var(--accent-blue);}
    .phase-tab:hover{color:var(--text-primary);}
    .phase-content{display:none;padding:20px 0;}
    .phase-content.activo{display:block;}
    .phase-encabezado{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:14px;}
    .phase-titulo{font-size:16px;font-weight:600;}
    .phase-objetivo{color:var(--text-secondary);font-size:12px;margin-top:3px;}
    .phase-pct{color:var(--accent-green);font-weight:700;font-size:20px;}
    .progress-wrap{height:8px;background:var(--bg-secondary);border-radius:4px;margin:10px 0 16px;overflow:hidden;}
    .progress-bar{height:100%;border-radius:4px;background:linear-gradient(90deg,var(--accent-green),var(--accent-blue));transition:width 0.6s ease;}
    .epic-lista{display:flex;flex-direction:column;gap:8px;}
    .epic-item{background:var(--bg-card);border:1px solid var(--border);border-radius:6px;padding:12px 16px;display:flex;justify-content:space-between;align-items:center;}
    .epic-nombre{font-weight:600;font-size:13px;}
    .epic-meta{font-size:11px;color:var(--text-secondary);margin-top:2px;}
    .epic-count{font-size:13px;color:var(--text-secondary);white-space:nowrap;}

    /* RESPONSIVE */
    @media(max-width:1024px){.metrics-grid{grid-template-columns:repeat(2,1fr);}}
    @media(max-width:768px){.container{padding:12px 14px;}.metrics-grid{grid-template-columns:repeat(2,1fr);gap:10px;}.metric-value{font-size:28px;}th,td{padding:7px 8px;font-size:12px;}.header{padding:10px 14px;}.header-meta{display:none;}.modal{margin:0;border-radius:0;}}
    @media(max-width:480px){.metrics-grid{grid-template-columns:1fr 1fr;}.filter-bar{gap:6px;}}
  </style>
</head>
<body>

<!-- MODAL -->
<div class="modal-overlay" id="modalOverlay" onclick="cerrarModal(event)">
  <div class="modal" id="modalContenido"></div>
</div>

<!-- ENCABEZADO -->
<div class="header">
  <div class="header-left">
    <span class="header-title"><span class="sdd">AUDITORÍA</span> Dashboard</span>
    <span class="header-badge" id="headerBadge">v1</span>
  </div>
  <div class="header-meta" id="headerMeta"></div>
</div>

<div class="container">
  <div class="pipeline" id="pipeline"></div>
  <div class="metrics-grid" id="metricsGrid"></div>

  <div class="filter-bar">
    <input class="search-input" type="text" placeholder="Buscar por ID o título..." id="searchInput" oninput="filtrarTabla()">
    <select class="filter-select" id="statusFilter" onchange="filtrarTabla()">
      <option value="">Todo Estado</option>
      <option value="Cubierto">Cubierto</option>
      <option value="Planificado">Planificado</option>
      <option value="Faltante">Faltante</option>
    </select>
    <select class="filter-select" id="priorityFilter" onchange="filtrarTabla()">
      <option value="">Toda Prioridad</option>
      <option value="Obligatorio">Obligatorio</option>
      <option value="Debería">Debería</option>
      <option value="Opcional">Opcional</option>
    </select>
    <select class="filter-select" id="phaseFilter" onchange="filtrarTabla()">
      <option value="">Toda Fase</option>
      <option value="P0">P0</option><option value="P1">P1</option>
      <option value="P2">P2</option><option value="P3">P3</option>
    </select>
    <div class="filter-count" id="filterCount"></div>
  </div>

  <div class="table-wrapper">
    <table>
      <thead>
        <tr>
          <th>ID ▲</th><th>TÍTULO</th><th>PRIORIDAD</th>
          <th>UC</th><th>WF</th><th>API</th><th>BDD</th><th>INV</th><th>CÓDIGO</th><th>TEST</th>
          <th>ESTADO</th>
        </tr>
      </thead>
      <tbody id="tablaBody"></tbody>
    </table>
  </div>

  <div class="phase-tabs" id="phaseTabs"></div>
  <div id="phaseContents"></div>
</div>

<script>
// ═══════════════════════════════════════════════════════
// DATOS DE AUDITORÍA — REEMPLAZAR CON DATOS REALES DEL PROYECTO
// ═══════════════════════════════════════════════════════
const DATOS = {
  nombreProyecto: "NOMBRE PROYECTO",
  proyectoId: "proj-001",
  version: "v1",
  fecha: new Date().toLocaleDateString('es-PE', {day:'2-digit',month:'numeric',year:'numeric',hour:'2-digit',minute:'2-digit'}),

  agentes: [
    {nombre:"ARQUITECTO",  count:8,  estado:"listo", critico:false},
    {nombre:"SEGURIDAD",   count:12, estado:"listo", critico:true },
    {nombre:"BASE DATOS",  count:5,  estado:"listo", critico:false},
    {nombre:"BACKEND",     count:9,  estado:"listo", critico:false},
    {nombre:"FRONTEND",    count:7,  estado:"listo", critico:false},
    {nombre:"UX",          count:6,  estado:"listo", critico:false},
    {nombre:"UI",          count:4,  estado:"listo", critico:false},
    {nombre:"DEVOPS",      count:8,  estado:"listo", critico:true },
    {nombre:"ACCESIB.",    count:5,  estado:"listo", critico:false},
    {nombre:"QA",          count:6,  estado:"listo", critico:false},
    {nombre:"PM",          count:3,  estado:"listo", critico:false}
  ],

  metricas: [
    {etiqueta:"REQS CON CÓDIGO",         valor:"100%", sub:"35/35 funcionales",    color:"verde" },
    {etiqueta:"REQS CON TESTS",          valor:"97%",  sub:"34/35 funcionales",    color:"verde" },
    {etiqueta:"ARTEFACTOS HUÉRFANOS",    valor:"3",    sub:"Sin referencia",        color:"rojo"  },
    {etiqueta:"REFERENCIAS ROTAS",       valor:"7",    sub:"Destinos indefinidos",  color:"rojo"  }
  ],

  hallazgos: [
    {
      id:"REQ-F-001", titulo:"Registro de cliente",
      prioridad:"Obligatorio", fase:"P0",
      uc:true, wf:false, api:true, bdd:true, inv:true, codigo:true, test:true,
      estado:"Cubierto",
      detalle:{
        rutaArchivo:"spec/use-cases/UC-001-registrar-cliente.md (línea 1)",
        ucId:"UC-001",
        trazabilidad:["REQ-F-001","REQ-F-002","REQ-F-003"],
        actorPrincipal:"Operador Comercial",
        estadoDoc:"Borrador",
        descripcion:"Permite al Operador Comercial registrar un nuevo cliente en el sistema proporcionando sus datos personales y documento de identidad. El sistema valida los datos, comprueba la unicidad del documento, deriva automáticamente el tipo de cliente según el tipo de documento y crea el registro con estado <span class='highlight'>registrado</span>.",
        eventoDisparador:"El Operador Comercial inicia la solicitud de registro del cliente vía API REST.",
        artefactos:[
          {tipo:"uc",  id:"UC-001",      desc:"Caso de Uso: UC-001 — Registrar Cliente",          ruta:"spec/use-cases/UC-001-registrar-cliente.md"},
          {tipo:"api", id:"API-clientes",desc:"API de Clientes",                                   ruta:"spec/contracts/API-clientes.md"},
          {tipo:"api", id:"API-CLI-01",  desc:"Registrar Cliente",                                 ruta:"spec/contracts/API-clientes.md"},
          {tipo:"bdd", id:"BDD-UC-001",  desc:"BDD Scenarios: UC-001 — Registrar Cliente",        ruta:"spec/tests/BDD-UC-001.md"},
          {tipo:"bdd", id:"BDD-UC-002",  desc:"BDD Scenarios: UC-002 — Consultar Cliente",        ruta:"spec/tests/BDD-UC-002.md"},
          {tipo:"inv", id:"INV-CLI-001", desc:"Unicidad de documento de identidad",               ruta:"spec/domain/01-INVARIANTS.md"},
          {tipo:"inv", id:"INV-CLI-002", desc:"Tipo de cliente derivado de tipo de documento",    ruta:"spec/domain/01-INVARIANTS.md"}
        ],
        codigoFuente:[
          {icono:"🏛️", nombre:"validateDNI",       ruta:"lib/domain/cliente/validations.ts:2", badge:"propagado"},
          {icono:"🏛️", nombre:"createCliente",     ruta:"lib/domain/cliente/service.ts:18",   badge:"propagado"},
          {icono:"⚙️", nombre:"ClienteRepository", ruta:"lib/infra/repositories/cliente.ts:5",badge:"propagado"}
        ],
        totalCodigo:90
      }
    },
    {
      id:"REQ-F-002", titulo:"Validación de documento de identidad",
      prioridad:"Obligatorio", fase:"P0",
      uc:true, wf:false, api:true, bdd:true, inv:true, codigo:true, test:true,
      estado:"Cubierto",
      detalle:{
        rutaArchivo:"spec/requerimientos/REQ-F-002.md (línea 1)",
        ucId:"UC-002",
        trazabilidad:["REQ-F-002"],
        actorPrincipal:"Sistema",
        estadoDoc:"Borrador",
        descripcion:"El sistema valida el formato y la unicidad del documento de identidad antes de proceder con el registro del cliente.",
        eventoDisparador:"Se recibe un documento de identidad durante el proceso de registro.",
        artefactos:[
          {tipo:"uc",  id:"UC-002",      desc:"Caso de Uso: UC-002 — Validar Documento", ruta:"spec/use-cases/UC-002.md"},
          {tipo:"inv", id:"INV-CLI-001", desc:"Unicidad de documento de identidad",      ruta:"spec/domain/01-INVARIANTS.md"}
        ],
        codigoFuente:[
          {icono:"🏛️", nombre:"validateDNI", ruta:"lib/domain/cliente/validations.ts:2", badge:"propagado"}
        ],
        totalCodigo:12
      }
    },
    {id:"REQ-F-003",titulo:"Tipos de cliente",       prioridad:"Obligatorio",fase:"P0",uc:true, wf:false,api:true, bdd:true, inv:true, codigo:true, test:true, estado:"Cubierto",   detalle:null},
    {id:"REQ-F-004",titulo:"Consulta de cliente",    prioridad:"Obligatorio",fase:"P1",uc:true, wf:false,api:true, bdd:true, inv:true, codigo:true, test:true, estado:"Cubierto",   detalle:null},
    {id:"REQ-F-005",titulo:"Tipos de servicio",      prioridad:"Obligatorio",fase:"P1",uc:true, wf:true, api:true, bdd:true, inv:true, codigo:true, test:true, estado:"Planificado",detalle:null},
    {id:"SEC-001",  titulo:"Sin límite de tasa en auth",prioridad:"Obligatorio",fase:"P0",uc:false,wf:false,api:true,bdd:false,inv:false,codigo:true,test:false,estado:"Faltante",  detalle:null},
    {id:"OPS-001",  titulo:"Sin pipeline CI/CD",     prioridad:"Obligatorio",fase:"P0",uc:false,wf:false,api:false,bdd:false,inv:false,codigo:true,test:true, estado:"Planificado",detalle:null}
  ],

  fases: [
    {id:"P0",etiqueta:"P0 Fundación",   objetivo:"Corregir problemas críticos, establecer base profesional",            progreso:65,
     epicas:[
       {nombre:"Endurecimiento de Seguridad",  agente:"Seguridad",  esfuerzo:"M",tareas:8, hechas:5},
       {nombre:"Configuración CI/CD",           agente:"DevOps",     esfuerzo:"M",tareas:6, hechas:4},
       {nombre:"Base de Tests",                 agente:"QA",         esfuerzo:"L",tareas:5, hechas:3},
       {nombre:"Correcciones críticas en BD",   agente:"Base Datos", esfuerzo:"S",tareas:4, hechas:4}
     ]},
    {id:"P1",etiqueta:"P1 Core",        objetivo:"Arquitectura profesional, flujos de usuario completos",               progreso:20,
     epicas:[
       {nombre:"Refactorización de Arquitectura",agente:"Arquitecto",esfuerzo:"XL",tareas:15,hechas:2},
       {nombre:"Rediseño de API",                agente:"Backend",   esfuerzo:"L", tareas:10,hechas:3},
       {nombre:"Reconstrucción Frontend",        agente:"Frontend",  esfuerzo:"L", tareas:12,hechas:1},
       {nombre:"Mejoras UX",                     agente:"UX",        esfuerzo:"M", tareas:8, hechas:2}
     ]},
    {id:"P2",etiqueta:"P2 Calidad",     objetivo:"Rendimiento, accesibilidad, sistema de diseño, cobertura 80%+",      progreso:0,
     epicas:[
       {nombre:"Sistema de Diseño",       agente:"UI",      esfuerzo:"L",tareas:10,hechas:0},
       {nombre:"Accesibilidad WCAG AA",   agente:"A11y",    esfuerzo:"M",tareas:8, hechas:0},
       {nombre:"Auditoría de Rendimiento",agente:"Frontend",esfuerzo:"M",tareas:6, hechas:0},
       {nombre:"Suite E2E",               agente:"QA",      esfuerzo:"L",tareas:12,hechas:0}
     ]},
    {id:"P3",etiqueta:"P3 Escala",      objetivo:"Escalar, optimizar, funcionalidades avanzadas",                      progreso:0,
     epicas:[
       {nombre:"Stack de Observabilidad",agente:"DevOps",    esfuerzo:"M",tareas:8,hechas:0},
       {nombre:"Capa de Caché",          agente:"Base Datos",esfuerzo:"M",tareas:6,hechas:0},
       {nombre:"Pruebas de Carga",       agente:"QA",        esfuerzo:"M",tareas:5,hechas:0}
     ]}
  ]
};

// ═══════════════════════════════════════════════════════
// ESTADO GLOBAL
// ═══════════════════════════════════════════════════════
let filaExpandida = null;
const TIPO_LABEL = {uc:"CASO DE USO",api:"CONTRATO API",bdd:"ESCENARIO TEST",inv:"INVARIANTE",code:"CÓDIGO"};
const TIPO_BADGE = {uc:"badge-uc",api:"badge-api",bdd:"badge-bdd",inv:"badge-inv",code:"badge-code"};

// ═══════════════════════════════════════════════════════
// RENDER
// ═══════════════════════════════════════════════════════
function render() {
  document.getElementById('headerMeta').textContent = `${DATOS.proyectoId}  ·  ${DATOS.fecha}`;
  document.getElementById('headerBadge').textContent = DATOS.version;

  // Pipeline
  document.getElementById('pipeline').innerHTML = DATOS.agentes.map((a,i) =>
    `${i>0?'<span class="pipeline-arrow">→</span>':''}
    <div class="agent-card ${a.critico?'critico':''}">
      <div class="agent-nombre">${a.nombre}</div>
      <div class="agent-count">${a.count}</div>
      <div class="agent-estado">${a.estado}</div>
    </div>`
  ).join('');

  // Métricas
  document.getElementById('metricsGrid').innerHTML = DATOS.metricas.map(m =>
    `<div class="metric-card">
      <div class="metric-label">${m.etiqueta}</div>
      <div class="metric-value ${m.color}">${m.valor}</div>
      <div class="metric-sub">${m.sub}</div>
    </div>`
  ).join('');

  renderTabla(DATOS.hallazgos);
  renderFases();
}

function check(v){ return v ? '<span class="check">✓</span>' : '<span class="cross">✗</span>'; }

function renderTabla(hallazgos) {
  const body = document.getElementById('tablaBody');
  body.innerHTML = hallazgos.map((h,idx) => {
    const pc = h.prioridad==='Obligatorio'?'must':h.prioridad==='Debería'?'should':'nice';
    const sc = h.estado==='Cubierto'?'cubierto':h.estado==='Planificado'?'planificado':'faltante';
    return `
    <tr class="fila-dato" id="fila-${idx}" onclick="toggleExpand(${idx})">
      <td><span class="req-id" onclick="abrirModal(event,${idx})">${h.id}</span></td>
      <td>${h.titulo}</td>
      <td><span class="priority-badge priority-${pc}">${h.prioridad}</span></td>
      <td>${check(h.uc)}</td><td>${check(h.wf)}</td><td>${check(h.api)}</td>
      <td>${check(h.bdd)}</td><td>${check(h.inv)}</td><td>${check(h.codigo)}</td><td>${check(h.test)}</td>
      <td><span class="status-${sc}">${h.estado}</span></td>
    </tr>
    <tr class="fila-expandida">
      <td colspan="11"><div class="expand-panel" id="panel-${idx}"></div></td>
    </tr>`;
  }).join('');
  document.getElementById('filterCount').textContent = `${hallazgos.length} de ${DATOS.hallazgos.length}`;
}

function buildArtefactos(d) {
  if(!d) return '<p style="color:var(--text-secondary);font-size:12px">Sin artefactos registrados.</p>';
  return `<div class="artefactos-lista">
    ${d.artefactos.map(a=>`
      <div class="artefacto-item">
        <span class="artefacto-check">✓</span>
        <span class="artefacto-badge ${TIPO_BADGE[a.tipo]}">${TIPO_LABEL[a.tipo]}</span>
        <span class="artefacto-id">${a.id}</span>
        <span class="artefacto-desc">${a.desc}</span>
        <span class="artefacto-ruta">(${a.ruta})</span>
      </div>`).join('')}
  </div>
  ${d.codigoFuente && d.codigoFuente.length ? `
    <div class="codigo-fuente-header">Código Fuente (<span>${d.totalCodigo} vinculadas vía UC</span>)</div>
    <div style="display:flex;align-items:center;gap:8px;font-size:12px;color:var(--text-secondary);margin-bottom:6px">
      🏛️ DOMAIN <span style="margin-left:auto;font-family:var(--font-mono);font-size:11px;color:var(--text-muted)">${d.totalCodigo}</span>
    </div>
    ${d.codigoFuente.map(fn=>`
      <div class="funcion-item">
        <span>${fn.icono}</span>
        <span style="font-size:11px;color:var(--text-muted)">function</span>
        <span class="funcion-nombre">${fn.nombre}</span>
        <span class="funcion-ruta">${fn.ruta}</span>
        <span class="funcion-badge">${fn.badge}</span>
      </div>`).join('')}
  ` : ''}`;
}

function toggleExpand(idx) {
  const panel = document.getElementById(`panel-${idx}`);
  const fila = document.getElementById(`fila-${idx}`);
  if(filaExpandida === idx){
    panel.classList.remove('visible'); fila.classList.remove('activa'); filaExpandida=null; return;
  }
  if(filaExpandida !== null){
    document.getElementById(`panel-${filaExpandida}`).classList.remove('visible');
    document.getElementById(`fila-${filaExpandida}`).classList.remove('activa');
  }
  filaExpandida = idx;
  fila.classList.add('activa');
  const h = DATOS.hallazgos[idx];
  panel.innerHTML = `<div class="expand-titulo">${h.id}: ${h.titulo}</div>${buildArtefactos(h.detalle)}`;
  panel.classList.add('visible');
}

function abrirModal(event, idx) {
  event.stopPropagation();
  const h = DATOS.hallazgos[idx];
  const d = h.detalle;
  const modal = document.getElementById('modalContenido');
  if(!d){
    modal.innerHTML = `
      <div class="modal-header">
        <span class="modal-ruta">${h.id}</span>
        <button class="modal-cerrar" onclick="cerrarModal()">✕</button>
      </div>
      <div class="modal-body">
        <div class="modal-titulo-hallazgo">${h.titulo}</div>
        <p style="color:var(--text-secondary);font-size:13px">Sin detalle disponible aún para este hallazgo.</p>
      </div>`;
  } else {
    modal.innerHTML = `
      <div class="modal-header">
        <span class="modal-ruta">${d.rutaArchivo}</span>
        <button class="modal-cerrar" onclick="cerrarModal()">✕</button>
      </div>
      <div class="modal-body">
        <div class="modal-titulo-hallazgo">
          <span class="uc-id">${d.ucId}</span> — ${h.titulo}
        </div>
        <div class="modal-seccion">
          <h4>Resumen</h4>
          <table class="resumen-tabla">
            <tr><td>ID</td><td><span class="traza-badge">${h.id}</span></td></tr>
            <tr><td>Trazabilidad</td><td>${d.trazabilidad.map(t=>`<span class="traza-badge">${t}</span>`).join(' ')}</td></tr>
            <tr><td>Actor Principal</td><td><span class="actor-badge">${d.actorPrincipal}</span></td></tr>
            <tr><td>Prioridad</td><td>${h.prioridad}</td></tr>
            <tr><td>Estado</td><td>${d.estadoDoc}</td></tr>
          </table>
        </div>
        <div class="modal-seccion"><h4>Descripción</h4><p>${d.descripcion}</p></div>
        <div class="modal-seccion"><h4>Evento Disparador</h4><p>${d.eventoDisparador}</p></div>
        <div class="modal-seccion"><h4>Artefactos Vinculados</h4>${buildArtefactos(d)}</div>
      </div>`;
  }
  document.getElementById('modalOverlay').classList.add('visible');
}

function cerrarModal(event){
  if(!event || event.target===document.getElementById('modalOverlay'))
    document.getElementById('modalOverlay').classList.remove('visible');
}
document.addEventListener('keydown', e => { if(e.key==='Escape') cerrarModal(); });

function renderFases(){
  const tabs = document.getElementById('phaseTabs');
  const contents = document.getElementById('phaseContents');
  tabs.innerHTML = DATOS.fases.map((f,i)=>
    `<div class="phase-tab ${i===0?'activo':''}" onclick="cambiarTab(${i})">${f.etiqueta}</div>`
  ).join('');
  contents.innerHTML = DATOS.fases.map((f,i)=>`
    <div class="phase-content ${i===0?'activo':''}" id="fase-${i}">
      <div class="phase-encabezado">
        <div><div class="phase-titulo">${f.etiqueta}</div><div class="phase-objetivo">${f.objetivo}</div></div>
        <div class="phase-pct">${f.progreso}%</div>
      </div>
      <div class="progress-wrap"><div class="progress-bar" style="width:${f.progreso}%"></div></div>
      <div class="epic-lista">
        ${f.epicas.map(e=>`
          <div class="epic-item">
            <div><div class="epic-nombre">${e.nombre}</div><div class="epic-meta">Responsable: ${e.agente} · Esfuerzo: ${e.esfuerzo}</div></div>
            <div class="epic-count">${e.hechas}/${e.tareas} tareas</div>
          </div>`).join('')}
      </div>
    </div>`).join('');
}

function filtrarTabla(){
  const busq = document.getElementById('searchInput').value.toLowerCase();
  const estado = document.getElementById('statusFilter').value;
  const prio = document.getElementById('priorityFilter').value;
  const fase = document.getElementById('phaseFilter').value;
  filaExpandida = null;
  renderTabla(DATOS.hallazgos.filter(h =>
    (!busq || h.id.toLowerCase().includes(busq) || h.titulo.toLowerCase().includes(busq)) &&
    (!estado || h.estado === estado) &&
    (!prio || h.prioridad === prio) &&
    (!fase || h.fase === fase)
  ));
}

function cambiarTab(idx){
  document.querySelectorAll('.phase-tab').forEach((t,i)=>t.classList.toggle('activo',i===idx));
  document.querySelectorAll('.phase-content').forEach((c,i)=>c.classList.toggle('activo',i===idx));
}

render();
</script>
</body>
</html>
```

---

## INSTRUCCIONES PARA POBLAR EL DASHBOARD

Al generar el dashboard para un proyecto real:

1. **Reemplazar `DATOS`** con los hallazgos reales del equipo de agentes
2. **Campo `detalle`** es opcional — `null` muestra "sin detalle disponible" en el modal
3. **Tipos de artefacto**: `uc` (caso de uso), `api` (contrato API), `bdd` (escenario test), `inv` (invariante), `code` (código)
4. **Columnas UC/WF/API/BDD/INV/CÓDIGO/TEST** deben ajustarse al dominio del proyecto — pueden añadirse o quitarse
5. **`progreso` de fases** inicia en 0% — el cliente lo actualiza durante la ejecución
6. **`codigoFuente`** en el detalle muestra las funciones/métodos vinculados al requisito vía la UC

Todo el JS es autocontenido — sin dependencias externas. Responsivo desktop/tablet/móvil.
