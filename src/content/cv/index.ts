// src/content/cv/cv.ts
export type Lang = "en" | "kr" | "jp";

export const cvContent = {
  education: [
    {
      title: {
        en: "Sogang University",
        kr: "서강대학교",
        jp: "西江大学校",
      },
      city: {
        en: "Seoul",
        kr: "서울",
        jp: "ソウル",
      },

      degree: {
        en: "M.S., Art & Technology",
        kr: "석사, 아트 & 테크놀로지",
        jp: "修士, アート & テクノロジー",
      },
      gpa: "3.89 / 4.30",
      coursework: {
        en: "Human-Computer Interaction, Artificial Intelligence, Haptics, AR/VR",
        kr: "HCI, 인공지능, Haptics, AR/VR",
        jp: "HCI, 人工知能, Haptics, AR/VR",
      },
      year: "2019–2021",
    },
    {
      title: {
        en: "Soongsil University",
        kr: "숭실대학교",
        jp: "崇実大学校",
      },
      city: {
        en: "Seoul",
        kr: "서울",
        jp: "ソウル",
      },

      degree: {
        en: "B.S., Electronic Engineering (ABEEK)",
        kr: "학사, 전자공학 (ABEEK)",
        jp: "学士, 電子工学 (ABEEK)",
      },
      gpa: "4.12 / 4.50",
      coursework: {
        en: "Circuit Design, Embedded Systems, Control Engineering, Machine Learning",
        kr: "회로설계, 임베디드 시스템, 제어공학, 머신러닝",
        jp: "回路設計, 組込みシステム, 制御工学, 機械学習",
      },
      year: "2014–2018",
    },
  ],

  professional: [
    {
      role: {
        en: "PM / Research Engineer / Software Architect",
        kr: "PM / 연구 엔지니어 / 소프트웨어 아키텍트",
        jp: "PM / 研究エンジニア / ソフトウェアアーキテクト",
      },
      org: {
        en: "Department of Art & Technology, Sogang University",
        kr: "서강대학교 아트앤테크놀로지학과",
        jp: "西江大学校 アート＆テクノロジー学科",
      },
      city: {
        en: ["Seoul"],
        kr: ["서울"],
        jp: ["ソウル"],
      },
      year: "2021–2025",
      details: {
        en: [
          "Led immersive content research projects in collaboration with national museums and research institutes",
          "Project Manager for multisensory interaction and accessibility technology projects with ETRI",
          "Developed user scenarios and form factors for visual-to-auditory translation technologies for blind poeple",
          "Project Manager for kiosk UI/UX improvement projects for public-facing services",
        ],
        kr: [
          "국립현대미술관 수장고 실감형 콘텐츠 연구 프로젝트 수행",
          "ETRI 협력 다중감각 인터랙션 및 접근성 기술 프로젝트 PM",
          "시각장애인을 위한 시각-청각 변환 기술 사용자 시나리오 및 형상 개발",
          "공공 서비스용 키오스크 UI/UX 개선 프로젝트 PM",
        ],
        jp: [
          "国立美術館および研究機関と連携した没入型コンテンツ研究プロジェクトを担当",
          "ETRI と協力した多感覚インタラクションおよびアクセシビリティ技術プロジェクトのプロジェクトマネジメントを担当",
          "視覚障害者向け視覚―聴覚変換技術におけるユーザーシナリオおよびフォームファクター設計",
          "公共サービス向けキオスクUI/UX改善プロジェクトのプロジェクトマネジメントを担当",
        ],
      },
    },
    {
      role: {
        en: "Co-founder",
        kr: "창업",
        jp: "創業",
      },
      org: {
        en: "ALAM (A Layer Above Me)",
        kr: "ALAM (A Layer Above Me)",
        jp: "ALAM (A Layer Above Me)",
      },
      city: {
        en: ["Seoul"],
        kr: ["서울"],
        jp: ["ソウル"],
      },
      year: "2022–2024",
      details: {
        en: [
          "Prototyped EVER Pen hardware, including Version 1 and Version 2 iterations",
          "Developed a spatial computing office application designed for XR devices",
        ],
        kr: [
          "애버펜(EVER Pen) 버전 1 및 버전 2 하드웨어 프로토타이핑",
          "XR 디바이스 전용 공간 컴퓨팅 기반 오피스 프로그램 제작",
        ],
        jp: [
          "EVER Pen バージョン1およびバージョン2のハードウェア・プロトタイピング",
          "XRデバイス向け空間コンピューティング型オフィスプログラムの制作",
        ],
      },
    },
    {
      role: {
        en: "Independent Entrepreneur",
        kr: "창업",
        jp: "起業",
      },
      org: {
        en: "Panopticon Korea",
        kr: "파놉티콘 코리아",
        jp: "パノプティコン・コリア",
      },
      city: {
        en: ["Seoul"],
        kr: ["서울"],
        jp: ["ソウル"],
      },
      year: "2019–2021",
      details: {
        en: [
          "Prototyped a smart cradle for neonatal healthcare applications",
          "Planned and designed a smart patch concept for neonatal healthcare monitoring",
        ],
        kr: [
          "신생아 헬스케어 디바이스 스마트 크래들 프로토타이핑",
          "신생아 헬스케어 디바이스 스마트 패치 기획",
        ],
        jp: [
          "新生児ヘルスケア向けスマートクレードルのプロトタイピング",
          "新生児ヘルスケア向けスマートパッチの企画・設計",
        ],
      },
    },
    {
      role: {
        en: "Semiconductor Optical Engineer",
        kr: "반도체 광학 엔지니어",
        jp: "半導体光学エンジニア",
      },
      org: {
        en: "Canon",
        kr: "캐논",
        jp: "キヤノン",
      },
      city: {
        en: ["Suwon", "Utsunomiya", "Munich"],
        kr: ["수원", "우츠노미야", "뮌헨"],
        jp: ["水原", "宇都宮", "ミュンヘン"],
      },
      year: "2017–2019",
      details: {
        en: [
          "Supported semiconductor photolithography equipment with a focus on optical system calibration and lens-related process tuning",
          "Performed device-level troubleshooting and process optimization, including parameter adjustment and script-based diagnostic support",
        ],
        kr: [
          "반도체 포토 공정 장비의 광학 시스템 및 렌즈 정렬·보정 중심 디바이스 엔지니어링 지원",
          "공정 파라미터 조정 및 스크립트 기반 진단을 포함한 장비 트러블슈팅 및 프로세스 최적화 수행",
        ],
        jp: [
          "半導体フォトプロセス装置における光学系・レンズ調整を中心としたデバイスエンジニアリング支援",
          "パラメータ調整やスクリプトベースの診断を含む装置トラブルシューティングおよびプロセス最適化を担当",
        ],
      },
    },
    {
      role: {
        en: "Research Intern",
        kr: "연구 인턴",
        jp: "研究インターン",
      },
      org: {
        en: "Soongsil University Multimedia Signal Processing Lab",
        kr: "숭실대학교 전기공학부 멀티미디어 신호처리 연구실",
        jp: "崇実大学校のマルチメディア信号処理研究室",
      },
      city: {
        en: ["Seoul"],
        kr: ["서울"],
        jp: ["ソウル"],
      },
      year: "2016-2017",
      details: {
        en: [
          "Conducted OpenCV-based image stitching experiments and analyzed classical computer vision algorithms using Python",
          "Implemented image recognition pipelines and supported computer vision research activities",
        ],
        kr: [
          "파이썬 및 OpenCV 기반 이미지 스티칭 실험 수행 및 전통적 컴퓨터 비전 알고리즘 분석",
          "이미지 인식 파이프라인 구현을 통한 컴퓨터 비전 연구 보조 수행",
        ],
        jp: [
          "PythonおよびOpenCVを用いた画像スティッチング実験の実施および古典的コンピュータビジョンアルゴリズムの分析",
          "画像認識パイプラインの実装を通じたコンピュータビジョン研究支援",
        ],
      },
    },
  ],

  activities: [
    {
      title: {
        en: "Participated in the CES 2025 exhibition booth",
        kr: "CES 2025 전시 부스 참가",
        jp: "CES 2025 展示ブース参加",
      },
      place: {
        en: "Las Vegas, USA",
        kr: "미국 라스베이거스",
        jp: "米国 ラスベガス",
      },
      year: "2025",
    },
    {
      title: {
        en: "Industry-side Mentor for Capstone Design Project",
        kr: "캡스톤 디자인 프로젝트 · Industry-side 멘토",
        jp: "キャップストーンデザインプロジェクト・Industry-side メンター",
      },
      place: {
        en: "Department of Computer Science, Sogang University, Seoul, South Korea",
        kr: "서강대학교 컴퓨터공학과, 서울",
        jp: "西江大学校 コンピュータ工学科 ソウル",
      },
      year: "2024",
    },

    {
      title: {
        en: "Participated in the CES 2024 exhibition booth",
        kr: "CES 2024 전시 부스 참가",
        jp: "CES 2024 展示ブース参加",
      },
      place: {
        en: "Las Vegas, USA",
        kr: "미국 라스베이거스",
        jp: "米国 ラスベガス",
      },
      year: "2024",
    },
    {
      title: {
        en: "Participated in the CHTF 2023 exhibition booth",
        kr: "CHTF 2023 전시 부스 참가",
        jp: "CHTF 2023 展示ブース参加",
      },
      place: {
        en: "Shenzhen, China",
        kr: "중국 선전",
        jp: "中国 深圳",
      },
      year: "2023",
    },
    {
      title: {
        en: "Student Worker",
        kr: "근로학생",
        jp: "学生ワーカー",
      },
      place: {
        en: "Sogang University, Seoul, South Korea",
        kr: "서강대학교, 서울",
        jp: "西江大学校 ソウル",
      },
      year: "2022–2024",
    },
    {
      title: {
        en: "Participation in the Korea Electronics Show 2022 Exhibition",
        kr: "Korea Electronics Show 2022 전시 참가",
        jp: "Korea Electronics Show 2022 展示参加",
      },
      place: {
        en: "Seoul, South Korea",
        kr: "대한민국 서울",
        jp: "韓国 ソウル",
      },
      year: "2022",
    },
    {
      title: {
        en: "Korea Electronics Association VR/AR Professional Project Team",
        kr: "한국전자정보통신산업진흥회 VR/AR 전문 프로젝트 팀 참여",
        jp: "韓国電子情報通信産業振興会 VR/AR 専門プロジェクトチーム",
      },
      place: {
        en: "South Korea",
        kr: "대한민국",
        jp: "韓国",
      },
      year: "2020–2021",
    },
    {
      title: {
        en: "Graduate Student Council Treasurer & General Affairs Manager",
        kr: "서강대학교 대학원 학생회 회계·총무",
        jp: "西江大学校 大学院 学生会 会計・総務",
      },
      place: {
        en: "Sogang University, Seoul, South Korea",
        kr: "서강대학교, 서울",
        jp: "西江大学校 ソウル",
      },
      year: "2019–2021",
    },
    {
      title: {
        en: "IoT Smart Convergence Expert Training Program",
        kr: "IoT 스마트 융합 전문가 양성과정",
        jp: "IoT スマート融合 専門家養成課程",
      },
      place: {
        en: "Seoul, South Korea",
        kr: "대한민국 서울",
        jp: "韓国 ソウル",
      },
      year: "2016",
    },
    {
      title: {
        en: "Worked as a High School Physics & Earth Science Instructor",
        kr: "고등학교 물리·지구과학 강사 활동",
        jp: "高校にて物理・地学の指導を担当",
      },
      place: {
        en: "Seoul, South Korea",
        kr: "대한민국 서울",
        jp: "韓国 ソウル",
      },
      year: "2014–2015",
    }

  ],


  awards: [
    {
      title: {
        en: "Awarded the Ministerial Prize of the Ministry of Trade, Industry and Energy",
        kr: "산업통상자원부 장관상 수상",
        jp: "産業通商資源部 長官賞 受賞",
      },
      project: {
        en: "Ministry of Trade, Industry and Energy",
        kr: "산업통상자원부",
        jp: "産業通商資源部",
      },
      explain: {
        en: "Received the Ministerial Prize from the Ministry of Trade, Industry and Energy for outstanding performance in the 2024 Industry-Academia Project Challenge",
        kr: "2024 산학 프로젝트 챌린지에서 우수한 성과를 인정받아 산업통상자원부 장관상 수상",
        jp: "2024 産学プロジェクトチャレンジにおける優秀な成果が認められ、産業通商資源部長官賞を受賞",
      },
      year: "2024",
    },
    {
      title: {
        en: "Selected for the New Content Support Program KOCCA",
        kr: "한국콘텐츠진흥원 신기술 콘텐츠 지원사업 선정",
        jp: "韓国コンテンツ振興院 新技術コンテンツ支援事業 選定",
      },
      project: {
        en: "Korea Creative Content Agency",
        kr: "한국콘텐츠진흥원",
        jp: "韓国コンテンツ振興院",
      },
      explain: {
        en: "Content creation and distribution utilizing Oculus Quest 3 passthrough",
        kr: "오큘러스 퀘스트 3 패스스루를 활용한 콘텐츠 BareHand 제작 및 배포",
        jp: "Oculus Quest 3のパススルー機能を活用したコンテンツ制作および配信",
      },
      year: "2024",
    },
    {
      title: {
        en: "Selected for the Arts Startup Program by the Arts Management Center",
        kr: "예술경영지원센터 예술창업 지원사업 선정",
        jp: "芸術経営支援センター 芸術スタートアップ支援事業 選定",
      },
      project: {
        en: "Ministry of Culture, Sports and Tourism / Arts Management Support Center",
        kr: "문화체육관광부 / 예술경영지원센터",
        jp: "文化体育観光部 / 芸術経営支援センター",
      },
      explain: {
        en: "Startup support for the interactive pen-based system EverPen",
        kr: "인터랙티브 펜 기반 시스템 EverPen 창업 지원",
        jp: "インタラクティブペン基盤システム EverPen の創業支援",
      },
      year: "2023",
    },
    {
      title: {
        en: "Selected for the K-Startup Startup Package Program",
        kr: "K-Startup 창업패키지 선정",
        jp: "K-Startup スタートアップパッケージ 選定",
      },
      project: {
        en: "Korea Institute of Startup & Entrepreneurship Development",
        kr: "창업진흥원",
        jp: "創業振興院",
      },
      explain: {
        en: "Government-backed startup package support for EverPen",
        kr: "EverPen을 위한 정부 창업 패키지 지원",
        jp: "EverPen 向け政府スタートアップパッケージ支援",
      },
      year: "2023",
    },
    {
      title: {
        en: "Cradle for Baby Monitoring Design Patent",
        kr: "아기 모니터링 요람 디자인 특허",
        jp: "乳児モニタリング用ゆりかご デザイン特許",
      },
      project: {
        en: "Korean Intellectual Property Office",
        kr: "특허청",
        jp: "特許庁",
      },
      explain: {
        en: "Design patent for an intelligent baby monitoring cradle",
        kr: "지능형 아기 모니터링 요람 디자인 특허",
        jp: "知能型乳児モニタリングゆりかごのデザイン特許",
      },
      year: "2021",
    },
    {
      title: {
        en: "Top 7 in KT SuperVR Contest",
        kr: "KT SuperVR 공모전 Top 7",
        jp: "KT SuperVR コンテスト Top 7",
      },
      project: {
        en: "KT Corporation × PiCO Creative",
        kr: "KT × PiCO 크리에이티브",
        jp: "KT × PiCO Creative",
      },
      explain: {
        en: "Recognized among the top 7 projects in a nationwide VR contest",
        kr: "전국 단위 VR 공모전에서 상위 7개 프로젝트 선정",
        jp: "全国規模VRコンテストにて上位7プロジェクトに選定",
      },
      year: "2020",
    },
    {
      title: {
        en: "Selected for the AI Voucher Government Support Program",
        kr: "AI 바우처 정부지원사업 선정",
        jp: "AI バウチャー政府支援事業 選定",
      },
      project: {
        en: "National IT Industry Promotion Agency",
        kr: "정보통신산업진흥원",
        jp: "情報通信産業振興院",
      },
      explain: {
        en: "AI-based baby monitoring solution supported through the AI Voucher Program",
        kr: "AI 바우처 사업을 통한 아기 모니터링 솔루션 지원",
        jp: "AIバウチャー事業による乳児モニタリングソリューション支援",
      },
      year: "2020",
    },
    {
      title: {
        en: "Photolithography Equipment Installation License Acquisition",
        kr: "광학 장비 설치 라이선스 취득",
        jp: "光学装置 設置ライセンス 取得",
      },
      project: {
        en: "Canon Inc.",
        kr: "캐논",
        jp: "キヤノン",
      },
      explain: {
        en: "First Korean engineer to obtain a global photolithography equipment installation license",
        kr: "세계 최초로 광학 노광 장비 설치 라이선스를 취득한 한국인 엔지니어",
        jp: "世界で初めて光学露光装置の設置ライセンスを取得した韓国人技術者",
      },
      year: "2018",
    },
    {
      title: {
        en: "Korea Minister of Engineering and Education Award",
        kr: "대한민국 교육부 장관상",
        jp: "大韓民国 教育部長官賞",
      },
      project: {
        en: "E²Festa",
        kr: "E²Festa",
        jp: "E²Festa",
      },
      explain: {
        en: "Image-recognition-based AR projection table presented ",
        kr: "이미지 인식 기반 AR 프로젝션 테이블 ",
        jp: "画像認識ベースのARプロジェクションテーブル",
      },
      year: "2017",
    },
    {
      title: {
        en: "White Horse Academic Excellence Scholarship",
        kr: "백마 성적우수 장학금",
        jp: "ホワイトホース 成績優秀 奨学金",
      },
      project: {
        en: "Soongsil University",
        kr: "숭실대학교",
        jp: "崇実大学校",
      },
      explain: {
        en: "Academic excellence scholarship awarded every semester",
        kr: "전 학기 성적우수로 수여된 장학금",
        jp: "全学期にわたり成績優秀として授与された奨学金",
      },
      year: "2014–2018",
    },
  ],

  skills: [
    {
      title: {
        en: "Programming Languages",
        kr: "프로그래밍 언어",
        jp: "プログラミング言語",
      },
      items: [
        "Python (AI, image recognition)",
        "C/C++ (Embedded systems)",
        "C# (Game & VR/AR)",
        "Swift (iOS)",
        "JavaScript (Web)",
      ],
    },
    {
      title: {
        en: "Hardware Engineering Skills",
        kr: "하드웨어 엔지니어링",
        jp: "ハードウェア工学",
      },
      items: [
        "Circuit design & analysis",
        "Soldering & repair",
        "Mechanical design",
        "3D Modeling & Printing",
        "Laser cutting",
      ],
    },
    {
      title: {
        en: "Computer Software / Frameworks",
        kr: "소프트웨어 / 프레임워크",
        jp: "ソフトウェア / フレームワーク",
      },
      items: [
        "Unity",
        "Blender",
        "Final Cut / DaVinci Resolve",
        "Figma",
        "SPSS",
        "MATLAB",
        "OrCAD PSpice",
        "Microsoft Office",
      ],
    },
  ],

  languages: [
    {
      en: "Fluent Korean (native)",
      kr: "한국어 (모국어)",
      jp: "韓国語（母語）",
    },
    {
      en: "Proficient English (OPIc IH)",
      kr: "영어 (OPIc IH)",
      jp: "英語（OPIc IH）",
    },
    {
      en: "Basic Japanese (JPT N4)",
      kr: "일본어 (JPT N4)",
      jp: "日本語（JPT N4）",
    },
  ],
};
