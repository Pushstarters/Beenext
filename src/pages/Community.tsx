import { useEffect, useRef } from "react";
import community01Img from "../public/community/community-01.jpg";
import community02Img from "../public/community/community-02.jpg";
import community03Img from "../public/community/community-03.jpg";
import community04Img from "../public/community/community-04.jpg";
import community05Img from "../public/community/community-05.jpg";
import community06Img from "../public/community/community-06.jpeg";
import community07Img from "../public/community/community-07.jpeg";
import community08Img from "../public/community/community-08.jpeg";

type CommunityImage = {
  src: string;
  layoutClass: string;
};

const communityPhotos = [
  community01Img,
  community02Img,
  community03Img,
  community04Img,
  community05Img,
  community06Img,
  community07Img,
  community08Img,
];

const communityImages: CommunityImage[] = Array.from(
  { length: 17 },
  (_, index) => ({
    src: communityPhotos[index % communityPhotos.length],
    layoutClass: `community-item--${index + 1}`,
  }),
);

const COMMUNITY_PAN_DURATION_SECONDS = 8;

const Community = () => {
  const gridShellRef = useRef<HTMLElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const shell = gridShellRef.current;
    const grid = gridRef.current;

    if (!shell || !grid) {
      return;
    }

    const updatePanDistance = () => {
      const panDistance = Math.max(0, grid.scrollWidth - shell.clientWidth);
      grid.style.setProperty("--community-pan-distance", `${panDistance}px`);
      grid.style.setProperty(
        "--community-pan-duration",
        `${COMMUNITY_PAN_DURATION_SECONDS}s`,
      );
      grid.classList.toggle("community-grid--animated", panDistance > 0);
    };

    updatePanDistance();

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(updatePanDistance);
      resizeObserver.observe(shell);
      resizeObserver.observe(grid);
    }

    window.addEventListener("resize", updatePanDistance);

    const imageNodes = grid.querySelectorAll("img");
    imageNodes.forEach((img) =>
      img.addEventListener("load", updatePanDistance),
    );

    return () => {
      window.removeEventListener("resize", updatePanDistance);
      imageNodes.forEach((img) =>
        img.removeEventListener("load", updatePanDistance),
      );
      resizeObserver?.disconnect();
    };
  }, []);

  return (
    <div className="community-page">
      <section className="community-hero">
        <h1 className="community-title">A Community, Not a Portfolio</h1>
        <p className="community-subtitle">
          We believe founders grow faster when they grow together. Our community
          connects entrepreneurs, operators, and global experts across markets.
        </p>
      </section>

      <section className="community-grid-shell" ref={gridShellRef}>
        <div className="community-grid" ref={gridRef}>
          {communityImages.map(({ src, layoutClass }, index) => (
            <div
              className={`community-item ${layoutClass}`}
              key={`${src}-${index}`}
            >
              <img src={src} alt="Community moment" loading="lazy" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Community;
