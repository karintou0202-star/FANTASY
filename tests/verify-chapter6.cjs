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
const r=runtime({fantasyCampaignUnlocked:'20'});
r.run(`
 if(STAGES.length!==28||STAGES.filter(s=>s.chapter===6).length!==8)throw Error('chapter six episodes');
 const episodes=STAGES.filter(s=>s.chapter===6);
 if(JSON.stringify(episodes.map(s=>s.hasBattle))!==JSON.stringify([false,false,false,true,true,false,true,false]))throw Error('battle placement');
 if(CAMPAIGN_CHAPTER_SCENES[6].flat().filter(e=>e.type==='battle').length!==3)throw Error('three battles');
 if(isStageRead(episodes[0])||!isStageRead(STAGES[19]))throw Error('existing saves/new chapter unread');
 if(!CHAPTERS[6].some(e=>e.speaker==='ソレナリフ'&&e.text.includes('なんかあった')))throw Error('ending');
 if(!CHAPTERS[6].some(e=>e.type==='notice'&&e.text.includes('槍使い・エイジ')))throw Error('reward');
 formation=['lowja','tsukune'];
 function turn(cards){battle.selected=cards.map(c=>({unit:c[0],type:c[1]}));resolveTurn();while(campaignLogQueue.length)advanceCampaignLog();}
 function cards(type){return Array.from({length:4},()=>['tsukune',type]);}
 function nextTurn(){advanceCampaignLog();}
 // A kill before disassembly cannot count as a rescue.
 startBattle('chapter6_rescue');battle.enemyPower=100;turn([['lowja','prepare'],...cards('recruit').slice(0,3)]);
 if(battle.rescueSucceeded||battle.afterLabel!=='救出失敗へ')throw Error('kill before disassembly');
 // A core appears immediately, once; subsequent commands must not destroy it.
 startBattle('chapter6_rescue');turn(cards('recruit'));nextTurn();
 if(!battle.enemyReassemblyArmed.main||battle.turn!==2)throw Error('disassembly prepared');
 battle.enemyPower=600;turn([['lowja','prepare'],...cards('scheme').slice(0,3)]);
 if(!battle.rescueSucceeded||battle.enemyPower!==100||battle.actionCount!==5||battle.afterLabel!=='救出成功へ')throw Error('immediate rescue');
 nextTurn();if(!$('#result').innerHTML.includes('勝利'))throw Error('rescue victory');
 // A legal command allocation can rescue Rat without changing enemy stats.
 startBattle('chapter6_rescue');turn(cards('recruit'));nextTurn();
 turn([['lowja','prepare'],['lowja','scheme'],['tsukune','prepare'],['tsukune','scheme']]);nextTurn();
 turn([['lowja','scheme'],['lowja','scheme'],['lowja','scheme'],['lowja','prepare']]);
 if(!battle.rescueSucceeded||battle.enemyPower!==100)throw Error('natural rescue strategy');
 // Reaching exactly 100 without a revival is not sufficient.
 startBattle('chapter6_rescue');battle.enemyPower=100;if(campaignCheckEnemyReassembly()||battle.rescueSucceeded)throw Error('accidental 100');
 // The final phase is always a failure, even with greater player power.
 startBattle('chapter6_rescue');turn(cards('recruit'));nextTurn();turn(cards('recruit'));nextTurn();turn(cards('recruit'));
 if(battle.afterLabel!=='救出失敗へ'||battle.rescueSucceeded)throw Error('rescue deadline');nextTurn();if(!$('#result').innerHTML.includes('敗北'))throw Error('deadline loss');
 // Exact zero, negative overkill and the once-per-battle limit.
 startBattle('chapter6_rescue');campaignEnemyReassemblySkill(battle.enemy,'main');battle.enemyPower=0;
 if(!campaignCheckEnemyReassembly()||battle.enemyPower!==100)throw Error('zero revival');
 startBattle('chapter6_eiji_gasshaan');campaignEnemyReassemblySkill(battle.enemy.units.A,'A');battle.enemyPower=-500;
 if(!campaignCheckEnemyReassembly()||battle.enemyPower!==100)throw Error('overkill revival');
 campaignEnemyReassemblySkill(battle.enemy.units.A,'A');battle.enemyPower=0;if(campaignCheckEnemyReassembly())throw Error('second revival');
 // Actual specified fixed turns, overlapping bonuses and permanent recruitment.
 startBattle('chapter6_eiji_gasshaan');turn(cards('recruit'));nextTurn();
 if(battle.enemyReassemblyBonuses[2]!==500||battle.enemyReassemblyBonuses[3]!==1000)throw Error('first bonus schedule');
 turn(cards('recruit'));nextTurn();
 if(battle.enemyReassemblyBonuses[3]!==1500||!battle.log.some(l=>l.includes('ターン開始時に戦力 +500')))throw Error('overlap schedule');
 turn(cards('recruit'));
 if(!battle.log.some(l=>l.includes('ターン開始時に戦力 +1500')))throw Error('turn three bonus');
 if(Math.abs(battle.enemyCharismaMult.B-Math.pow(1.1,5))>1e-10)throw Error('Eiji charisma accumulation');
 if(!battle.log.some(l=>l.includes('決戦スキル')&&l.includes('準備完了')))throw Error('Peerless ready');
 const oldMultiplier=battle.enemyCharismaMult.B;startBattle('chapter6_eiji_gasshaan');if(battle.enemyCharismaMult?.B||battle.enemyReassemblyUsed?.A)throw Error('retry reset');
 // Charge triggers use current commands and leave established skills intact.
 formation=['hero_lloyd','tsukune'];startBattle('chapter6_kattoru');battle.playerPower=10000;
 turn([['hero_lloyd','recruit'],...cards('recruit').slice(0,3)]);
 if(!battle.log.some(l=>l.includes('突撃'))||battle.playerPower!==10000-900+campaignStat('hero_lloyd','charisma')+3*campaignStat('tsukune','charisma'))throw Error('charge/recruit');
 startBattle('chapter6_kattoru');battle.playerPrep.hero_lloyd=1;
 turn([['hero_lloyd','prepare'],...cards('recruit').slice(0,3)]);
 if(!battle.log.some(l=>l.includes('聖剣')&&l.includes('発動')))throw Error('charge cancels established skill');
 // Walk the full chapter, including story after wins and read/battle replay.
 maxUnlocked=20;
 for(let i=20;i<28;i++){
  startStage(i,true);let guard=0;
  while(!isStageRead(STAGES[i])){
   if(++guard>2000)throw Error('story traversal '+i);
   const event=CHAPTERS[chapter][pos];
   if(event?.type==='battle'){endBattle(true);$('#continueBtn').onclick();}else nextEvent();
  }
 }
 if(maxUnlocked!==28||!readStages.has('6:8'))throw Error('chapter six completion');
 startStage(24);if(!battleOnly||battle.id!=='chapter6_rescue')throw Error('read battle replay');
 startStage(24,true);if(battleOnly)throw Error('story reread');renderStageMenu();
`);
assert.ok(r.elements.get('#stageMenu').innerHTML.includes('ストーリー③'));
assert.ok(r.elements.get('#stageMenu').innerHTML.includes('第6章　エイジ回'));
console.log('PASS: 8 episodes/3 battles, save migration, endings/reward, rescue success/early kill/deadline/overkill, one-use enemy revival, overlapping +500/+1500, Eiji charisma, charge triggers, full chapter progression and replay.');
