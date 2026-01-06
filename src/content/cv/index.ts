// src/content/cv.ts
export type Lang = "en" | "kr" | "jp";

/* ---------- EDUCATION / EXPERIENCE / ETC ---------- */

export const cvContent = {
  education: [
    {
      title: {
        en: "Sogang University, Seoul",
        kr: "서강대학교, 서울",
        jp: "西江大学校, ソウル",
      },
      degree: {
        en: "M.S., Art & Technology",
        kr: "석사, 아트 & 테크놀로지",
        jp: "修士, アート & テクノロジー",
      },
      gpa: "3.89 / 4.30",
      coursework: {
        en: "Human-Computer Interaction, Artificial Intelligence, Haptics, AR/VR",
        kr: "인간-컴퓨터 상호작용, 인공지능, 햅틱스, AR/VR",
        jp: "HCI, 人工知能, ハプティクス, AR/VR",
      },
      year: "2019–2021",
    },
    {
      title: {
        en: "Soongsil University, Seoul",
        kr: "숭실대학교, 서울",
        jp: "崇実大学校, ソウル",
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
        en: "Semiconductor Optical Engineer",
        kr: "반도체 광학 엔지니어",
        jp: "半導体光学エンジニア",
      },
      org: {
        en: "Canon, Suwon / Utsunomiya / Munich",
        kr: "캐논, 수원 / 우츠노미야 / 뮌헨",
        jp: "キヤノン, 水原 / 宇都宮 / ミュンヘン",
      },
      year: "2017–2019",
    },
  ],

  activities: [
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
  ],

  awards: [
    {
      title: {
        en: "Selected for the New Content Support Program by KOCCA",
        kr: "한국콘텐츠진흥원 신기술 콘텐츠 지원사업 선정",
        jp: "韓国コンテンツ振興院 新技術コンテンツ支援事業 選定",
      },
      project: "BareHand",
      year: "2024",
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
        "3D printing",
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
      en: "Basic Japanese (speaking & listening)",
      kr: "일본어 (기초 회화)",
      jp: "日本語（基礎会話）",
    },
  ],
};
