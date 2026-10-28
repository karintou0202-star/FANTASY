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
  function load(){const raw=storage.getItem(KEY);if(raw!==null){let data;try{data=JSON.parse(raw)}catch(e){throw Error('Player save is invalid; existing data was preserved')};if(!data||data.version!==1)throw Error('Unsupported player save version; existing data was preserved');return clone(data)}const data=initial();storage.setItem(KEY,JSON.stringify(data));return clone(data)}
  function update(operationId,change){if(typeof operationId!=='string'||!operationId)throw Error('operation ID required');const data=load();if(data.operations.includes(operationId))return {applied:false,data};const next=clone(data);change(next);next.operations.push(operationId);storage.setItem(KEY,JSON.stringify(next));return {applied:true,data:clone(next)}}
  function debugEnabled(search){return new URLSearchParams(search).get('fantasyDebug')==='1'}
  function getDebugFormation(){const saved=parse(DEBUG_FORMATION);return Array.isArray(saved)&&saved.length===2?saved.slice():['vanilla','vanilla_clone']}
  function setDebugFormation(ids){if(!Array.isArray(ids)||ids.length!==2)throw Error('two units required');storage.setItem(DEBUG_FORMATION,JSON.stringify(ids))}
  return {load,update,debugEnabled,getDebugFormation,setDebugFormation};
 }
 const api={create,KEY,DEBUG_FORMATION};if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.FantasyPlayerData=api;
})(typeof globalThis!=='undefined'?globalThis:this);
