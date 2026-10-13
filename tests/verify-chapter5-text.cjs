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

const r=runtime();r.run(`
 const scenes=CHAPTER_SCENES[5],events=scenes.flat();
 if(scenes.length!==8||events.filter(e=>e.type==='battle').length!==3)throw Error('scene and battle preservation');
 if(events.some(e=>/^[）)」』]+$/.test(e.text||'')))throw Error('isolated closing delimiter');
 if(events[0].type!=='narration'||!events[0].text.includes('。\\nつかぬ間'))throw Error('intro must be one block');
 const thought=events.find(e=>e.speaker==='エイジの心の声');if(thought?.text!=='(あれ、この子魔族？)')throw Error('whole thought');
 const hug=events.find(e=>e.text?.includes('ココ、大丈夫か。'));if(hug?.text!=='ココ、大丈夫か。（抱きしめる）')throw Error('attached action');
 const response=events.find(e=>e.text?.includes('これを、私が、やったん'));if(!response?.text.endsWith('（戦場、特に雪崩で埋まったゴブリン達を見ながら）'))throw Error('attached long action');
 const test=chapterFiveScene('「前半。\\n後半。」\\nココ「ありがとう。」（スープを受け取る）');
 if(test.length!==2||test[0].text!=='前半。\\n後半。'||test[1].text!=='ありがとう。（スープを受け取る）')throw Error('quoted grouping');
 for(const e of events.filter(e=>e.text)){
  const pages=splitStoryPages(e.text);if(pages.join('')!==e.text)throw Error('lost text');
  for(const page of pages){const stack=[],close={'（':'）','(':')','「':'」','『':'』'};for(const char of page){if(close[char])stack.push(close[char]);else if(char===stack[stack.length-1])stack.pop()}if(stack.length)throw Error('parentheses split')}
 }
 const long=events.find(e=>e.text?.includes('オウリンって呼ばれる'));chapter=5;pos=123;$('#speaker').textContent=long.speaker;typeStoryText(long.text);
 if(storyPages.length<2||$('#nextBtn').textContent!=='続きを表示')throw Error('long block pagination');
 const first=$('#text').textContent;nextEvent();
 if(pos!==123||$('#speaker').textContent!==long.speaker||!$('#text').textContent.startsWith(first)||$('#text').textContent.length<=first.length)throw Error('click must append within same dialogue');
 while(storyPageIndex<storyPages.length-1)nextEvent();if($('#text').textContent!==long.text)throw Error('complete original text');
 `);console.log('PASS: chapter five quotation/parenthesis grouping, source corrections, 8 scenes/3 battles, punctuation boundaries, and cumulative click-to-reveal.');
