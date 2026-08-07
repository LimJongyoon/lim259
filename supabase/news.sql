-- News 테이블 + 초기 데이터
-- Supabase 대시보드 > SQL Editor 에 이 파일 전체를 붙여넣고 실행한다.
--
-- 실행하고 나면 사이트의 모든 소식이 이 테이블에서 나온다.
-- /log 관리자 페이지의 News 탭에서 전부 수정·삭제할 수 있다.
--
-- src/content/news/*.md 는 그대로 남겨두는데, DB 조회가 실패했을 때만 쓰이는
-- 예비 사본이다(테이블 미생성, Supabase 장애 등). 평소에는 화면에 안 나온다.

create table if not exists public.news (
  id          text primary key default gen_random_uuid()::text,
  date        date not null,             -- 표시는 YYYY.MM 만 하지만 정렬을 위해 일자까지 저장
  category    text,                      -- publication | exhibition | award | grant | teaching | project | career
  text_kr     text,
  text_en     text,
  text_jp     text,
  link        text,
  created_at  timestamptz not null default now()
);

create index if not exists news_date_idx on public.news (date desc);

-- SUPABASE_ANON_KEY 는 서버(Vercel 함수)에서만 쓰이고 클라이언트 번들에는 포함되지 않는다.
-- 따라서 실제 접근 통제는 api/news.ts 의 ADMIN_KEY 검사가 담당한다.
alter table public.news enable row level security;

drop policy if exists "news api access" on public.news;

create policy "news api access"
  on public.news
  for all
  to anon
  using (true)
  with check (true);


-- ===== 초기 데이터 (마크다운 32건) =====
-- 같은 id 가 있으면 덮어쓴다. 즉 이 파일을 다시 실행하면 마크다운 내용으로 동기화된다.
-- 주의: /log 에서 직접 고친 내용도 같은 id 면 같이 덮어써진다.

insert into public.news (id, date, category, text_kr, text_en, text_jp, link) values
  ($q$e2festa-table-it-2017$q$, '2017-11-01', $q$award$q$, $q$이미지 인식 AR 프로젝션 테이블 **Table-It**로 E2Festa **교육부 장관상**을 받았어요 🏆$q$, $q$**Table-It**, an image-recognition AR projection table, won the **Minister of Education Award** at E2Festa 🏆$q$, $q$画像認識ARプロジェクションテーブル **Table-It** で E2Festa の **教育部長官賞** を受賞 🏆$q$, null),
  ($q$canon-join-2017$q$, '2017-12-01', $q$career$q$, $q$**캐논**에 반도체 광학 엔지니어로 입사했어요.$q$, $q$Joined **Canon** as a semiconductor optical engineer.$q$, $q$**キヤノン** に半導体光学エンジニアとして入社しました。$q$, null),
  ($q$bs-electrical-engineering-2018$q$, '2018-02-01', $q$career$q$, $q$숭실대 **전기공학 학사** 졸업! 전 학기 성적우수 장학금과 함께 🎓$q$, $q$Graduated with a **B.S. in Electrical Engineering** from Soongsil — with a merit scholarship every semester 🎓$q$, $q$崇実大 **電気工学 学士** を卒業。全学期 成績優秀奨学金つき 🎓$q$, null),
  ($q$canon-litho-license-2018$q$, '2018-06-01', $q$award$q$, $q$**한국인 엔지니어 최초**로 캐논 포토리소그래피 장비 설치 자격을 땄어요! 🥇$q$, $q$Became the **first Korean engineer** to earn Canon's photolithography installation license! 🥇$q$, $q$**韓国人エンジニアとして初めて** キヤノンのフォトリソグラフィ装置 設置資格を取得！🥇$q$, null),
  ($q$canon-leave-2019$q$, '2019-02-01', $q$career$q$, $q$수원·우츠노미야·뮌헨을 오가던 2년, **캐논**에서 나왔어요.$q$, $q$After two years between Suwon, Utsunomiya and Munich, I left **Canon**.$q$, $q$水原・宇都宮・ミュンヘンを行き来した2年を経て、**キヤノン** を離れました。$q$, null),
  ($q$sogang-ms-start-2019$q$, '2019-03-01', $q$career$q$, $q$전기공학에서 방향을 틀어 서강대 **Art & Technology 석사**를 시작했어요.$q$, $q$Switched gears from electrical engineering and started my **M.S. in Art & Technology** at Sogang.$q$, $q$電気工学から方向を変え、西江大の **Art & Technology 修士課程** をスタート。$q$, null),
  ($q$panopticon-korea-2019$q$, '2019-09-01', $q$career$q$, $q$신생아 헬스케어 스타트업 **Panopticon Korea**를 시작했어요 🚀$q$, $q$Started **Panopticon Korea**, a neonatal healthcare startup 🚀$q$, $q$新生児ヘルスケアのスタートアップ **Panopticon Korea** を始めました 🚀$q$, null),
  ($q$nipa-ai-voucher-2020$q$, '2020-05-01', $q$grant$q$, $q$AI 기반 신생아 모니터링으로 **NIPA AI 바우처 사업**에 선정됐어요.$q$, $q$Our AI-based baby monitoring solution was picked for the **NIPA AI Voucher Program**.$q$, $q$AIベースの新生児モニタリングで **NIPA AIバウチャー事業** に採択されました。$q$, null),
  ($q$kea-vr-ar-team-2020$q$, '2020-06-01', $q$career$q$, $q$한국전자정보통신산업진흥회 **VR/AR 전문 프로젝트 팀**에 합류했어요.$q$, $q$Joined the **VR/AR project team** at the Korea Electronics Association.$q$, $q$韓国電子情報通信産業振興会の **VR/AR プロジェクトチーム** に参加しました。$q$, null),
  ($q$kt-supervr-2020$q$, '2020-11-01', $q$award$q$, $q$인터랙티브 VR 필름 **The Glasses**로 **KT SuperVR 콘테스트 Top 7**에 들었어요.$q$, $q$**The Glasses**, my interactive VR film, made the **Top 7 at the KT SuperVR Contest**.$q$, $q$インタラクティブVR映画 **The Glasses** で **KT SuperVR コンテスト Top 7** に選ばれました。$q$, null),
  ($q$ms-art-technology-2021$q$, '2021-02-01', $q$career$q$, $q$서강대 **Art & Technology 석사** 졸업! 🎓$q$, $q$Graduated with an **M.S. in Art & Technology** from Sogang! 🎓$q$, $q$西江大 **Art & Technology 修士課程** を修了！🎓$q$, null),
  ($q$sogang-research-engineer-2021$q$, '2021-03-01', $q$career$q$, $q$서강대 **Research Engineer**로 합류했어요. 국립박물관·ETRI와 몰입형 콘텐츠를 만듭니다.$q$, $q$Joined Sogang as a **Research Engineer**, building immersive content with national museums and ETRI.$q$, $q$西江大に **リサーチエンジニア** として合流。国立博物館やETRIと没入型コンテンツを作ります。$q$, null),
  ($q$cradle-design-patent-2021$q$, '2021-09-01', $q$award$q$, $q$신생아 모니터링 스마트 크래들 **디자인 등록**을 마쳤어요.$q$, $q$Registered a **design patent** for the baby monitoring smart cradle.$q$, $q$新生児モニタリング・スマートクレイドルの **意匠登録** が完了しました。$q$, null),
  ($q$birdvr-2022$q$, '2022-02-01', $q$publication$q$, $q$**HCI Korea 2022** 인터랙티브 아트 갤러리에 **BirdVR**을 전시했어요.$q$, $q$Showed **BirdVR** at the **HCI Korea 2022** Interactive Art Gallery.$q$, $q$**HCI Korea 2022** のインタラクティブ・アートギャラリーで **BirdVR** を展示しました。$q$, null),
  ($q$alam-cofounded-2022$q$, '2022-03-01', $q$career$q$, $q$XR 공간 인터랙션 스타트업 **ALAM**을 공동창업했어요! 🌱$q$, $q$Co-founded **ALAM**, an XR spatial interaction startup! 🌱$q$, $q$XR空間インタラクションのスタートアップ **ALAM** を共同創業しました！🌱$q$, null),
  ($q$haptug-2022$q$, '2022-05-01', $q$publication$q$, $q$VR에서 잡아당김을 느끼게 하는 햅틱 장치 **HapTug** 논문이 **Electronics**에 실렸어요.$q$, $q$**HapTug**, our force-feedback device for tugs in VR, was published in **Electronics**.$q$, $q$VRで引っぱりを感じさせるハプティックデバイス **HapTug** の論文が **Electronics** に掲載されました。$q$, null),
  ($q$k-startup-2023$q$, '2023-04-01', $q$grant$q$, $q$**K-Startup 창업패키지**에 EverPen으로 선정됐어요.$q$, $q$EverPen made it into the **K-Startup Startup Package**.$q$, $q$EverPen で **K-Startup 創業パッケージ** に採択されました。$q$, null),
  ($q$arts-startup-2023$q$, '2023-06-01', $q$grant$q$, $q$**예술경영지원센터 예술창업 지원사업**에 EverPen으로 선정됐어요.$q$, $q$EverPen was selected for the **Arts Startup Program** (Korea Arts Management Service).$q$, $q$EverPen で **芸術経営支援センターの芸術創業支援事業** に採択されました。$q$, null),
  ($q$kes-2023-everpen$q$, '2023-10-01', $q$exhibition$q$, $q$**한국전자전(KES)**에서 **EverPen 1.0**을 처음 공개했어요.$q$, $q$Unveiled **EverPen 1.0** at the **Korea Electronics Show**.$q$, $q$**韓国電子展（KES）** で **EverPen 1.0** を初公開しました。$q$, null),
  ($q$chtf-2023$q$, '2023-11-01', $q$exhibition$q$, $q$중국 선전 **CHTF 2023** 부스에 다녀왔어요.$q$, $q$Ran a booth at **CHTF 2023** in Shenzhen, China.$q$, $q$中国・深圳の **CHTF 2023** でブースを出しました。$q$, null),
  ($q$ces-2024-everpen$q$, '2024-01-01', $q$exhibition$q$, $q$첫 **CES**! 라스베이거스에서 **EverPen**을 전시했어요 ✈️$q$, $q$First time at **CES** — showed **EverPen** in Las Vegas ✈️$q$, $q$初めての **CES**！ラスベガスで **EverPen** を展示しました ✈️$q$, null),
  ($q$kocca-grant-2024$q$, '2024-05-01', $q$grant$q$, $q$Quest 3 패스스루 콘텐츠로 **한국콘텐츠진흥원 지원사업**에 뽑혔어요.$q$, $q$Our Quest 3 passthrough content got picked for the **KOCCA New Content Support Program**.$q$, $q$Quest 3 パススルーのコンテンツで **韓国コンテンツ振興院の支援事業** に採択されました。$q$, null),
  ($q$guide-dog-ar-2024$q$, '2024-06-01', $q$publication$q$, $q$**IJHCI**에 시각장애인을 위한 촉각·청각 보조기기 논문 **Guide Dog AR**이 실렸어요.$q$, $q$**Guide Dog AR**, our paper on tactile and auditory assistance for visually impaired users, is out in **IJHCI**.$q$, $q$視覚障害者向けの触覚・聴覚補助デバイス論文 **Guide Dog AR** が **IJHCI** に掲載されました。$q$, null),
  ($q$sogang-capstone-mentor-2024$q$, '2024-09-01', $q$teaching$q$, $q$서강대 컴퓨터공학과 캡스톤 디자인 **산업체 멘토**를 맡았어요.$q$, $q$Joined Sogang's CS Capstone Design course as an **industry mentor**.$q$, $q$西江大 コンピュータ工学科 キャップストーンデザインの **産業界メンター** を務めました。$q$, null),
  ($q$motie-minister-award-2024$q$, '2024-11-01', $q$award$q$, $q$2024 산학프로젝트 챌린지에서 **산업통상자원부 장관상**을 받았어요! 🏆$q$, $q$Won the **Minister's Prize (Ministry of Trade, Industry and Energy)** at the 2024 Industry-Academia Project Challenge! 🏆$q$, $q$2024 産学プロジェクトチャレンジで **産業通商資源部長官賞** をいただきました！🏆$q$, null),
  ($q$alam-exit-2024$q$, '2024-12-01', $q$career$q$, $q$EverPen과 XR 오피스를 만들며 달린 3년, **ALAM** 공동창업자 생활을 마쳤어요.$q$, $q$After three years of EverPen and XR office work, I stepped away from **ALAM**.$q$, $q$EverPen とXRオフィスを作り続けた3年間、**ALAM** の共同創業者としての日々を終えました。$q$, null),
  ($q$ces-2025-everpen2$q$, '2025-01-01', $q$exhibition$q$, $q$**CES 2025** 라스베이거스에서 **EverPen 2.0**을 선보였어요.$q$, $q$Showed **EverPen 2.0** at **CES 2025** in Las Vegas.$q$, $q$**CES 2025**（ラスベガス）で **EverPen 2.0** をお披露目。$q$, null),
  ($q$mmca-ai-docent-2025$q$, '2025-06-01', $q$project$q$, $q$국립현대미술관 수장고 전시용 **AI 도슨트 스마트글래스**를 만들었어요. Meta Ray-Ban + iOS.$q$, $q$Built an **AI docent for smart glasses** for MMCA's storage exhibition — Meta Ray-Ban + iOS.$q$, $q$国立現代美術館の収蔵庫展示向け **AIドーセント・スマートグラス** を作りました。Meta Ray-Ban + iOS。$q$, null),
  ($q$sogang-research-engineer-end-2025$q$, '2025-08-01', $q$career$q$, $q$4년간의 서강대 **Research Engineer** 생활을 마무리했어요.$q$, $q$Wrapped up four years as a **Research Engineer at Sogang**.$q$, $q$4年間の西江大 **リサーチエンジニア** 生活を締めくくりました。$q$, null),
  ($q$ismar-2025-demo$q$, '2025-10-01', $q$publication$q$, $q$**IEEE ISMAR 2025**에서 스마트글래스 AI 도슨트 데모를 발표하고 왔어요 🎤$q$, $q$Took our smart-glasses AI docent demo to **IEEE ISMAR 2025** 🎤$q$, $q$**IEEE ISMAR 2025** でスマートグラスAIドーセントのデモを発表してきました 🎤$q$, null),
  ($q$panicfree-testflight-2026$q$, '2026-03-01', $q$project$q$, $q$정신건강 트래킹 앱 **PanicFree**, 드디어 TestFlight에 올렸어요! 🚀$q$, $q$**PanicFree**, my mental health tracking app, is finally on TestFlight! 🚀$q$, $q$メンタルヘルス記録アプリ **PanicFree**、ついに TestFlight に公開しました！🚀$q$, null),
  ($q$vibe-to-web-2026$q$, '2026-07-01', $q$teaching$q$, $q$서강대 Art & Technology에서 **Vibe to Web** 워크샵을 열었어요. 3일 14시간, AI로 웹 만들기!$q$, $q$Ran **Vibe to Web** at Sogang Art & Technology — 3 days, 14 hours of building the web with AI!$q$, $q$西江大 Art & Technology で **Vibe to Web** ワークショップを開催。3日間14時間、AIでウェブづくり！$q$, $q$https://limjongyoon.github.io/vibe-to-web-recap/$q$)
on conflict (id) do update set
  date     = excluded.date,
  category = excluded.category,
  text_kr  = excluded.text_kr,
  text_en  = excluded.text_en,
  text_jp  = excluded.text_jp,
  link     = excluded.link;
