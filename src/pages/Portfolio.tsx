import { useState } from "react";

type PortfolioItem = {
  name: string;
  summary: string;
  headerColor: string;
  headerText: string;
  panelColor: string;
  highlights: { label: string; value: string }[];
  facts: { label: string; value: string }[];
};

const categories = [
  { label: "All", count: 50, active: true },
  { label: "AI/ML", count: 15 },
  { label: "FinTech", count: 12 },
  { label: "HealthTech", count: 8 },
  { label: "SaaS", count: 10 },
  { label: "Other", count: 5 },
];

const portfolioItems: PortfolioItem[] = [
  {
    name: "Scimplify",
    summary: "Specialty chemicals (B2B platform)",
    headerColor: "#0eb3a5",
    headerText: "#ffffff",
    panelColor: "#ddf7f3",
    highlights: [
      { label: "Founders", value: "Sachin Sarthosh, Sai Srivatsava, Dheeraj" },
      { label: "Founded", value: "2023" },
      { label: "Product", value: "B2B platform" },
      { label: "Reach", value: "600+ customers in 16+ countries" },
      { label: "Latest Funding", value: "Series B - $40M (Mar 2025)" },
    ],
    facts: [
      { label: "Lead Investors", value: "Accel, Bessemer India Investments" },
      { label: "Other Investors", value: "UMI, Omnivore, Zomel Capital" },
      { label: "Valuation", value: "$150M post (reported)" },
      { label: "Acquired", value: "No" },
    ],
  },
  {
    name: "whizzo",
    summary: "Logistics automation platform",
    headerColor: "linear-gradient(180deg, #4a4a4a 0%, #1f1f1f 100%)",
    headerText: "#ffffff",
    panelColor: "#d9d9d9",
    highlights: [
      { label: "Founders", value: "Maya Singh, Arjun Rao" },
      { label: "Founded", value: "2020" },
      { label: "Product", value: "Workflow automation" },
      { label: "Reach", value: "300+ enterprise customers" },
      { label: "Latest Funding", value: "Series A - $18M (Jan 2024)" },
    ],
    facts: [
      { label: "Lead Investors", value: "Lightspeed, Sequoia" },
      { label: "Other Investors", value: "Blume, Elevation" },
      { label: "Valuation", value: "$120M post (reported)" },
      { label: "Acquired", value: "No" },
    ],
  },
  {
    name: "Scimplify",
    summary: "Specialty chemicals (B2B platform)",
    headerColor: "#0eb3a5",
    headerText: "#ffffff",
    panelColor: "#ddf7f3",
    highlights: [
      { label: "Founders", value: "Sachin Sarthosh, Sai Srivatsava, Dheeraj" },
      { label: "Founded", value: "2023" },
      { label: "Product", value: "B2B platform" },
      { label: "Reach", value: "600+ customers in 16+ countries" },
      { label: "Latest Funding", value: "Series B - $40M (Mar 2025)" },
    ],
    facts: [
      { label: "Lead Investors", value: "Accel, Bessemer India Investments" },
      { label: "Other Investors", value: "UMI, Omnivore, Zomel Capital" },
      { label: "Valuation", value: "$150M post (reported)" },
      { label: "Acquired", value: "No" },
    ],
  },
  {
    name: "whizzo",
    summary: "Logistics automation platform",
    headerColor: "linear-gradient(180deg, #4a4a4a 0%, #1f1f1f 100%)",
    headerText: "#ffffff",
    panelColor: "#d9d9d9",
    highlights: [
      { label: "Founders", value: "Maya Singh, Arjun Rao" },
      { label: "Founded", value: "2020" },
      { label: "Product", value: "Workflow automation" },
      { label: "Reach", value: "300+ enterprise customers" },
      { label: "Latest Funding", value: "Series A - $18M (Jan 2024)" },
    ],
    facts: [
      { label: "Lead Investors", value: "Lightspeed, Sequoia" },
      { label: "Other Investors", value: "Blume, Elevation" },
      { label: "Valuation", value: "$120M post (reported)" },
      { label: "Acquired", value: "No" },
    ],
  },
  {
    name: "whizzo",
    summary: "Logistics automation platform",
    headerColor: "linear-gradient(180deg, #4a4a4a 0%, #1f1f1f 100%)",
    headerText: "#ffffff",
    panelColor: "#d9d9d9",
    highlights: [
      { label: "Founders", value: "Maya Singh, Arjun Rao" },
      { label: "Founded", value: "2020" },
      { label: "Product", value: "Workflow automation" },
      { label: "Reach", value: "300+ enterprise customers" },
      { label: "Latest Funding", value: "Series A - $18M (Jan 2024)" },
    ],
    facts: [
      { label: "Lead Investors", value: "Lightspeed, Sequoia" },
      { label: "Other Investors", value: "Blume, Elevation" },
      { label: "Valuation", value: "$120M post (reported)" },
      { label: "Acquired", value: "No" },
    ],
  },
  {
    name: "Scimplify",
    summary: "Specialty chemicals (B2B platform)",
    headerColor: "#0eb3a5",
    headerText: "#ffffff",
    panelColor: "#ddf7f3",
    highlights: [
      { label: "Founders", value: "Sachin Sarthosh, Sai Srivatsava, Dheeraj" },
      { label: "Founded", value: "2023" },
      { label: "Product", value: "B2B platform" },
      { label: "Reach", value: "600+ customers in 16+ countries" },
      { label: "Latest Funding", value: "Series B - $40M (Mar 2025)" },
    ],
    facts: [
      { label: "Lead Investors", value: "Accel, Bessemer India Investments" },
      { label: "Other Investors", value: "UMI, Omnivore, Zomel Capital" },
      { label: "Valuation", value: "$150M post (reported)" },
      { label: "Acquired", value: "No" },
    ],
  },
  {
    name: "whizzo",
    summary: "Logistics automation platform",
    headerColor: "linear-gradient(180deg, #4a4a4a 0%, #1f1f1f 100%)",
    headerText: "#ffffff",
    panelColor: "#d9d9d9",
    highlights: [
      { label: "Founders", value: "Maya Singh, Arjun Rao" },
      { label: "Founded", value: "2020" },
      { label: "Product", value: "Workflow automation" },
      { label: "Reach", value: "300+ enterprise customers" },
      { label: "Latest Funding", value: "Series A - $18M (Jan 2024)" },
    ],
    facts: [
      { label: "Lead Investors", value: "Lightspeed, Sequoia" },
      { label: "Other Investors", value: "Blume, Elevation" },
      { label: "Valuation", value: "$120M post (reported)" },
      { label: "Acquired", value: "No" },
    ],
  },
  {
    name: "Scimplify",
    summary: "Specialty chemicals (B2B platform)",
    headerColor: "#0eb3a5",
    headerText: "#ffffff",
    panelColor: "#ddf7f3",
    highlights: [
      { label: "Founders", value: "Sachin Sarthosh, Sai Srivatsava, Dheeraj" },
      { label: "Founded", value: "2023" },
      { label: "Product", value: "B2B platform" },
      { label: "Reach", value: "600+ customers in 16+ countries" },
      { label: "Latest Funding", value: "Series B - $40M (Mar 2025)" },
    ],
    facts: [
      { label: "Lead Investors", value: "Accel, Bessemer India Investments" },
      { label: "Other Investors", value: "UMI, Omnivore, Zomel Capital" },
      { label: "Valuation", value: "$150M post (reported)" },
      { label: "Acquired", value: "No" },
    ],
  },
  {
    name: "Scimplify",
    summary: "Specialty chemicals (B2B platform)",
    headerColor: "#0eb3a5",
    headerText: "#ffffff",
    panelColor: "#ddf7f3",
    highlights: [
      { label: "Founders", value: "Sachin Sarthosh, Sai Srivatsava, Dheeraj" },
      { label: "Founded", value: "2023" },
      { label: "Product", value: "B2B platform" },
      { label: "Reach", value: "600+ customers in 16+ countries" },
      { label: "Latest Funding", value: "Series B - $40M (Mar 2025)" },
    ],
    facts: [
      { label: "Lead Investors", value: "Accel, Bessemer India Investments" },
      { label: "Other Investors", value: "UMI, Omnivore, Zomel Capital" },
      { label: "Valuation", value: "$150M post (reported)" },
      { label: "Acquired", value: "No" },
    ],
  },
  {
    name: "whizzo",
    summary: "Logistics automation platform",
    headerColor: "linear-gradient(180deg, #4a4a4a 0%, #1f1f1f 100%)",
    headerText: "#ffffff",
    panelColor: "#d9d9d9",
    highlights: [
      { label: "Founders", value: "Maya Singh, Arjun Rao" },
      { label: "Founded", value: "2020" },
      { label: "Product", value: "Workflow automation" },
      { label: "Reach", value: "300+ enterprise customers" },
      { label: "Latest Funding", value: "Series A - $18M (Jan 2024)" },
    ],
    facts: [
      { label: "Lead Investors", value: "Lightspeed, Sequoia" },
      { label: "Other Investors", value: "Blume, Elevation" },
      { label: "Valuation", value: "$120M post (reported)" },
      { label: "Acquired", value: "No" },
    ],
  },
  {
    name: "Scimplify",
    summary: "Specialty chemicals (B2B platform)",
    headerColor: "#0eb3a5",
    headerText: "#ffffff",
    panelColor: "#ddf7f3",
    highlights: [
      { label: "Founders", value: "Sachin Sarthosh, Sai Srivatsava, Dheeraj" },
      { label: "Founded", value: "2023" },
      { label: "Product", value: "B2B platform" },
      { label: "Reach", value: "600+ customers in 16+ countries" },
      { label: "Latest Funding", value: "Series B - $40M (Mar 2025)" },
    ],
    facts: [
      { label: "Lead Investors", value: "Accel, Bessemer India Investments" },
      { label: "Other Investors", value: "UMI, Omnivore, Zomel Capital" },
      { label: "Valuation", value: "$150M post (reported)" },
      { label: "Acquired", value: "No" },
    ],
  },
  {
    name: "whizzo",
    summary: "Logistics automation platform",
    headerColor: "#1f1f1f",
    headerText: "#ffffff",
    panelColor: "#d9d9d9",
    highlights: [
      { label: "Founders", value: "Maya Singh, Arjun Rao" },
      { label: "Founded", value: "2020" },
      { label: "Product", value: "Workflow automation" },
      { label: "Reach", value: "300+ enterprise customers" },
      { label: "Latest Funding", value: "Series A - $18M (Jan 2024)" },
    ],
    facts: [
      { label: "Lead Investors", value: "Lightspeed, Sequoia" },
      { label: "Other Investors", value: "Blume, Elevation" },
      { label: "Valuation", value: "$120M post (reported)" },
      { label: "Acquired", value: "No" },
    ],
  },
];

const Portfolio = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const total = portfolioItems.length;
  const activeItem = activeIndex !== null ? portfolioItems[activeIndex] : null;
  const goPrev = () => {
    if (activeIndex === null) return;
    setActiveIndex((activeIndex - 1 + total) % total);
  };
  const goNext = () => {
    if (activeIndex === null) return;
    setActiveIndex((activeIndex + 1) % total);
  };

  return (
    <div className="portfolio-page">
      <section className="portfolio-hero">
        <h1 className="portfolio-title">High Conviction Partnerships</h1>
        <p className="portfolio-subtitle">
          We invest in high-growth sectors where innovation meets global market
          opportunities.
        </p>
      </section>

      <section className="portfolio-filters">
        {categories.map((category) => (
          <span
            className={`portfolio-pill ${category.active ? "active" : ""}`}
            key={category.label}
          >
            {category.label} <span className="pill-count">({category.count})</span>
          </span>
        ))}
      </section>

      <section className="portfolio-grid">
        {portfolioItems.map((item, index) => (
          <button
            className="portfolio-card"
            key={`${item.name}-${index}`}
            type="button"
            onClick={() => setActiveIndex(index)}
          >
            <span className="logo-text">{item.name}</span>
          </button>
        ))}
      </section>

      <div className={`portfolio-modal ${activeItem ? "open" : ""}`}>
        <button
          className="portfolio-modal-backdrop"
          type="button"
          aria-label="Close"
          onClick={() => setActiveIndex(null)}
        />
        {activeItem && (
          <div className="portfolio-modal-frame">
            <div className="portfolio-modal-card" role="dialog" aria-modal="true">
              <button
                className="portfolio-modal-close"
                type="button"
                onClick={() => setActiveIndex(null)}
                aria-label="Close"
              >
                ×
              </button>
              <div
                className="portfolio-modal-header"
                style={{
                  background: activeItem.headerColor,
                  color: activeItem.headerText,
                }}
              >
                {activeItem.name}
              </div>
              <div className="portfolio-modal-body">
                <div
                  className="portfolio-modal-left"
                  style={{ background: activeItem.panelColor }}
                />
                <div className="portfolio-modal-right">
                  <h3>{activeItem.summary}</h3>
                  <div className="portfolio-modal-columns">
                    <div className="portfolio-modal-col">
                      {activeItem.highlights.map((item) => (
                        <div className="modal-row" key={item.label}>
                          <div className="modal-label">{item.label}</div>
                          <div className="modal-value">{item.value}</div>
                        </div>
                      ))}
                    </div>
                    <div className="portfolio-modal-col">
                      {activeItem.facts.map((item) => (
                        <div className="modal-row" key={item.label}>
                          <div className="modal-label">{item.label}</div>
                          <div className="modal-value">{item.value}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="portfolio-modal-nav">
              <button type="button" onClick={goPrev} aria-label="Previous">
                ‹
              </button>
              <button type="button" onClick={goNext} aria-label="Next">
                ›
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Portfolio;
