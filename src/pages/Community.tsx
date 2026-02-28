import { useEffect, useRef } from "react";

type CommunityImage = {
  src: string;
  layoutClass: string;
};

const communityImages: CommunityImage[] = [
  {
    src: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1000&q=80",
    layoutClass: "community-item--1",
  },
  {
    src: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1000&q=80",
    layoutClass: "community-item--2",
  },
  {
    src: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1000&q=80",
    layoutClass: "community-item--3",
  },
  {
    src: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=1000&q=80",
    layoutClass: "community-item--4",
  },
  {
    src: "https://images.unsplash.com/photo-1531498860502-7c67cf02f657?auto=format&fit=crop&w=1000&q=80",
    layoutClass: "community-item--5",
  },
  {
    src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80",
    layoutClass: "community-item--6",
  },
  {
    src: "https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?auto=format&fit=crop&w=1000&q=80",
    layoutClass: "community-item--7",
  },
  {
    src: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1000&q=80",
    layoutClass: "community-item--8",
  },
  {
    src: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1000&q=80",
    layoutClass: "community-item--9",
  },
  {
    src: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=1000&q=80",
    layoutClass: "community-item--10",
  },
  {
    src: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=1000&q=80",
    layoutClass: "community-item--11",
  },
  {
    src: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1000&q=80",
    layoutClass: "community-item--12",
  },
  {
    src: "https://images.unsplash.com/photo-1515169067868-5387ec356754?auto=format&fit=crop&w=1000&q=80",
    layoutClass: "community-item--13",
  },
  {
    src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1000&q=80",
    layoutClass: "community-item--14",
  },
  {
    src: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1000&q=80",
    layoutClass: "community-item--15",
  },
  {
    src: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1000&q=80",
    layoutClass: "community-item--16",
  },
  {
    src: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1000&q=80",
    layoutClass: "community-item--17",
  },
];

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
              <img src={src} alt="Community moment" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Community;
