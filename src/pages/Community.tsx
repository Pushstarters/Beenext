import { CSSProperties, useEffect, useRef } from "react";

type CommunityLayout = {
  colStart: number;
  colSpan: number;
  rowStart: number;
  rowSpan: number;
  objectPosition?: string;
};

const COMMUNITY_PAN_DURATION_SECONDS = 18;
const COMMUNITY_PATTERN_COLUMNS = 32;
const COMMUNITY_PATTERN_WIDTH_PX = 1860;
const COMMUNITY_PORTRAIT_IDS = new Set([38, 41, 42, 43]);

const communityAssets = import.meta.glob("../public/community/community-mosaic-*.jpg", {
  eager: true,
  import: "default",
}) as Record<string, string>;

const communityImageEntries = Object.entries(communityAssets)
  .sort(([left], [right]) =>
    left.localeCompare(right, undefined, { numeric: true }),
  )
  .map(([path, src]) => {
    const match = path.match(/community-mosaic-(\d+)\.jpg$/i);
    return {
      src,
      id: match ? Number.parseInt(match[1], 10) : 0,
    };
  });

const COMMUNITY_LAYOUT_PATTERN: CommunityLayout[] = [
  { colStart: 1, colSpan: 5, rowStart: 1, rowSpan: 8, objectPosition: "center top" },
  { colStart: 6, colSpan: 9, rowStart: 1, rowSpan: 4 },
  { colStart: 15, colSpan: 9, rowStart: 1, rowSpan: 4 },
  { colStart: 24, colSpan: 9, rowStart: 1, rowSpan: 4 },
  { colStart: 6, colSpan: 7, rowStart: 5, rowSpan: 4 },
  { colStart: 13, colSpan: 7, rowStart: 5, rowSpan: 4 },
  { colStart: 20, colSpan: 7, rowStart: 5, rowSpan: 4 },
  { colStart: 27, colSpan: 6, rowStart: 5, rowSpan: 4 },
  { colStart: 1, colSpan: 8, rowStart: 9, rowSpan: 4 },
  { colStart: 9, colSpan: 8, rowStart: 9, rowSpan: 4 },
  { colStart: 17, colSpan: 8, rowStart: 9, rowSpan: 4 },
  { colStart: 25, colSpan: 8, rowStart: 9, rowSpan: 4 },
  { colStart: 1, colSpan: 8, rowStart: 13, rowSpan: 4 },
  { colStart: 9, colSpan: 8, rowStart: 13, rowSpan: 4 },
  { colStart: 17, colSpan: 8, rowStart: 13, rowSpan: 4 },
  { colStart: 25, colSpan: 8, rowStart: 13, rowSpan: 4 },
];

const COMMUNITY_TRAILING_LAYOUTS: Record<
  number,
  { columns: number; pattern: CommunityLayout[] }
> = {
  3: {
    columns: 20,
    pattern: [
      { colStart: 1, colSpan: 6, rowStart: 1, rowSpan: 16, objectPosition: "center top" },
      { colStart: 7, colSpan: 14, rowStart: 1, rowSpan: 8 },
      { colStart: 7, colSpan: 14, rowStart: 9, rowSpan: 8 },
    ],
  },
  6: {
    columns: 16,
    pattern: [
      { colStart: 1, colSpan: 6, rowStart: 1, rowSpan: 8, objectPosition: "center top" },
      { colStart: 7, colSpan: 10, rowStart: 1, rowSpan: 4 },
      { colStart: 7, colSpan: 10, rowStart: 5, rowSpan: 4 },
      { colStart: 1, colSpan: 8, rowStart: 9, rowSpan: 8 },
      { colStart: 9, colSpan: 8, rowStart: 9, rowSpan: 4 },
      { colStart: 9, colSpan: 8, rowStart: 13, rowSpan: 4 },
    ],
  },
};

const Community = () => {
  const gridShellRef = useRef<HTMLElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);
  const patternCount = COMMUNITY_LAYOUT_PATTERN.length;
  const portraitEntries = communityImageEntries.filter(({ id }) =>
    COMMUNITY_PORTRAIT_IDS.has(id),
  );
  const landscapeEntries = communityImageEntries.filter(
    ({ id }) => !COMMUNITY_PORTRAIT_IDS.has(id),
  );
  const orderedImageEntries = [
    ...portraitEntries.slice(0, 3).flatMap((portrait, index) => {
      const start = index * 15;
      return [
        portrait,
        ...landscapeEntries.slice(start, start + 15),
      ];
    }),
    portraitEntries.slice(3),
    ...landscapeEntries.slice(45),
  ].flat();
  const fullGroups = Math.floor(orderedImageEntries.length / patternCount);
  const trailingCount = orderedImageEntries.length % patternCount;
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
    Math.round((totalColumns / COMMUNITY_PATTERN_COLUMNS) * 18),
  );
  const gridStyle = {
    "--community-grid-columns": totalColumns,
    "--community-grid-width": `${totalWidthPx}px`,
  } as CSSProperties;

  const communityImages = orderedImageEntries.map(({ src }, index) => {
    const isTrailingImage = trailingLayout !== null && index >= fullGroups * patternCount;
    const trailingIndex = index - fullGroups * patternCount;
    const pattern = isTrailingImage
      ? trailingLayout.pattern[trailingIndex]
      : COMMUNITY_LAYOUT_PATTERN[index % patternCount];
    const columnOffset = isTrailingImage
      ? fullGroups * COMMUNITY_PATTERN_COLUMNS
      : Math.floor(index / patternCount) * COMMUNITY_PATTERN_COLUMNS;

    return {
      src,
      alt: `Community moment ${index + 1}`,
      style: {
        gridColumn: `${pattern.colStart + columnOffset} / span ${pattern.colSpan}`,
        gridRow: `${pattern.rowStart} / span ${pattern.rowSpan}`,
        "--community-object-position": pattern.objectPosition ?? "center center",
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
