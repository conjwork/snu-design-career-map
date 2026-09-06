/* 데이터 무결성 검사
   실행: node check-data.js
   과목 id 오타, 존재하지 않는 과목 참조, 트랙 불일치를 잡아냅니다. */
const fs=require("fs");
const load=f=>fs.readFileSync(f,"utf8")
  .replace(/\bconst /g,"var ")
  .replace(/\bfunction (c|J|g|GJ|gRoadKeys)\(/g,"var $1 = function $1(");
const src=["data/undergraduate-courses.js","data/undergraduate-careers.js",
           "data/faculty.js","data/graduate.js"].map(load).join("\n");

const test=`
var bad=[],warn=[];
var ids=new Set(COURSES.map(function(x){return x.id}));
var gids=new Set(GCOURSES.map(function(x){return x.id}));

/* 중복 id */
[[COURSES,"학부"],[GCOURSES,"대학원"]].forEach(function(p){
  var seen={};
  p[0].forEach(function(x){ if(seen[x.id])bad.push(p[1]+" 과목 id 중복: "+x.id); seen[x.id]=1; });
});

/* 학부 루트 */
var validCols=new Set(COLS.map(function(c){return c.id}));
var validSems=new Set(SEMS);
COURSES.forEach(function(x){
  if(!validCols.has(x.col))bad.push("잘못된 열: "+x.ko+" -> "+x.col);
  if(!validSems.has(x.sem))bad.push("잘못된 학기: "+x.ko+" -> "+x.sem);
});
ROUTES.forEach(function(r){
  r.feed.forEach(function(f){ if(!ids.has(f))bad.push("루트 "+r.id+" 선행과목 없음: "+f); });
  r.concepts.forEach(function(k){
    k[2].forEach(function(f){ if(!ids.has(f))bad.push("컨셉 "+r.id+"/"+k[0]+" 과목 없음: "+f); });
  });
  if(r.cap.length!==2)warn.push("루트 "+r.id+" 스튜디오가 2과목이 아님: "+r.cap.length);
  if(!ROUTE_PROF[r.id])warn.push("루트 "+r.id+" 담당 교수 미지정");
  else ROUTE_PROF[r.id].forEach(function(n){
    if(!PROFS.some(function(p){return p.n===n}))bad.push("교수 명단에 없음: "+n);
  });
});

/* 학부 진로 */
var routeIds=new Set(ROUTES.map(function(r){return r.id}));
CAREERS.forEach(function(j){
  if(j.must.length!==6)warn.push("진로 "+j.id+" 필수과목이 6개가 아님: "+j.must.length);
  j.must.concat(j.plus).forEach(function(f){
    if(!ids.has(f))bad.push("진로 "+j.id+" 과목 없음: "+f); });
  j.routes.forEach(function(r){ if(!routeIds.has(r))bad.push("진로 "+j.id+" 루트 없음: "+r); });
  if(["VD","ID","MIX","THEORY"].indexOf(j.cat)<0)bad.push("진로 "+j.id+" 계열 코드 오류: "+j.cat);
});

/* 핵심/선택이수 */
["VD","ID"].forEach(function(m){
  CORE_2024[m].concat(SEL_2024[m]).forEach(function(f){
    if(!ids.has(f))bad.push("이수목록 "+m+" 과목 없음: "+f); });
  if(CORE_2024[m].length!==8)warn.push(m+" 핵심이수가 8과목이 아님: "+CORE_2024[m].length);
});

/* 대학원 */
var rowKeys=new Set(GROWS.map(function(r){return r.k}));
var gcols=new Set(GCOLS.map(function(c){return c.id}));
GCOURSES.forEach(function(x){
  if(!gcols.has(x.col))bad.push("대학원 잘못된 열: "+x.ko+" -> "+x.col);
  if(!x.sems||!x.sems.length)bad.push("대학원 학기 미지정: "+x.ko);
  else x.sems.forEach(function(k){ if(!rowKeys.has(k))bad.push("대학원 잘못된 칸: "+x.ko+" -> "+k); });
});
GROUTES.forEach(function(r){
  var keys=gRoadKeys(r.track);
  r.feed.concat(r.cap).forEach(function(f){
    if(!gids.has(f)){bad.push("대학원 루트 "+r.id+" 과목 없음: "+f);return;}
    var x=GBY[f];
    if(!x.sems.some(function(s){return keys.indexOf(s)>=0}))
      bad.push("트랙 불일치 "+r.id+"("+r.track+") <- "+x.ko+" ["+x.sems+"]");
  });
  r.concepts.forEach(function(k){k[2].forEach(function(f){
    if(!gids.has(f))bad.push("대학원 컨셉 "+r.id+"/"+k[0]+" 과목 없음: "+f); })});
});
GCAREERS.forEach(function(j){
  j.must.concat(j.plus).forEach(function(f){
    if(!gids.has(f))bad.push("대학원 진로 "+j.id+" 과목 없음: "+f); });
  var keys=gRoadKeys(GROUTE_BY[j.routes[0]].track);
  j.must.forEach(function(f){ var x=GBY[f];
    if(x&&!x.sems.some(function(s){return keys.indexOf(s)>=0}))
      bad.push("대학원 진로 "+j.id+" 필수과목이 트랙 밖: "+x.ko); });
});

console.log(bad.length? "\\n[오류 "+bad.length+"건]" : "\\n오류 없음");
bad.forEach(function(b){console.log("  x "+b)});
if(warn.length){console.log("\\n[확인 "+warn.length+"건]");warn.forEach(function(x){console.log("  ! "+x)});}
console.log("\\n학부 과목 "+COURSES.length+" · 루트 "+ROUTES.length+" · 진로 "+CAREERS.length);
console.log("대학원 과목 "+GCOURSES.length+" · 트랙 "+GROUTES.length+" · 진로 "+GCAREERS.length);
GROWS.forEach(function(r){
  console.log("  "+r.k+"  "+r.deg+" "+r.trk+" "+r.sem+"  "+
    GCOURSES.filter(function(x){return x.sems.indexOf(r.k)>=0}).length+"과목");
});
process.exit(bad.length?1:0);
`;
eval(src+test);
