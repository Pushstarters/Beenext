import { useState } from "react";

import aixiriumLogo from "../public/portfolio/aixirium.png";
import crestLogo from "../public/portfolio/crest.png";
import defendermateLogo from "../public/portfolio/defendermate.png";
import elevnLogo from "../public/portfolio/elevn.png";
import flywlLogo from "../public/portfolio/flywl.png";
import gushworkLogo from "../public/portfolio/gushwork.png";
import ibcLogo from "../public/portfolio/ibc.png";
import prosparityLogo from "../public/portfolio/prosparity.png";
import reinforceLabsLogo from "../public/portfolio/reinforce-labs.png";
import workspotLogo from "../public/portfolio/workspot.png";

type PortfolioItem = {
  name: string;
  logo?: string;
  summary: string;
  category:
    | "DeepTech / AI"
    | "Climate / Energy"
    | "FinTech"
    | "SaaS"
    | "Consumer / Community";
};

const portfolioItems: PortfolioItem[] = [
  {
    name: "Axirium Aerospace",
    logo: aixiriumLogo,
    summary: "Aerospace manufacturing & engineering services",
    category: "DeepTech / AI",
  },
  {
    name: "Tractrix",
    summary: "Optical surveillance solutions for Defence",
    category: "DeepTech / AI",
  },
  {
    name: "MINI MINES",
    summary: "EV battery recycling",
    category: "Climate / Energy",
  },
  {
    name: "ProsParity",
    logo: prosparityLogo,
    summary: "EV financing solutions",
    category: "FinTech",
  },
  {
    name: "Crest",
    logo: crestLogo,
    summary: "Fractional family office for new age wealth",
    category: "FinTech",
  },
  {
    name: "International Battery Company",
    logo: ibcLogo,
    summary: "Li-ion cell gigafactory",
    category: "Climate / Energy",
  },
  {
    name: "budy",
    summary: "AI co-pilot for Senior Living Sales teams",
    category: "DeepTech / AI",
  },
  {
    name: "Flywl",
    logo: flywlLogo,
    summary: "Meta marketplace for buying cloud software",
    category: "SaaS",
  },
  {
    name: "gushwork",
    logo: gushworkLogo,
    summary: "AI growth agents for digital SMBs",
    category: "SaaS",
  },
  {
    name: "Telora",
    summary: "-1 to 0 Accelerator for young startup founders",
    category: "Consumer / Community",
  },
  {
    name: "Defendermate",
    logo: defendermateLogo,
    summary: "AI powered security teammates",
    category: "DeepTech / AI",
  },
  {
    name: "Elevn",
    logo: elevnLogo,
    summary: "Women first dating & experiences app",
    category: "Consumer / Community",
  },
  {
    name: "Reinforce Labs",
    logo: reinforceLabsLogo,
    summary: "AI enabled product vulnerability testing",
    category: "DeepTech / AI",
  },
  {
    name: "Workspot.",
    logo: workspotLogo,
    summary: "Enterprise-class SaaS cloud desktop solutions",
    category: "SaaS",
  },
  {
    name: "Hotdata",
    summary: "Real-time query engine for AI agents",
    category: "DeepTech / AI",
  },
];

const categoryOrder: Array<PortfolioItem["category"]> = [
  "DeepTech / AI",
  "Climate / Energy",
  "FinTech",
  "SaaS",
  "Consumer / Community",
];

const categories = [
  { label: "All", count: portfolioItems.length, active: true },
  ...categoryOrder.map((label) => ({
    label,
    count: portfolioItems.filter((item) => item.category === label).length,
    active: false,
  })),
];

const renderBrand = (item: PortfolioItem, className: string) => {
  if (item.logo) {
    return (
      <div className={`${className} ${className}--image`}>
        <img src={item.logo} alt={`${item.name} logo`} loading="lazy" />
      </div>
    );
  }

  return <div className={`${className} ${className}--text`}>{item.name}</div>;
};

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
            key={item.name}
            type="button"
            onClick={() => setActiveIndex(index)}
          >
            <div className="portfolio-card-content">
              {renderBrand(item, "portfolio-card-brand")}
              <p className="portfolio-card-summary">{item.summary}</p>
            </div>
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
            <div
              className="portfolio-modal-card"
              role="dialog"
              aria-modal="true"
              aria-labelledby="portfolio-modal-title"
            >
              <button
                className="portfolio-modal-close"
                type="button"
                onClick={() => setActiveIndex(null)}
                aria-label="Close"
              >
                ×
              </button>
              <div className="portfolio-modal-header">
                <span id="portfolio-modal-title">{activeItem.name}</span>
              </div>
              <div className="portfolio-modal-body">
                <div className="portfolio-modal-left">
                  <div className="portfolio-modal-brand-wrap">
                    {renderBrand(activeItem, "portfolio-modal-brand")}
                    <div className="portfolio-modal-brand-name">
                      {activeItem.name}
                    </div>
                  </div>
                </div>
                <div className="portfolio-modal-right">
                  <h3>{activeItem.summary}</h3>
                  <div className="portfolio-modal-columns">
                    <div className="portfolio-modal-col">
                      <div className="modal-row">
                        <div className="modal-label">Company</div>
                        <div className="modal-value">{activeItem.name}</div>
                      </div>
                      <div className="modal-row">
                        <div className="modal-label">Category</div>
                        <div className="modal-value">{activeItem.category}</div>
                      </div>
                    </div>
                    <div className="portfolio-modal-col">
                      <div className="modal-row">
                        <div className="modal-label">Showcase Copy</div>
                        <div className="modal-value">{activeItem.summary}</div>
                      </div>
                      <div className="modal-row">
                        <div className="modal-label">Logo Treatment</div>
                        <div className="modal-value">
                          {activeItem.logo ? "Provided logo asset" : "Text wordmark"}
                        </div>
                      </div>
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
