const CARDS = [
  {
    title: "Execution Ready Operators",
    body: "We back execution-ready operators who have operated at scale and possess deep sector familiarity to be able to restart from scratch.",
  },
  {
    title: "Category creators",
    body: "We also back young founders who are creating new categories where incumbents don't exist or are mispositioned.",
  },
];

import { Link } from "react-router-dom";

const BackArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const FounderFirst = () => (
  <div className="founderfirst-page">
    <Link className="ethos-back founderfirst-back" to="/ethos">
      <span className="ethos-back-icon"><BackArrowIcon /></span>
      <span>Back</span>
    </Link>
    <div className="founderfirst-hero">
      <h1 className="founderfirst-title">Founder-First, Always</h1>
      <p className="founderfirst-subtitle">
        We back founders who know how to build &mdash; whether they&apos;ve done it before or are doing it now.
      </p>
    </div>

    <div className="founderfirst-cards">
      {CARDS.map((card) => (
        <div className="founderfirst-card" key={card.title}>
          <h2 className="founderfirst-card-title">{card.title}</h2>
          <p className="founderfirst-card-body">{card.body}</p>
        </div>
      ))}
    </div>
  </div>
);

export default FounderFirst;
