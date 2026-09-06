/* ============================================================
   대학원 교과 · 학위연구 트랙 · 진로 18가지
   출처: 대학원 NEW 교과과정 맵(2026.08.06.)
   ------------------------------------------------------------
   이 파일만 고치면 화면에 바로 반영됩니다. 빌드 과정 없음.
   ============================================================ */

const GROWS=[
  {k:"MS1",deg:"석사",trk:"스튜디오",sem:"1학기"},
  {k:"MS2",deg:"석사",trk:"스튜디오",sem:"2학기"},
  {k:"MT1",deg:"석사",trk:"논문",   sem:"1학기"},
  {k:"MT2",deg:"석사",trk:"논문",   sem:"2학기"},
  {k:"DS1",deg:"박사",trk:"스튜디오",sem:"1학기"},
  {k:"DS2",deg:"박사",trk:"스튜디오",sem:"2학기"},
  {k:"DT1",deg:"박사",trk:"논문",   sem:"1학기"},
  {k:"DT2",deg:"박사",trk:"논문",   sem:"2학기"}
];
const GROW_BY={}; GROWS.forEach(r=>GROW_BY[r.k]=r);
const GSEM_LABEL={};
GROWS.forEach(r=>{GSEM_LABEL[r.k]=[r.deg,r.sem];});

const GCOLS=[
  {id:"gid", label:"산업디자인",    side:"ID", w:"23%"},
  {id:"gvd", label:"시각디자인",    side:"VD", w:"23%"},
  {id:"gdhc",label:"디자인역사문화", side:"-", tone:"DH", w:"23%"},
  {id:"gcm", label:"공통 교과목",   side:"-", w:"21%"}
];

/* g(id, ko, en, sems[], col, opts) */
function g(id,ko,en,sems,col,o){return Object.assign({id,ko,en,sems,col,cr:3,grad:true},o||{});}

const GCOURSES=[
/* ── 공통 교과목 ───────────────────────────────── */
g("g-global","글로벌전략과실무","Global Strategies Design Practice",["MS1","MT1"],"gcm",
  {why:"해외 협업과 실무 조건 아래에서 프로젝트를 굴린다."}),
g("g-think","사고와 조형언어","Thinking Ability and Formative Language",["MS1","MT1"],"gcm",
  {why:"자기 조형 언어를 말로 정리하는 훈련."}),
g("g-sem1","디자인세미나 1: 기술환경과 경제","Design Seminar 1",["MS1","MT1","DS1","DT1"],"gcm",
  {why:"기술과 경제 조건이 디자인을 어떻게 규정하는지."}),
g("g-hcrit","디자인역사와비평","History of Design and Criticism",["MS2","MT2"],"gcm",
  {why:"비평의 언어로 작업을 읽는다."}),
g("g-sem2","디자인세미나 2: 생태환경과 문화","Design Seminar 2",["MS2","MT2","DS2","DT2"],"gcm",
  {why:"생태와 문화 조건에서 디자인의 자리를 묻는다."}),
g("g-bgd","기초시각디자인","Basic Graphic Design",["MS2","MT2"],"gcm",
  {why:"타 전공 진입자를 위한 시각 기초."}),
g("g-adv1","고급디자인스튜디오 1","Advanced Design Studio 1",["MS1"],"gcm",
  {studio:1,deg:"석사",why:"석사 작품 연구의 축. 스튜디오 트랙의 중심 과목."}),
g("g-adv2","고급디자인스튜디오 2","Advanced Design Studio 2",["MS2"],"gcm",
  {studio:1,deg:"석사",why:"1의 연속. 작품을 학위 수준으로 끌어올린다."}),
g("g-dadv1","고급디자인스튜디오 1","Advanced Design Studies 1",["DS1"],"gcm",
  {studio:1,deg:"박사",why:"박사과정 심화 스튜디오. 석사와 영문 명칭이 다르다."}),
g("g-dadv2","고급디자인스튜디오 2","Advanced Design Studies 2",["DS2"],"gcm",
  {studio:1,deg:"박사",why:"박사 연구의 형식화 단계."}),

/* ── 산업디자인 ────────────────────────────────── */
g("g-readid","제품디자인강독","Reading in Industrial Design",["MS1","MT1"],"gid",
  {why:"제품디자인 문헌을 읽고 자기 논점을 세운다."}),
g("g-spatial","공간의 조직과 표현","Spatial Reasoning and Representation",["MS1","MT1"],"gid",
  {why:"공간을 사고하고 표현하는 방법."}),
g("g-tangible","사물인터랙션디자인","Tangible Interaction Design",["MS2","MT2"],"gid",
  {why:"사물과 사람 사이의 인터랙션을 설계한다."}),
g("g-fabsp","공간디자인 구현과 제작","Realization and Fabrication of Space Design",["MS2","MT2"],"gid",
  {why:"도면에서 실제 구축까지."}),
g("g-readsp","공간디자인강독","Reading in Space Design",["MS2","MT2"],"gid",
  {why:"공간디자인 문헌 강독."}),
g("g-s11","디자인스튜디오 11","Design Studio 11",["MS1","DS1"],"gid",
  {studio:1,prof:"정의철",why:"UX · HCI디자인 방향의 작품 연구."}),
g("g-s12","디자인스튜디오 12","Design Studio 12",["MS2","DS2"],"gid",
  {studio:1,prof:"정의철",why:"11의 연속."}),
g("g-s31","디자인스튜디오 31","Design Studio 31",["MS1","DS1"],"gid",
  {studio:1,prof:"안성모",why:"공간디자인 방향의 작품 연구."}),
g("g-s32","디자인스튜디오 32","Design Studio 32",["MS2","DS2"],"gid",
  {studio:1,prof:"안성모",why:"31의 연속."}),
g("g-s101","디자인스튜디오 101","Design Studio 101",["MS1","DS1"],"gid",
  {studio:1,prof:"장성연",why:"리빙 · 가구 방향의 작품 연구."}),
g("g-s102","디자인스튜디오 102","Design Studio 102",["MS2","DS2"],"gid",
  {studio:1,prof:"장성연",why:"101의 연속."}),
g("g-s111","디자인스튜디오 111","Design Studio 111",["MS1","DS1"],"gid",
  {studio:1,prof:"배재혁",why:"첨단융합기술 · 인터랙션 방향."}),
g("g-s112","디자인스튜디오 112","Design Studio 112",["MS2","DS2"],"gid",
  {studio:1,prof:"배재혁",why:"111의 연속."}),
g("g-rr-id1","대학원논문연구","Reading and Research",["MT1","DT1"],"gid",
  {thesis:1,prof:"정의철 · 안성모 · 장성연 · 배재혁",why:"지도교수와 매 학기 이수하는 학위연구."}),
g("g-rr-id2","대학원논문연구","Reading and Research",["MT2","DT2"],"gid",
  {thesis:1,prof:"정의철 · 안성모 · 장성연 · 배재혁",why:"주제를 좁히고 방법을 확정한다."}),

/* ── 시각디자인 ────────────────────────────────── */
g("g-gmoving","무빙이미지디자인","Moving Image Design",["MS1","MT1"],"gvd",
  {why:"움직이는 이미지의 설계."}),
g("g-id1","아이덴티티디자인연구 1","Studies in Identity Design 1",["MS1","MT1"],"gvd",
  {why:"아이덴티티를 연구 대상으로 다룬다."}),
g("g-vn1","비주얼내러티브연구 1","Studies in Visual Narrative 1",["MS1","MT1"],"gvd",
  {why:"시각적 서사의 구조를 연구한다."}),
g("g-mg1","영상디자인연구 1","Media Graphics Design Research 1",["MS1","MT1"],"gvd",
  {why:"영상 그래픽의 방법론."}),
g("g-ui1","UI디자인연구 1","User Interface Design Research 1",["MS1","MT1"],"gvd",
  {why:"인터페이스를 연구 대상으로 다룬다."}),
g("g-id2","아이덴티티디자인연구 2","Studies in Identity Design 2",["MS2","MT2"],"gvd",{why:"1의 연속."}),
g("g-vn2","비주얼내러티브연구 2","Studies in Visual Narrative 2",["MS2","MT2"],"gvd",{why:"1의 연속."}),
g("g-mg2","영상디자인연구 2","Media Graphics Design Research 2",["MS2","MT2"],"gvd",{why:"1의 연속."}),
g("g-ui2","UI디자인연구 2","User Interface Design Research 2",["MS2","MT2"],"gvd",{why:"1의 연속."}),
g("g-vstA","디자인스튜디오 21 · 41 · 71 · 81 · 91","Design Studio",["MS1","DS1"],"gvd",
  {studio:1,prof:"윤주현 · 김수정 · 김경선 · 이장섭 · Chris Hamamoto",
   why:"시각디자인 교수 5인의 스튜디오. 번호와 교수의 개별 대응은 학과 확인 필요."}),
g("g-vstB","디자인스튜디오 51 · 61","Design Studio 51 · 61",["MS1","DS1"],"gvd",
  {studio:1,prof:"담당 미정",why:"개편 맵상 담당 미정."}),
g("g-vstC","디자인스튜디오 52 · 62","Design Studio 52 · 62",["MS2","DS2"],"gvd",
  {studio:1,prof:"담당 미정",why:"51 · 61의 2학기 과목. 담당 미정."}),
g("g-rr-vd1","대학원논문연구","Reading and Research",["MT1","DT1"],"gvd",
  {thesis:1,prof:"윤주현 · 김수정 · 김경선 · 이장섭 · Chris Hamamoto",why:"지도교수와 매 학기 이수하는 학위연구."}),
g("g-rr-vd2","대학원논문연구","Reading and Research",["MT2","DT2"],"gvd",
  {thesis:1,prof:"윤주현 · 김수정 · 김경선 · 이장섭 · Chris Hamamoto",why:"주제를 좁히고 방법을 확정한다."}),

/* ── 디자인역사문화 (전원 논문 트랙) ───────────────── */
g("g-dh-intro","디자인역사문화연구개론","Introduction to Design History and Culture Studies",["MT1"],"gdhc",
  {why:"이 트랙의 입구. 연구 지형을 잡는다."}),
g("g-dh-kor","한국근현대디자인사","Studies in History of Korean Modern & Contemporary Design",["MT1"],"gdhc",
  {why:"한국 디자인사의 사료와 쟁점."}),
g("g-dh-east","동아시아디자인문화사","Topics in History of East Asian Design Culture",["MT1"],"gdhc",
  {why:"동아시아 범위로 시야를 넓힌다."}),
g("g-dh-vis","시각문화와 디자인언어론","Theories of Visual Culture and Design Language",["MT1"],"gdhc",
  {why:"시각문화 이론으로 디자인을 읽는다."}),
g("g-dh-pub","디자인공공미학특강","Topics in Design and Public Aesthetics",["MT1"],"gdhc",
  {why:"공공 영역에서의 미학과 판단."}),
g("g-dh-west","서양근현대디자인사","Studies in History of Western Modern & Contemporary Design",["MT2"],"gdhc",
  {why:"서구 근현대 디자인사의 계보."}),
g("g-dh-arch","문화원형디자인탐사","Studies in Design Exploration of Cultural Archetypes",["MT2"],"gdhc",
  {why:"문화 원형을 디자인 자원으로 다룬다."}),
g("g-dh-digi","디지털디자인문화연구","Studies in Digital Design Culture",["MT2"],"gdhc",
  {why:"디지털 환경의 디자인 문화."}),
g("g-dh-admin","디자인문화행정원론","Principles of Administration for Design Culture",["MT2"],"gdhc",
  {why:"정책과 행정의 언어를 익힌다."}),
g("g-dh-intern","디자인역사문화현장실습","Internship for Design History and Culture",["MT2"],"gdhc",
  {why:"미술관 · 기관 현장 경험."}),
g("g-rr-dh1","대학원논문연구","Reading and Research",["MT1","DT1"],"gdhc",
  {thesis:1,prof:"김민수",why:"지도교수와 매 학기 이수하는 학위연구."}),
g("g-rr-dh2","대학원논문연구","Reading and Research",["MT2","DT2"],"gdhc",
  {thesis:1,prof:"김민수",why:"주제를 좁히고 방법을 확정한다."})
];
const GBY={}; GCOURSES.forEach(x=>{GBY[x.id]=x;
  x.side=x.col==="gid"?"ID":x.col==="gvd"?"VD":"-";
  x.tone=x.col==="gid"?"ID":x.col==="gvd"?"VD":x.col==="gdhc"?"DH":"-";});

/* 학위연구 트랙 5개 — track:"S" 스튜디오 / "T" 논문 */
const GROUTES=[
{id:"gid-studio",name:"산업디자인",side:"ID",kind:"스튜디오",track:"S",
 line:"작품으로 학위를 마친다. 지도교수 스튜디오와 고급디자인스튜디오가 축.",
 feed:["g-readid","g-spatial","g-s11","g-s31","g-s101","g-s111","g-tangible","g-fabsp","g-s12","g-s32","g-s102","g-s112","g-dadv1","g-dadv2"],
 cap:["g-adv1","g-adv2"],
 concepts:[["정의철 · 스튜디오 11 · 12","UX · HCI디자인",["g-s11","g-s12","g-tangible"]],
           ["안성모 · 스튜디오 31 · 32","공간디자인",["g-s31","g-s32","g-fabsp"]],
           ["장성연 · 스튜디오 101 · 102","리빙 · 가구",["g-s101","g-s102","g-readid"]],
           ["배재혁 · 스튜디오 111 · 112","첨단융합기술 · 인터랙션",["g-s111","g-s112","g-tangible"]]]},
{id:"gid-thesis",name:"산업디자인",side:"ID",kind:"논문",track:"T",
 line:"텍스트로 학위를 마친다. 강독과 세미나에서 논점을 만든다.",
 feed:["g-readid","g-spatial","g-sem1","g-tangible","g-readsp","g-sem2","g-hcrit"],
 cap:["g-rr-id1","g-rr-id2"],
 concepts:[["UX · HCI 연구","사용자 행동과 인터랙션",["g-tangible","g-sem1","g-hcrit"]],
           ["공간 연구","공간 조직과 구축",["g-spatial","g-readsp","g-fabsp"]],
           ["제품 · 산업 연구","제품 담론과 산업 조건",["g-readid","g-sem1","g-hcrit"]],
           ["기술융합 연구","신기술과 디자인",["g-sem1","g-sem2","g-dh-digi"]]]},
{id:"gvd-studio",name:"시각디자인",side:"VD",kind:"스튜디오",track:"S",
 line:"작품으로 학위를 마친다. 연구 1·2 과목과 스튜디오를 병행한다.",
 feed:["g-gmoving","g-id1","g-vn1","g-mg1","g-ui1","g-vstA","g-vstB","g-id2","g-vn2","g-mg2","g-ui2","g-vstC","g-dadv1","g-dadv2"],
 cap:["g-adv1","g-adv2"],
 concepts:[["아이덴티티","브랜드와 시각 체계",["g-id1","g-id2","g-vstA"]],
           ["비주얼 내러티브","서사와 이미지",["g-vn1","g-vn2","g-gmoving"]],
           ["영상 · 미디어","움직이는 이미지",["g-mg1","g-mg2","g-gmoving"]],
           ["UI · 인터페이스","화면과 상호작용",["g-ui1","g-ui2","g-vstA"]]]},
{id:"gvd-thesis",name:"시각디자인",side:"VD",kind:"논문",track:"T",
 line:"시각디자인을 연구 대상으로 삼아 논문으로 마무리한다.",
 feed:["g-id1","g-vn1","g-mg1","g-ui1","g-sem1","g-id2","g-vn2","g-ui2","g-hcrit","g-sem2"],
 cap:["g-rr-vd1","g-rr-vd2"],
 concepts:[["타이포 · 출판 연구","글자와 인쇄 매체",["g-vn1","g-hcrit","g-dh-west"]],
           ["인터페이스 연구","UI의 이론화",["g-ui1","g-ui2","g-sem1"]],
           ["영상문화 연구","미디어와 수용",["g-mg1","g-mg2","g-dh-digi"]],
           ["아이덴티티 연구","브랜드 담론",["g-id1","g-id2","g-hcrit"]]]},
{id:"gdhc-thesis",name:"디자인역사문화",side:"-",kind:"논문",track:"T",
 line:"디자인을 역사 · 이론 · 비평의 대상으로 다룬다. 전 과정이 논문 트랙.",
 feed:["g-dh-intro","g-dh-kor","g-dh-east","g-dh-vis","g-dh-pub","g-dh-west","g-dh-arch","g-dh-digi","g-dh-admin","g-dh-intern","g-hcrit"],
 cap:["g-rr-dh1","g-rr-dh2"],
 concepts:[["한국 디자인사","근현대 한국의 사료",["g-dh-kor","g-dh-arch","g-hcrit"]],
           ["서양 · 동아시아 디자인사","비교사적 접근",["g-dh-west","g-dh-east","g-hcrit"]],
           ["시각문화 · 비평","이론과 비평의 언어",["g-dh-vis","g-hcrit","g-dh-pub"]],
           ["정책 · 행정 · 큐레이팅","제도와 현장",["g-dh-admin","g-dh-pub","g-dh-intern"]]]}
];
const GROUTE_BY={}; GROUTES.forEach(r=>GROUTE_BY[r.id]=r);

/* 대학원 진로 18 */
function GJ(id,cat,name,line,where,must,plus,routes,prof){
  return {id,cat,name,line,where,must,plus,routes,grad:prof};
}
const GCAREERS=[
GJ("g-adv-r","ID","기업 선행디자인 연구원","3~5년 뒤 제품을 미리 그리는 자리. 리서치와 조형을 함께 요구한다.",
  "삼성전자·LG전자 선행디자인, 현대차 어드밴스드 스튜디오",
  ["g-readid","g-s11","g-s12","g-tangible","g-global"],["g-s111","g-s112","g-sem1","g-hcrit"],["gid-studio"],"정의철 · 배재혁"),
GJ("g-uxlead","ID","UX · HCI 리서치 리드","사용자 연구를 설계하고 조직의 판단 근거를 만든다.",
  "IT 대기업 UX리서치 조직, 기업 연구소",
  ["g-tangible","g-sem1","g-readid","g-hcrit","g-sem2"],["g-global","g-spatial","g-dh-digi"],["gid-thesis"],"정의철 · 윤주현"),
GJ("g-robot","ID","로봇 · 지능형 제품 연구자","사물에 지능을 넣는 일을 연구 단위로 다룬다.",
  "로봇 기업 연구소, 대학 연구실, 정부출연연구기관",
  ["g-s111","g-s112","g-tangible","g-readid","g-dadv1"],["g-s11","g-global","g-sem1"],["gid-studio"],"배재혁 · 정의철"),
GJ("g-spacelead","ID","공간 · 환경 디자인 리드","전시·리테일·환경 스케일의 프로젝트를 총괄한다.",
  "공간 전문 사무소, 브랜드 공간팀, 미술관",
  ["g-spatial","g-s31","g-s32","g-fabsp","g-readsp"],["g-global","g-dh-pub","g-hcrit"],["gid-studio"],"안성모"),
GJ("g-living","ID","가구 · 리빙 브랜드 디렉터","제품 라인 전체의 방향을 정한다.",
  "가구 브랜드, 리빙 기업, 독립 스튜디오",
  ["g-s101","g-s102","g-readid","g-global","g-think"],["g-hcrit","g-sem2","g-dh-arch"],["gid-studio"],"장성연"),
GJ("g-idphd","ID","산업디자인 박사 · 교수","연구자로 남는 길. 석사에서 논문 트랙을 밟아야 유리하다.",
  "대학 교수, 박사과정 진학, 연구소 책임연구원",
  ["g-readid","g-sem1","g-sem2","g-hcrit","g-readsp"],["g-spatial","g-tangible","g-think"],["gid-thesis"],"산업디자인 전 교수진"),
GJ("g-brand","VD","브랜드 전략 디렉터","브랜드의 시각 체계와 전략을 함께 설계한다.",
  "브랜드 컨설팅, 대기업 BX조직",
  ["g-id1","g-id2","g-vstA","g-global","g-think"],["g-vn1","g-hcrit","g-bgd"],["gvd-studio"],"이장섭 · 김경선"),
GJ("g-typo","VD","타이포그래피 · 출판 연구자","글자와 인쇄 매체를 연구 대상으로 삼는다.",
  "서체회사 연구직, 출판 · 아카이브 기관, 대학",
  ["g-vn1","g-vn2","g-hcrit","g-sem1","g-sem2"],["g-id1","g-dh-west","g-dh-arch"],["gvd-thesis"],"김경선 · 김민수"),
GJ("g-film","VD","영상 · 미디어 디자인 감독","영상 그래픽의 방향을 총괄한다.",
  "방송·OTT 그래픽, 미디어아트 스튜디오",
  ["g-mg1","g-mg2","g-gmoving","g-vstA","g-vstC"],["g-global","g-id1","g-think"],["gvd-studio"],"김수정 · 윤주현"),
GJ("g-uir","VD","UI디자인 리서치 리드","인터페이스를 연구로 다루고 디자인시스템을 세운다.",
  "IT 기업 디자인시스템 조직, 플랫폼 기업",
  ["g-ui1","g-ui2","g-sem1","g-hcrit","g-sem2"],["g-mg1","g-global","g-id1"],["gvd-thesis"],"윤주현 · 박영목"),
GJ("g-comp","VD","컴퓨테이셔널 디자인 연구자","코드와 생성 방법을 디자인 연구로 밀어붙인다.",
  "R&D 랩, 인터랙티브 스튜디오, 대학",
  ["g-vstA","g-gmoving","g-mg1","g-mg2","g-vstC"],["g-global","g-ui1","g-think"],["gvd-studio"],"Chris Hamamoto"),
GJ("g-vdphd","VD","시각디자인 박사 · 교수","연구와 교육으로 방향을 잡는 경우.",
  "대학 교수, 박사과정 진학",
  ["g-hcrit","g-sem1","g-sem2","g-id1","g-ui1"],["g-vn1","g-mg1","g-dh-west"],["gvd-thesis"],"시각디자인 전 교수진"),
GJ("g-curator","THEORY","미술관 · 디자인관 큐레이터","전시를 기획하고 소장품을 해석한다.",
  "국립현대미술관, 디자인 전문 미술관, 시립 문화기관",
  ["g-dh-intro","g-dh-kor","g-dh-vis","g-dh-intern","g-hcrit"],["g-dh-east","g-dh-pub","g-dh-arch"],["gdhc-thesis"],"김민수"),
GJ("g-critic","THEORY","디자인 비평가 · 저술가","작업을 읽고 쓰는 일을 직업으로 삼는다.",
  "매체 기고, 단행본 저술, 연구소",
  ["g-hcrit","g-dh-vis","g-dh-west","g-dh-kor","g-dh-digi"],["g-dh-east","g-sem2","g-dh-arch"],["gdhc-thesis"],"김민수"),
GJ("g-policy","THEORY","디자인 정책 · 행정 전문가","제도와 예산의 언어로 디자인을 다룬다.",
  "한국디자인진흥원, 지자체 디자인 담당, 공공기관",
  ["g-dh-admin","g-dh-pub","g-dh-intro","g-sem1","g-dh-intern"],["g-dh-kor","g-global","g-sem2"],["gdhc-thesis"],"김민수 · 이장섭"),
GJ("g-archive","THEORY","디자인 아카이브 · 아키비스트","흩어진 자료를 모아 사료로 만든다.",
  "아카이브 기관, 미술관 자료실, 기업 헤리티지팀",
  ["g-dh-kor","g-dh-arch","g-dh-intro","g-dh-intern","g-dh-digi"],["g-dh-west","g-hcrit","g-dh-east"],["gdhc-thesis"],"김민수"),
GJ("g-edu","THEORY","디자인 교육 기획자","커리큘럼과 교육 프로그램을 설계한다.",
  "대학 교육기획, 교육기관, 문화재단",
  ["g-dh-intro","g-dh-vis","g-sem1","g-sem2","g-dh-admin"],["g-hcrit","g-dh-intern","g-global"],["gdhc-thesis"],"김민수"),
GJ("g-dhcphd","THEORY","디자인역사문화 박사 · 교수","이 트랙의 기본 진로. 사료와 이론을 동시에 요구한다.",
  "대학 교수, 박사과정 진학, 연구기관",
  ["g-dh-west","g-dh-kor","g-hcrit","g-dh-vis","g-dh-east"],["g-dh-arch","g-dh-digi","g-sem1"],["gdhc-thesis"],"김민수")
];
const GCAREER_BY={}; GCAREERS.forEach(x=>GCAREER_BY[x.id]=x);

const GCAT_LABEL={ID:"산업디자인 트랙",VD:"시각디자인 트랙",THEORY:"디자인역사문화 트랙"};
const GCAT_DESC={
  ID:"사물 · 공간 · 인터랙션을 작품이나 논문으로 밀고 나가는 트랙.",
  VD:"이미지 · 글자 · 화면을 연구 단위로 다루는 트랙.",
  THEORY:"디자인을 읽고 쓰고 제도로 다루는 트랙. 전원 논문 학위."
};

/* 로드맵 축: 트랙에 따라 4개 칸 */
function gRoadKeys(track){return track==="S"?["MS1","MS2","DS1","DS2"]:["MT1","MT2","DT1","DT2"];}
