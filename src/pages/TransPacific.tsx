import { Link } from "react-router-dom";
import transpacMap from "../assets/transpac-map.png";

const BackArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

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
      <div className="transpac-map-inner">
        <img
          src={transpacMap}
          alt="Trans-Pacific investment regions map"
          className="transpac-map-img"
        />
        <div className="transpac-map-blink-layer" aria-hidden="true" />
      </div>
    </div>
  </div>
);

export default TransPacific;
