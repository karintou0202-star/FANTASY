const assert=require('node:assert/strict');
const {create,KEY}=require('../player-data.js');
function storage(initial={}){const m=new Map(Object.entries(initial));return {getItem:k=>m.get(k)??null,setItem:(k,v)=>m.set(k,String(v)),m}}
let s=storage(),p=create(s),d=p.load();assert.deepEqual(d.owned,['vanilla','vanilla_clone']);assert.equal(d.stones,0);assert.deepEqual(d.tutorialTicket,{granted:true,used:false});assert.deepEqual(d.normalFormation,['vanilla','vanilla_clone']);
assert.equal(p.debugEnabled('?fantasyDebug=1'),true);assert.equal(p.debugEnabled(''),false);let original=s.getItem(KEY);p.setDebugFormation(['hero_lloyd','solenarif']);assert.equal(s.getItem(KEY),original);assert.deepEqual(p.getDebugFormation(),['hero_lloyd','solenarif']);
assert.equal(p.update('once',x=>x.stones++).applied,true);assert.equal(p.update('once',x=>x.stones++).applied,false);assert.equal(p.load().stones,1);
s=storage({fantasyCampaignUnlocked:'12',fantasyCampaignReadStages_v1:JSON.stringify(['1:3','2:2','3:3','4:4']),fantasyFormation:JSON.stringify(['hero_lloyd','coco'])});p=create(s);d=p.load();assert.deepEqual(Object.keys(d.chapterClears),['1','2','3','4']);assert.deepEqual(d.normalFormation,['vanilla','vanilla_clone']);assert.equal(s.getItem('fantasyCampaignUnlocked'),'12');assert.deepEqual(p.load(),d);
s=storage({fantasyCampaignUnlocked:'3',fantasyCampaignReadStages_v1:'[]'});d=create(s).load();assert.equal(d.chapterClears[1],undefined);assert.equal(d.migration.conflicts[0].chapter,1);
s=storage({[KEY]:'broken'});assert.throws(()=>create(s).load());assert.equal(s.getItem(KEY),'broken');
console.log('PASS: initial state, separate debug storage, idempotent updates, legacy migration, conflicts and corrupt data preservation');
