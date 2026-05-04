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

const communityAssets = import.meta.glob("../public/community/community-mosaic-*.jpg", {
  eager: true,
  import: "default",
}) as Record<string, string>;

// Images sorted numerically (01–50, 51 excluded)
const communityImageSourcesRaw = Object.entries(communityAssets)
  .sort(([left], [right]) =>
    left.localeCompare(right, undefined, { numeric: true }),
  )
  .filter(([path]) => !path.endsWith("community-mosaic-51.jpg"))
  .map(([, src]) => src);

// Each image is matched to the cell with the closest aspect ratio (colSpan/rowSpan)
// to minimise cover-crop. Within each AR bucket, images are stride-interleaved
// across groups so sequentially-numbered photos (same shoot) don't cluster together.
const COMMUNITY_IMAGE_ORDER = [
  38,  7,  40, 47, 41, 42, 45, 34, 36,  44, 1, 10, 13, 17, 50, // group 0
  8, 43, 14, 11, 21, 16, 48, 35, 37,  49, 4,  5,  15, 46, 18, // group 1
  2,  9, 28, 24,  19, 20, 32, 3, 22,  6, 23, 12, 27, 25, 26, // group 2
  39, 30, 31, 29, 33                                           // trailing 5
];

const communityImageSources = COMMUNITY_IMAGE_ORDER.map(
  (n) => communityImageSourcesRaw[n - 1],
);

const COMMUNITY_LAYOUT_PATTERN: CommunityLayout[] = [
  { colStart:  1, colSpan: 4, rowStart: 1, rowSpan: 8, objectPosition: "center center" }, // AR 0.50 — tall portrait cell
  { colStart:  5, colSpan: 8, rowStart: 1, rowSpan: 4, objectPosition: "center top"    }, // AR 2.00 — wide, crop bottom
  { colStart: 13, colSpan: 6, rowStart: 1, rowSpan: 4, objectPosition: "center center" }, // AR 1.50 — near-perfect match
  { colStart: 19, colSpan: 5, rowStart: 1, rowSpan: 4, objectPosition: "center center" }, // AR 1.25
  { colStart: 24, colSpan: 5, rowStart: 1, rowSpan: 8, objectPosition: "center center" }, // AR 0.63 — tall portrait cell
  { colStart: 29, colSpan: 4, rowStart: 1, rowSpan: 4, objectPosition: "center center" }, // AR 1.00 — square
  { colStart:  5, colSpan: 5, rowStart: 5, rowSpan: 4, objectPosition: "center center" }, // AR 1.25
  { colStart: 10, colSpan: 4, rowStart: 5, rowSpan: 4, objectPosition: "center center" }, // AR 1.00 — square
  { colStart: 14, colSpan: 4, rowStart: 5, rowSpan: 4, objectPosition: "center center" }, // AR 1.00 — square
  { colStart: 18, colSpan: 6, rowStart: 5, rowSpan: 4, objectPosition: "center center" }, // AR 1.50 — near-perfect match
  { colStart: 29, colSpan: 4, rowStart: 5, rowSpan: 4, objectPosition: "center center" }, // AR 1.00 — square
  { colStart:  1, colSpan: 8, rowStart: 9, rowSpan: 4, objectPosition: "center top"    }, // AR 2.00 — wide, crop bottom
  { colStart:  9, colSpan: 8, rowStart: 9, rowSpan: 4, objectPosition: "center top"    }, // AR 2.00 — wide, crop bottom
  { colStart: 17, colSpan: 8, rowStart: 9, rowSpan: 4, objectPosition: "center top"    }, // AR 2.00 — wide, crop bottom
  { colStart: 25, colSpan: 8, rowStart: 9, rowSpan: 4, objectPosition: "center top"    }, // AR 2.00 — wide, crop bottom
];

const COMMUNITY_TRAILING_LAYOUTS: Record<
  number,
  { columns: number; pattern: CommunityLayout[] }
> = {
  5: {
    columns: 12,
    pattern: [
      { colStart:  1, colSpan:  4, rowStart: 1, rowSpan: 8, objectPosition: "center center" }, // AR 0.50 — tall
      { colStart:  5, colSpan:  4, rowStart: 1, rowSpan: 4, objectPosition: "center center" }, // AR 1.00
      { colStart:  9, colSpan:  4, rowStart: 1, rowSpan: 4, objectPosition: "center center" }, // AR 1.00
      { colStart:  5, colSpan:  8, rowStart: 5, rowSpan: 4, objectPosition: "center top"    }, // AR 2.00 — wide
      { colStart:  1, colSpan: 12, rowStart: 9, rowSpan: 4, objectPosition: "center top"    }, // AR 3.00 — very wide
    ],
  },
  6: {
    columns: 16,
    pattern: [
      { colStart:  1, colSpan:  4, rowStart: 1, rowSpan: 4, objectPosition: "center center" }, // AR 1.00
      { colStart:  5, colSpan:  8, rowStart: 1, rowSpan: 8, objectPosition: "center center" }, // AR 1.00 — tall center
      { colStart: 13, colSpan:  4, rowStart: 1, rowSpan: 4, objectPosition: "center center" }, // AR 1.00
      { colStart:  1, colSpan:  4, rowStart: 5, rowSpan: 4, objectPosition: "center center" }, // AR 1.00
      { colStart: 13, colSpan:  4, rowStart: 5, rowSpan: 4, objectPosition: "center center" }, // AR 1.00
      { colStart:  1, colSpan: 16, rowStart: 9, rowSpan: 4, objectPosition: "center top"    }, // AR 4.00 — very wide
    ],
  },
};

const Community = () => {
  const gridShellRef = useRef<HTMLElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);
  const patternCount = COMMUNITY_LAYOUT_PATTERN.length;
  const fullGroups = Math.floor(communityImageSources.length / patternCount);
  const trailingCount = communityImageSources.length % patternCount;
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

  const communityImages = communityImageSources.map((src, index) => {
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
