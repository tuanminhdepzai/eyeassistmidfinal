const fs = require('fs');
const path = require('path');

const scriptContent = fs.readFileSync('d:\\EyeAssit\\script.js', 'utf8');

// Mock DOM
const dom = new Proxy({}, {
  get: () => ({ classList: { add: () => {}, remove: () => {}, toggle: () => {} } })
});
const document = { 
  createElement: () => ({ appendChild: () => {}, classList: { add: () => {}, remove: () => {} }, setAttribute: () => {} }),
  getElementById: () => ({ addEventListener: () => {} }),
  addEventListener: () => {}
};

global.dom = dom;
global.document = document;
global.window = { addEventListener: () => {} };

// Run script.js code in this context
eval(scriptContent);

// Set up state
State.tokens = [
  makeIntegralTemplate()
];
State.tokens[0].subExprs.formula = [ { type: 'NUM', val: 1, raw: '1', display: '1', byteLen: 1 } ];
State.tokens[0].subExprs.lower = [ { type: 'NUM', val: 0, raw: '0', display: '0', byteLen: 1 } ];
State.tokens[0].subExprs.upper = [ { type: 'NUM', val: 1, raw: '1', display: '1', byteLen: 1 } ];

console.log("Before evaluate:", JSON.stringify(State.tokens, null, 2));

try {
  const result = evaluateExpression(State.tokens);
  console.log("Result:", result);
} catch (e) {
  console.error("Error evaluating:", e);
}
