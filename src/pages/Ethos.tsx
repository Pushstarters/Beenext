import { Link } from "react-router-dom";

const PILLARS = [
  { label: "The Institutional Seed Platform", to: "/seed-platform" },
  { label: "Founder-First, Always",           to: "/founder-first" },
  { label: "The Trans-Pacific Bridge",        to: "/trans-pacific" },
];

const ArrowIcon = () => (
  <svg width="19" height="18" viewBox="0 0 19 18" fill="none" aria-hidden="true">
    <path d="M18.7167 5.04053V14.7637H13.7081V6.41724C13.1575 6.62086 10.1371 7.80073 8.78502 11.0063C7.30619 14.5121 9.01139 17.5848 9.2513 18H9.23971e-06C-0.00429683 14.4801 1.49668 11.1552 4.12892 8.72162C6.67442 6.36865 10.1027 5.04053 13.6724 5.04053H18.7167Z" fill="currentColor"/>
    <path d="M18.7166 0C18.7166 1.39148 18.1525 2.65193 17.2403 3.56421C16.3415 4.46357 15.1038 5.02459 13.7345 5.03997C13.7154 5.04058 13.6958 5.04058 13.6767 5.04058H3.88898V0H18.7166Z" fill="currentColor"/>
  </svg>
);

const BackArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const Ethos = () => (
  <div className="ethos-page">
    <Link className="ethos-back" to="/">
      <span className="ethos-back-icon"><BackArrowIcon /></span>
      <span className="ethos-back-label">Back</span>
    </Link>

    <div className="ethos-intro">
      <h1 className="ethos-title">
        A partnership built on{" "}
        Empathy, Experience and Execution
      </h1>
      <p className="ethos-body">
        For nearly a decade at BEENEXT, we have been quiet students and active partners in the India growth story. We chose to
        listen first, learn deeply, and build conviction through proximity. Almost <strong>70%</strong> of our capital has flowed into Indian startups
        &ndash; not by strategy alone, but because this is where we consistently found the world&apos;s most ambitious builders.
        India&apos;s founders shaped us as much as we have supported them. Our ethos was forged on the ground, in the trenches,
        with the people who are rewriting what&apos;s possible.
      </p>
    </div>

    <div className="ethos-pillars">
      {PILLARS.map(({ label, to }) => (
        <Link className="ethos-pillar-row" to={to} key={to}>
          <span className="ethos-pillar-label">{label}</span>
          <span className="ethos-pillar-btn" aria-hidden="true">
            <ArrowIcon />
          </span>
        </Link>
      ))}
    </div>
  </div>
);

export default Ethos;
