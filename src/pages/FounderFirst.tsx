const CARDS = [
  {
    title: "Execution Ready Operators",
    body: "We back execution-ready operators who have operated at scale and possess deep sector familiarity to be able to restart from scratch",
  },
  {
    title: "Category creators",
    body: "We also back young founders who are creating new categories where incumbents don't exist or are mispositioned.",
  },
];

const FounderFirst = () => (
  <div className="founderfirst-page">
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
