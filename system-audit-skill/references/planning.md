# 📋 Plantillas de Planificación

## ESTRUCTURA DEL PLAN MAESTRO

Después de que todos los agentes completen su auditoría, el Orquestador PM genera este plan completo.

---

## DOCUMENTO DE DECISIÓN DEL STACK TECNOLÓGICO

```markdown
# Stack Tecnológico Recomendado — [Nombre del Proyecto]

## Criterios de Decisión
- Gratuito / Código Abierto: ✅ obligatorio
- Listo para producción: ✅ obligatorio
- Tamaño de la comunidad: Preferible grande
- Curva de aprendizaje: Moderada aceptable
- Límite de escalabilidad: Debe manejar [N] veces la carga actual

## Frontend
- Framework: [elección] — Razón: [justificación breve de 2 líneas]
- Biblioteca UI: [elección] — Razón: [justificación breve]
- Gestión de Estado: [elección] — Razón: [justificación breve]
- Animaciones: [elección] — Razón: [justificación breve]
- Herramienta de Compilación (Build Tool): [elección]

## Backend
- Framework: [elección] — Razón: [justificación breve]
- Lenguaje: [elección]
- Estilo API: [REST / GraphQL / tRPC]

## Datos
- BDD Principal: [elección]
- ORM: [elección]
- Caché: [elección]
- Búsqueda: [elección] (si procede)
- Cola de procesamiento (Queue): [elección] (si procede)

## Infraestructura
- Gestor Contenedores: Docker + Docker Compose
- Plataforma de despliegue: [Coolify / Kamal / Railway (free tier)]
- Pipelines (CI/CD): GitHub Actions
- Monitoreo de Métricas: Grafana + Prometheus + Loki
- Seguimiento de Errores: Sentry (capa libre)

## ¿Por qué NO usar [alternativa común que existe en el mercado]?
[Analizar las alternativas lógicas obvias y justificar de la manera más rápida por qué el stack recomendado es mejor para el contexto de este proyecto]
```

---

## PLANTILLA O MODELO BASE DEL ROADMAP DE LAS FASES

```markdown
# Roadmap y Trayectoria del Proyecto — [Nombre del Proyecto]
Fechado el: [fecha del día]
Producido Tras Auditoría Analítica: System Audit Pro v1

---

## 📊 Métricas Resultantes Generalizadas
- Encontrados Totales Obtenidos Tras Evaluación: [N]
- Componentes Bajo Estrés o Alerta Máxima (Críticos): [N] 🔴
- Opciones Ideales de Mejora o Refactorizaciones: [N] 🟡
- Aspectos Perfectos para Seguir el Mismo Camino de Programación: [N] 🟢
- Esfuerzo Equivalente en Tiempo Previsto: [N] semanas

---

## 🚨 P0 — FASE TRONCAL O BASE( Semanas 1 a la [N])
**La Meta**: Solventar el corazón crítico, asegurar la protección vital para asentar bases reales profesionales.
**Puntos Definidos de Finalización Esperada**: Tolerancia cero de fallos de penetrabilidad, El entubado CI/CD automatizando bien el Build y Todos los testing primarios en verde (Pasados exitosamente).

### Tareas Magnas ("Epics") 
| Código Numérico | Epic | Agente Asignado como Autor | Tamaño Esfuerzo (S, M, L) | Se Traba Hasta (Dependencia de Tarea) |
|---|---|---|---|---|
| P0-01 | [nombre descriptivo] | [agente AI responsable] | M | — Libre Independiente — |
| P0-02 | [nombre descriptivo] | [agente AI responsable] | L | Empieza Luego De P0-01 |

### Desglose Práctico Interno ("Tasks")
**P0-01: [Nombre Epic Descriptivo]**
- [ ] Task o Acción 1 — [qué hay que hacer, justificar el porqué o métrica esperada del mismo]
- [ ] Task o Acción 2
- [ ] Task o Acción 3

**Incertidumbres Posibles / Riesgos (Risk)**: [Posibilidad trágica central para todo este bloque]
**Punto Visual / Envío Promesa a Mostar (Milestone)**: [Acá definimos si ya mandamos un ZIP productivo funcional / Release Demo]

---

## 🏗️ P1 — FASE DE RECURSOS CENTRALES DEL SISTEMA ("CORE") (Semanas [N]–[N])
**La Meta**: Implementar al milímetro de forma segura la estructura visual general y finalización sólida de módulos para la experiencia.
**Puntos Definidos de Finalización Esperada**: Todo viaje desde Login a Pago o Funcionalidad "Mágica" de la página sirven en paralelo, Apis bajo una buena Docs amigable al desarrollador ajeno y Componentes "E-2-E Tests" Listos.

### Tareas Magnas ("Epics")
[aplicar misma tabla]

### Desglose Práctico Interno ("Tasks")
[aplicar misma táctica de llenado de celdas y casillas checkbox]

**Incertidumbres Posibles / Riesgos (Risk)**: [Definir este bloque de alertas]
**Punto Visual / Envío Promesa a Mostar (Milestone)**: [Llegada Pública Fase Beta Interna - Beta tester Release]

---

## ✨ P2 — FASE CRÍTICA DE ALTA RESOLUCIÓN Y DETALLE FINO (POLISH) (Semanas [N]–[N])
**La Meta**: Destreza al renderizar bajo un perfil limpio veloz, Accesibilidad sin fronteras visuales o motoras para todos, Sistema robusto en píxeles. Validar testing al 80%+.
**Puntos Definidos de Finalización Esperada**: Al someter bajo Google Lighthouse debe explotar el rating verde en 90 puntos +, Los LCP y CLS tienen un score Core vitals estupendos e impecables. Superar las normativas mundiales mínimas legales para inclusión informática.

### Tareas Magnas ("Epics")
[Continuar llenando...]

**Incertidumbres Posibles / Riesgos (Risk)**: [Alertas]
**Punto Visual / Envío Promesa a Mostar (Milestone)**: [Primer Gran Release v 1.0 Al Tráfico]

---

## 🚀 P3 — FASE TIER 1 Y HORIZONTE DE AMPLIACIÓN (ESCALADO) (Ciclos Continuos Tras el Lanzamiento)
**La Meta**: Aguante extremo durante campañas potentes comerciales con picos inmersivos imprevistos, Inyecciones analíticas y experimentales y telemetría al vivo.
**Puntos Definidos de Finalización Esperada**: Que el host sea estresado y emulado a "x" Vueltas para comprobar escalado horizontal (Autoscaling de IPs en el puerto sin apagarlo), y Las Funcionalidades beta o apagadas en Vivo sean "Feature Flagging A/B Testing" puras correctas.

### Tareas Magnas ("Epics")
[Continuar...]

**Incertidumbres Posibles / Riesgos (Risk)**: [Alertas]
**Punto Visual / Envío Promesa a Mostar (Milestone)**: [Crecimiento Económico Sólido a Nueva Capa o Milestone De Infraestructura Escalamiento Larga vida útil].
```

---

## PLANTILLA BASE (TEMPLATE FORMAT) DEL REGISTRO DE PELIGROS (RISK) LATENTES

```markdown
# Registro Evaluador de Peligros Crítico

| Código Id. | Detalle de Peligro | Variable Probabilidad | Qué tan Alto El Golpe (Impact) | Factor Evaluado Completo | Salvavidas Asignado como Solución Técnica Limitante | Responsable del Área |
|---|---|---|---|---|---|---|
| R-01 | [qué podría romper] | H/M/L (Alto, Medio, Bajo) | H/M/L | HH/HM/MM... | [Acción preventiva que detiene ese R-01 a ser un apocalípsis técnico] | [Agente a llamar / Cargo a Consultar] |
```

Variable de Score (Probabilidad y Nivel de Daño Causado) evaluada al Multiplicarse:
- HH = Catástrofe Critica y Muerte al Sistema si cae o existe ese detalle en la calle. Corregir y colocar Inmediatamente como P0.
- HM / MH = Alto riesgo de Sangrado o Corrupción (Colocarlo bajo orden imperante para arreglarlo de ser posible en la ruta de inicio o por la Fase Core P1).
- MM = Peligro de Impacto Intermedio (Para ser abordado sin tanto apuro al entrar la Fase Calidad y Refinado P2).
- LL / LM / ML = Esfuerzo Bajo o impacto Mínimo que podría no ser la gran cosa hoy en día pero deberemos estar cuidando de mirarlo ocasionalmente (Se evalúa o difiere).

---

## EL MANUAL TÉCNICO GENERALIZADO DE CADA ESPERANZA ESTANDARIZADA "DEFINITION OF DONE" DE TODO BLOQUE.

```markdown
# Definición Técnica Evaluativa Fundamental

## Pureza Tecnológica y Calidad Evaluadora
- [ ] La terminal en Linter pasa Invicto (ESLint + Prettier para el JS/TS o usar un Ruff si es zona de Python)
- [ ] Se obliga un estricto modo Typescript, Está penalizado inyectar un Variable "Any". Todo debe estar bien moldeado y estático de Type seguro.
- [ ] Al subir y guardar la nueva rama de Commit, es inadmisible y desordenado ver fragmentos larguísimos de basuritas en modo código comentado de "// " sin un TODO necesario. (No Commented-out code).
- [ ] Documento escrito y comentado para ser autodescubrible: Todo es bajo reglas y normas precisos "JSDoc / Python Docstrings".

## Ambientes Testeados Artificiales Evaluables (Testing Block)
- [ ] Unit T. : Demanda y obliga ser mayor al Mágico Estándar de 80%+ de Cover por sobre el Modelo Nuclear De Negocios.
- [ ] Test Al Entorno de Inmersión Integrado (API Integration) : Se obliga mapeo minucioso por todo y cada sub end-point sin excepciones para confirmar paso seguro al cliente (JSON payload Status Codes)
- [ ] Test End 2 End Tístico Emulativo Visual ("UI/E2E") : Toda ruta vital transaccional cruzada satisfactoriamente (El muñeco que lo navega y cliquea la base web hasta cobrar la meta o acción no reportó Crash o Break Error Red Light en terminal interactiva como el framework "PlayWright")
- [ ] Reducir pruebas oscilantes "Flaky Tests" en estado Zero "0" al ser inyectados dentro de las integraciones Cloud Action (GitHub Actions no puede falsear y reportar Red Statuses Random sin justificación consistente lógica)

## Estandar Seguridad En Nube (Security Pass Checkers)
- [ ] Cero Cifras Estreptitosas o Llaves, Tokens y API keys Secretas Quemadas directamente en Letras sobre el repo al natural (Ni en Commits Perdidos en un `.env` a la vista)
- [ ] Librerías analizadas sin puertas secundarias rotas y agujeros informáticos documentados: Usar "npm audit" con Snyk de barrera
- [ ] Invariantes para validación exhaustiva al entrar datos al backend en todas direcciones "Payload EndPoints Sanitized Validator Filters"
- [ ] Todos los flancos ciegos web y endpoints encapsulados al descubierto poseen "Firewalls" y Requerimiento de Header Token (No hay accesos libres tras capa autenticador general Auth Middleware check)

## Aspecto Vital Obligatorio Accesibilidad W3c Evaluatoria 
- [ ] Al Correr en consola el barrido técnico informático automatizado (Ejmp. Componentes "axe-core"), da de Visto Bueno total la Evaluación a la base "WCAG 2.2 Nivel Rating Estándar Internacional 'AA'".
- [ ] Testeo A Ciegas: Sin puntero usando el Hardware teclado con `keys ["Espacio", "Tabs", "Shift+Tabs", "Arrow-Dir"]` la web viaja sola, no se esconde nada, responde, resalta las siluetas en outline.
- [ ] Lector o Dictador En Máquina Testeado con Software como (Voice Over Mac, ChromeVox, NVDA Tool) al mínimo 1 camino flujo vital principal web.

## Revisor Cargas Rápidas "Speed & Render" Web App Performance Metrics
- [ ] Semáforo Score de Google Chrome "Lighthouse" superando por Encima de Rating Score '90' Pts en cada evaluación de: "Core y Visual Performance, Técnicas Internas De Desarrollo SEO, Cimientos de Buena Praxis HTML Best Practices Check" 
- [ ] Reglas Web Estándares: Tiempo de Carga De Renders pesados y críticos o fotos no mayor al promedio 2 Segs y poco (LCP). Pestañas no causen Parpadeos bruscos ni movidas de cajas des-sincronizados "0.1 y menores" puntos (CLS). Que el primer salto o clic desde la interfase no quede pasmada al CPU rebotando la inacción sino reaccionar instantáneo al Toque (< 100 Milésima Segundo "ms") del usuario vivo al presionar para interactuar (FID Metric). 
- [ ] Api Response: Rapidez Exquisita y brutal respondiendo bajo una tasa p95 percentile la solicitud y transacciones en Menor a Tiempo Base Real menor del margen de ("< 200 milisec." Redondos)

## Empaque Productivo Al Entorno Hosting Real en Plataforma De Despliegue. (Deployment Action Pipeline)
- [ ] Reglas Pipelines de Verificación se Inician con Alarma a un Chequeador Automático y Pasa la Evaluación De Estructura Por Cada Intento Subido desde GitHub al Entorno Integrado (A cada PR)
- [ ] Configurado "Entorno Ciego Espejado - Server Staging": Tiene que comportarse similar o emular ser igual al de VIVO (Prod Enviroment Replicated Model Test Place).
- [ ] El Plan Contra el Fuego Apocalíptico Caído ("Rollback procedure Process") esta probado manualmente, enseñado y es accesible desde un gran botón de 1 Segundo de Regreso Rápido en Vercel, Coolify u otros al historial salvavidas. Documentación probada con manual accesible (Disasater Time Rollback Doc Check Tested)
- [ ] Un Endpoint vacío y simple ("API/HEALTH_PING") está abierto las 24 hr/7 listo respondiendo que el corazón Web sigue bombeando con status Code puro 200 sin trabas a los vigilantes monitores externos automáticos como (Uptime Kumas Status Page App Ping Checks).

## Letras Mínima Viables Que Hablan (Data Documentation Written Code Info)
- [ ] La Carta Estelar Web Oficial en Raíz del Repo (README.md) es fresco y no una plantilla genérica fantasma por defecto en framework. 
- [ ] Swagger Activo u Open API Muestra sin Tratar De Ver el Código Fuerte "Backend" Cuales son Las Llaves Puertos Y Payload Models de Entrada y Salida Documentado "Swagger API Route Visual Documentation Mapped Check"
- [ ] "Decision records Logs Mapped" El archivo Bitácoras de ADR está colocado documentando por qué el Tech Leader Decidió Mudar o Seleccionar ciertas tecnologías hoy para que el Dev Futuro sepa qué pasa en su historia del repo (Porque usamos Mongo DB y por que cambiamos de GoLang a Node Typescript Hace 2 Meses Documentado Para No Caer Al Desespero en OnBoarding o Leer Historias en Commits perdidas).
- [ ] Manual rápido paramédico dev "Runbook Check Test": Cuando Algo Críticamente Común se cuelga para los técnicos base se requiere instrucciones pasiva/activas pre escritas por los CTO indicando cómo apagarlo "Enciende este Server. Reinicia La Caché Aca", etc.
```

---

## CONFORMACIÓN DEL CUADRO Y MATRIZ DECIDIENDO EL ORDEN: IMPACTO vs ESFUERZO HUMANO REQUERIDO ("IMPACT/EFFORT MATRIX MAP")

Utiliza el siguiente diagrama Mental (Esquema conceptual) del que sacar las fichas en la planificación antes de rellenarlas al crear la estructuración P0-P3 al armarla en la Pizarra Del Calendario Base Documental. Las asignadas dependen a la zona que ocupen en la gravedad/velocidad del mapeo de su cruce en 4 Cuartos y el esfuerzo humano:

```text
         ╔═════════════════════════════════════════╗
         ║   Bajo Esfuerzo (Rápido)  |  Gran Esfuerzo (Difícil)  ║
╔════════╬═══════════════════════════╬═══════════════════════════╣
║  Alto  ║  -> FASES P0 / P1 INICIO  ║  -> FASES P1 / P2 PLAN    ║
║ Impacto║ (Los "Goles Rápidos")     ║ (Las "Apuestas Grandes")  ║
╠════════╬═══════════════════════════╬═══════════════════════════╣
║  Bajo  ║  -> FASES P2 / P3 SCALE   ║  -> FASE P3 O IGNÓRALO    ║
║ Impacto║ (Los detalles estéticos y ║ (Aquellos lujos caros que ║
║        ║  "Buenas cosas Extra")    ║   te matarán el tiempo )  ║
╚════════╩═══════════════════════════╩═══════════════════════════╝
```
