import fs from 'node:fs';
import path from 'node:path';
import readline from 'node:readline';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function askQuestion(query) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise(resolve => rl.question(query, ans => {
        rl.close();
        resolve(ans);
    }));
}

function auditSkills() {
    const skillsDir = __dirname;
    const entries = fs.readdirSync(skillsDir, { withFileTypes: true });
    
    let totalSkills = 0;
    const issues = [];
    const report = [];

    for (const entry of entries) {
        if (!entry.isDirectory()) continue;
        
        const skillName = entry.name;
        // Ignoramos carpetas internas del sistema (con guión bajo)
        if (skillName.startsWith('_')) continue;
        
        const skillFilePath = path.join(skillsDir, skillName, 'SKILL.md');
        if (!fs.existsSync(skillFilePath)) continue;
        
        totalSkills++;
        const content = fs.readFileSync(skillFilePath, 'utf8');
        
        const hasFrontmatter = /^---[\s\S]+?---/.test(content);
        const hasAgents = content.toLowerCase().includes('agentes activos') || content.toLowerCase().includes('agentes');
        const hasFormat = content.toLowerCase().match(/estructura de entrega|formato de entrega|formato de reporte|output/);
        const hasRules = content.toLowerCase().includes('reglas');
        
        report.push({
            name: skillName,
            hasFrontmatter,
            hasAgents,
            hasFormat: !!hasFormat,
            hasRules
        });

        if (!hasAgents) issues.push({ skill: skillName, type: 'missing_agents', path: skillFilePath });
        if (!hasFormat) issues.push({ skill: skillName, type: 'missing_format', path: skillFilePath });
        if (!hasFrontmatter) issues.push({ skill: skillName, type: 'missing_frontmatter', path: skillFilePath });
        if (!hasRules) issues.push({ skill: skillName, type: 'missing_rules', path: skillFilePath });
    }

    return { totalSkills, report, issues };
}

function applyAutoFixes(issues) {
    console.log('\n🛠️  Aplicando Auto-Fixes...');
    
    // Group issues by file
    const fixesByFile = {};
    for (const issue of issues) {
        if (!fixesByFile[issue.path]) {
            fixesByFile[issue.path] = { types: [] };
        }
        fixesByFile[issue.path].types.push(issue.type);
    }
    
    for (const [filePath, issueData] of Object.entries(fixesByFile)) {
        let content = fs.readFileSync(filePath, 'utf8');
        let modificationsMade = false;

        if (issueData.types.includes('missing_agents')) {
            const genericAgents = `\n---\n\n## 🤖 Agentes Activos en este Skill\n\n| Orden | Agente | Función |\n|-------|--------|---------|\n| 1 | [Agente Principal] | [Función Primaria] |\n| 2 | [Agente Secundario] | [Soporte] |\n`;
            content += genericAgents;
            modificationsMade = true;
        }

        if (issueData.types.includes('missing_format')) {
            const genericFormat = `\n---\n\n## 📂 Formato de Entrega\n\n\`\`\`markdown\n## Ouptut / Entregable — [Título]\n\n[Definir aquí la estructura base del Markdown/Artefacto que genera el skill]\n\`\`\`\n`;
            content += genericFormat;
            modificationsMade = true;
        }

        if (modificationsMade) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`✅ Fixed: ${path.basename(path.dirname(filePath))}/SKILL.md`);
        }
    }
    
    console.log('✅ Todos los fixes aplicados exitosamente. Revisa los archivos modificados para rellenar los placeholders [].');
}

async function main() {
    console.log('=============================================');
    console.log('🚀 Iniciando Auditoría de Skills del Proyecto');
    console.log('=============================================\n');

    const { totalSkills, report, issues } = auditSkills();
    
    console.log(`📍 Skills analizados: ${totalSkills}`);
    console.log(`⚠️  Inconsistencias detectadas: ${issues.length}\n`);
    
    if (issues.length === 0) {
        console.log('🎉 Excelente! Todos los Skills cumplen con el estándar arquitectónico.');
        return;
    }
    
    console.log('🔍 Detalle de Hallazgos Críticos:');
    issues.forEach((issue, idx) => {
        let label = '';
        if (issue.type === 'missing_agents') label = '🔴 Falta sección de "Agentes Activos"';
        if (issue.type === 'missing_format') label = '🔴 Falta sección de "Formato de Entrega / Output"';
        if (issue.type === 'missing_rules') label = '🔴 Falta sección de "Reglas"';
        if (issue.type === 'missing_frontmatter') label = '🔴 Falta Frontmatter YAML';
        console.log(`  ${idx + 1}. [${issue.skill}] -> ${label}`);
    });
    
    console.log('\n=============================================');
    const answer = await askQuestion('¿Deseas aplicar una corrección automática agregando plantillas estándar a los archivos afectados? (s/n): ');
    
    if (answer.toLowerCase() === 's' || answer.toLowerCase() === 'si') {
        applyAutoFixes(issues);
    } else {
        console.log('⏭️  Corrección automática abortada por el usuario. Haz las correcciones manualmente.');
    }
}

main().catch(console.error);
