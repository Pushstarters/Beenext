import { ComposableMap, Geographies, Geography } from "react-simple-maps";

const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

// Numeric ISO-3166 codes: USA=840, India=356, Japan=392, South Korea=410, Taiwan=158
const HIGHLIGHTED = new Set(["840", "356", "392", "410", "158"]);

const TransPacific = () => (
  <div className="transpac-page">
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
        height={500}
        projectionConfig={{ scale: 153, center: [0, 20] }}
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
                  stroke={isHighlighted ? "#6b8fa0" : "#c8d5dc"}
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
