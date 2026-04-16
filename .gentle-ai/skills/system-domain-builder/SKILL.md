---
name: system-domain-builder
description: >
  Construye y persiste conocimiento de dominio de negocio desde fuentes externas:
  PDFs, imágenes, URLs de páginas específicas, palabras clave para investigación.
  El conocimiento se destila y guarda en _domains/ para todas las sesiones futuras.
  Triggers: "sube este PDF", "aprende sobre", "investiga el dominio de",
  "quiero que seas experto en", "lee esta página", "analiza este documento".
invocation: auto
---

# 🧠 System Domain Builder — Constructor de Conocimiento de Dominio

> **Perfil:** 15+ años en ingeniería del conocimiento y modelado de dominios.  
> **Entrega:** Archivos de dominio persistentes en `_domains/[rubro]/`.

---

## 📋 Tipos de Fuentes Aceptadas

| Fuente | Procesamiento | Ejemplo |
|--------|--------------|---------|
| **PDF** | Extraer texto, tablas, diagramas | Manuales, contratos, regulaciones |
| **URL** | Scraping de página completa | Documentación, artículos, wikis |
| **Imagen** | Análisis visual, OCR si hay texto | Diagramas, mockups, formularios |
| **Texto** | Procesamiento directo | Descripción del negocio por el usuario |
| **Keywords** | Investigación con contexto | "Real estate en México", "fintech Colombia" |

---

## 🔄 Pipeline de Procesamiento

```
Fuente recibida
     │
     ▼
┌─────────────────────┐
│ Domain Knowledge    │  1. Extraer contenido raw
│ Extractor          │  2. Identificar conceptos clave
│                     │  3. Detectar reglas de negocio
│                     │  4. Extraer vocabulario del dominio
│                     │  5. Identificar actores/roles
│                     │  6. Detectar restricciones
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ Estructurar en      │  → concepts.md (entidades, value objects)
│ formato _domains/   │  → rules.md (invariantes, reglas)
│                     │  → glossary.md (glosario de términos)
│                     │  → constraints.md (prohibiciones)
│                     │  → references/[fuente].md (fuente procesada)
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ Confirmar al        │  → "Aprendí X conceptos, Y reglas, Z restricciones"
│ usuario             │  → "¿Es correcto? ¿Falta algo?"
└─────────────────────┘
```

---

## 🛠️ Herramientas de Extracción (Ejecución Obligatoria)

Cuando la fuente recibida sea un archivo físico, URL o se requiera persistir, DEBES utilizar los scripts locales.

**Comandos de ejecución:**
1. **Navegar al directorio:** `cd system-domain-builder/scripts/`
2. **Entorno Virtual (Obligatorio):** - Crea el entorno si no existe: `python -m venv venv`
   - Actívalo: `source venv/Scripts/activate` (en Windows) o `source venv/bin/activate` (Mac/Linux).
   - Instala dependencias: `pip install -r requirements.txt`
3. **Ejecutar herramienta:**
   - Para URLs: `python fetch_url.py [URL]`
   - **Para PDFs:** `python extract_pdf.py [RUTA_AL_PDF]`
   - **Para Imágenes:** `python analyze_image.py [RUTA_A_LA_IMAGEN]`
   - **Para Persistir el Dominio:** `python build_domain.py [NOMBRE_DOMINIO]`

Captura el output del script y utilízalo como entrada para el Pipeline de Procesamiento. No asumas contenido de archivos binarios sin procesarlos primero.
---

## 📂 Estructura de Output

```
_domains/[nombre-dominio]/
├── concepts.md          ← Entidades, relaciones, estados
├── rules.md             ← Reglas de negocio, invariantes
├── glossary.md          ← Vocabulario con definiciones
├── constraints.md       ← Restricciones y prohibiciones
├── agents.md            ← Agentes especializados (si aplica)
└── references/
    ├── manual-operativo.md   ← Fuente 1 procesada
    ├── regulacion-fiscal.md  ← Fuente 2 procesada
    └── entrevista-usuario.md ← Fuente 3 procesada
```

---

## 📋 Formato de Referencia Procesada

```markdown
# Referencia — [Nombre de la Fuente]

## Fuente original
- Tipo: PDF / URL / Imagen / Conversación
- Origen: [ruta, URL o descripción]
- Fecha de procesamiento: YYYY-MM-DD
- Procesado por: system-domain-builder

## Conocimiento Extraído

### Conceptos Principales
- [concepto 1]: [definición]
- [concepto 2]: [definición]

### Reglas de Negocio Identificadas
- RN-XXX: [regla]
- RN-XXX: [regla]

### Actores/Roles Identificados
- [actor]: [descripción y permisos]

### Restricciones
- [restricción 1]

### Términos del Glosario
- [término]: [definición en contexto del dominio]
```

---

## ⚠️ Reglas

```
1. Todo conocimiento se persiste en _domains/ — no queda solo en la conversación
2. Confirmar con el usuario antes de guardar (puede haber errores de extracción)
3. Si el dominio ya existe, MERGE con el existente (no reemplazar)
4. Las references/ nunca se eliminan — son append-only
5. Si la fuente es ambigua, pedir aclaración al usuario
6. Nunca inventar reglas de negocio — solo extraer lo que dice la fuente
```
