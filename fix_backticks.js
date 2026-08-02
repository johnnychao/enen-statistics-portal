const fs = require('fs');
const file = 'js/app.js';
let content = fs.readFileSync(file, 'utf8');
content = content.replace(/\\`/g, '`');
fs.writeFileSync(file, content);
console.log('Fixed backticks in app.js');
