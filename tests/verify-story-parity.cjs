const fs=require('fs'),vm=require('vm'),assert=require('assert');
function runtime(saved={fantasyCampaignUnlocked:'12'}){
 const elements=new Map();
 const element=key=>{if(!elements.has(key))elements.set(key,{innerHTML:'',textContent:'',style:{},dataset:{},classList:{add(){},remove(){},toggle(){}},insertAdjacentHTML(){},scrollIntoView(){},appendChild(){},closest(){return null}});return elements.get(key)};
 const storage=new Map(Object.entries(saved));
 const ctx=vm.createContext({console,structuredClone,Math,Set,Map,JSON,Number,String,Array,Object,localStorage:{getItem:key=>storage.get(key)??null,setItem:(key,value)=>storage.set(key,String(value))},document:{querySelector:element,querySelectorAll:()=>[],createElement:()=>element(Symbol()),body:element('body')},MutationObserver:class{observe(){}},matchMedia:()=>({matches:true}),setTimeout:()=>0,setInterval:()=>0,clearTimeout(){},clearInterval(){},location:{},history:{}});
 for(const file of ['characters.js','npc.js','campaign-chapters.js','campaign-chapter5.js'])vm.runInContext(fs.readFileSync(file,'utf8'),ctx,{filename:file});
 const html=fs.readFileSync('campaign.html','utf8');for(const match of html.matchAll(/<script>([\s\S]*?)<\/script>/g))vm.runInContext(match[1],ctx,{filename:'campaign.html'});
 return {run:code=>vm.runInContext(code,ctx),elements,storage};
}
const r=runtime();
r.run(`
 if(STAGES.length!==28)throw Error('stage count');
 if(STAGES.filter(s=>s.chapter===5).length!==8)throw Error('chapter five count');
 if(!isStageRead(STAGES[11])||isStageRead(STAGES[12]))throw Error('save migration');
 if(CAMPAIGN_CHAPTER_SCENES[5].flat().filter(e=>e.type==='battle').length!==3)throw Error('battle count');
 for(const stage of STAGES){if(!stage.title)throw Error('missing title');if(stage.battle&&!BATTLES[stage.battle])throw Error('missing battle');}
 for(const id of ['goblin_short_test','goblin_reinforcements_test','goron_test']){const npc=NPCS[id],e=ENEMIES[id];if(e.power!==npc.initialPower||JSON.stringify(e.turns)!==JSON.stringify(npc.turns.map(t=>t.map(a=>a[1]))))throw Error('NPC reuse');}
 formation=['vanilla','vanilla_clone'];
 function turn(types){battle.selected=types.map((type,i)=>({unit:i%2?'vanilla_clone':'vanilla',type}));resolveTurn();while(campaignLogQueue.length)advanceCampaignLog();}
 startBattle('goblin_short_test');
 turn(['recruit','recruit','recruit','recruit']);advanceCampaignLog();
 if(battle.turn!==2)throw Error('turn two');
 turn(['prepare','prepare','prepare','prepare']);
 if(!battle.log.some(l=>l.includes('爆発')&&l.includes('準備完了')))throw Error('explosion ready');
 if(!battle.afterLogs||!Number.isFinite(battle.playerPower))throw Error('explosion resolution');
 if(!battle.log.some(l=>l.includes('自軍戦力-3000')))throw Error('explosion damage');
 if(battle.turn!==2)throw Error('short battle limit');
 startBattle('goblin_reinforcements_test');
 turn(['recruit','recruit','recruit','recruit']);advanceCampaignLog();
 turn(['recruit','recruit','recruit','recruit']);
 if(battle.enemyPower!==9500||!battle.log.some(l=>l.includes('戦力 +8000')))throw Error('reinforcements');
 startBattle('goblin_reinforcements_test');
 turn(['scheme','scheme','scheme','scheme']);
 if(battle.enemyPower>0||battle.turn!==1)throw Error('early assassination');
 startBattle('goron_test');
 turn(['recruit','recruit','recruit','recruit']);advanceCampaignLog();
 if(battle.enemyPower!==4720)throw Error('Goron recruitment');
 turn(['prepare','prepare','prepare','prepare']);
 if(battle.deck.slice(0,2).some(c=>c.type!=='blank')||!battle.enemyZeroAtFinal)throw Error('chain explosion');
 if(battle.enemyPower!==2720)throw Error('four nuisance bombs');
 advanceCampaignLog();
 const prepBefore={...battle.playerPrep};
 turn(['blank','blank','recruit','recruit']);
 if(battle.enemyPower!==0||battle.playerPower<=0)throw Error('Goron final victory');
 if(!battle.log.some(l=>l.includes('何もしない')))throw Error('blank commands');
 startBattle('goron_test');battle.playerPower=500;battle.enemyPower=500;prepEnemy();
 if(battle.playerPower!==0||battle.enemyPower!==0||campaignTieWin())throw Error('Goron tie wins');
 startBattle('goblinBomb');battle.enemyDecisive={damage:5000};battle.playerPower=8000;campaignEnemyDecisive();
 if(battle.playerPower!==3000)throw Error('existing goblin battle');
 startBattle('zazan');battle.enemyDecisive={name:'ザザン',multiplier:1.7};campaignEnemyDecisive();
 if(battle.enemyPower!==1360)throw Error('existing multiplier');
 // Traverse every new scene through normal story/battle/ending transitions.
 maxUnlocked=STAGES.length;formation=['vanilla','vanilla_clone'];
 for(let i=12;i<20;i++){
  startStage(i,true);let guard=0;
  while(!readStages.has(stageReadKey(STAGES[i]))){
   if(++guard>1000)throw Error('story loop '+i);
   const event=CHAPTERS[chapter][pos];
   if(event?.type==='battle'){endBattle(true);$('#continueBtn').onclick();}
   else nextEvent();
  }
 }
 if(!readStages.has('5:8')||maxUnlocked!==28)throw Error('chapter completion');
 startStage(13);if(!battleOnly||battle.id!=='goblin_short_test')throw Error('battle replay');
 startStage(13,true);if(battleOnly)throw Error('story replay');
 renderStageMenu();
`);
assert.equal((r.elements.get('#stageMenu').innerHTML.match(/class="chapterFolder"/g)||[]).length,6);
const fresh=runtime({});fresh.run(`startStage(12);if(currentStageIndex!==0)throw Error('locked stage access');`);
const saved=runtime({fantasyCampaignUnlocked:'12',fantasyCampaignReadStages_v1:'["1:1","4:4"]'});saved.run(`if(readStages.size!==2||!isStageRead(STAGES[11]))throw Error('existing read keys');`);
console.log('PASS: chapter grouping, saved progress, 8 scenes, 3 battles, short finals, explosion, reinforcements, Goron bombs/blank cards/ties/final, existing battles, and replay transitions.');

const checked=runtime({fantasyCampaignUnlocked:"20"});checked.run("\n formation=['tsukune','zazan'];startBattle('goron_test');battle.playerPower=1000;battle.decisive={zazan:1.7,tsukune:1.3};campaignPlayerDecisive();if(battle.playerPower!==1300||!battle.decisive.zazan||battle.decisive.tsukune)throw Error('one skill in formation order');\n formation=['vanilla','vanilla_clone'];startBattle('gigagald3');battle.enemyPower=1000;battle.grandstandMult=1;battle.enemyDamageTakenMult=1;const hit=campaignReduceEnemy(675,true);if(hit!==1518.75||battle.enemyPower!==-518.75)throw Error('fraction before phase end');\n startBattle('ggg1');battle.enemy.skill={id:'blizzard',name:'吹雪',cost:1};battle.enemyPrepUnits={main:0};const hand=battle.hand.length;prepEnemy();if(!battle.powerFog||battle.hand.length!==hand-1)throw Error('enemy blizzard');renderBattle();if($('#playerPower').textContent!=='????'||$('#enemyPower').textContent!=='????')throw Error('fog UI');\n startBattle('goron_test');renderBattle();if(!$('#playerProfiles').innerHTML.includes('unitstate')||!$('#playerProfiles').innerHTML.includes('準備')||!$('#selection').innerHTML.includes('4枚目'))throw Error('compact unit UI');\n formation=['coco','vanilla'];startBattle('goron_test');playerSkill('coco');if(battle.powerFog||!battle.enemyPowerFog)throw Error('own blizzard must not obscure own view');\n formation=['ggg','vanilla'];startBattle('ggg1');battle.playerPower=10000;battle.enemyPower=10000;battle.playerPrep.ggg=3;battle.enemyPrepUnits={main:3};battle.enemyPrep=3;battle.enemy.turns[0]=['prepare','recruit','recruit','recruit'];battle.selected=[{unit:'ggg',type:'prepare'},...Array.from({length:3},()=>({unit:'vanilla',type:'recruit'}))];resolveTurn();while(campaignLogQueue.length)advanceCampaignLog();if(!battle.log.some(l=>l.includes('自軍戦力-1500'))||battle.enemyPower!==8000)throw Error('simultaneous skill regression');\n");
console.log("PASS: single decisive skill, formation order, fractional damage, Blizzard visibility, compact UI and simultaneous skills.");
