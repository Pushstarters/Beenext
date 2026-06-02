import { Link } from "react-router-dom";

const BackArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const SeedPlatform = () => (
  <div className="seedplatform-page">
    <Link className="ethos-back seedplatform-back" to="/ethos">
      <span className="ethos-back-icon"><BackArrowIcon /></span>
      <span>Back</span>
    </Link>
    <div className="seedplatform-hero">
      <h1 className="seedplatform-title">The Institutional Seed Platform</h1>
      <p className="seedplatform-subtitle">
        We are the generation that grew up alongside the founders we now back. We bring the weight of a
        global legacy, but with the renewed, localized energy of a team that lives on the ground.
      </p>
    </div>

    <div className="seedplatform-cards">
      <div className="seedplatform-card">
        <h2 className="seedplatform-card-title">Stage Focus:</h2>
        <p className="seedplatform-card-body">
          100% committed to your Pre-Seed and Seed journey.
        </p>
      </div>

      <div className="seedplatform-card">
        <h2 className="seedplatform-card-title">First Cheque:</h2>
        <p className="seedplatform-card-body">
          High-conviction backing ranging from USD 1mn to 4mn.
        </p>
      </div>

      <div className="seedplatform-card">
        <h2 className="seedplatform-card-title">Sector Preferences:</h2>
        <ul className="seedplatform-card-list">
          <li>Foundational Sectors (Consumer Brands)</li>
          <li>Frontier Tech (B2B AI, DeepTech, Space Tech, and Life Sciences)</li>
        </ul>
      </div>
    </div>
  </div>
);

export default SeedPlatform;
