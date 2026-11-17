import { useState } from "react";
import ImageLightbox from "./ImageLightbox";

export type Media = {
  video?: string;
  videos?: string[];
  image?: string;
  images?: string[];
  /* 세로로 긴 앱 화면 캡처. 자르지 않고 한 줄에 나란히 보여준다. */
  screens?: string[];
};

function Video({ src, className }: { src: string; className: string }) {
  return src.endsWith(".mp4") ? (
    <video src={src} controls playsInline preload="metadata" className={className} />
  ) : (
    <iframe src={src} className={className} loading="lazy" allowFullScreen />
  );
}

/*
 * 프로젝트·논문 카드를 펼쳤을 때의 미디어(영상·이미지) 묶음.
 * 이미지는 누르면 크게 볼 수 있다.
 * 바깥 래퍼(간격·배경)는 쓰는 쪽에서 정한다.
 */
export default function MediaBlock({
  media,
  title,
}: {
  media: Media;
  title: string;
}) {
  const [zoomed, setZoomed] = useState<{ src: string; alt: string } | null>(
    null
  );

  const zoomable = (src: string, alt: string, className: string) => (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      onClick={() => setZoomed({ src, alt })}
      className={`${className} cursor-zoom-in`}
    />
  );

  return (
    <>
      {media.video && (
        <div className="aspect-video">
          <Video src={media.video} className="w-full h-full rounded-md" />
        </div>
      )}

      {media.videos && media.videos.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {media.videos.map((src, i) => (
            <div key={i} className="aspect-video">
              <Video src={src} className="w-full h-full rounded-md" />
            </div>
          ))}
        </div>
      )}

      {media.image &&
        zoomable(media.image, title, "w-full h-auto object-cover rounded-md")}

      {media.screens && media.screens.length > 0 && (
        <div className="grid grid-cols-3 gap-2 md:gap-4 md:px-8">
          {media.screens.map((src, i) => (
            <div key={i}>
              {zoomable(
                src,
                `${title} screen ${i + 1}`,
                "w-full h-auto rounded-md border border-neutral-200"
              )}
            </div>
          ))}
        </div>
      )}

      {media.images && media.images.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {media.images.map((src, i) => (
            <div
              key={i}
              className="w-full h-[220px] md:h-[260px] overflow-hidden rounded-md bg-neutral-100"
            >
              {zoomable(
                src,
                `${title} image ${i + 1}`,
                "w-full h-full object-cover"
              )}
            </div>
          ))}
        </div>
      )}

      {zoomed && (
        <ImageLightbox
          src={zoomed.src}
          alt={zoomed.alt}
          onClose={() => setZoomed(null)}
        />
      )}
    </>
  );
}
