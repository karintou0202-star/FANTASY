(function(root){
 'use strict';
 const POOLS=Object.freeze({2:Object.freeze(['tsukune','lowja','bonret','guren','crow','ggg','jackeen','zazan','larin','arle','gasshaan','donbura','anmi']),3:Object.freeze(['karzuf','ice','emon','kattole','hinata','meilan','solenarif','kurukku']),4:Object.freeze(['azoaras','gigagald','hikake','coco']),5:Object.freeze(['flame_azote'])});
 const TUTORIAL=Object.freeze(['coco','azoaras','gigagald','hikake']);
 function randomIndex(length,rng){const value=rng();if(!Number.isFinite(value)||value<0||value>=1)throw Error('乱数が不正です');return Math.floor(value*length)}
 function pickRarity(rng){const v=rng();if(!Number.isFinite(v)||v<0||v>=1)throw Error('乱数が不正です');return v<.02?5:v<.10?4:v<.40?3:2}
 function isOwned(data,id){return data.owned.includes(id)||(id==='solenarif'&&(data.solenarifAwakened||data.owned.includes('solenarif_spy')))}
 function create(context,rng=Math.random){
  function enabled(){if(context.debug)throw Error('デバッグモードではガチャと交換を利用できません');if(context.error||!context.store)throw Error('セーブデータを読み込めません')}
  function state(){enabled();return context.store.load()}
  function ready(data){if(!data.tutorialTicket?.granted||data.tutorialTicket.used!==false)throw Error('チュートリアルガチャは利用できません')}
  function unlocked(data){if(data.tutorialTicket?.used!==true)throw Error('チュートリアルガチャを確定してください')}
  function ensureTicket(){enabled();return context.store.update('tutorial-ticket-grant-v1',data=>{data.tutorialTicket??={granted:false,used:false};if(!data.tutorialTicket.used&&!data.tutorialTicket.granted)data.tutorialTicket.granted=true})}
  function tutorialDraw(){ready(state());return TUTORIAL[randomIndex(TUTORIAL.length,rng)]}
  function confirmTutorial(id,operationId){enabled();if(!TUTORIAL.includes(id))throw Error('対象外のユニットです');let info;
   const result=context.store.update(operationId,data=>{ready(data);const added=!data.owned.includes(id);if(added)data.owned.push(id);data.tutorialTicket.used=true;data.tutorialTicket.confirmedUnit=id;info={id,added}});
   return {...info,applied:result.applied,data:result.data};
  }
  function draw(operationId){enabled();let info;
   const result=context.store.update(operationId,data=>{unlocked(data);if(!Number.isInteger(data.stones)||data.stones<5)throw Error('ガチャ石が足りません');const rarity=pickRarity(rng),pool=POOLS[rarity],id=pool[randomIndex(pool.length,rng)],duplicate=isOwned(data,id);data.stones-=5;if(duplicate){data.exchangePoints[rarity]=(data.exchangePoints[rarity]||0)+1}else data.owned.push(id);info={id,rarity,duplicate}});
   return {...info,applied:result.applied,data:result.data};
  }
  function candidates(rarity){const data=state(),pool=POOLS[rarity];if(!pool)return [];return pool.filter(id=>!isOwned(data,id))}
  function exchange(rarity,id,operationId){enabled();rarity=Number(rarity);let info;
   const result=context.store.update(operationId,data=>{unlocked(data);if(!POOLS[rarity]?.includes(id)||isOwned(data,id))throw Error('このユニットは交換できません');if(!Number.isInteger(data.exchangePoints[rarity])||data.exchangePoints[rarity]<10)throw Error('交換ポイントが足りません');data.exchangePoints[rarity]-=10;data.owned.push(id);info={id,rarity}});
   return {...info,applied:result.applied,data:result.data};
  }
  return {state,ensureTicket,tutorialDraw,confirmTutorial,draw,candidates,exchange};
 }
 const api={POOLS,TUTORIAL,pickRarity,randomIndex,isOwned,create};if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.FantasyGacha=api;
})(typeof globalThis!=='undefined'?globalThis:this);
