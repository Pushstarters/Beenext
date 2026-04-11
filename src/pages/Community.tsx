import { CSSProperties, useEffect, useRef } from "react";

type CommunityLayout = {
  colStart: number;
  colSpan: number;
  rowStart: number;
  rowSpan: number;
};

const COMMUNITY_PAN_DURATION_SECONDS = 8;
const COMMUNITY_PATTERN_COLUMNS = 16;
const COMMUNITY_PATTERN_WIDTH_PX = 1600;

const communityAssets = import.meta.glob("../public/community/community-*.webp", {
  eager: true,
  import: "default",
}) as Record<string, string>;

const communityImageSources = Object.entries(communityAssets)
  .sort(([left], [right]) =>
    left.localeCompare(right, undefined, { numeric: true }),
  )
  .map(([, src]) => src);

const COMMUNITY_LAYOUT_PATTERN: CommunityLayout[] = [
  { colStart: 1, colSpan: 2, rowStart: 1, rowSpan: 7 },
  { colStart: 3, colSpan: 4, rowStart: 1, rowSpan: 3 },
  { colStart: 7, colSpan: 2, rowStart: 1, rowSpan: 3 },
  { colStart: 9, colSpan: 2, rowStart: 1, rowSpan: 7 },
  { colStart: 11, colSpan: 2, rowStart: 1, rowSpan: 7 },
  { colStart: 13, colSpan: 2, rowStart: 1, rowSpan: 3 },
  { colStart: 15, colSpan: 2, rowStart: 1, rowSpan: 3 },
  { colStart: 1, colSpan: 2, rowStart: 8, rowSpan: 4 },
  { colStart: 3, colSpan: 2, rowStart: 4, rowSpan: 8 },
  { colStart: 5, colSpan: 4, rowStart: 4, rowSpan: 4 },
  { colStart: 13, colSpan: 4, rowStart: 4, rowSpan: 4 },
  { colStart: 5, colSpan: 2, rowStart: 8, rowSpan: 4 },
  { colStart: 7, colSpan: 2, rowStart: 8, rowSpan: 4 },
  { colStart: 9, colSpan: 2, rowStart: 8, rowSpan: 4 },
  { colStart: 11, colSpan: 2, rowStart: 8, rowSpan: 4 },
  { colStart: 13, colSpan: 2, rowStart: 8, rowSpan: 4 },
  { colStart: 15, colSpan: 2, rowStart: 8, rowSpan: 4 },
];

const COMMUNITY_TRAILING_LAYOUTS: Record<
  number,
  { columns: number; pattern: CommunityLayout[] }
> = {
  6: {
    columns: 8,
    pattern: [
      COMMUNITY_LAYOUT_PATTERN[0],
      COMMUNITY_LAYOUT_PATTERN[1],
      COMMUNITY_LAYOUT_PATTERN[2],
      COMMUNITY_LAYOUT_PATTERN[8],
      COMMUNITY_LAYOUT_PATTERN[9],
      COMMUNITY_LAYOUT_PATTERN[7],
    ],
  },
};

const Community = () => {
  const gridShellRef = useRef<HTMLElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);
  const fullPatternCount = COMMUNITY_LAYOUT_PATTERN.length;
  const fullGroups = Math.floor(communityImageSources.length / fullPatternCount);
  const trailingCount = communityImageSources.length % fullPatternCount;
  const trailingLayout = trailingCount
    ? COMMUNITY_TRAILING_LAYOUTS[trailingCount] ?? {
        columns: COMMUNITY_PATTERN_COLUMNS,
        pattern: COMMUNITY_LAYOUT_PATTERN.slice(0, trailingCount),
      }
    : null;
  const totalColumns =
    fullGroups * COMMUNITY_PATTERN_COLUMNS + (trailingLayout?.columns ?? 0);
  const totalWidthPx = Math.round(
    (totalColumns / COMMUNITY_PATTERN_COLUMNS) * COMMUNITY_PATTERN_WIDTH_PX,
  );
  const panDurationSeconds = Math.max(
    COMMUNITY_PAN_DURATION_SECONDS,
    Math.round((totalColumns / COMMUNITY_PATTERN_COLUMNS) * 10),
  );
  const gridStyle = {
    "--community-grid-columns": totalColumns,
    "--community-grid-width": `${totalWidthPx}px`,
  } as CSSProperties;

  const communityImages = communityImageSources.map((src, index) => {
    const isTrailingImage = trailingLayout !== null && index >= fullGroups * fullPatternCount;
    const trailingIndex = index - fullGroups * fullPatternCount;
    const pattern = isTrailingImage
      ? trailingLayout.pattern[trailingIndex]
      : COMMUNITY_LAYOUT_PATTERN[index % fullPatternCount];
    const columnOffset = isTrailingImage
      ? fullGroups * COMMUNITY_PATTERN_COLUMNS
      : Math.floor(index / fullPatternCount) * COMMUNITY_PATTERN_COLUMNS;

    return {
      src,
      alt: `Community moment ${index + 1}`,
      style: {
        gridColumn: `${pattern.colStart + columnOffset} / span ${pattern.colSpan}`,
        gridRow: `${pattern.rowStart} / span ${pattern.rowSpan}`,
      } as CSSProperties,
    };
  });

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
        `${panDurationSeconds}s`,
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
  }, [panDurationSeconds]);

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
        <div className="community-grid" ref={gridRef} style={gridStyle}>
          {communityImages.map(({ src, alt, style }, index) => (
            <div className="community-item" key={`${src}-${index}`} style={style}>
              <img
                src={src}
                alt={alt}
                loading={index < 4 ? "eager" : "lazy"}
                fetchPriority={index < 2 ? "high" : "auto"}
                decoding="async"
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Community;
