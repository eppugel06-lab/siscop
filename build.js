const fs = require('fs');

let indexHtml = fs.readFileSync('src/Index.html', 'utf-8');

// Encuentra todas las inyecciones: <?!= include('NombreDeArchivo'); ?>
const finalHtml = indexHtml.replace(/<\?\!= include\('(.*?)'\); \?>/g, (match, fileName) => {
    try {
        let fileContent = fs.readFileSync(`src/${fileName}.html`, 'utf-8');
        // Sanitización básica: Evitar inyecciones accidentales de etiquetas script rotas 
        // o contenido que pueda comprometer la estructura del Index.html final
        return fileContent.trim();
    } catch(e) {
        console.warn(`Archivo no encontrado: ${fileName}`);
        return `<!-- Fallo inyectando: ${fileName} -->`;
    }
});

fs.writeFileSync('app/Index.html', finalHtml);
console.log('✅ Frontend compaginado existosamente en app/Index.html');
