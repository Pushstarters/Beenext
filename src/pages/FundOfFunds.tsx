type FundCard = {
  title: string;
  description: string;
  variant: "deep" | "mid" | "light";
};

const fundCards: FundCard[] = [
  {
    title: "Silicon Valley Spin-outs",
    description:
      "High-performing GPs launching independent funds after spinning out from major asset managers.",
    variant: "deep",
  },
  {
    title: "Specialist Managers",
    description: "GPs with deep technical expertise and a nuanced understanding of evolving technology shifts",
    variant: "mid",
  },
  {
    title: "Operator turned VCs",
    description: "First-time funds led by successful and experienced operators",
    variant: "light",
  },
];

const FundOfFunds = () => {
  return (
    <div className="fof-page">
      <section className="fof-hero">
        <h1 className="fof-title">Bridging Asia to the West.</h1>
        <p className="fof-subtitle">
          Building and enabling a trusted platform to support seed fund managers globally.
        </p>
      </section>

      <section className="fof-grid">
        {fundCards.map((card) => (
          <article className={`fof-card ${card.variant}`} key={card.title}>
            <div className="fof-card-content">
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
};

export default FundOfFunds;
