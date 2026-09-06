/* ============================================================
   학부 교과목 · 교과과정표 구조
   출처: 학부 NEW 교과과정 맵(2026.08.06.), 2025학년도 학생생활안내(학부)
   ------------------------------------------------------------
   이 파일만 고치면 화면에 바로 반영됩니다. 빌드 과정 없음.
   ============================================================ */

const SEMS = ["1-1","1-2","2-1","2-2","3-1","3-2","4-1","4-2"];
const SEM_LABEL = {"1-1":["1","1학기"],"1-2":["1","2학기"],"2-1":["2","1학기"],"2-2":["2","2학기"],
                   "3-1":["3","1학기"],"3-2":["3","2학기"],"4-1":["4","1학기"],"4-2":["4","2학기"]};

/* 학생생활안내 4-1 교과과정표의 열 구조 */
const COLS = [
  {id:"vd-g",  group:"VD", side:"VD", label:"그래픽", w:"12.5%"},
  {id:"vd-c",  group:"VD", side:"VD", label:"코어",   w:"14.5%", core:true},
  {id:"vd-m",  group:"VD", side:"VD", label:"미디어", w:"12.5%"},
  {id:"cm",    group:"CM", side:"-",  label:"공통교과목", w:"17%"},
  {id:"id-p",  group:"ID", side:"ID", label:"제품",   w:"12.5%"},
  {id:"id-c",  group:"ID", side:"ID", label:"코어",   w:"14.5%", core:true},
  {id:"id-s",  group:"ID", side:"ID", label:"공간",   w:"12.5%"}
];

/* c(id, ko, en, cr, sem, col, o)
   o: core 핵심이수 / req 전공필수 / art10 미대공통10 / eng 영어강의 / cap 졸전루트
      was 변경 전 강좌명 / nw 개편 신설 / gen 교양 / both 1·2학기 개설 / tag 역량태그
      src "map26"(개편맵 수록) | "guide25"(학생생활안내에만 수록) */
function c(id,ko,en,cr,sem,col,o){return Object.assign({id,ko,en,cr,sem,col,src:"map26"},o||{});}

const COURSES = [
/* ---------- 1학년 · 공통 ---------- */
c("f-db1","디자인기초1","Introduction to Design 1",2,"1-1","cm",{req:1}),
c("f-db2","디자인기초2","Introduction to Design 2",2,"1-2","cm",{req:1}),
c("a-bvd","기초시각디자인","Basic Graphic Design",2,"1-1","cm",{art10:1,both:1,note:"미대공통"}),
c("a-bid","기초산업디자인","Industrial Design Foundation",2,"1-1","cm",{art10:1,both:1,note:"미대공통"}),
c("a-p1","평면조형1","2D Form 1",2,"1-1","cm",{art10:1,note:"미대공통"}),
c("a-p2","평면조형2","2D Form 2",2,"1-1","cm",{art10:1,note:"미대공통"}),
c("a-s1","입체조형1","3D Form 1",2,"1-1","cm",{art10:1,note:"미대공통"}),
c("a-cer","기초도예","Basic Ceramics",2,"1-1","cm",{art10:1,note:"미대공통"}),
c("a-p3","평면조형3","2D Form 3",2,"1-2","cm",{art10:1,note:"미대공통"}),
c("a-p4","평면조형4","2D Form 4",2,"1-2","cm",{art10:1,note:"미대공통"}),
c("a-s2","입체조형2","3D Form 2",2,"1-2","cm",{art10:1,note:"미대공통"}),
c("a-met","기초금속공예","Basic Metal Craft",2,"1-2","cm",{art10:1,note:"미대공통"}),
c("f-kart","한국미술과 문화","Korean Art and Culture",3,"1-1","cm",{req:1,src:"guide25"}),
c("f-wart","서양미술사","History of Western Art",3,"1-2","cm",{req:1,src:"guide25"}),

/* ---------- 시각 · 그래픽 ---------- */
c("v-basic","시각디자인기초","Basic Visual Communication Design Project",3,"2-1","vd-g",{tag:["조형","그래픽"]}),
c("v-gen","생성형그래픽디자인","Generative Graphic Design",3,"2-2","vd-g",{nw:1,tag:["코드","그래픽","AI"]}),
c("v-illust","일러스트레이션","Illustration",3,"3-1","vd-g",{was:"일러스트레이션1",tag:["조형","그래픽"]}),
c("v-3d","3D그래픽디자인","3D Graphic Design",3,"3-2","vd-g",{tag:["영상","조형"]}),

/* ---------- 시각 · 코어(핵심이수) ---------- */
c("v-typo","타이포그래피","Typography",3,"2-1","vd-c",{core:1,nw:1,was:"타이포그래피디자인1",tag:["타이포","그래픽"]}),
c("v-ui","UI디자인","UI Design",3,"2-1","vd-c",{core:1,eng:1,nw:1,was:"UI디자인프로그래밍",tag:["인터랙션","코드"]}),
c("v-typom","타이포그래피 인 미디어","Typography in Media",3,"2-2","vd-c",{core:1,nw:1,was:"타이포그래피디자인2",tag:["타이포","영상"]}),
c("v-comp","컴퓨테이셔널디자인","Computational Design",3,"2-2","vd-c",{core:1,nw:1,was:"VD컴퓨테이션",tag:["코드","그래픽"]}),
c("v-pub","디자인출판","Design Publication",3,"3-1","vd-c",{core:1,nw:1,was:"편집디자인",tag:["타이포","그래픽"]}),
c("v-iid","정보인터랙션디자인","Information Interaction Design",3,"3-1","vd-c",{core:1,tag:["인터랙션","리서치"]}),
c("v-brand","브랜드경험디자인","Brand Experience Design",3,"3-2","vd-c",{core:1,nw:1,was:"아이덴티티디자인",tag:["브랜드","비즈니스"]}),
c("v-motion","모션그래픽디자인","Motion Graphic Design",3,"3-2","vd-c",{core:1,nw:1,was:"모션그래픽스",tag:["영상","그래픽"]}),

/* ---------- 시각 · 미디어 ---------- */
c("v-image","이미지와 재현","Image and Representation",3,"2-2","vd-m",{nw:1,was:"디자인사진",tag:["영상","조형"]}),
c("v-moving","무빙이미지디자인","Moving Image Design",3,"3-1","vd-m",{nw:1,was:"영상디자인 · 애니메이션",tag:["영상"]}),
c("v-suxd","서비스UX디자인","Service UX Design",3,"3-2","vd-m",{tag:["인터랙션","리서치","비즈니스"]}),

/* ---------- 공통교과목 ---------- */
c("c-research","디자인리서치","Design Research",3,"2-1","cm",{tag:["리서치"]}),
c("c-culture","디자인과 문화","Design and Culture",3,"2-1","cm",{both:1,tag:["이론"]}),
c("c-process","디자인과정과 방법","Design Process & Methods",3,"2-1","cm",{tag:["리서치","비즈니스"]}),
c("c-ai","AI응용디자인","AI Applied Design",3,"2-2","cm",{nw:1,tag:["AI","코드"]}),
c("c-digeo","디지털지오매트리","Digital Geometry & Fabrication",3,"2-2","cm",{tag:["조형","코드"]}),
c("c-mdp","미디어디자인프로그래밍","Media Design Programming",3,"3-1","cm",{tag:["코드","영상"]}),
c("c-history","디자인사","History of Design",3,"3-1","cm",{req:1,both:1,tag:["이론"]}),
c("c-practice","디자인프로젝트실무","Design Project Practice",3,"3-1","cm",{tag:["비즈니스"]}),
c("c-theories","현대디자인론","Theories of Design",3,"3-1","cm",{both:1,tag:["이론"]}),
c("c-xr","확장현실디자인","Extended Reality Design",3,"3-1","cm",{nw:1,tag:["영상","공간","코드"]}),
c("c-law","디자인과 법률","Design and Law",3,"3-2","cm",{tag:["비즈니스","이론"]}),
c("c-dtr","디자인사고및연구","Design Thinking and Research",3,"3-2","cm",{eng:1,src:"guide25",tag:["리서치"]}),
c("c-life","디자인과 생활","Design and Everyday Life",3,"4-1","cm",{gen:1,both:1,tag:["이론"]}),
c("c-portfolio","디자인포트폴리오","Design Portfolio",3,"4-2","cm",{eng:1,tag:["비즈니스"]}),
c("c-biz","디자인비즈니스","Design Business",3,"4-2","cm",{tag:["비즈니스"]}),

/* ---------- 산업 · 제품 ---------- */
c("i-draw","혼합매체드로잉","Mixed Media Drawing",3,"2-1","id-p",{tag:["조형"]}),
c("i-prod","제품디자인","Product Design",3,"2-2","id-p",{core:1,was:"제품리버스디자인",tag:["제품","조형"]}),
c("i-kinetic","키네틱시스템디자인","Kinetic Systems Design",3,"3-1","id-p",{nw:1,was:"사물인터랙션디자인",tag:["제품","코드","인터랙션"]}),
c("i-mobility","모빌리티디자인","Mobility Design",3,"3-2","id-p",{nw:1,was:"운송디자인 · 운송기기디자인",tag:["모빌리티","조형"]}),

/* ---------- 산업 · 코어(핵심이수) ---------- */
c("i-elem","디자인요소와 원리","Elements and Principles of Design",3,"2-1","id-c",{core:1,was:"디자인의요소와원리",tag:["조형","제품"]}),
c("i-struct","구조와 형태","Structure & Form",3,"2-2","id-c",{core:1,nw:1,was:"구조와재료디자인",tag:["조형","제품"]}),
c("i-mat","재료와 물성","Materials & Materiality",3,"2-2","id-c",{nw:1,was:"혼합재료모델링",tag:["조형","제품"]}),
c("i-psd","제품서비스디자인","Product Service Design",3,"3-1","id-c",{core:1,tag:["제품","비즈니스","리서치"]}),
c("i-living","리빙디자인","Living Design",3,"3-1","id-c",{core:1,was:"주거공간디자인",tag:["리빙","제품"]}),
c("i-hbd","인간행태와 디자인","Human Behavior and Design",3,"3-2","id-c",{core:1,tag:["리서치","인터랙션"]}),
c("i-social","사회적이슈와 디자인","Social Issues and Design",3,"3-2","id-c",{core:1,tag:["리서치","이론"]}),
c("i-intel","지능형시스템디자인","Intelligent Systems Design",3,"3-2","id-c",{nw:1,tag:["AI","인터랙션","제품"]}),

/* ---------- 산업 · 공간 ---------- */
c("i-space","공간디자인","Spatial Design",3,"2-1","id-s",{core:1,nw:1,was:"공간디자인기초 · 공간디자인컨셉스터디",tag:["공간"]}),
c("i-tect","디자인텍토닉스","Design Tectonics",3,"2-2","id-s",{nw:1,tag:["공간","조형"]}),
c("i-spaceenv","공간환경디자인","Spatial Environmental Design",3,"3-1","id-s",{nw:1,was:"도시공간디자인",tag:["공간"]}),
c("i-bio","리빙바이오디자인","Living Bio Design",3,"3-2","id-s",{nw:1,was:"바이오디자인",tag:["리빙","이론"]}),

/* ---------- 4학년 졸업전시 스튜디오 ---------- */
c("cap-graphic1","그래픽디자인스튜디오1","Graphic Design Studio 1",3,"4-1","vd-g",{cap:"graphic",nw:1,was:"그래픽디자인프로젝트1"}),
c("cap-graphic2","그래픽디자인스튜디오2","Graphic Design Studio 2",3,"4-2","vd-g",{cap:"graphic",nw:1,was:"그래픽디자인프로젝트2"}),
c("cap-brand1","브랜드디자인스튜디오1","Brand Design Studio 1",3,"4-1","vd-c",{cap:"brand",nw:1,was:"브랜드디자인프로젝트1"}),
c("cap-brand2","브랜드디자인스튜디오2","Brand Design Studio 2",3,"4-2","vd-c",{cap:"brand",nw:1,was:"브랜드디자인프로젝트2"}),
c("cap-uiux1","UI, UX디자인스튜디오1","UI/UX Design Studio 1",3,"4-1","vd-c",{cap:"uiux",nw:1,was:"UI,UX디자인프로젝트1"}),
c("cap-uiux2","UI, UX디자인스튜디오2","UI/UX Design Studio 2",3,"4-2","vd-c",{cap:"uiux",nw:1,was:"UI,UX디자인프로젝트2"}),
c("cap-media1","미디어디자인스튜디오1","Media Design Studio 1",3,"4-1","vd-m",{cap:"media",nw:1,was:"미디어디자인프로젝트1"}),
c("cap-media2","미디어디자인스튜디오2","Media Design Studio 2",3,"4-2","vd-m",{cap:"media",nw:1,was:"미디어디자인프로젝트2"}),
c("cap-pi1","제품인터랙션디자인스튜디오1","Product Interaction Design Studio 1",3,"4-1","id-p",{cap:"pi",nw:1,was:"제품인터랙션디자인프로젝트1"}),
c("cap-pi2","제품인터랙션디자인스튜디오2","Product Interaction Design Studio 2",3,"4-2","id-p",{cap:"pi",nw:1,was:"제품인터랙션디자인프로젝트2"}),
c("cap-dyn1","다이내믹시스템디자인스튜디오1","Dynamic Systems Design Studio 1",3,"4-1","id-c",{cap:"dyn",nw:1,was:"모빌리티디자인프로젝트1"}),
c("cap-dyn2","다이내믹시스템디자인스튜디오2","Dynamic Systems Design Studio 2",3,"4-2","id-c",{cap:"dyn",nw:1,was:"모빌리티디자인프로젝트2"}),
c("cap-living1","리빙디자인스튜디오1","Living Design Studio 1",3,"4-1","id-c",{cap:"living",nw:1,was:"리빙디자인프로젝트1"}),
c("cap-living2","리빙디자인스튜디오2","Living Design Studio 2",3,"4-2","id-c",{cap:"living",nw:1,was:"리빙디자인프로젝트2"}),
c("cap-space1","공간디자인스튜디오1","Spatial Design Studio 1",3,"4-1","id-s",{cap:"space",nw:1,was:"공간디자인프로젝트1"}),
c("cap-space2","공간디자인스튜디오2","Spatial Design Studio 2",3,"4-2","id-s",{cap:"space",nw:1,was:"공간디자인프로젝트2"})
];

const BY_ID={}; COURSES.forEach(x=>{BY_ID[x.id]=x; x.side = x.col==="cm" ? "-" : (x.col[0]==="v"?"VD":"ID");});

/* 핵심/선택이수 — 학생생활안내 기준을 현행 과목명에 대응 */
const CORE_2024 = {
  VD:["v-typo","v-typom","v-ui","v-comp","v-pub","v-brand","v-iid","v-motion"],
  ID:["i-elem","i-space","i-psd","i-living","i-prod","i-struct","i-hbd","i-social"]
};
const SEL_2024 = {
  VD:["v-basic","v-moving","v-image","v-illust","v-3d","v-suxd","v-gen"],
  ID:["i-draw","i-mat","i-kinetic","i-bio","i-mobility","i-tect","i-spaceenv","i-intel"]
};
/* 직전 내규(2020~2023학번) 핵심이수 — 학생생활안내 p.19 */


/* 과목이 하는 일 — 루트맵에서 "왜 이걸 듣나"를 설명 */
const WHY={
"v-basic":"시각디자인 작업의 처음부터 끝까지를 한 바퀴 돈다.",
"v-gen":"규칙과 생성 도구로 이미지를 만들어낸다.",
"v-illust":"자기만의 그림 언어를 만든다.",
"v-3d":"입체와 렌더링으로 장면을 짓는다.",
"v-typo":"글자를 다루는 기본 문법. 시각 전공의 뼈대.",
"v-ui":"화면 구조와 컴포넌트를 설계한다. 영어강의.",
"v-typom":"움직이는 화면 위에서 글자를 다룬다.",
"v-comp":"코드로 형태를 생성한다.",
"v-pub":"여러 페이지를 하나의 구조로 엮는다.",
"v-iid":"복잡한 정보를 만질 수 있는 형태로 바꾼다.",
"v-brand":"아이덴티티를 운용 가능한 시스템으로 만든다.",
"v-motion":"시간축 위에서 그래픽을 움직인다.",
"v-image":"이미지가 무엇을 어떻게 재현하는지 다룬다.",
"v-moving":"영상의 흐름과 편집을 설계한다.",
"v-suxd":"흩어진 접점을 하나의 서비스로 잇는다.",
"c-research":"사용자와 맥락을 조사하는 방법을 배운다.",
"c-culture":"디자인이 놓인 문화적 조건을 읽는다.",
"c-process":"문제 정의부터 결정까지의 절차.",
"c-ai":"AI를 도구가 아니라 재료로 쓰는 법.",
"c-digeo":"곡면과 기하를 다루고 제작으로 넘긴다.",
"c-mdp":"화면을 코드로 직접 움직인다.",
"c-history":"지금의 형태가 어디서 왔는지 안다.",
"c-practice":"실제 클라이언트 조건에서 한번 굴려본다.",
"c-theories":"자기 작업을 말로 설명하는 근육.",
"c-xr":"물리 공간 위에 가상 레이어를 얹는다.",
"c-law":"저작권과 계약. 일하기 시작하면 바로 필요하다.",
"c-dtr":"연구로서의 디자인. 대학원 준비에 직결. 영어강의.",
"c-life":"교양 영역에서 디자인을 넓게 본다.",
"c-portfolio":"취업·진학용 결과물을 정리한다. 영어강의.",
"c-biz":"디자인을 사업의 언어로 옮긴다.",
"i-draw":"손으로 형태를 빠르게 뽑아내는 훈련.",
"i-prod":"제품 하나를 처음부터 끝까지 만든다.",
"i-kinetic":"움직이는 사물의 메커니즘을 다룬다.",
"i-mobility":"탈것의 비례와 조형.",
"i-elem":"조형의 기본 어휘. 산업 전공의 뼈대.",
"i-struct":"버티는 구조가 형태를 결정한다.",
"i-mat":"재료를 직접 만지고 판단하는 감각.",
"i-psd":"제품을 서비스 단위로 확장한다.",
"i-living":"생활 공간 안의 물건과 가구.",
"i-hbd":"사람의 행동을 근거로 설계한다.",
"i-social":"디자인이 개입할 수 있는 사회 문제.",
"i-intel":"사물에 판단과 반응을 심는다.",
"i-space":"공간을 구성하는 기본 원리.",
"i-tect":"구축 방식으로 공간을 사고한다.",
"i-spaceenv":"건물 밖, 도시 스케일의 환경.",
"i-bio":"생물과 소재에서 출발하는 디자인."
};
COURSES.forEach(x=>{x.why = WHY[x.id] || (x.cap?"졸업전시 작품을 만든다. 1·2 두 학기 연속 수강.":"");});
