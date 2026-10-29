const fs=require('fs'),vm=require('vm'),assert=require('node:assert/strict'),player=require('../player-data.js'),gacha=require('../gacha.js');
function memory(){const m=new Map();return {m,getItem:k=>m.get(k)??null,setItem:(k,v)=>m.set(k,String(v))}}
const storage=memory(),store=player.create(storage);store.load();const node=new Map(),$=key=>{if(!node.has(key))node.set(key,{innerHTML:'',textContent:'',disabled:false,classList:{add(){},remove(){}},scrollIntoView(){}});return node.get(key)};
const context={store,debug:false},ctx=vm.createContext({playerContext:context,$,scrollToBattleResult(){},unitDisplayName:()=> '敵',randomNpcId:()=> 'npc',startMatch(){},G:null});
const html=fs.readFileSync('index.html','utf8'),start=html.indexOf('function showResult('),end=html.indexOf('\ninitSetup();',start);new vm.Script(fs.readFileSync('player-data.js','utf8'));vm.runInContext(html.slice(start,end),ctx);
function win(run,debug=false){context.debug=debug;ctx.G={mode:'streak',run,npc:{units:['x']},enemy:{},npcId:'npc'};ctx.showResult('勝利','win','');return ctx.G}
function runTo(n){let run={wins:0,stonesEarned:0};for(let i=0;i<n;i++){const g=win(run);assert.equal(store.load().highestStreak,Math.max(i+1,store.load().highestStreak));const before=storage.getItem(player.KEY);ctx.showResult('勝利','win','');assert.equal(storage.getItem(player.KEY),before);assert.equal(g.run.wins,i+1)}return run}
const clean=player.create(memory());clean.load();for(let i=1;i<=5;i++)assert.equal(clean.recordStreakWin(i).awarded,1);assert.equal(clean.load().stones,5);
let run=runTo(1);assert.equal(run.stonesEarned,1);assert.equal(store.load().stones,1);assert.deepEqual(player.create(storage).load().streakRewards,[1]);
run=runTo(5);assert.equal(run.stonesEarned,4);assert.equal(store.load().stones,5);assert.equal(store.load().highestStreak,5);
run=runTo(3);assert.equal(run.stonesEarned,0);assert.equal(store.load().stones,5);
store.update('gacha-unlock',d=>{d.tutorialTicket.used=true});const g=gacha.create({store,debug:false},()=>.4);assert.equal(g.draw('spend').data.stones,0);
run=runTo(8);assert.equal(run.stonesEarned,3);assert.equal(store.load().stones,3);assert.equal(store.load().highestStreak,8);assert.deepEqual(store.load().streakRewards,[1,2,3,4,5,6,7,8]);
const before=storage.getItem(player.KEY);context.debug=true;runToDebug();assert.equal(storage.getItem(player.KEY),before);function runToDebug(){let r={wins:0,stonesEarned:0};for(let i=0;i<9;i++)win(r,true);assert.equal(r.stonesEarned,0)}
context.debug=false;ctx.G={mode:'fixed',run:null,npc:{units:['x']},enemy:{},npcId:'npc'};ctx.showResult('勝利','win','');assert.equal(storage.getItem(player.KEY),before);
let failures=1;const real=store.recordStreakWin;context.store={...store,recordStreakWin:n=>{if(failures-- > 0)throw Error('failed');return real(n)}};run={wins:8,stonesEarned:0};win(run);assert.equal($('#nextStreakBtn').disabled,true);assert.ok($('#result').innerHTML.includes('保存を再試行'));$('#retryStreakReward').onclick();assert.equal($('#nextStreakBtn').disabled,false);assert.equal(store.load().highestStreak,9);assert.equal(store.load().stones,4);assert.equal(run.stonesEarned,1);
for(const m of html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/g))new vm.Script(m[1]);
console.log('PASS: actual streak result, per-win save, 5→3→8 rewards, reload, single battle, debug, gacha spending, duplicate result, storage failure retry');
