// Stage 1: independent player state. Existing game screens are connected in later stages.
(function(root){
 'use strict';
 const KEY='fantasyPlayerData_v1', DEBUG_FORMATION='fantasyDebugFormation_v1';
 const thresholds=[3,5,8,12,20,28], finalKeys=['1:3','2:2','3:3','4:4','5:8','6:8'];
 const clone=value=>JSON.parse(JSON.stringify(value));
 function create(storage){
  function parse(key){const raw=storage.getItem(key);if(raw===null)return null;try{return JSON.parse(raw)}catch(e){return undefined}}
  function initial(){
   const unlockRaw=storage.getItem('fantasyCampaignUnlocked'),readRaw=storage.getItem('fantasyCampaignReadStages_v1'),oldFormation=storage.getItem('fantasyFormation'),tutorial=storage.getItem('fantasy_story_demo_v1');
   const oldPlayer=[unlockRaw,readRaw,oldFormation,tutorial].some(v=>v!==null);
   const unlock=unlockRaw===null?null:Number(unlockRaw),read=parse('fantasyCampaignReadStages_v1');
   const validUnlock=unlock!==null&&Number.isInteger(unlock)&&unlock>=0&&unlock<=28;
   const validRead=Array.isArray(read)&&read.every(v=>typeof v==='string');
   const chapters={},conflicts=[];
   for(let i=0;i<6;i++){
    const byProgress=validUnlock?unlock>=thresholds[i]:null;
    const byRead=validRead?read.includes(finalKeys[i]):null;
    if(byProgress!==null&&byRead!==null&&byProgress!==byRead){conflicts.push({chapter:i+1,progress:byProgress,read:byRead});continue}
    if(byProgress===true||byRead===true)chapters[i+1]=true;
   }
   if(unlockRaw!==null&&!validUnlock)conflicts.push({field:'fantasyCampaignUnlocked',reason:'invalid'});
   if(readRaw!==null&&!validRead)conflicts.push({field:'fantasyCampaignReadStages_v1',reason:'invalid'});
   return {version:1,owned:['vanilla','vanilla_clone'],stones:0,exchangePoints:{2:0,3:0,4:0,5:0},tutorialTicket:{granted:true,used:false},storyRewards:{},chapterClears:chapters,streakRewards:[],solenarifAwakened:false,normalFormation:['vanilla','vanilla_clone'],operations:[],migration:{legacy:oldPlayer,conflicts,legacyFormation:oldFormation,legacyTutorial:tutorial,legacyUnlocked:unlockRaw,legacyRead:readRaw}};
  }
  const REWARDS={tutorial:'hero_lloyd',1:'tsukune',2:'lowja',3:'jackeen',4:'solenarif',5:'olympus',6:'eiji'};
  function grant(data,key){
   const id=REWARDS[key];if(!id)throw Error('Unknown story reward');
   data.storyRewards??={};data.owned??=[];
   if(data.storyRewards[key])return {id,newlyAdded:false};
   const replaced=id==='solenarif'&&(data.solenarifAwakened||data.owned.includes('solenarif_spy'));
   const newlyAdded=!replaced&&!data.owned.includes(id);if(newlyAdded)data.owned.push(id);
   data.storyRewards[key]=true;
   if(key==='tutorial')data.tutorialComplete=true;else{data.chapterClears??={};data.chapterClears[key]=true}
   return {id,newlyAdded};
  }
  function migrateRewards(data){
   if(!data.migration?.legacy||data.migration.rewardMigrationV1)return false;
   grant(data,'tutorial');
   const conflicts=data.migration.conflicts||[],invalid=conflicts.some(c=>c.field);
   for(let chapter=1;chapter<=6;chapter++)if(!invalid&&data.chapterClears?.[chapter]&&!conflicts.some(c=>c.chapter===chapter))grant(data,String(chapter));
   data.migration.rewardMigrationV1=true;return true;
  }
  function load(){const raw=storage.getItem(KEY);if(raw!==null){let data;try{data=JSON.parse(raw)}catch(e){throw Error('Player save is invalid; existing data was preserved')};if(!data||data.version!==1)throw Error('Unsupported player save version; existing data was preserved');if(migrateRewards(data))storage.setItem(KEY,JSON.stringify(data));return clone(data)}const data=initial();migrateRewards(data);storage.setItem(KEY,JSON.stringify(data));return clone(data)}
  function update(operationId,change){if(typeof operationId!=='string'||!operationId)throw Error('operation ID required');const data=load();if(data.operations.includes(operationId))return {applied:false,data};const next=clone(data);change(next);next.operations.push(operationId);storage.setItem(KEY,JSON.stringify(next));return {applied:true,data:clone(next)}}
  function completeStory(key){
   key=String(key);if(!REWARDS[key])throw Error('Unknown story reward');
   let reward={id:REWARDS[key],newlyAdded:false};
   const result=update('story-reward:'+key,data=>{reward=grant(data,key)});
   return {...reward,applied:result.applied,data:result.data};
  }
  function recordStreakWin(wins){
   if(!Number.isSafeInteger(wins)||wins<1)throw Error('連勝数が不正です');
   const current=load(),history=Array.isArray(current.streakRewards)?current.streakRewards:[];
   const highest=Math.max(Number.isSafeInteger(current.highestStreak)?current.highestStreak:0,...history.filter(n=>Number.isSafeInteger(n)&&n>0));
   if(wins<=highest)return {awarded:0,data:current};
   let awarded=0;
   const result=update('streak-win:'+wins,data=>{
    const previous=Array.isArray(data.streakRewards)?data.streakRewards:[];
    const max=Math.max(Number.isSafeInteger(data.highestStreak)?data.highestStreak:0,...previous.filter(n=>Number.isSafeInteger(n)&&n>0));
    if(wins<=max)return;
    if(!Number.isSafeInteger(data.stones)||data.stones<0)throw Error('ガチャ石の保存データが不正です');
    data.stones++;data.highestStreak=wins;data.streakRewards=[...previous,wins];awarded=1;
   });
   return {awarded,data:result.data};
  }
  function getNormalFormation(chars){
   const data=load(),legacy=parse('fantasyFormation');
   let formation=Array.isArray(legacy)&&legacy.length===2?legacy:clone(data.normalFormation);
   if(data.solenarifAwakened&&Array.isArray(formation))formation=formation.map(id=>id==='solenarif'?'solenarif_spy':id);
   return validateFormation(formation,chars,data.owned,false)?['vanilla','vanilla_clone']:formation;
  }
  function unlockSolenarif(chars,options={}){
   if(options.debug)throw Error('デバッグモードでは真価を解放できません');
   if(!chars?.solenarif||!chars?.solenarif_spy)throw Error('ソレナリフの定義がありません');
   const legacy=parse('fantasyFormation');
   return update('awaken-solenarif-v1',data=>{
    data.owned=data.owned.filter(id=>id!=='solenarif'&&id!=='solenarif_spy');
    data.owned.push('solenarif_spy');data.solenarifAwakened=true;
    let formation=Array.isArray(legacy)&&legacy.length===2?legacy:data.normalFormation;
    if(Array.isArray(formation))formation=formation.map(id=>id==='solenarif'?'solenarif_spy':id);
    data.normalFormation=validateFormation(formation,chars,data.owned,false)?['vanilla','vanilla_clone']:formation;
   });
  }
  function debugEnabled(search){return new URLSearchParams(search).get('fantasyDebug')==='1'}
  function getDebugFormation(){const saved=parse(DEBUG_FORMATION);return Array.isArray(saved)&&saved.length===2?saved.slice():['vanilla','vanilla_clone']}
  function setDebugFormation(ids){if(!Array.isArray(ids)||ids.length!==2)throw Error('two units required');storage.setItem(DEBUG_FORMATION,JSON.stringify(ids))}
  return {load,update,completeStory,recordStreakWin,unlockSolenarif,getNormalFormation,debugEnabled,getDebugFormation,setDebugFormation};
 }
 function validateFormation(ids,chars,owned,debug=false){
  if(!Array.isArray(ids)||ids.length!==2)return 'ユニットを2体選択してください。';
  const normalized=ids[0]==='vanilla'&&ids[1]==='vanilla'?['vanilla','vanilla_clone']:ids;
  const pair=normalized.map(id=>chars[id]);
  if(pair.some((c,i)=>!c||(c.selectable===false&&normalized[i]!=='vanilla_clone')))return '編成できないユニットが含まれています。';
  if(!debug&&(!Array.isArray(owned)||normalized.some(id=>!owned.includes(id))))return '未所持のユニットは編成できません。';
  if(normalized[0]===normalized[1]||((normalized.includes('vanilla_clone'))&&!normalized.includes('vanilla')))return '同一ユニットは2体編成できません。';
  if(pair[0].evolutionGroup&&pair[0].evolutionGroup===pair[1].evolutionGroup)return '同一人物の真価前後は同時に編成できません。';
  if(pair[0].rarity+pair[1].rarity>7)return '合計レア度は7以下にしてください。';
  return '';
 }
 function formationError(context,ids,chars){try{const data=context.debug?null:context.store.load();if(!context.debug&&data.solenarifAwakened&&ids.includes('solenarif'))return '真価解放済みのため通常ソレナリフは編成できません。';return validateFormation(ids,chars,data?.owned||[],context.debug)}catch(e){return 'セーブデータを読み込めません。'}}
 function correctFormation(context,ids,chars){
  if(!formationError(context,ids,chars))return ids;
  const fallback=['vanilla','vanilla_clone'];
  if(context.debug)context.store.setDebugFormation(fallback);
  else if(!context.error){localStorage.setItem('fantasyFormation',JSON.stringify(fallback));context.store.update('repair:'+Date.now()+':'+Math.random(),d=>{d.normalFormation=fallback.slice()})}
  return fallback;
 }
 function connect(){
  const store=create(localStorage),debug=store.debugEnabled(location.search);
  const result={store,debug,data:null,error:null};
  try{result.data=debug?null:store.load()}catch(e){result.error=e;console.error('Player data unavailable:',e)}
  if(debug)document.addEventListener('DOMContentLoaded',()=>{const badge=document.createElement('span');badge.textContent='DEBUG';badge.style.cssText='position:fixed;top:4px;right:4px;z-index:9999;background:#933;color:white;font:12px sans-serif;padding:3px 6px';document.body.appendChild(badge);document.querySelectorAll('a[href]').forEach(a=>{const u=new URL(a.href,location.href);if(u.origin===location.origin&&/\.html$/.test(u.pathname)){u.searchParams.set('fantasyDebug','1');a.href=u.href}})});
  return result;
 }
 function unlockSolenarif(context,chars){if(context.debug)throw Error('デバッグモードでは真価を解放できません');if(context.error||!context.store)throw Error('セーブデータを読み込めません');return context.store.unlockSolenarif(chars)}
 const api={create,connect,unlockSolenarif,validateFormation,formationError,correctFormation,KEY,DEBUG_FORMATION};if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.FantasyPlayerData=api;
})(typeof globalThis!=='undefined'?globalThis:this);
