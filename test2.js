const State = {
  activeTemplatePath: []
};

const template = {
  type: 'template',
  templateType: 'fraction',
  subExprs: {
    num: [],
    den: []
  },
  activeSubExpr: 'num',
  cursorIdx: 0,
  byteLen: 2
};

State.activeTemplatePath.push(template);

function getActiveContext() {
  const t = State.activeTemplatePath[State.activeTemplatePath.length - 1];
  const tokens = t.subExprs[t.activeSubExpr];
  return {
    tokens: tokens,
    cursorIdx: t.cursorIdx,
    setCursorIdx: (val) => { t.cursorIdx = val; },
    template: t
  };
}

const ctx = getActiveContext();
ctx.tokens.splice(ctx.cursorIdx, 0, { display: '1' });
ctx.setCursorIdx(ctx.cursorIdx + 1);

console.log(JSON.stringify(State.activeTemplatePath, null, 2));
