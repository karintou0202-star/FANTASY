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
const r=runtime({fantasyCampaignUnlocked:'28'});
r.run(`
 // Chapter six keeps one source line/quotation per event, including stage directions.
 for(let i=0;i<8;i++){
  const original=CAMPAIGN_CHAPTER_SCENES[6][i],loaded=CHAPTER_SCENES[6][i];
  if(JSON.stringify(original)!==JSON.stringify(loaded))throw Error('dialogue split '+i);
 }
 const parenthetical=CHAPTERS[6].find(e=>e.speaker==='ロイド'&&e.text.includes('盗聴器'));
 if(!parenthetical||!parenthetical.text.includes('（盗聴器を聞きながら）'))throw Error('parenthetical detached');
 const nested='前置き。'.repeat(20)+'（長い説明。途中に！疑問？があっても分けない）'+'続き。'.repeat(80);
 const pages=splitStoryPages(nested);
 if(pages.join('')!==nested||pages.length<2)throw Error('page text lost');
 if(splitStoryPages('短い会話。次の文。').length!==1)throw Error('short speech split');
 if(splitStoryPages('長文'.repeat(100)).length!==1)throw Error('sentence split midword');
 const atDots=splitStoryPages('あ'.repeat(50)+'。'+'い'.repeat(40)+'。'+'う'.repeat(30));
 if(atDots[0]!=='あ'.repeat(50)+'。'||atDots[1]!=='い'.repeat(40)+'。'+'う'.repeat(30))throw Error('full stop grouping');
 if(splitStoryPages('あ'.repeat(90)+'。'+'い'.repeat(20))[0]!=='あ'.repeat(90)+'。')throw Error('long single sentence cut');
 for(const page of pages){
  if((page.match(/（/g)||[]).length!==(page.match(/）/g)||[]).length)throw Error('parenthetical split');
 }
 const longBracket='（'+ '長い説明。'.repeat(30)+'）';
 if(splitStoryPages(longBracket).length!==1)throw Error('long parenthetical split');
 if(splitStoryPages('😀'.repeat(100)).join('')!=='😀'.repeat(100))throw Error('Unicode text lost');
 maxUnlocked=28;startStage(20,true);
 const events=CHAPTERS[6];
 pos=events.findIndex(e=>e.type==='dialogue'&&splitStoryPages(e.text).length>1);showEvent();
 const start=pos,event=events[start],first=$('#text').textContent,speaker=$('#speaker').textContent;
 if(first===event.text||!event.text.startsWith(first)||$('#nextBtn').textContent!=='続きを表示')throw Error('initial reveal');
 while(storyPageIndex<storyPages.length-1){
  const previous=$('#text').textContent;nextEvent();
  if(pos!==start||$('#speaker').textContent!==speaker||!$('#text').textContent.startsWith(previous))throw Error('continuation changed speaker/event');
 }
 if($('#text').textContent!==event.text||$('#nextBtn').textContent!=='次へ')throw Error('full dialogue not revealed');
 nextEvent();if(pos!==start+1)throw Error('next dialogue');
 // During typing the first click completes the current reveal, not the whole speech.
 matchMedia=()=>({matches:false});pos=start;showEvent();
 if(!storyTyping||$('#nextBtn').disabled)throw Error('typing click disabled');
 nextEvent();if(storyTyping||pos!==start||storyPageIndex!==0||$('#text').textContent===event.text)throw Error('typing click skipped dialogue');
 nextEvent();if(!storyTyping||pos!==start||storyPageIndex!==1)throw Error('continuation typing');
 nextEvent();if(storyTyping||pos!==start)throw Error('typing completion advanced event');
 // Auto mode reveals the next portion before advancing the dialogue.
 matchMedia=()=>({matches:true});pos=start;auto=true;let scheduled;
 setTimeout=fn=>{scheduled=fn;return 1};showEvent();scheduled();
 if(pos!==start||storyPageIndex!==1)throw Error('auto skips remainder');auto=false;
 // Skip still stops at the battle and leaves the existing progression intact.
 startStage(23,true);$('#skipBtn').onclick();$('#skipBtn').onclick();
 if(battle.id!=='chapter6_kattoru'||battleOnly)throw Error('skip battle boundary');
`);
console.log('PASS: quote events intact, parentheses/nested text intact, cumulative long-dialogue reveal, typing clicks, same speaker/event until completion, auto continuation, battle skip boundary.');
