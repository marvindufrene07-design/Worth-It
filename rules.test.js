const assert = require('node:assert/strict');
const {decide} = require('../static/rules.js');
const baseline = ['Yes','Yes','No','No','No','No','No','No',8,3];
const check = (changes, title) => {const a=[...baseline];Object.entries(changes).forEach(([k,v])=>a[k]=v);assert.equal(decide(a).title,title);return decide(a);};
check({}, 'Consider buying');
check({0:'No',8:10}, 'Check first');
check({1:'Not sure'}, 'Check first');
check({2:'Yes',0:'No'}, 'Plan or find alternatives');
check({2:'Not sure'}, 'Plan or find alternatives');
assert.match(check({3:'Yes'}, 'Plan or find alternatives').next,/repayment/);
check({7:'Yes'}, 'Consider buying');
check({6:'Yes'}, 'Pause');
check({9:7}, 'Pause');
check({9:6}, 'Consider buying');
check({8:3}, 'Pause');
check({5:'Yes'}, 'Pause');
check({4:'Yes',9:10,6:'Yes',8:1}, 'Consider buying');
assert.match(check({4:'Yes',2:'Yes'}, 'Plan or find alternatives').next,/loaner|assistance/);
assert.match(check({4:'Yes',0:'No'}, 'Check first').next,/loaner|assistance/);
check({4:'Yes',5:'Yes'}, 'Plan or find alternatives');
// All categorical answer combinations with slider boundary values yield a valid result.
const choices=[['Yes','No','Not sure'],['Yes','No','Not sure'],['Yes','No','Not sure'],...Array(5).fill(['Yes','No']),[1,3,4,10],[1,6,7,10]];
let count=0;
function walk(a){if(a.length===10){const r=decide(a);assert.ok(['Check first','Pause','Plan or find alternatives','Consider buying'].includes(r.title));assert.ok(r.next && r.reasons.length);count++;return;}for(const x of choices[a.length])walk([...a,x]);}
walk([]); console.log(`Passed scenario checks and ${count} rule combinations.`);
