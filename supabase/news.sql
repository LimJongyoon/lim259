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


-- ===== 초기 데이터 (마크다운 48건) =====
-- 같은 id 가 있으면 덮어쓴다. 즉 이 파일을 다시 실행하면 마크다운 내용으로 동기화된다.
-- 주의: /log 에서 직접 고친 내용도 같은 id 면 같이 덮어써진다.

-- 날짜를 CV 기준으로 바로잡으면서 id 가 바뀐 항목(KES 2023 → 2022)의 옛 행을 지운다.
delete from public.news where id in ($q$kes-2023-everpen$q$);

insert into public.news (id, date, category, text_kr, text_en, text_jp, link) values
  ($q$military-service-2013$q$, '2013-02-01', $q$career$q$, $q$**대한민국 국방의 의무**를 마쳤어요! 훈련소 조교로 복무했어요.$q$, $q$Completed my **military service** in the Republic of Korea Army, serving as a drill instructor at the training center!$q$, $q$**大韓民国の兵役** を終えました！訓練所の助教として服務しました。$q$, null),
  ($q$soongsil-admission-2013$q$, '2013-12-01', $q$career$q$, $q$**숭실대학교 전기공학부**에 합격했어요!$q$, $q$Got accepted to the **School of Electrical Engineering at Soongsil University**!$q$, $q$**崇実大学 電気工学部** に合格しました！$q$, null),
  ($q$bs-start-2014$q$, '2014-03-01', $q$career$q$, $q$**숭실대학교 전기공학부**에 입학했어요!$q$, $q$Started my undergrad at the **School of Electrical Engineering, Soongsil University**!$q$, $q$**崇実大学 電気工学部** に入学しました！$q$, null),
  ($q$scholarship-2014-03$q$, '2014-03-02', $q$award$q$, $q$첫 학기부터 **백마 성적우수 장학금**에 선정됐어요!$q$, $q$Selected for the **White Horse Academic Excellence Scholarship** in my very first semester!$q$, $q$最初の学期から **ホワイトホース成績優秀奨学金** に選ばれました！$q$, null),
  ($q$scholarship-2014-09$q$, '2014-09-02', $q$award$q$, $q$**백마 성적우수 장학금** 2학기 연속 선정됐어요!$q$, $q$**White Horse Academic Excellence Scholarship** again, 2 semesters in a row!$q$, $q$**ホワイトホース成績優秀奨学金** に2学期連続で選ばれました！$q$, null),
  ($q$scholarship-2015-03$q$, '2015-03-02', $q$award$q$, $q$**백마 성적우수 장학금** 3학기 연속 선정됐어요!$q$, $q$**White Horse Academic Excellence Scholarship** again, 3 semesters in a row!$q$, $q$**ホワイトホース成績優秀奨学金** に3学期連続で選ばれました！$q$, null),
  ($q$scholarship-2015-09$q$, '2015-09-02', $q$award$q$, $q$**백마 성적우수 장학금** 4학기 연속 선정됐어요!$q$, $q$**White Horse Academic Excellence Scholarship** again, 4 semesters in a row!$q$, $q$**ホワイトホース成績優秀奨学金** に4学期連続で選ばれました！$q$, null),
  ($q$scholarship-2016-03$q$, '2016-03-02', $q$award$q$, $q$**백마 성적우수 장학금** 5학기 연속 선정됐어요!$q$, $q$**White Horse Academic Excellence Scholarship** again, 5 semesters in a row!$q$, $q$**ホワイトホース成績優秀奨学金** に5学期連続で選ばれました！$q$, null),
  ($q$scholarship-2016-09$q$, '2016-09-02', $q$award$q$, $q$**백마 성적우수 장학금** 6학기 연속 선정됐어요!$q$, $q$**White Horse Academic Excellence Scholarship** again, 6 semesters in a row!$q$, $q$**ホワイトホース成績優秀奨学金** に6学期連続で選ばれました！$q$, null),
  ($q$mspl-research-intern-2016$q$, '2016-09-03', $q$career$q$, $q$숭실대 **멀티미디어 신호처리 연구실**에 학부 연구생으로 들어갔어요! OpenCV로 이미지 스티칭과 이미지 인식을 연구해요.$q$, $q$Joined the **Multimedia Signal Processing Lab** at Soongsil as an undergraduate research intern, working on OpenCV image stitching and image recognition!$q$, $q$崇実大の **マルチメディア信号処理研究室** に学部研究生として入りました！OpenCVで画像スティッチングや画像認識を研究します。$q$, null),
  ($q$scholarship-2017-03$q$, '2017-03-02', $q$award$q$, $q$**백마 성적우수 장학금** 7학기 연속 선정됐어요!$q$, $q$**White Horse Academic Excellence Scholarship** again, 7 semesters in a row!$q$, $q$**ホワイトホース成績優秀奨学金** に7学期連続で選ばれました！$q$, null),
  ($q$scholarship-2017-09$q$, '2017-09-02', $q$award$q$, $q$**백마 성적우수 장학금** 8학기 연속 선정! 한 학기도 빠짐없이 받았어요. 축하해주세요!!$q$, $q$**White Horse Academic Excellence Scholarship** again, 8 semesters in a row. Every single semester. Celebrate with me!$q$, $q$**ホワイトホース成績優秀奨学金** に8学期連続で選ばれました！全学期コンプリートです。お祝いしてください！！$q$, null),
  ($q$canon-offer-2017$q$, '2017-09-15', $q$career$q$, $q$**캐논** 입사가 확정됐어요! 반도체 광학 엔지니어로 일하게 됐어요.$q$, $q$Got the offer from **Canon**! I'll be joining as a semiconductor optical engineer.$q$, $q$**キヤノン** への入社が決まりました！半導体光学エンジニアとして働きます。$q$, null),
  ($q$canon-join-2017$q$, '2017-10-01', $q$career$q$, $q$**캐논** 반도체 광학 엔지니어로 첫 출근했어요!$q$, $q$First day at **Canon** as a semiconductor optical engineer!$q$, $q$**キヤノン** に半導体光学エンジニアとして初出社しました！$q$, null),
  ($q$e2festa-table-it-2017$q$, '2017-11-01', $q$award$q$, $q$이미지 인식 AR 프로젝션 테이블 **Table-It**로 E2Festa **교육부 장관상**을 받았어요!$q$, $q$**Table-It**, my image-recognition AR projection table, won the **Minister of Education Award** at E2Festa!$q$, $q$画像認識ARプロジェクションテーブル **Table-It** で E2Festa の **教育部長官賞** をいただきました！$q$, null),
  ($q$bs-electrical-engineering-2018$q$, '2018-02-01', $q$career$q$, $q$숭실대 **전기공학 학사** 졸업! 전 학기 성적우수 장학금까지 받았어요.$q$, $q$Graduated from Soongsil with a **B.S. in Electrical Engineering**, on a merit scholarship every single semester!$q$, $q$崇実大の **電気工学 学士** を卒業しました！全学期 成績優秀奨学金もいただきました。$q$, null),
  ($q$canon-litho-license-2018$q$, '2018-06-01', $q$award$q$, $q$**한국인 엔지니어 최초**로 캐논 포토리소그래피 장비 설치 자격을 땄어요! 축하해주세요!!$q$, $q$Became the **first Korean engineer** licensed to install Canon photolithography equipment. Celebrate with me!$q$, $q$**韓国人エンジニアとして初めて** キヤノンのフォトリソグラフィ装置 設置資格を取りました！お祝いしてください！！$q$, null),
  ($q$canon-leave-2019$q$, '2019-02-01', $q$career$q$, $q$수원·우츠노미야·뮌헨을 오가던 2년, **캐논**을 떠났어요.$q$, $q$After two years of going back and forth between Suwon, Utsunomiya, and Munich, I left **Canon**.$q$, $q$水原・宇都宮・ミュンヘンを行き来した2年間を経て、**キヤノン** を離れました。$q$, null),
  ($q$sogang-ms-start-2019$q$, '2019-03-01', $q$career$q$, $q$전기공학에서 방향을 틀어 서강대 **Art & Technology 석사**를 시작했어요!$q$, $q$Switched from electrical engineering to art and started my **M.S. in Art & Technology** at Sogang!$q$, $q$電気工学から方向転換して、西江大で **Art & Technology 修士課程** を始めました！$q$, null),
  ($q$panopticon-korea-2019$q$, '2019-09-01', $q$career$q$, $q$신생아 헬스케어 스타트업 **Panopticon Korea**를 창업했어요!$q$, $q$Started my own neonatal healthcare startup, **Panopticon Korea**!$q$, $q$新生児ヘルスケアのスタートアップ **Panopticon Korea** を立ち上げました！$q$, null),
  ($q$nipa-ai-voucher-2020$q$, '2020-05-01', $q$grant$q$, $q$AI 신생아 모니터링 솔루션으로 **NIPA AI 바우처 사업**에 선정됐어요!$q$, $q$Our AI baby monitoring solution was selected for the **NIPA AI Voucher Program**!$q$, $q$AI新生児モニタリングで **NIPA AIバウチャー事業** に採択されました！$q$, null),
  ($q$kea-vr-ar-team-2020$q$, '2020-06-01', $q$career$q$, $q$한국전자정보통신산업진흥회 **VR/AR 전문 프로젝트 팀**에 합류했어요!$q$, $q$Joined the **VR/AR project team** at the Korea Electronics Association!$q$, $q$韓国電子情報通信産業振興会の **VR/AR プロジェクトチーム** に参加しました！$q$, null),
  ($q$kt-supervr-2020$q$, '2020-11-01', $q$award$q$, $q$인터랙티브 VR 필름 **The Glasses**가 **KT SuperVR 콘테스트 Top 7**에 들었어요!$q$, $q$My interactive VR film **The Glasses** made the **Top 7 at the KT SuperVR Contest**!$q$, $q$インタラクティブVR映画 **The Glasses** が **KT SuperVR コンテスト Top 7** に入りました！$q$, null),
  ($q$ms-art-technology-2021$q$, '2021-02-01', $q$career$q$, $q$서강대 **Art & Technology 석사** 졸업했어요! 축하해주세요!!$q$, $q$Graduated with my **M.S. in Art & Technology** from Sogang. Celebrate with me!$q$, $q$西江大の **Art & Technology 修士課程** を修了しました！お祝いしてください！！$q$, null),
  ($q$sogang-research-engineer-2021$q$, '2021-03-01', $q$career$q$, $q$서강대 **Research Engineer**로 합류했어요! 국립박물관·ETRI와 함께 몰입형 콘텐츠를 만들어요.$q$, $q$Joined Sogang as a **Research Engineer**, building immersive content with national museums and ETRI!$q$, $q$西江大に **リサーチエンジニア** として合流しました！国立博物館やETRIと一緒に没入型コンテンツを作ります。$q$, null),
  ($q$cradle-design-patent-2021$q$, '2021-09-01', $q$award$q$, $q$신생아 모니터링 스마트 크래들 **디자인 등록**을 마쳤어요!$q$, $q$Our infant-monitoring smart cradle got its **design patent**!$q$, $q$新生児モニタリング・スマートクレイドルの **意匠登録** が完了しました！$q$, null),
  ($q$birdvr-2022$q$, '2022-02-01', $q$publication$q$, $q$**HCI Korea 2022** 인터랙티브 아트 갤러리에 **BirdVR**을 전시했어요!$q$, $q$Showed **BirdVR** at the **HCI Korea 2022** Interactive Art Gallery!$q$, $q$**HCI Korea 2022** のインタラクティブ・アートギャラリーで **BirdVR** を展示しました！$q$, null),
  ($q$alam-cofounded-2022$q$, '2022-03-01', $q$career$q$, $q$XR 공간 인터랙션 스타트업 **ALAM**을 공동창업했어요!$q$, $q$Co-founded **ALAM**, an XR spatial interaction startup!$q$, $q$XR空間インタラクションのスタートアップ **ALAM** を共同創業しました！$q$, null),
  ($q$haptug-2022$q$, '2022-05-01', $q$publication$q$, $q$VR에서 잡아당기는 느낌을 주는 햅틱 장치 **HapTug** 논문이 **Electronics**에 실렸어요!$q$, $q$Our paper on **HapTug**, a haptic device that lets you feel tugs in VR, is out in **Electronics**!$q$, $q$VRで引っぱられる感覚を再現するハプティックデバイス **HapTug** の論文が **Electronics** に掲載されました！$q$, null),
  ($q$kes-2022-everpen$q$, '2022-10-01', $q$exhibition$q$, $q$한국전자전(**KES**)에서 **EverPen 1.0**을 처음 공개했어요!$q$, $q$Unveiled **EverPen 1.0** for the first time at the **Korea Electronics Show**!$q$, $q$韓国電子展（**KES**）で **EverPen 1.0** を初公開しました！$q$, null),
  ($q$hotel-meta-2022$q$, '2022-10-15', $q$exhibition$q$, $q$현실 공간과 VR이 함께 움직이는 디지털 트윈 전시 **호텔 메타**에 참여했어요! VR과 연동해서 작동하는 장치를 만들었어요.$q$, $q$Exhibited at **Hotel Meta**, a digital twin show where the physical space and VR run in sync! I built the devices that move together with the VR content.$q$, $q$現実の空間とVRが連動するデジタルツイン展示 **ホテル・メタ** に参加しました！VRと連動して動く装置を作りました。$q$, null),
  ($q$k-startup-2023$q$, '2023-04-01', $q$grant$q$, $q$EverPen으로 **K-Startup 창업패키지**에 선정됐어요!$q$, $q$EverPen made it into the **K-Startup Startup Package**!$q$, $q$EverPen で **K-Startup 創業パッケージ** に採択されました！$q$, null),
  ($q$arts-startup-2023$q$, '2023-06-01', $q$grant$q$, $q$EverPen으로 **예술경영지원센터 예술창업 지원사업**에 선정됐어요!$q$, $q$EverPen was selected for the **Arts Startup Program** by the Korea Arts Management Service!$q$, $q$EverPen で **芸術経営支援センターの芸術創業支援事業** に採択されました！$q$, null),
  ($q$stern-2023$q$, '2023-07-01', $q$exhibition$q$, $q$더케이브 서울에서 몰입형 도시 AR 전시 **Stern**을 선보였어요!$q$, $q$Exhibited **Stern**, an immersive urban AR experience, at The Cave Seoul!$q$, $q$ザ・ケイブ ソウルで没入型都市AR展示 **Stern** を公開しました！$q$, null),
  ($q$chtf-2023$q$, '2023-11-01', $q$exhibition$q$, $q$중국 선전 **CHTF 2023**에서 부스를 운영하고 왔어요!$q$, $q$Ran our booth at **CHTF 2023** in Shenzhen, China!$q$, $q$中国・深圳の **CHTF 2023** でブースを出してきました！$q$, null),
  ($q$ces-2024-everpen$q$, '2024-01-01', $q$exhibition$q$, $q$첫 **CES**! 라스베이거스에서 **EverPen**을 전시했어요!$q$, $q$My first **CES**! Showed **EverPen** in Las Vegas.$q$, $q$初めての **CES**！ラスベガスで **EverPen** を展示しました！$q$, null),
  ($q$kocca-grant-2024$q$, '2024-05-01', $q$grant$q$, $q$Quest 3 패스스루 콘텐츠로 **한국콘텐츠진흥원 지원사업**에 뽑혔어요!$q$, $q$Our Quest 3 passthrough content was picked for the **KOCCA New Content Support Program**!$q$, $q$Quest 3 パススルーのコンテンツで **韓国コンテンツ振興院の支援事業** に採択されました！$q$, null),
  ($q$guide-dog-ar-2024$q$, '2024-06-01', $q$publication$q$, $q$시각장애인을 위한 촉각·청각 보조기기 논문 **Guide Dog AR**이 **IJHCI**에 실렸어요! 축하해주세요!!$q$, $q$**Guide Dog AR**, our paper on tactile and auditory assistance for visually impaired users, is out in **IJHCI**. Celebrate with me!$q$, $q$視覚障害者向けの触覚・聴覚補助デバイス論文 **Guide Dog AR** が **IJHCI** に掲載されました！お祝いしてください！！$q$, null),
  ($q$sogang-capstone-mentor-2024$q$, '2024-09-01', $q$teaching$q$, $q$서강대 컴퓨터공학과 캡스톤 디자인 **산업체 멘토**를 맡았어요!$q$, $q$Became an **industry mentor** for Sogang's CS Capstone Design course!$q$, $q$西江大 コンピュータ工学科 キャップストーンデザインの **産業界メンター** を務めました！$q$, null),
  ($q$motie-minister-award-2024$q$, '2024-11-01', $q$award$q$, $q$2024 산학프로젝트 챌린지에서 **산업통상자원부 장관상**을 받았어요! 축하해주세요!!$q$, $q$Won the **Minister's Award (Ministry of Trade, Industry and Energy)** at the 2024 Industry-Academia Project Challenge. Celebrate with me!$q$, $q$2024 産学プロジェクトチャレンジで **産業通商資源部長官賞** をいただきました！お祝いしてください！！$q$, null),
  ($q$alam-exit-2024$q$, '2024-12-01', $q$career$q$, $q$EverPen과 XR 오피스를 만들며 달려온 3년, **ALAM** 공동창업자 생활을 마무리했어요.$q$, $q$Three years of building EverPen and XR office tools. Wrapped up my time as a co-founder of **ALAM**.$q$, $q$EverPen とXRオフィスを作り続けた3年間、**ALAM** の共同創業者としての日々を締めくくりました。$q$, null),
  ($q$ces-2025-everpen2$q$, '2025-01-01', $q$exhibition$q$, $q$2년 연속 **CES**! 라스베이거스에서 **EverPen 2.0**을 선보였어요!$q$, $q$Back at **CES** for the second year in a row, this time with **EverPen 2.0**!$q$, $q$2年連続の **CES**！ラスベガスで **EverPen 2.0** をお披露目しました！$q$, null),
  ($q$mmca-ai-docent-2025$q$, '2025-06-01', $q$project$q$, $q$국립현대미술관 청주관 수장고 전시용 **AI 도슨트**를 만들었어요! 작품 사진을 찍거나 근처에 가면 작품을 설명해 주고, 이어서 대화도 나눌 수 있어요.$q$, $q$Built an **AI docent** for the storage exhibition at MMCA Cheongju! Snap a photo of an artwork or just stand near it, and it explains the piece and keeps chatting with you about it.$q$, $q$国立現代美術館 清州館の収蔵庫展示向けに **AIドーセント** を作りました！作品の写真を撮ったり近くに行ったりすると解説してくれて、そのまま会話もできます。$q$, null),
  ($q$sogang-research-engineer-end-2025$q$, '2025-08-01', $q$career$q$, $q$4년간의 서강대 **Research Engineer** 생활을 마무리했어요.$q$, $q$Wrapped up four great years as a **Research Engineer** at Sogang.$q$, $q$4年間の西江大 **リサーチエンジニア** 生活を締めくくりました。$q$, null),
  ($q$ismar-2025-demo$q$, '2025-10-01', $q$publication$q$, $q$**IEEE ISMAR 2025**에서 스마트글래스 AI 도슨트 데모를 발표하고 왔어요!$q$, $q$Presented our smart-glasses AI docent demo at **IEEE ISMAR 2025**!$q$, $q$**IEEE ISMAR 2025** でスマートグラスAIドーセントのデモを発表してきました！$q$, null),
  ($q$panicfree-testflight-2026$q$, '2026-03-01', $q$project$q$, $q$정신건강 트래킹 앱 **PanicFree**, 드디어 TestFlight에 올렸어요!$q$, $q$My mental health tracking app **PanicFree** is finally on TestFlight!$q$, $q$メンタルヘルス記録アプリ **PanicFree**、ついに TestFlight に公開しました！$q$, null),
  ($q$vibe-to-web-2026$q$, '2026-07-01', $q$teaching$q$, $q$서강대 Art & Technology에서 **Vibe to Web** 워크숍을 열었어요! 3일 동안 14시간, AI로 웹 만들기.$q$, $q$Ran the **Vibe to Web** workshop at Sogang Art & Technology: 3 days, 14 hours of building websites with AI!$q$, $q$西江大 Art & Technology で **Vibe to Web** ワークショップを開催しました！3日間で14時間、AIでウェブづくり。$q$, $q$https://limjongyoon.github.io/vibe-to-web-recap/$q$),
  ($q$mmca-media-docent-2026$q$, '2026-11-06', $q$project$q$, $q$국립현대미술관과 두 번째 작업, 이번엔 뉴미디어 소장품 특별전 「**기술의 노스탤지어**」예요! Meta Ray-Ban Display 안경을 쓰고 작품을 보면서 평소 말투로 AI 도슨트와 실시간으로 대화할 수 있어요.$q$, $q$Back at MMCA for round two, this time for the New Media Collection exhibition **Nostalgia for Technology**! The new AI docent runs on Meta Ray-Ban Display glasses, so you can talk to it in your own words, live, while you look at the art.$q$, $q$国立現代美術館との2回目のプロジェクト、今回はニューメディア所蔵品特別展「**技術のノスタルジア**」です！Meta Ray-Ban Display グラスをかけて作品を見ながら、いつもの話し方でAIドーセントとリアルタイムに会話できます。$q$, $q$https://www.mmca.go.kr/exhibitions/exhibitionsDetail.do?exhFlag=2$q$)
on conflict (id) do update set
  date     = excluded.date,
  category = excluded.category,
  text_kr  = excluded.text_kr,
  text_en  = excluded.text_en,
  text_jp  = excluded.text_jp,
  link     = excluded.link;
