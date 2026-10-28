const fs=require('fs'),vm=require('vm'),assert=require('node:assert/strict'),api=require('../player-data.js');
const c=vm.createContext({});vm.runInContext(fs.readFileSync('characters.js','utf8')+'\nthis.ch=CHARS',c);const chars=c.ch,owned=['vanilla','vanilla_clone'];
const check=(ids,debug=false)=>api.validateFormation(ids,chars,owned,debug);
assert.equal(check(['vanilla','vanilla']),'');assert.equal(check(['vanilla','vanilla_clone']),'');assert.ok(check(['vanilla','hero_lloyd']));assert.ok(check(['hero_lloyd','hero_lloyd'],true));assert.ok(check(['coco','azoaras'],true));assert.ok(check(['solenarif','solenarif_spy'],true));assert.ok(check(['goron_test','vanilla'],true));
for(const [id,c] of Object.entries(chars))if(c.selectable!==false&&c.rarity<=5)assert.equal(check([id,'vanilla'],true),'',id);
console.log('PASS: initial owned formation, unowned rejection, duplicate/rarity/evolution/NPC rules, all playable debug units');
