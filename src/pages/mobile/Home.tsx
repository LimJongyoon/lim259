import HomeContent from "../../components/home/HomeContent";
import NewsContent from "../../components/news/NewsContent";
import profileImg from "../../assets/profile.png";

export default function Home() {
  return (
    /*
     * 사진 · 본문 · 뉴스 버튼을 한 덩어리로 붙여 놓는다.
     * 예전처럼 히어로를 뷰포트 높이로 늘리면 본문과 버튼 사이가 벌어지고
     * 화면을 다 잡아먹어서, 위쪽 여백만 주고 자연 높이로 쌓는다.
     */
    <div className="flex flex-col items-center pt-[8vh] text-gray-900">
      <img
        src={profileImg}
        alt="Lim Jongyoon"
        className="
          h-[180px]
          object-contain
          mb-1
          drop-shadow-lg
          select-none
          pointer-events-none
        "
      />

      <HomeContent />

      {/* limit 0 : 펼치기 전에는 "뉴스 보기" 버튼 하나만 보인다 */}
      <NewsContent limit={0} className="w-full px-0 pt-5 pb-8" />
    </div>
  );
}
