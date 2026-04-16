const fs = require('fs');

let indexHtml = fs.readFileSync('src/Index.html', 'utf-8');

// Encuentra todas las inyecciones: <?!= include('NombreDeArchivo'); ?>
const finalHtml = indexHtml.replace(/<\?\!= include\('(.*?)'\); \?>/g, (match, fileName) => {
    try {
        const fileContent = fs.readFileSync(`src/${fileName}.html`, 'utf-8');
        return fileContent;
    } catch(e) {
        console.warn(`Archivo no encontrado: ${fileName}`);
        return `<!-- Fallo inyectando: ${fileName} -->`;
    }
});

fs.writeFileSync('app/Index.html', finalHtml);
console.log('✅ Frontend compaginado existosamente en app/Index.html');
