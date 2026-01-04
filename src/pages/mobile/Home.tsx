import HomeContent from "../../components/home/HomeContent";
import profileImg from "../../assets/profile.png";

export default function Home() {
  return (
    <section
      className="flex flex-col items-center justify-center text-gray-900"
      style={{
        height: "calc(100svh - 44px - 56px)", 
        background: "transparent", 
      }}
    >
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
    </section>
  );
}