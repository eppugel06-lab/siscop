const fs = require('fs');
const content = fs.readFileSync('app/Código.js', 'utf-8');

const regex = /\/\/ SECCIÓN [1-5]/g;
let lastIndex = 0;
const sections = [];
let match;
const sectionNames = [
  '0_global.js',
  '1_api.js',
  '2_core.js',
  '3_utils.js',
  '4_security.js',
  '5_historical.js'
];

let currentIndex = 0;
while ((match = regex.exec(content)) !== null) {
    sections.push({
        text: content.substring(lastIndex, match.index),
        name: sectionNames[currentIndex]
    });
    currentIndex++;
    lastIndex = match.index;
}
sections.push({
    text: content.substring(lastIndex),
    name: sectionNames[currentIndex]
});

sections.forEach((s) => {
    fs.writeFileSync(`app/${s.name}`, s.text);
});

console.log('Split success');
