---
id: mmca-nostalgia-docent
year: 2026
order: 1

type:
  en: iOS XR
  kr: iOS XR
  jp: "iOS XR"

scope:
  en: National Museum of Modern and Contemporary Art, Korea
  kr: 국립현대미술관
  jp: "国立現代美術館"

thumbnail: "/projects/MMCA-nostalgia.png"

title:
  en: "MMCA Nostalgia for Technology: AI Docent Application with Meta Ray-Ban Display"
  kr: "뉴미디어 소장품전 AI 도슨트 애플리케이션 with Meta Ray-Ban Display"
  jp: "ニューメディア所蔵品展 AIドーセントアプリケーション with Meta Ray-Ban Display"

affiliation:
  - en: "Real-time voice AI docent application for new media exhibitions"
    kr: "뉴미디어 전시를 위한 실시간 음성 AI 도슨트 애플리케이션"
    jp: "ニューメディア展示のためのリアルタイム音声AIドーセントアプリケーション"

media:
  image: "/projects/mmca-nostalgia/architecture.jpg"
  screens:
    - "/projects/mmca-nostalgia/app_1_home.jpg"
    - "/projects/mmca-nostalgia/app_2_answer.jpg"
    - "/projects/mmca-nostalgia/app_3_operator.jpg"

tags:
  - AI
  - LLM
  - BLE
  - Image Recognition
  - iOS
  - Swift

links:
  website: "https://www.mmca.go.kr/exhibitions/exhibitionsDetail.do?exhFlag=2"

body:
  en: |
    An AI docent iOS application developed for Nostalgia for Technology, the New Media Collection exhibition at the National Museum of Modern and Contemporary Art, Cheongju. Visitors wear Meta Ray-Ban Display glasses and talk with the docent in their own words while looking at the artworks. There are no buttons to learn: speech is the only control, artwork recognition is automatic, and the session picks up again when the glasses are put back on.

    The glasses connect to the iPhone through the Meta Wearables Device Access Toolkit, streaming microphone audio, camera frames, head motion, and temple taps, while the lens display shows a state-specific layout. Twenty-five BLE beacons, one per artwork, are ranked by floor-plan position and signal strength; when a candidate stays on top long enough with a clear margin, the app treats it as the artwork in front of the visitor and confirms it with on-device image comparison (Vision feature prints).

    Explanations and follow-up answers run on real-time speech-to-speech AI with tool calling. Instead of fixed commands, the agent calls app tools itself to change the screen, explain, show the map, adjust volume, or search, and it supports barge-in. Answers are grounded in curator-reviewed scripts for each artwork; questions beyond that material go to web search, answered with sources or an honest "I don't know". If OpenAI Realtime fails, the app falls back to Gemini Live and then to an on-device backup (Apple Speech + Foundation Models), so the tour keeps working without the internet.

    The architecture centers on a single AppCoordinator state machine. Every service sits behind a protocol with a mock implementation, so the full flow runs without glasses or beacons, and an operator screen exposes live state, engine selection, and AI usage cost for on-site staff.

  kr: |
    국립현대미술관 청주관 뉴미디어 소장품 특별전 「기술의 노스탤지어」를 위해 개발한 AI 도슨트 iOS 애플리케이션이다. 관람객은 Meta Ray-Ban Display 안경을 쓰고 작품을 보면서 평소 말투 그대로 도슨트와 대화한다. 따로 배울 조작은 없다. 조작은 음성으로만 하고, 작품 인식은 자동으로 이루어지며, 안경을 벗었다가 다시 써도 대화가 이어진다.

    안경은 Meta Wearables Device Access Toolkit으로 iPhone과 연결되어 마이크 음성, 카메라 프레임, 머리 방향, 안경다리 탭 입력을 앱으로 보내고, 렌즈 디스플레이에는 상태별 화면을 띄운다. 작품마다 하나씩 설치한 BLE 비콘 25개를 전시실 배치도 좌표와 신호 세기로 순위를 매기고, 1위 후보가 일정 시간 이상 충분한 차이로 유지되면 관람객이 그 작품 앞에 도착한 것으로 판단한다. 이어서 온디바이스 이미지 비교(Vision feature print)로 한 번 더 확인한다.

    작품 설명과 질의응답은 tool calling을 지원하는 실시간 speech-to-speech AI가 맡는다. 정해진 명령어 대신 AI가 직접 앱의 도구를 호출해 화면 전환, 작품 설명, 지도 표시, 볼륨 조절, 검색을 수행하며, 말하는 도중 끼어들기도 가능하다. 답변은 작품별로 검수한 대본을 근거로 하고, 자료 밖의 질문은 웹 검색으로 출처를 밝혀 답하거나 모르면 모른다고 말한다. OpenAI Realtime에 문제가 생기면 Gemini Live, 이어서 기기 안 백업(Apple Speech + Foundation Models)으로 자동 전환되어 인터넷이 끊겨도 관람이 이어진다.

    앱 구조는 하나의 AppCoordinator 상태 머신을 중심으로 한다. 모든 서비스를 protocol과 Mock 구현으로 분리해 안경이나 비콘 없이도 전체 흐름을 실행할 수 있으며, 현장 운영자를 위해 실시간 상태, 음성 엔진 선택, AI 비용을 확인하는 운영자 화면을 제공한다.

  jp: |
    国立現代美術館 清州館のニューメディア所蔵品特別展「技術のノスタルジア」のために開発したAIドーセントiOSアプリケーションである。来館者はMeta Ray-Ban Displayグラスをかけて作品を見ながら、ふだんの話し言葉のままドーセントと会話する。覚えるべき操作はない。操作は音声だけで行い、作品の認識は自動で、グラスを外してもう一度かければ会話がそのまま続く。

    グラスはMeta Wearables Device Access ToolkitでiPhoneと接続され、マイク音声、カメラフレーム、頭の向き、テンプルのタップ入力をアプリに送り、レンズディスプレイには状態ごとの画面を表示する。作品ごとに一つずつ設置した25個のBLEビーコンを展示室の配置図上の座標と信号強度で順位づけし、1位の候補が一定時間以上、十分な差を保ったまま続くと、来館者がその作品の前に到着したと判断する。続いてオンデバイスの画像比較（Vision feature print）で改めて確認する。

    作品の解説と質疑応答は、tool callingに対応したリアルタイムのspeech-to-speech AIが担う。決められたコマンドの代わりにAIが自らアプリのツールを呼び出し、画面切り替え、作品解説、地図表示、音量調整、検索を行い、話している途中での割り込みにも対応する。回答は作品ごとに監修済みの台本を根拠とし、資料にない質問はWeb検索で出典を示して答え、わからなければわからないと伝える。OpenAI Realtimeに問題が起きるとGemini Live、さらに端末内のバックアップ（Apple Speech + Foundation Models）へ自動で切り替わり、インターネットが切れても鑑賞を続けられる。

    アプリの構造は一つのAppCoordinatorステートマシンを中心としている。すべてのサービスをprotocolとMock実装に分離しているため、グラスやビーコンがなくても全体の流れを実行でき、現場の運営者向けに、リアルタイムの状態、音声エンジンの選択、AIの利用コストを確認できる運営者画面を備えている。

---
