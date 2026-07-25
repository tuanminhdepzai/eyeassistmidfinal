const fs = require('fs');
const path = require('path');

const scriptContent = fs.readFileSync('d:\\EyeAssit\\script.js', 'utf8');

const dom = new Proxy({}, {
  get: () => ({ classList: { add: () => {}, remove: () => {}, toggle: () => {} }, style: {}, innerHTML: '', className: '' })
});
const document = { 
  createElement: () => ({ appendChild: () => {}, classList: { add: () => {}, remove: () => {} }, setAttribute: () => {} }),
  getElementById: () => ({ addEventListener: () => {} }),
  addEventListener: () => {}
};

global.dom = dom;
global.document = document;
global.window = { addEventListener: () => {} };

eval(scriptContent);

// Simulate User Actions
console.log("Pressing ON...");
handleKey('ON');

console.log("Pressing FRAC...");
handleKey('FRAC');
console.log("Active Template Path Length:", State.activeTemplatePath.length);
console.log("Tokens:", JSON.stringify(State.tokens, null, 2));

console.log("Pressing 1...");
handleKey('1');
console.log("Tokens:", JSON.stringify(State.tokens, null, 2));
