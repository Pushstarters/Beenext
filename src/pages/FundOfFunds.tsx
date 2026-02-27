const fundCards = [
  {
    title: "Silicon Valley Spin-outs",
    description:
      "Backing teams commercializing frontier research from top Valley labs & institutions.",
    variant: "deep",
  },
  {
    title: "Specialist Managers",
    description: "Technical depth and niche excellence.",
    variant: "mid",
  },
  {
    title: "Operator turned VCs",
    description: "Backing first-time funds led by experienced operators.",
    variant: "light",
  },
];

const FundOfFunds = () => {
  return (
    <div className="fof-page">
      <section className="fof-hero">
        <h1 className="fof-title">Bridging Asia to the West.</h1>
        <p className="fof-subtitle">
          Backing cutting edge technology in the valley through funds and
          co-investments.
        </p>
      </section>

      <section className="fof-grid">
        {fundCards.map((card) => (
          <article className={`fof-card ${card.variant}`} key={card.title}>
            <div className="fof-card-content">
              <h3>{card.title}</h3>
              <p>{card.description}</p>
              <span className="fof-link">Learn more →</span>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
};

export default FundOfFunds;
