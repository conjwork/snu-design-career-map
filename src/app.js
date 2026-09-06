/* ============================================================
   화면 로직 — 데이터 파일 네 개를 읽어 다섯 개 화면을 그립니다.
   교과 내용을 고치려면 data/ 폴더를 보세요. 이 파일은 표시 방식만 다룹니다.
   ============================================================ */
(function(){
"use strict";

/* ============================================================
   STATE
   ============================================================ */
const S={mode:"UG",states:{},view:"table",tableMode:null,
  career:null,route:null,concept:{},
  cat:"ALL",tag:null,q:"",emph:"all",showWas:false};

const $=s=>document.querySelector(s);
const $$=s=>Array.from(document.querySelectorAll(s));
const el=(t,c,x)=>{const e=document.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;return e;};
const st=id=>S.states[id]||0;
const uniq=a=>Array.from(new Set(a));
const scrollTop=()=>{try{window.scrollTo(0,0);}catch(e){}};
const G=()=>S.mode==="GR";

const CAT_DESC={
 VD:"이미지 · 글자 · 화면으로 메시지를 만드는 자리.",
 ID:"손에 잡히는 사물과 공간을 만드는 자리.",
 MIX:"시각과 산업을 함께 다뤄야 성립하는 자리.",
 THEORY:"만드는 대신 읽고, 기획하고, 가르치는 자리."
};

const D={
  courses:()=>G()?GCOURSES:COURSES,
  by:()=>G()?GBY:BY_ID,
  semLabel:()=>G()?GSEM_LABEL:SEM_LABEL,
  routes:()=>G()?GROUTES:ROUTES,
  routeBy:()=>G()?GROUTE_BY:ROUTE_BY,
  careers:()=>G()?GCAREERS:CAREERS,
  careerBy:()=>G()?GCAREER_BY:CAREER_BY,
  catLabel:()=>G()?GCAT_LABEL:CAT_LABEL,
  catDesc:()=>G()?GCAT_DESC:CAT_DESC,
  cats:()=>G()?["ID","VD","THEORY"]:["VD","ID","MIX","THEORY"],
  capWord:()=>G()?"학위연구":"졸업전시"
};

const inSem=(x,k)=>x.sems?x.sems.indexOf(k)>=0:x.sem===k;
const roadOf=r=>G()?gRoadKeys(r.track):["2-1","2-2","3-1","3-2","4-1","4-2"];
const sel1=()=>D.courses().filter(x=>st(x.id)>0);
const cr=l=>l.reduce((a,b)=>a+(b.cr||3),0);
const toggle=id=>{S.states[id]=(st(id)+1)%3;render();};

function mark(cat){if(G()&&cat==="THEORY")cat="DH";
  const s=el("span","mk");s.dataset.cat=cat;return s;}
function blend(){const s=sel1();
  return {vd:cr(s.filter(x=>x.side==="VD")),id:cr(s.filter(x=>x.side==="ID")),cm:cr(s.filter(x=>x.side==="-"))};}
function setMix(v,c,i,host){host.innerHTML="";
  [["a",v],["b",c],["c",i]].forEach(p=>{const e=el("i",p[0]);e.style.width=p[1]+"%";host.appendChild(e);});}
function mixOf(j){
  const a=j.must.concat(j.plus).map(i=>D.by()[i]).filter(Boolean);
  const v=a.filter(x=>x.side==="VD").length,i=a.filter(x=>x.side==="ID").length,c=a.filter(x=>x.side==="-").length;
  const n=a.length||1;
  return {v:v/n*100,i:i/n*100,c:c/n*100,cross:Math.round(Math.min(v,i)/n*200)};
}
function curCareer(){const b=D.careerBy();return (S.career&&b[S.career])?b[S.career]:null;}
function curRoute(j){const rb=D.routeBy();
  return rb[(S.route&&j.routes.indexOf(S.route)>=0)?S.route:j.routes[0]];}
function recOf(id){
  const j=curCareer(); if(!j)return null;
  if(j.must.indexOf(id)>=0)return "must";
  if(j.plus.indexOf(id)>=0)return "plus";
  if(j.routes.some(r=>D.routeBy()[r].cap.indexOf(id)>=0))return "must";
  return null;
}
function similar(j){
  return D.careers().filter(k=>k.id!==j.id)
    .map(k=>({k,n:k.must.filter(i=>j.must.indexOf(i)>=0).length}))
    .filter(o=>o.n>=3).sort((a,b)=>b.n-a.n).slice(0,4).map(o=>o.k);
}
function pick(id){S.career=id;S.route=D.careerBy()[id].routes[0];S.view="road-career";render();scrollTop();}

/* 공통 조각 */
function lead(t,s){const d=el("div","lead");d.appendChild(el("h2",null,t));
  if(s){const p=el("p");p.innerHTML=s;d.appendChild(p);}return d;}
function note(html){const n=el("div","note");n.innerHTML=html;return n;}
function seg(key,opts){
  const s=el("div","seg");
  opts.forEach(o=>{const b=el("button",null,o[1]);
    b.setAttribute("aria-pressed",S[key]===o[0]?"true":"false");
    b.onclick=()=>{S[key]=o[0];render();};s.appendChild(b);});
  return s;
}
function secTitle(host,text,right,markCat){
  const s=el("div","sec");
  const h=el("h3");
  if(markCat)h.appendChild(mark(markCat));
  h.appendChild(document.createTextNode(markCat?" "+text:text));
  s.appendChild(h);
  if(right)s.appendChild(el("em",null,right));
  host.appendChild(s);
}
function profList(names,host){
  const w=el("div","pchips");
  names.forEach(n=>{
    const p=PROFS.filter(x=>x.n===n)[0];
    const c=el("span","pchip");
    c.appendChild(el("b",null,n));
    if(p)c.appendChild(document.createTextNode(" · "+p.f));
    w.appendChild(c);
  });
  host.appendChild(w);
}
function laneTitle(r){
  if(G())return r.name+(r.kind?"  ·  "+r.kind+" 트랙":"");
  const first=BY_ID[r.cap[0]];
  return first?first.ko.replace(/1$/,"")+" 1 · 2":r.name;
}
function profGrid(host){
  const pg=el("div","profs");
  PROFS.forEach(x=>{const d=el("div","pc");d.dataset.side=x.side;
    d.appendChild(el("div","pn",x.n));d.appendChild(el("div","pf",x.f));
    d.appendChild(el("div","ps",x.s));pg.appendChild(d);});
  host.appendChild(pg);
}

/* ============================================================
   1 · 교과과정표
   ============================================================ */
function dim(x){
  if(S.emph==="core"&&!x.core)return true;
  if(S.emph==="new"&&!x.nw)return true;
  if(S.emph==="mine"&&st(x.id)===0)return true;
  if(S.emph==="rec"&&!recOf(x.id))return true;
  return false;
}
function chip(x,gradT){
  const b=el("button","cc");
  b.dataset.side=x.tone||x.side;b.dataset.state=st(x.id);
  if(x.core||x.studio)b.dataset.core="1";
  if(!gradT){const r=recOf(x.id);if(r)b.dataset.rec=r;if(dim(x))b.dataset.dim="1";}
  b.title=x.ko+(x.was?"\n변경 전: "+x.was:"")+"\n"+x.en+" · "+(x.cr||3)+"학점"+(x.why?"\n"+x.why:"");
  const t=el("div","cc-t");
  const n=el("span","nm",x.ko);
  if(x.eng)n.appendChild(el("sup",null,"EN"));
  t.appendChild(n);
  t.appendChild(el("span","cr",String(x.cr||3)));
  b.appendChild(t);
  const mk=[];
  if(x.prof)mk.push(x.prof);
  if(x.deg)mk.push(x.deg);
  if(x.core)mk.push("핵심");
  if(x.req)mk.push("전필");
  if(x.art10)mk.push("미대공통");
  if(x.cap)mk.push("졸전");
  if(x.thesis)mk.push("학위연구");
  if(x.nw)mk.push("변경");
  if(x.both)mk.push("매 학기");
  if(mk.length)b.appendChild(el("div","mkline",mk.join(" · ")));
  if(S.showWas&&x.was)b.appendChild(el("div","was",x.was));
  b.onclick=()=>toggle(x.id);
  return b;
}
function buildTable(mode){
  const gradT=mode==="GR";
  const cols=gradT?GCOLS:COLS;
  const courses=gradT?GCOURSES:COURSES;
  const tbl=el("table","ct");
  const cg=el("colgroup");
  (gradT?["40px","54px","34px"]:["38px","34px"]).forEach(wd=>{
    const c=el("col");c.style.width=wd;cg.appendChild(c);});
  cols.forEach(c=>{const co=el("col");co.style.width=c.w;cg.appendChild(co);});
  tbl.appendChild(cg);

  const th=el("thead"),r1=el("tr");
  if(gradT){
    const cn=el("th","cn2","과정 / 트랙 / 학기");cn.colSpan=3;r1.appendChild(cn);
    cols.forEach(c=>r1.appendChild(el("th","grp"+
      (c.side==="VD"?" g-VD":c.side==="ID"?" g-ID":c.tone==="DH"?" g-DH":""),c.label)));
    th.appendChild(r1);
  }else{
    const corner=el("th","corner","");corner.colSpan=2;r1.appendChild(corner);
    [["VD","시각디자인",3],["CM","공통교과목",1],["ID","산업디자인",3]].forEach(gp=>{
      const h=el("th","grp g-"+gp[0],gp[1]);h.colSpan=gp[2];r1.appendChild(h);});
    th.appendChild(r1);
    const r2=el("tr");
    const c2=el("th","cn2","학년 / 학기");c2.colSpan=2;r2.appendChild(c2);
    cols.forEach(c=>r2.appendChild(el("th","dom"+(c.core?" is-core":""),c.label)));
    th.appendChild(r2);
  }
  tbl.appendChild(th);

  const tb=el("tbody");
  if(gradT){
    GROWS.forEach((rw,i)=>{
      const tr=el("tr");
      if(i%4===0){const dg=el("th","yr",rw.deg);dg.rowSpan=4;tr.appendChild(dg);}
      if(i%2===0){const tk=el("th","trk",rw.trk);tk.rowSpan=2;tr.appendChild(tk);}
      tr.appendChild(el("th","sm",rw.sem));
      cols.forEach(c=>{
        const td=el("td");
        const list=courses.filter(x=>x.col===c.id&&inSem(x,rw.k));
        if(!list.length)td.appendChild(el("div","cempty","—"));
        list.forEach(x=>td.appendChild(chip(x,true)));
        tr.appendChild(td);});
      if(i===3)tr.classList.add("degend");
      tb.appendChild(tr);});
  }else{
    SEMS.forEach((s2,i)=>{
      const tr=el("tr");
      if(i%2===0){const y=el("th","yr",SEM_LABEL[s2][0]);y.rowSpan=2;tr.appendChild(y);}
      tr.appendChild(el("th","sm",SEM_LABEL[s2][1]));
      cols.forEach(c=>{
        const td=el("td",c.core?"is-core":"");
        courses.filter(x=>x.sem===s2&&x.col===c.id).forEach(x=>td.appendChild(chip(x,false)));
        tr.appendChild(td);});
      tb.appendChild(tr);});
  }
  tbl.appendChild(tb);
  const w=el("div","tw");w.appendChild(tbl);return w;
}
function vTable(){
  const w=el("div");
  const tm=S.tableMode||S.mode;
  w.appendChild(lead("교과과정표",
    tm==="GR"
      ? "가로가 전공 트랙, 세로가 과정과 학기입니다. 대학원은 전공 교과와 함께 <b>대학원논문연구</b>를 매 학기 지도교수와 이수합니다."
      : "학생생활안내 4-1과 같은 배치입니다. 가로가 계열, 세로가 학년·학기. 희망 진로를 정해두면 필요한 과목에 테두리 표시가 붙습니다."));
  const bar=el("div","bar");
  const tw=el("div","seg");
  [["UG","학부 교과과정표"],["GR","대학원 교과과정표"]].forEach(o=>{
    const b=el("button",null,o[1]);
    b.setAttribute("aria-pressed",tm===o[0]?"true":"false");
    b.onclick=()=>{S.tableMode=o[0];render();};
    tw.appendChild(b);});
  bar.appendChild(tw);
  if(tm==="UG"){
    bar.appendChild(seg("emph",[["all","전체"],["core","핵심이수"],["new","변경·신설"],["mine","내가 담은 것"],["rec","진로 추천"]]));
    const t=el("button","btn ghost sm",S.showWas?"구 강좌명 숨기기":"구 강좌명 보기");
    t.onclick=()=>{S.showWas=!S.showWas;render();};bar.appendChild(t);
  }
  w.appendChild(bar);
  w.appendChild(buildTable(tm));
  const lg=el("div","legend");
  lg.innerHTML=tm==="GR"
    ? '<i><span class="lg i"></span>산업디자인</i><i><span class="lg v"></span>시각디자인</i><i><span class="lg d"></span>디자인역사문화</i><i><span class="lg"></span>공통</i><i>굵은 선 = 스튜디오</i><i>○ 수강예정 · ● 이수완료</i>'
    : '<i><span class="lg v"></span>시각디자인</i><i><span class="lg i"></span>산업디자인</i><i><span class="lg"></span>공통</i><i>굵은 선 = 핵심이수</i><i>○ 수강예정 · ● 이수완료</i><i><sup>EN</sup> 영어진행 강의</i>';
  w.appendChild(lg);
  w.appendChild(note(tm==="GR"
    ? "출처는 <b>대학원 NEW 교과과정 맵(2026.08.06.)</b>입니다. 디자인스튜디오 번호와 담당 교수 대응은 맵의 표기를 옮긴 것이며, 51·52 / 61·62는 맵상 담당 미정입니다."
    : "강좌명·학점은 <b>2026.08.06. 개편 맵</b>, 열 구조는 <b>학생생활안내 4-1</b> 기준입니다. ‘변경’이 붙은 과목은 마우스를 올리면 변경 전 이름이 나옵니다."));
  return w;
}

/* ============================================================
   2 · 진로 구분표
   ============================================================ */
function entry(j){
  const b=el("button","ent");
  if(S.career===j.id)b.dataset.on="1";
  b.appendChild(mark(j.cat));
  b.appendChild(el("span","e-n",j.name));
  b.appendChild(el("span","e-l",j.line));
  const m=mixOf(j),rb=D.routeBy();
  b.appendChild(el("span","e-d","→ "+j.routes.map(r=>rb[r].name).join(" / ")+
    (!G()&&m.cross>=45?"   ·   타전공 교차 "+m.cross+"%":"")));
  b.onclick=()=>pick(j.id);
  return b;
}
function careerFilter(j){
  if(S.cat!=="ALL"&&j.cat!==S.cat)return false;
  if(!G()&&S.tag){
    const tg=uniq(j.must.concat(j.plus).reduce((a,i)=>a.concat((BY_ID[i]&&BY_ID[i].tag)||[]),[]));
    if(tg.indexOf(S.tag)<0)return false;
  }
  const q=S.q.trim();
  if(q&&(j.name+j.line+j.where).indexOf(q)<0)return false;
  return true;
}
function renderResults(hostArg){
  const host=hostArg||$("#results"); if(!host)return;
  host.innerHTML="";
  const lab=D.catLabel();let total=0;
  D.cats().forEach(c=>{
    const list=D.careers().filter(j=>j.cat===c&&careerFilter(j));
    if(!list.length)return;
    total+=list.length;
    secTitle(host,lab[c],list.length+"개",c);
    const g2=el("div","ents");
    list.forEach(j=>g2.appendChild(entry(j)));
    host.appendChild(g2);});
  if(!total)host.appendChild(el("p","hint","조건에 맞는 진로가 없습니다. 검색어나 태그를 지워보세요."));
}
function vCareers(){
  const w=el("div");
  w.appendChild(lead("진로 구분표",
    G()
      ? "대학원을 마치고 갈 수 있는 자리 "+GCAREERS.length+"가지를 트랙별로 나눈 표입니다. 하나를 고르면 <b>희망 진로</b>로 등록되고, 진로 루트맵에 석·박사 학기별 수강 지도가 그려집니다."
      : "디자인과를 나와 갈 수 있는 자리 "+CAREERS.length+"가지를 계열별로 나눈 표입니다. 하나를 고르면 <b>희망 진로</b>로 등록되고, 진로 루트맵에 2학년부터 졸업전시까지의 수강 지도가 그려집니다."));

  const ex=el("div","exp");
  const lab=D.catLabel(),desc=D.catDesc();
  D.cats().forEach(c=>{
    const r=el("div","exp-r");
    const h=el("div","exp-h");h.appendChild(mark(c));
    h.appendChild(document.createTextNode(" "+lab[c]));
    h.appendChild(el("em",null,D.careers().filter(j=>j.cat===c).length+"개"));
    r.appendChild(h);
    r.appendChild(el("div","exp-d",desc[c]));
    ex.appendChild(r);});
  w.appendChild(ex);

  secTitle(w,"전공 교수진","학생생활안내 2-1 · 2-2");
  w.appendChild(el("p","hint",G()
    ? "대학원 지도교수는 아래 교수진 중에서 정합니다. 괄호 안 번호가 담당 디자인스튜디오입니다."
    : "세부전공을 정하거나 졸업전시 지도를 받을 때 만나게 되는 분들입니다."));
  profGrid(w);

  const bar=el("div","bar");bar.style.marginTop="28px";
  const opts=[["ALL","전체"]].concat(D.cats().map(c=>[c,lab[c]]));
  bar.appendChild(seg("cat",opts));
  const inp=el("input","search");
  inp.type="text";inp.placeholder="검색 — 로봇, 타이포, 공간, 큐레이터…";inp.value=S.q;
  inp.addEventListener("input",e=>{S.q=e.target.value;renderResults();});
  bar.appendChild(inp);
  w.appendChild(bar);

  if(!G()){
    const tb=el("div","tagbar");
    TAGS.forEach(t=>{const b=el("button","tg",t);
      b.setAttribute("aria-pressed",S.tag===t?"true":"false");
      b.onclick=()=>{S.tag=S.tag===t?null:t;render();};tb.appendChild(b);});
    w.appendChild(tb);
  }
  const res=el("div");res.id="results";w.appendChild(res);
  renderResults(res);
  return w;
}

/* ============================================================
   3 · 졸업전시 / 학위연구 구분표
   ============================================================ */
function vStudios(){
  const w=el("div");
  const rows=G()
    ? [["학위 형태","작품으로 마무리하는 <b>스튜디오 트랙</b>과 텍스트로 마무리하는 <b>논문 트랙</b>이 있습니다. 교과과정표의 열이 이 둘로 갈립니다. 디자인역사문화는 전원 논문 트랙입니다."],
       ["스튜디오 트랙","지도교수별 디자인스튜디오(정의철 11·12, 안성모 31·32, 장성연 101·102, 배재혁 111·112, 시각 21·41·71·81·91 등)와 고급디자인스튜디오 1·2가 축입니다."],
       ["논문 트랙","강독 · 연구 · 세미나 과목에서 논점을 만들고 <b>대학원논문연구</b>로 학위논문을 씁니다."],
       ["석사와 박사","같은 스튜디오와 대학원논문연구가 박사과정에도 그대로 개설됩니다. 고급디자인스튜디오만 석사는 Advanced Design Studio, 박사는 Advanced Design Studies로 이름이 다릅니다."]]
    : [["언제","졸업전은 매년 12월. 4학년이 준비위원회를 꾸려 6개월 전 과사무실에 알립니다. 전시는 보통 49동에서 열립니다."],
       ["자격","졸업전시 이전에 해당 전공의 핵심이수 6과목을 포함해 핵심 + 선택 <b>총 8과목 이상</b>을 이수해야 합니다. (2024학번부터)"],
       ["절차","성적증명서와 수학계획서를 과사무실에서 받아 전공교수에게 수강 자격을 허락받은 뒤 신청합니다."],
       ["제출","루트별 스튜디오 1·2를 모두 이수해 <b>2점 이상</b>을 졸업심사에 출품하고 심사를 통과해야 전시에 참여할 수 있습니다."]];
  w.appendChild(lead(G()?"학위연구 구분표":"졸업전시 구분표",
    G()?"대학원 학위를 어떤 형태로 마무리하는지, 그리고 각 트랙이 어느 교과로 이어지는지 정리한 표입니다."
       :"4학년에 고르는 졸업전시 스튜디오가 학부의 마무리입니다. 전공별 4개 루트 중 하나를 골라 1·2 두 학기를 연속으로 듣습니다."));
  const ex=el("div","exp");
  rows.forEach(r=>{
    const d=el("div","exp-r");
    const h=el("div","exp-h");h.appendChild(document.createTextNode(r[0]));d.appendChild(h);
    const t=el("div","exp-d");t.innerHTML=r[1];d.appendChild(t);
    ex.appendChild(d);});
  w.appendChild(ex);

  const sides=G()?[["ID","산업디자인"],["VD","시각디자인"],["-","디자인역사문화"]]
                 :[["VD","시각디자인전공"],["ID","산업디자인전공"]];
  sides.forEach(sd=>{
    const list=D.routes().filter(r=>r.side===sd[0]);
    if(!list.length)return;
    secTitle(w,sd[1],G()?list.length+"개 트랙":"4개 루트 중 1개 선택",sd[0]==="-"?"DH":sd[0]);
    list.forEach(r=>{
      const card=el("div","lane");
      const lh=el("div","lane-h");
      const L=el("div");
      L.appendChild(el("div","lane-n",laneTitle(r)));
      L.appendChild(el("div","lane-l",(G()?"":r.name+" 루트 · ")+r.line));
      lh.appendChild(L);
      lh.appendChild(el("div","lane-cap",r.cap.map(i=>D.by()[i].ko).join("\n")));
      card.appendChild(lh);
      if(!G()&&ROUTE_PROF[r.id]){
        const pw=el("div","lane-p");
        pw.appendChild(el("span","lj-h","담당 교수"));
        profList(ROUTE_PROF[r.id],pw);
        card.appendChild(pw);
      }
      const cw=el("div","conc");
      r.concepts.forEach(k=>{
        const c=el("div","conc-i");
        c.appendChild(el("div","conc-n",k[0]));
        c.appendChild(el("div","conc-l",k[1]));
        c.appendChild(el("div","conc-c",k[2].map(i=>D.by()[i]?D.by()[i].ko:"").filter(Boolean).join(" · ")));
        cw.appendChild(c);});
      card.appendChild(cw);
      const jr=D.careers().filter(j=>j.routes.indexOf(r.id)>=0);
      const jw=el("div","lane-j");
      jw.appendChild(el("span","lj-h","여기서 나오는 진로 "+jr.length));
      jr.forEach(j=>{const b=el("button","lj");
        b.appendChild(mark(j.cat));b.appendChild(document.createTextNode(j.name));
        b.onclick=()=>pick(j.id);jw.appendChild(b);});
      card.appendChild(jw);
      w.appendChild(card);});
  });
  return w;
}

/* ============================================================
   4-A · 진로 루트맵
   ============================================================ */
function vRoadCareer(){
  const w=el("div");
  const j=curCareer();
  if(!j){
    w.appendChild(lead("진로 루트맵",
      "희망 진로를 고르면 학기별 수강 지도가 이 자리에 그려집니다. 아래에서 바로 고르거나, <b>진로 구분표</b>에서 검색해 고르세요."));
    const lab=D.catLabel(),desc=D.catDesc();
    D.cats().forEach(c=>{
      const list=D.careers().filter(x=>x.cat===c);
      secTitle(w,lab[c],list.length+"개",c);
      w.appendChild(el("p","catdesc",desc[c]));
      const g2=el("div","ents");
      list.forEach(x=>g2.appendChild(entry(x)));
      w.appendChild(g2);});
    return w;
  }
  const route=curRoute(j),m=mixOf(j),by=D.by(),road=roadOf(route),labels=D.semLabel();

  const hd=el("div","rhead");
  const L=el("div","rh-l");
  const cl=el("div","rh-c");cl.appendChild(mark(j.cat));
  cl.appendChild(document.createTextNode("희망 진로 · "+D.catLabel()[j.cat]));
  L.appendChild(cl);
  L.appendChild(el("h2",null,j.name));
  L.appendChild(el("p","rh-d",j.line));
  L.appendChild(el("p","rh-w","주로 가는 곳 — "+j.where));
  const act=el("div","rh-act");
  const b1=el("button","btn ghost sm","다른 진로 고르기");
  b1.onclick=()=>{S.view="careers";render();scrollTop();};
  const b2=el("button","btn ghost sm","선택 해제");
  b2.onclick=()=>{S.career=null;S.route=null;render();scrollTop();};
  act.appendChild(b1);act.appendChild(b2);
  L.appendChild(act);
  hd.appendChild(L);
  const R=el("div","rh-r");
  R.appendChild(el("div","rh-t",D.capWord()+" 도착지"));
  if(j.routes.length>1){
    const sw=el("div","destsw");
    j.routes.forEach(rid=>{const b=el("button",null,laneTitle(D.routeBy()[rid]));
      b.setAttribute("aria-pressed",route.id===rid?"true":"false");
      b.onclick=()=>{S.route=rid;render();};sw.appendChild(b);});
    R.appendChild(sw);
  }else R.appendChild(el("div","rh-dest",laneTitle(route)));
  R.appendChild(el("div","rh-sub",route.cap.map(i=>by[i].ko).join("  +  ")));
  if(!G()&&ROUTE_PROF[route.id])R.appendChild(el("div","rh-sub","담당 교수 · "+ROUTE_PROF[route.id].join(", ")));
  if(G()&&j.grad)R.appendChild(el("div","rh-sub","지도교수 후보 · "+j.grad));
  const mw=el("div","rh-mix");
  const mb=el("div","mixbar");setMix(m.v,m.c,m.i,mb);mw.appendChild(mb);
  const mn=el("div","mixnum");mn.innerHTML="<span>시각</span><span>공통</span><span>산업</span>";
  mw.appendChild(mn);
  if(!G())mw.appendChild(el("div","rh-sub","타전공 교차 "+m.cross+"%"));
  R.appendChild(mw);
  hd.appendChild(R);
  w.appendChild(hd);

  if(!G()){
    const y1=el("div","y1");
    y1.appendChild(el("b",null,"1학년"));
    y1.appendChild(el("span",null,"전공 구분 없는 공통 과정입니다. 디자인기초 1·2, 한국미술과 문화, 서양미술사, 미술대학 공통 10과목 중 4과목. 세부전공은 2학년 진입 때 정합니다."));
    w.appendChild(y1);
  }

  const need=uniq(j.must.concat(route.cap));
  const opt=j.plus.filter(i=>need.indexOf(i)<0);
  const tl=el("div","tl");
  tl.style.gridTemplateColumns="repeat("+road.length+",minmax(0,1fr))";
  road.forEach(s=>{
    const col=el("div","tc");
    const hh=el("div","tc-h");
    hh.appendChild(el("span","tc-s",G()?labels[s][0]+" "+labels[s][1]:s));
    const here=need.concat(opt).map(i=>by[i]).filter(x=>x&&inSem(x,s));
    const c1=cr(here.filter(x=>need.indexOf(x.id)>=0));
    hh.appendChild(el("span","tc-c",c1?c1+"학점":"—"));
    col.appendChild(hh);
    const put=(ids,kind)=>ids.map(i=>by[i]).filter(x=>x&&inSem(x,s)).forEach(x=>{
      const b=el("button","rc");
      b.dataset.side=x.tone||x.side;b.dataset.kind=kind;b.dataset.state=st(x.id);
      const t=el("div","rc-t");
      const n=el("span","rc-n",x.ko);
      if(x.eng)n.appendChild(el("sup",null,"EN"));
      t.appendChild(n);t.appendChild(el("span","rc-cr",(x.cr||3)+"학점"));
      b.appendChild(t);
      if(x.why)b.appendChild(el("div","rc-w",x.why));
      const mk=[kind==="need"?"꼭 필요":"여유되면"];
      if(x.core)mk.push("핵심이수");
      if(x.prof)mk.push(x.prof);
      if(!G()&&((x.side==="VD"&&route.side==="ID")||(x.side==="ID"&&route.side==="VD")))mk.push("타전공");
      if(x.cap)mk.push("졸업전시");
      if(x.thesis)mk.push("학위연구");
      b.appendChild(el("div","rc-m",mk.join(" · ")));
      b.onclick=()=>toggle(x.id);
      col.appendChild(b);});
    put(need,"need");put(opt,"opt");
    if(!here.length)col.appendChild(el("div","tc-e","비어 있는 학기. 관심 가는 과목을 자유롭게 넣어도 되는 구간입니다."));
    tl.appendChild(col);});
  w.appendChild(tl);

  const doneN=need.filter(i=>st(i)>0).length;
  const pr=el("div","prog");
  pr.appendChild(el("span","prog-t","꼭 필요한 "+need.length+"과목 중 "+doneN+"개 담음"));
  const pb=el("div","prog-b");const pi=el("i");pi.style.width=(doneN/need.length*100)+"%";pb.appendChild(pi);
  pr.appendChild(pb);
  const all=el("button","btn sm","전부 담기");
  all.onclick=()=>{need.forEach(i=>{if(st(i)===0)S.states[i]=1;});render();};
  pr.appendChild(all);
  w.appendChild(pr);

  secTitle(w,route.name+" 안에서도 방향이 갈립니다","4갈래");
  const row=el("div","brow");
  route.concepts.forEach((k,ci)=>{
    const on=S.concept[route.id]===ci;
    const b=el("button","bc");b.setAttribute("aria-pressed",on?"true":"false");
    b.appendChild(el("div","bc-n",k[0]));
    b.appendChild(el("div","bc-l",k[1]));
    b.appendChild(el("div","bc-c",k[2].map(i=>by[i]?by[i].ko:"").filter(Boolean).join(" · ")));
    b.onclick=()=>{S.concept[route.id]=on?null:ci;
      if(!on)k[2].forEach(i=>{if(st(i)===0)S.states[i]=1;});render();};
    row.appendChild(b);});
  w.appendChild(row);
  w.appendChild(el("div","hint","카드를 누르면 그 방향의 과목 3개가 함께 담깁니다."));

  const sim=similar(j);
  if(sim.length){
    secTitle(w,"수업이 많이 겹치는 다른 진로",sim.length+"개");
    const sg=el("div","simrow");
    sim.forEach(k=>{const b=el("button","sc");
      b.appendChild(mark(k.cat));b.appendChild(el("span","sc-n",k.name));
      b.appendChild(el("span","sc-l",k.line));
      b.onclick=()=>pick(k.id);sg.appendChild(b);});
    w.appendChild(sg);}

  if(!G()){
    const mj=route.side;
    const coreN=CORE_2024[mj].filter(i=>st(i)>0).length;
    const selN=SEL_2024[mj].filter(i=>st(i)>0).length;
    w.appendChild(note("<b>대학원까지 본다면</b> — "+j.grad+"<br>"+
      "<b>참고</b> — 졸업전시 스튜디오를 신청하려면 3학년까지 "+(mj==="VD"?"시각":"산업")+
      "디자인 핵심이수 6과목을 포함해 총 8과목이 필요합니다. 지금 핵심 "+coreN+"과목, 합계 "+(coreN+selN)+"과목."));
  }else{
    w.appendChild(note("<b>지도교수 후보</b> — "+j.grad+
      "<br><b>참고</b> — 대학원논문연구는 모든 트랙에서 매 학기 지도교수와 함께 이수합니다."));
  }
  return w;
}

/* ============================================================
   4-B · 졸업전시 / 학위연구 루트맵
   ============================================================ */
function vRoadStudio(){
  const w=el("div");
  w.appendChild(lead(G()?"학위연구 루트맵":"졸업전시 루트맵",
    G()?"각 학위연구 트랙으로 가는 과목 흐름입니다. 과정과 학기 순서대로 이어집니다."
       :"8개 졸업전시 루트로 가는 과목 흐름입니다. 2학년부터 4학년까지 학기 순서대로 이어집니다. ↔ 표시는 타전공에서 끌어오는 과목."));
  const sides=G()?[["ID","산업디자인"],["VD","시각디자인"],["-","디자인역사문화"]]
                 :[["VD","시각디자인전공"],["ID","산업디자인전공"]];
  const by=D.by(),labels=D.semLabel();
  sides.forEach(sd=>{
    const list=D.routes().filter(r=>r.side===sd[0]);
    if(!list.length)return;
    secTitle(w,sd[1],list.length+"개",sd[0]==="-"?"DH":sd[0]);
    list.forEach(r=>{
      const card=el("div","lane");
      const lh=el("div","lane-h");
      const L=el("div");
      L.appendChild(el("div","lane-n",laneTitle(r)));
      L.appendChild(el("div","lane-l",(G()?"":r.name+" 루트 · ")+r.line));
      lh.appendChild(L);
      if(!G()&&ROUTE_PROF[r.id])lh.appendChild(el("div","lane-cap",ROUTE_PROF[r.id].join("\n")));
      card.appendChild(lh);
      const road=roadOf(r);
      const flow=el("div","flow");
      flow.style.gridTemplateColumns="repeat("+road.length+",minmax(0,1fr))";
      road.forEach(sem=>{
        const col=el("div","fc");
        col.appendChild(el("div","fs",G()?labels[sem][0]+" "+labels[sem][1]:sem));
        const l2=r.feed.concat(r.cap).map(i=>by[i]).filter(x=>x&&inSem(x,sem));
        if(!l2.length)col.appendChild(el("div","fnone","—"));
        l2.forEach(x=>{
          const n=el("button","fn",x.ko);
          n.dataset.side=x.tone||x.side;n.dataset.on=st(x.id)>0?"1":"0";
          if(x.cap||x.thesis)n.dataset.cap="1";
          if(!G()&&((r.side==="VD"&&x.side==="ID")||(r.side==="ID"&&x.side==="VD")))n.dataset.cross="1";
          n.title=x.ko+" · "+(x.cr||3)+"학점"+(x.why?"\n"+x.why:"");
          n.onclick=()=>toggle(x.id);
          col.appendChild(n);});
        flow.appendChild(col);});
      card.appendChild(flow);
      w.appendChild(card);});
  });
  return w;
}

/* ============================================================
   4-C · 대학원연계 / 지도교수 루트맵
   ============================================================ */
function vRoadGrad(){
  const w=el("div");
  if(G()){
    w.appendChild(lead("지도교수 루트맵",
      "대학원 디자인스튜디오는 교수별로 번호가 배정됩니다. 어느 스튜디오로 가느냐가 곧 연구 방향입니다."));
    const byProf={};
    GCOURSES.filter(x=>x.studio&&x.prof).forEach(x=>{(byProf[x.prof]=byProf[x.prof]||[]).push(x);});
    Object.keys(byProf).forEach(p=>{
      const info=PROFS.filter(x=>x.n===p)[0];
      const card=el("div","lane");
      const lh=el("div","lane-h");
      const L=el("div");
      L.appendChild(el("div","lane-n",p));
      L.appendChild(el("div","lane-l",info?info.f:"디자인스튜디오 담당"));
      lh.appendChild(L);
      lh.appendChild(el("div","lane-cap",byProf[p].map(x=>x.ko).join("\n")));
      card.appendChild(lh);
      const jr=GCAREERS.filter(j=>j.grad&&j.grad.indexOf(p)>=0);
      if(jr.length){
        const jw=el("div","lane-j");
        jw.appendChild(el("span","lj-h","이 스튜디오와 이어지는 진로 "+jr.length));
        jr.forEach(j=>{const bb=el("button","lj");
          bb.appendChild(mark(j.cat));bb.appendChild(document.createTextNode(j.name));
          bb.onclick=()=>pick(j.id);jw.appendChild(bb);});
        card.appendChild(jw);}
      w.appendChild(card);});
    w.appendChild(note("51·52 / 61·62 스튜디오는 개편 맵상 담당 교수 미정입니다. 21 · 41 · 71 · 81 · 91은 시각디자인 교수진(윤주현 · 김수정 · 김경선 · 이장섭 · Chris Hamamoto)이 맡습니다."));
    return w;
  }

  w.appendChild(lead("대학원연계 루트맵",
    "학부에서 담은 과목 조합이 석·박사 어느 트랙, 어느 지도교수 스튜디오로 이어지는지 봅니다."));
  const b=blend(),t=b.vd+b.id;
  let rec;
  if(!t)rec="과목을 담으면 어느 트랙에 가까운지 계산됩니다.";
  else{
    const r=b.vd/t;
    rec=r>=.68?"지금 조합은 <b>시각디자인 트랙</b>에 가깝습니다. 아이덴티티 / 비주얼내러티브 / 영상 / UI디자인연구로 이어집니다."
      :r<=.32?"지금 조합은 <b>산업디자인 트랙</b>에 가깝습니다. 사물인터랙션디자인, 공간의 조직과 표현 계열로 이어집니다."
      :"지금 조합은 <b>두 트랙에 걸친 복합형</b>입니다. UI디자인연구 ↔ 사물인터랙션디자인처럼 양쪽을 잇는 스튜디오를 노릴 수 있습니다.";
    const th=cr(sel1().filter(x=>(x.tag||[]).indexOf("이론")>=0));
    if(th>=9)rec+=" 이론 과목을 "+th+"학점 담아둬서 <b>디자인역사문화 트랙</b>도 열려 있습니다.";
  }
  const j=curCareer();
  if(j)rec+="<br><b>"+j.name+"</b> 기준 추천 — "+j.grad;
  const nb=note(rec);nb.style.cssText="border-top:none;margin:0 0 12px;padding-top:0";
  w.appendChild(nb);

  secTitle(w,"대학원 트랙별 교과","대학원 맵 2026.08.06.");
  const gc=el("div","gc");
  const tone={gid:"ID",gvd:"VD",gdhc:"DH",gcm:"THEORY"};
  GCOLS.forEach(c=>{
    const box=el("div","gcol");
    const h=el("h4");h.appendChild(mark(tone[c.id]));h.appendChild(document.createTextNode(c.label));
    box.appendChild(h);
    const ul=el("ul","gl");
    GCOURSES.filter(x=>x.col===c.id).forEach(x=>{
      const li=el("li");
      const dg=uniq(x.sems.map(k=>GROW_BY[k].deg.charAt(0))).join("·");
      const sm=uniq(x.sems.map(k=>GROW_BY[k].sem)).join("·");
      li.appendChild(el("b",null,dg+" "+sm));
      li.appendChild(document.createTextNode(x.ko+(x.prof?" · "+x.prof:"")));
      ul.appendChild(li);});
    box.appendChild(ul);gc.appendChild(box);});
  w.appendChild(gc);

  secTitle(w,"지도교수 · 스튜디오 번호",PROFS.length+"명");
  w.appendChild(el("p","hint","진학을 생각한다면 학부 3~4학년에 해당 교수 과목을 미리 들어두는 편이 좋습니다."));
  profGrid(w);
  w.appendChild(note("대학원 전체 교과과정표는 <b>교과과정표 → 대학원 교과과정표</b>에서 볼 수 있습니다. 대학원생이라면 왼쪽 위 <b>대학원</b> 버튼으로 전체를 대학원 기준으로 바꿔 보세요."));
  return w;
}

/* ============================================================
   NAV · SHELL
   ============================================================ */
function renderNav(){
  const nav=$("#vnav");nav.innerHTML="";
  const items=[
    {v:"table",n:"01",l:"교과과정표"},
    {v:"careers",n:"02",l:"진로 구분표"},
    {v:"studios",n:"03",l:G()?"학위연구 구분표":"졸업전시 구분표"},
    {group:1,n:"04",l:"교과 루트맵"},
    {v:"road-career",sub:1,l:"진로"},
    {v:"road-studio",sub:1,l:G()?"학위연구":"졸업전시"},
    {v:"road-grad",sub:1,l:G()?"지도교수":"대학원연계"}
  ];
  items.forEach(it=>{
    if(it.group){
      const d=el("div","navgroup");
      d.appendChild(el("span","vn",it.n));
      d.appendChild(el("span","vl",it.l));
      nav.appendChild(d);return;
    }
    const b=el("button",it.sub?"navsub":"");
    b.dataset.v=it.v;
    b.appendChild(el("span","vn",it.sub?"·":it.n));
    b.appendChild(el("span","vl",it.l));
    b.setAttribute("aria-current",S.view===it.v?"true":"false");
    b.onclick=()=>{S.view=it.v;render();scrollTop();};
    nav.appendChild(b);});
}
function renderSide(){
  renderNav();
  $$("#modesw button").forEach(b=>b.setAttribute("aria-pressed",b.dataset.m===S.mode?"true":"false"));
  const b=blend(),t=b.vd+b.id,s=sel1();
  $("#kCr").textContent=cr(s);
  $("#kN").textContent=s.length+"과목";
  const tot=b.vd+b.cm+b.id||1;
  setMix(b.vd/tot*100,b.cm/tot*100,b.id/tot*100,$("#mixTrack"));
  $("#bvd").textContent="시각 "+b.vd;
  $("#bcm").textContent="공통 "+b.cm;
  $("#bid").textContent="산업 "+b.id;
  const r=t?b.vd/t:.5,v=$("#verdict");
  if(!t){v.textContent="아직 담은 과목 없음";v.removeAttribute("data-k");}
  else if(r>=.78){v.textContent="시각 중심";v.dataset.k="v";}
  else if(r>.4){v.textContent="시각 · 산업 혼합";v.removeAttribute("data-k");}
  else{v.textContent="산업 중심";v.dataset.k="i";}
}
function renderMain(){
  const m=$("#main");m.innerHTML="";
  const f={table:vTable,careers:vCareers,studios:vStudios,
    "road-career":vRoadCareer,"road-studio":vRoadStudio,"road-grad":vRoadGrad}[S.view]||vTable;
  m.appendChild(f());
}
function render(){
  try{renderSide();renderMain();}
  catch(err){if(window.console&&console.error)console.error(err);}
}

(function(){
  const sw=$("#modesw");
  [["UG","학부"],["GR","대학원"]].forEach(o=>{
    const b=el("button",null,o[1]);b.dataset.m=o[0];
    b.onclick=()=>{
      if(S.mode===o[0])return;
      S.mode=o[0];S.career=null;S.route=null;S.concept={};S.states={};
      S.cat="ALL";S.tag=null;S.q="";S.tableMode=null;S.view="table";
      render();scrollTop();};
    sw.appendChild(b);});
  $("#reset").onclick=()=>{S.states={};S.career=null;S.route=null;S.concept={};render();scrollTop();};
  render();
})();

})();
