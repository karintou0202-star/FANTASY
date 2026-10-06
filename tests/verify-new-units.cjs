const fs=require('fs'),vm=require('vm'),assert=require('assert');
function runtime(html){
 const elements=new Map(),element=key=>{if(!elements.has(key))elements.set(key,{value:'fixed',innerHTML:'',textContent:'',style:{},dataset:{},classList:{add(){},remove(){},toggle(){}},insertAdjacentHTML(){},scrollIntoView(){},appendChild(){},closest(){return null}});return elements.get(key)};
 const ctx=vm.createContext({console,assert,structuredClone,Math,Set,Map,JSON,Number,String,Array,Object,Date,localStorage:{getItem:()=>null,setItem(){}},document:{querySelector:element,querySelectorAll:()=>[],createElement:()=>element(Symbol()),body:element('body')},MutationObserver:class{observe(){}},matchMedia:()=>({matches:true}),setTimeout:()=>0,setInterval:()=>0,clearTimeout(){},clearInterval(){},location:{},history:{}});
 for(const file of ['characters.js','npc.js','campaign-chapters.js','campaign-chapter5.js'])vm.runInContext(fs.readFileSync(file,'utf8'),ctx);
 for(const match of fs.readFileSync(html,'utf8').matchAll(/<script>([\s\S]*?)<\/script>/g))vm.runInContext(match[1],ctx);
 return code=>vm.runInContext(code,ctx);
}
async function main(){
 const npc=runtime('index.html');
 npc(`battleStep=async()=>{};render=()=>{};
 function setup(p,e){G={player:mkSide(p),enemy:mkSide(e,true),turn:1,actionCount:0,hand:[{unit:p[0],type:'scheme'}],deck:[],selected:[],npcTurns:[],currentCards:new Map()};G.player.power=G.enemy.power=10000;}
 for(const id of ['karzuf','ice','emon','kattole'])assert.equal(Object.values(CHARS[id].commands).reduce((a,b)=>a+b),8);
 setup(['emon','kattole'],['vanilla','vanilla_clone']);applyStrategyStartTraits();assert.equal(G.player.power,10000);assert.equal(effectiveStat(G.player,'kattole','charisma'),360);assert.equal(G.enemy.unitIds.reduce((s,id)=>s+(G.enemy.states[id].charismaDelta||0),0),-80);applyStrategyStartTraits();assert.equal(effectiveStat(G.player,'kattole','charisma'),360);
 setup(['ice','vanilla'],['vanilla','vanilla_clone']);gainPower(G.enemy,400);assert.equal(G.player.states.ice.sp,1);gainPower(G.enemy,0);assert.equal(G.player.states.ice.sp,1);
 `);
 await npc(`(async()=>{
 setup(['kattole','vanilla'],['kattole','vanilla']);await applyTurnEndTraits();assert.equal(G.player.power,9700);assert.equal(G.enemy.power,9700);assert.equal(effectiveStat(G.player,'kattole','charisma'),410);applyStrategyStartTraits();assert.equal(effectiveStat(G.player,'kattole','charisma'),410);await applyTurnEndTraits();assert.equal(effectiveStat(G.player,'kattole','charisma'),460);
 G.noPowerLoss=true;await applyTurnEndTraits();assert.equal(G.player.power,9400);assert.equal(effectiveStat(G.player,'kattole','charisma'),510);
 setup(['kattole','vanilla'],['vanilla','vanilla_clone']);G.player.power=150;let lost=false;const oldEnd=endEarly;endEarly=()=>{lost=true};assert.equal(await applyTurnEndTraits(),true);assert.equal(lost,true);endEarly=oldEnd;
 setup(['karzuf','vanilla'],['vanilla','vanilla_clone']);
 await resolvePair({unit:'karzuf',type:'prepare'},{unit:'vanilla',type:'recruit'},1);assert.equal(G.enemy.power,10400);assert.equal(G.enemy.mods.manipulation,1);
 await resolvePair({unit:'karzuf',type:'scheme'},{unit:'vanilla',type:'recruit'},2);assert.equal(G.enemy.power,9575);assert.equal(G.enemy.states.vanilla.sp,1);assert.equal(G.enemy.mods.manipulation,0);
 await resolvePair({unit:'karzuf',type:'scheme'},{unit:'vanilla',type:'blank'},3);assert.equal(G.enemy.power,9025);
 setup(['kattole','vanilla'],['lowja','vanilla']);G.currentCards.set(G.enemy,{unit:'lowja',type:'recruit'});await applySkill(G.player,G.enemy,'kattole','自軍');assert.equal(G.enemy.power,8200);
 setup(['kattole','vanilla'],['lowja','vanilla']);await resolvePair({unit:'kattole',type:'prepare'},{unit:'lowja',type:'prepare'},1);assert.equal(G.player.power,9325);assert.equal(G.enemy.states.lowja.sp,0);
 setup(['ice','vanilla'],['vanilla','vanilla_clone']);G.player.states.ice.sp=3;await resolvePair({unit:'ice',type:'prepare'},{unit:'vanilla',type:'blank'},1);assert.equal(G.enemy.power,8350);assert.equal(G.player.states.ice.sp,0);
 setup(['lowja','vanilla'],['emon','vanilla']);G.enemy.states.emon.sp=1;await resolvePair({unit:'lowja',type:'prepare'},{unit:'emon',type:'prepare'},1);assert.equal(G.enemy.power,10000);assert.equal(reducePower(G.player,5000),0);gainPower(G.player,400);assert.equal(G.player.power,10400);applyStrategyStartTraits();assert.equal(reducePower(G.player,100),100);
 })()`);
 const story=runtime('campaign.html');
 story(`function flush(){while(campaignLogQueue.length)advanceCampaignLog();}
 formation=['emon','kattole'];startBattle('zazan');assert.equal(battle.playerPower,2620);assert.equal(campaignStat('kattole','charisma'),360);assert.equal(battle.enemyCharismaDelta.main,-80);battle.turn=2;showCampaignCommands();assert.equal(campaignStat('kattole','charisma'),360);assert.equal(battle.enemyCharismaDelta.main,-160);
 formation=['karzuf','vanilla'];startBattle('zazan');battle.playerPower=battle.enemyPower=10000;battle.enemy.turns[0]=['recruit','recruit','blank','blank'];battle.selected=[{unit:'karzuf',type:'prepare'},...Array.from({length:3},()=>({unit:'karzuf',type:'scheme'}))];resolveTurn();flush();assert.equal(battle.enemyPower,8525);assert.equal(battle.enemyPrepUnits.main,1);assert.equal(battle.enemyManipulation,0);
 formation=['ice','vanilla'];startBattle('zazan');battle.playerPower=battle.enemyPower=10000;battle.enemy.turns[0]=['recruit','recruit','recruit','blank'];battle.selected=[...Array.from({length:3},()=>({unit:'vanilla',type:'recruit'})),{unit:'ice',type:'prepare'}];resolveTurn();flush();assert.equal(battle.playerPrep.ice,0);assert.equal(battle.enemyPower,9700);
 formation=['kattole','vanilla'];startBattle('zazan');battle.playerPower=battle.enemyPower=10000;battle.enemy.skill={id:'raid',name:'襲撃',cost:1,damage:960};battle.enemy.turns[0]=['prepare','blank','blank','blank'];battle.selected=[{unit:'kattole',type:'prepare'},...Array.from({length:3},()=>({unit:'vanilla',type:'blank'}))];resolveTurn();flush();assert.equal(battle.playerPower,8740);assert.equal(campaignStat('kattole','charisma'),410);assert.equal(battle.enemyPrepUnits.main,0);
 formation=['emon','vanilla'];startBattle('goblinBomb');battle.playerPower=battle.enemyPower=10000;battle.playerPrep.emon=1;battle.enemy.turns[0]=['prepare','scheme','scheme','scheme'];battle.enemy.skill={id:'raid',name:'襲撃',cost:1,damage:5000};battle.selected=[{unit:'emon',type:'prepare'},...Array.from({length:3},()=>({unit:'vanilla',type:'blank'}))];resolveTurn();flush();assert.equal(battle.playerPower,10000);assert.equal(campaignReducePlayer(5000),0);campaignStrategyStartTraits();assert.equal(campaignReducePlayer(100),100);
 formation=['kattole','vanilla'];startBattle('zazan');const initial=battle.playerPower;battle.enemyPower=100000;battle.enemy.turns[0]=['blank','blank','blank','blank'];battle.selected=Array.from({length:4},()=>({unit:'kattole',type:'recruit'}));resolveTurn();flush();assert.equal(battle.playerPower,initial+360*4-300);assert.equal(campaignStat('kattole','charisma'),410);advanceCampaignLog();assert.equal(campaignStat('kattole','charisma'),410);battle.enemy.turns[1]=['blank','blank','blank','blank'];battle.selected=Array.from({length:4},()=>({unit:'kattole',type:'recruit'}));const turn2=battle.playerPower;resolveTurn();flush();assert.equal(battle.playerPower,turn2+410*4-300);assert.equal(campaignStat('kattole','charisma'),460);
 formation=['kattole','vanilla'];startBattle('zazan');battle.playerPower=150;battle.enemyPower=10000;battle.enemy.turns[0]=['blank','blank','blank','blank'];battle.selected=Array.from({length:4},()=>({unit:'vanilla',type:'blank'}));resolveTurn();flush();assert.equal(battle.playerPower,-150);assert.equal(battle.afterLabel,'敗北結果へ');
 formation=['ice','vanilla'];startBattle('zazan');battle.enemy.skill={id:'ice_claw',name:'氷の爪',cost:1};battle.enemy.powerStat=1100;const hand=battle.hand.length;const power=battle.playerPower;prepEnemy();assert.equal(battle.playerPower,power-1650);assert.equal(battle.hand.length,hand-1);
 `);
 for(const file of ['characters.js','npc.js'])new vm.Script(fs.readFileSync(file,'utf8'),{filename:file});
 for(const file of ['index.html','campaign.html','formation-preview.html'])for(const m of fs.readFileSync(file,'utf8').matchAll(/<script>([\s\S]*?)<\/script>/g))new vm.Script(m[1],{filename:file});
 console.log('PASS: new units, permanent start traits, manipulation/blocking, intrigue, Ice passive/claw, charge simultaneous triggers, escape simultaneous damage and expiry, enemy skills, JS syntax.');
}
main().catch(e=>{console.error(e);process.exitCode=1});


