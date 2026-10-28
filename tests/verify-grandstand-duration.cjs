const fs=require('fs'),vm=require('vm'),assert=require('assert');
function runtime(saved={fantasyCampaignUnlocked:'12'}){
 const elements=new Map();
 const element=key=>{if(!elements.has(key))elements.set(key,{innerHTML:'',textContent:'',style:{},dataset:{},classList:{add(){},remove(){},toggle(){}},insertAdjacentHTML(){},scrollIntoView(){},appendChild(){},closest(){return null}});return elements.get(key)};
 const storage=new Map(Object.entries(saved));
 const ctx=vm.createContext({console,structuredClone,Math,Set,Map,JSON,Number,String,Array,Object,localStorage:{getItem:key=>storage.get(key)??null,setItem:(key,value)=>storage.set(key,String(value))},document:{querySelector:element,querySelectorAll:()=>[],createElement:()=>element(Symbol()),body:element('body')},MutationObserver:class{observe(){}},matchMedia:()=>({matches:true}),setTimeout:()=>0,setInterval:()=>0,clearTimeout(){},clearInterval(){},location:{},history:{}});
 ctx.FantasyPlayerData={connect:()=>({debug:false})};
 for(const file of ['characters.js','npc.js','campaign-chapters.js','campaign-chapter5.js'])vm.runInContext(fs.readFileSync(file,'utf8'),ctx,{filename:file});
 const html=fs.readFileSync('campaign.html','utf8');for(const match of html.matchAll(/<script>([\s\S]*?)<\/script>/g))vm.runInContext(match[1],ctx,{filename:'campaign.html'});
 return {run:code=>vm.runInContext(code,ctx),elements,storage};
}

const checked=runtime();checked.run(`
 formation=['lowja','vanilla'];startBattle('gigagald3');
 battle.playerPower=battle.enemyPower=100000;
 battle.selected=Array.from({length:4},()=>({unit:'vanilla',type:'blank'}));
 resolveTurn();while(campaignLogQueue.length)advanceCampaignLog();
 if(battle.grandstandMult!==1.5)throw Error('activation turn must retain 1.5x');
 const powered=battleSnapshot();battle.grandstandMult=1;applyBattleSnapshot(powered);
 if(battle.grandstandMult!==1.5)throw Error('log snapshot must reflect skill multiplier');
 advanceCampaignLog();
 if(battle.turn!==2||battle.grandstandMult!==1)throw Error('grandstand must expire before turn two strategy');
 const beforeEnemy=battle.enemyPower;
 playerSkill('lowja');
 if(beforeEnemy-battle.enemyPower!==1518.75)throw Error('fire plus reckless must persist without grandstand');
 battle.selected=Array.from({length:4},()=>({unit:'vanilla',type:'blank'}));
 const beforePlayer=battle.playerPower;resolveTurn();while(campaignLogQueue.length)advanceCampaignLog();
 if(beforePlayer-battle.playerPower!==2000)throw Error('turn two enemy scheme must deal 500 x 4');
 if(battle.grandstandMult!==1)throw Error('turn two must remain unboosted');
 formation=['gigagald','vanilla'];startBattle('zazan');battle.playerPower=battle.enemyPower=100000;
 battle.enemy.turns[0]=['blank','blank','blank','blank'];battle.selected=[{unit:'gigagald',type:'prepare'},{unit:'gigagald',type:'prepare'},...Array.from({length:2},()=>({unit:'vanilla',type:'blank'}))];
 resolveTurn();while(campaignLogQueue.length)advanceCampaignLog();if(battle.grandstandMult!==2)throw Error('player skill activation');
 advanceCampaignLog();if(battle.grandstandMult!==1)throw Error('player skill expiry');
 `);console.log('PASS: enemy and player grandstand expire before next strategy; activation turn, log snapshots, fire/reckless, and turn-two damage.');
