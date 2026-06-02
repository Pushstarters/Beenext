import { Link } from "react-router-dom";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

const BackArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

// Numeric ISO-3166 codes: USA=840, India=356, Japan=392, South Korea=410, Taiwan=158
const HIGHLIGHTED = new Set(["840", "356", "392", "410", "158"]);

const TransPacific = () => (
  <div className="transpac-page">
    <Link className="ethos-back transpac-back" to="/ethos">
      <span className="ethos-back-icon"><BackArrowIcon /></span>
      <span>Back</span>
    </Link>
    <div className="transpac-hero">
      <h1 className="transpac-title">The Trans-Pacific Bridge</h1>
      <p className="transpac-subtitle">
        This is our Alpha! We leverage deep Japanese roots to help Indian builders scale
        into Japan, Korea, and Taiwan, while serving as a trusted partner for East Asian LPs
        looking for a sophisticated entry into India&apos;s early-stage DNA.
      </p>
    </div>
    <div className="transpac-map">
      <ComposableMap
        projection="geoEquirectangular"
        width={960}
        height={440}
        projectionConfig={{ scale: 153, center: [15, 25] }}
      >
        <Geographies geography={GEO_URL}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const isHighlighted = HIGHLIGHTED.has(String(geo.id));
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  className={isHighlighted ? "transpac-blink" : undefined}
                  fill={isHighlighted ? "#6b8fa0" : "transparent"}
                  stroke={isHighlighted ? "none" : "#c8d5dc"}
                  strokeWidth={0.5}
                  style={{
                    default: { outline: "none" },
                    hover: { outline: "none" },
                    pressed: { outline: "none" },
                  }}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>
    </div>
  </div>
);

export default TransPacific;
