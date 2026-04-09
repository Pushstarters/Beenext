import { type CSSProperties, useState } from "react";

import portfolioDetailsCsv from "../data/portfolio-details.csv?raw";
import aixiriumLogo from "../public/portfolio/axirium-rmbg-2026.png";
import budyLogo from "../public/portfolio/budy.svg";
import defendermateLogo from "../public/portfolio/defendermate.avif";
import elevnLogo from "../public/portfolio/elevn-rmbg-2026.png";
import firstCoffeeLogo from "../public/portfolio/first-coffee-rmbg-2026.png";
import flywlLogo from "../public/portfolio/flywl-rmbg-2026.png";
import furnishkaLogo from "../public/portfolio/furnishka.png";
import gushworkLogo from "../public/portfolio/gushwork-new.png";
import ibcLogo from "../public/portfolio/ibc-new.png";
import kreditpeLogo from "../public/portfolio/kreditpe-rmbg-2026.png";
import miniMinesLogo from "../public/portfolio/mini-mines-rmbg-2026.png";
import prosparityLogo from "../public/portfolio/prosparity-rmbg-2026.png";
import hotdataLogo from "../public/portfolio/hotdata-2026.svg";
import rampLogo from "../public/portfolio/ramp-2026.svg";
import reinforceLabsLogo from "../public/portfolio/reinforce-labs-2026.png";
import scimplifyLogo from "../public/portfolio/scimplify.png";
import teloraLogo from "../public/portfolio/telora-new.svg";
import tractrixLogo from "../public/portfolio/tractrix-rmbg-2026.png";
import whizzoLogo from "../public/portfolio/whizzo.png";
import siriusAiLogo from "../public/portfolio/sirusai.svg";
import workspotLogo from "../public/portfolio/workspot-rmbg-2026.png";

type PortfolioItem = {
  name: string;
  csvKey?: string;
  logo?: string;
  icon?: string;
  brandScale?: number;
  modalBrandScale?: number;
  brandLines?: string[];
  brandVariant?: "default" | "stacked";
  preserveColor?: boolean;
  cardBrandBackground?: string;
  cardHoverInk?: string;
  cardHoverLogoFilter?: string;
  cardHoverPanelBackground?: string;
  modalTheme?: {
    header: string;
    panel: string;
    panelSurface?: string;
    headerText?: string;
    brandInk?: string;
    textInk?: string;
  };
  fallbackSummary: string;
  category:
    | "AI SaaS"
    | "Financial Services"
    | "Industry 2.0"
    | "Consumer Economy"
    | "DeepTech"
    | "Accelerator";
};

type PortfolioCsvRecord = {
  sector: string;
  companyName: string;
  aboutCompany: string;
  founders: string;
  foundedIn: string;
  location: string;
  otherInvestors: string;
};

type PortfolioPopupDetails = {
  left: Array<{ label: string; value: string }>;
  right: Array<{ label: string; value: string }>;
};

type ResolvedPortfolioItem = PortfolioItem & {
  summary: string;
  popupDetails: PortfolioPopupDetails;
};

const parseCsvLine = (line: string) => {
  const values: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let index = 0; index < line.length; index += 1) {
    const character = line[index];
    const nextCharacter = line[index + 1];

    if (character === '"') {
      if (inQuotes && nextCharacter === '"') {
        current += '"';
        index += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (character === "," && !inQuotes) {
      values.push(current.trim());
      current = "";
      continue;
    }

    current += character;
  }

  values.push(current.trim());
  return values;
};

const cleanText = (value: string) => value.replace(/\s+/g, " ").trim();
const normalizeCommaSeparated = (value: string) =>
  value
    .split(",")
    .map((part) => cleanText(part))
    .filter(Boolean)
    .join(", ");

const normalizeCompanyName = (value: string) =>
  cleanText(value).toLowerCase().replace(/[^a-z0-9]/g, "");

const hexToRgb = (value: string) => {
  const normalized = value.replace("#", "").trim();

  if (!/^[0-9a-fA-F]{3}$|^[0-9a-fA-F]{6}$/.test(normalized)) {
    return null;
  }

  const expanded =
    normalized.length === 3
      ? normalized
          .split("")
          .map((char) => `${char}${char}`)
          .join("")
      : normalized;

  return {
    r: Number.parseInt(expanded.slice(0, 2), 16),
    g: Number.parseInt(expanded.slice(2, 4), 16),
    b: Number.parseInt(expanded.slice(4, 6), 16),
  };
};

const getHexLuminance = (value: string) => {
  const rgb = hexToRgb(value);

  if (!rgb) {
    return 0.25;
  }

  const toLinear = (channel: number) => {
    const scaled = channel / 255;
    return scaled <= 0.03928
      ? scaled / 12.92
      : ((scaled + 0.055) / 1.055) ** 2.4;
  };

  return 0.2126 * toLinear(rgb.r) + 0.7152 * toLinear(rgb.g) + 0.0722 * toLinear(rgb.b);
};

const getCardHoverPresentation = (background: string) => {
  const luminance = getHexLuminance(background);

  if (luminance < 0.18) {
    return {
      ink: "#ffffff",
      logoFilter: "grayscale(1) brightness(0) invert(1)",
      panelBackground: "rgba(255, 255, 255, 0.08)",
    };
  }

  if (luminance < 0.42) {
    return {
      ink: "#ffffff",
      logoFilter: "grayscale(1) brightness(0) invert(1)",
      panelBackground: "rgba(255, 255, 255, 0.14)",
    };
  }

  return {
    ink: "#153a5b",
    logoFilter: "grayscale(1) contrast(1.18) brightness(0.12)",
    panelBackground: "rgba(255, 255, 255, 0.92)",
  };
};

const parsePortfolioCsv = (csvText: string) => {
  const lines = csvText
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  if (lines.length < 2) {
    return [];
  }

  const [, ...dataLines] = lines;

  return dataLines
    .map((line) => {
      const [
        sector,
        companyName,
        aboutCompany,
        founders,
        foundedIn,
        location,
        otherInvestors,
      ] = parseCsvLine(line);

      return {
        sector: cleanText(sector),
        companyName: cleanText(companyName),
        aboutCompany: cleanText(aboutCompany),
        founders: cleanText(founders),
        foundedIn: cleanText(foundedIn),
        location: cleanText(location),
        otherInvestors: cleanText(otherInvestors),
      } satisfies PortfolioCsvRecord;
    })
    .filter((record) => record.companyName);
};

const buildPopupDetails = (record?: PortfolioCsvRecord): PortfolioPopupDetails => {
  if (!record) {
    return {
      left: [],
      right: [],
    };
  }

  return {
    left: [
      record.founders
        ? { label: "Founders", value: normalizeCommaSeparated(record.founders) }
        : null,
      record.foundedIn ? { label: "Founded", value: record.foundedIn } : null,
      record.location ? { label: "Location", value: record.location } : null,
    ].filter((row): row is { label: string; value: string } => row !== null),
    right: [
      record.sector ? { label: "Sector", value: record.sector } : null,
      record.otherInvestors
        ? {
            label: "Other Investors",
            value: normalizeCommaSeparated(record.otherInvestors),
          }
        : null,
    ].filter((row): row is { label: string; value: string } => row !== null),
  };
};

const portfolioRecordMap = new Map(
  parsePortfolioCsv(portfolioDetailsCsv).map((record) => [
    normalizeCompanyName(record.companyName),
    record,
  ])
);

const portfolioItems: PortfolioItem[] = [
  {
    name: "Axirium Aerospace",
    logo: aixiriumLogo,
    brandScale: 1.48,
    modalBrandScale: 1.22,
    modalTheme: {
      header: "#131e54",
      panel: "#eef1fb",
      brandInk: "#131e54",
      textInk: "#1a2430",
    },
    fallbackSummary: "Aerospace manufacturing & engineering services",
    category: "Industry 2.0",
  },
  {
    name: "Scimplify",
    logo: scimplifyLogo,
    brandScale: 1.2,
    modalBrandScale: 1.08,
    modalTheme: {
      header: "#14b8a6",
      panel: "#e8fbf8",
      headerText: "#ffffff",
      brandInk: "#0f766e",
      textInk: "#134e4a",
    },
    fallbackSummary: "Speciality chemicals sourcing platform",
    category: "Industry 2.0",
  },
  {
    name: "Whizzo",
    logo: whizzoLogo,
    brandScale: 1.2,
    modalBrandScale: 1.08,
    modalTheme: {
      header: "#8a6f8a",
      panel: "#f3f4f6",
      brandInk: "#181a1f",
      textInk: "#1f2933",
    },
    fallbackSummary: "Technical textiles sourcing platform",
    category: "Industry 2.0",
  },
  {
    name: "Tractrix",
    logo: tractrixLogo,
    brandScale: 1.2,
    modalBrandScale: 1.22,
    modalTheme: {
      header: "#f56263",
      panel: "#fff1f1",
      headerText: "#ffffff",
      brandInk: "#c84849",
      textInk: "#6f2425",
    },
    fallbackSummary: "Optical surveillance solutions for Defence",
    category: "DeepTech",
  },
  {
    name: "MINI MINES",
    csvKey: "Minimines",
    logo: miniMinesLogo,
    brandScale: 1.16,
    modalBrandScale: 1.04,
    modalTheme: {
      header: "#71adba",
      panel: "#edf7f9",
      brandInk: "#4f8a97",
      textInk: "#2f5f69",
    },
    fallbackSummary: "EV battery recycling",
    category: "DeepTech",
  },
  {
    name: "ProsParity",
    logo: prosparityLogo,
    brandScale: 1.46,
    modalBrandScale: 1.2,
    modalTheme: {
      header: "#79cc95",
      panel: "#eefaf2",
      brandInk: "#4f9e6b",
      textInk: "#2f6843",
    },
    fallbackSummary: "EV financing solutions",
    category: "Financial Services",
  },
  {
    name: "KreditPe",
    csvKey: "KreditPe",
    logo: kreditpeLogo,
    brandScale: 1.12,
    modalBrandScale: 1.04,
    modalTheme: {
      header: "#172c25",
      panel: "#eef5f1",
      panelSurface: "linear-gradient(180deg, #172c25 0%, #063b06 100%)",
      brandInk: "#172c25",
      textInk: "#21372f",
    },
    fallbackSummary: "Secured credit cards for new to credit customers",
    category: "Financial Services",
  },
  {
    name: "Ramp",
    logo: rampLogo,
    brandScale: 1.26,
    modalBrandScale: 1.12,
    cardHoverLogoFilter: "grayscale(1) brightness(0) invert(1)",
    cardHoverPanelBackground: "rgba(255, 255, 255, 0.12)",
    modalTheme: {
      header: "#df1d24",
      panel: "#fff1f1",
      headerText: "#ffffff",
      brandInk: "#b1191d",
      textInk: "#621a1d",
    },
    fallbackSummary: "Integrated corporate card and spend management platform",
    category: "Financial Services",
  },
  {
    name: "Crest",
    brandScale: 1.24,
    modalBrandScale: 1.22,
    modalTheme: {
      header: "#173a5b",
      panel: "#eef4fb",
      brandInk: "#173a5b",
      textInk: "#173a5b",
    },
    fallbackSummary: "Fractional family office for new age wealth",
    category: "Financial Services",
  },
  {
    name: "International Battery Company",
    csvKey: "IBC",
    logo: ibcLogo,
    brandScale: 1.18,
    modalBrandScale: 1.08,
    modalTheme: {
      header: "#62e9c6",
      panel: "#e9fcf7",
      brandInk: "#2d8f79",
      textInk: "#1d4f46",
    },
    fallbackSummary: "Li-ion cell gigafactory",
    category: "DeepTech",
  },
  {
    name: "budy",
    csvKey: "Budy.ai",
    logo: budyLogo,
    brandScale: 1.08,
    modalBrandScale: 1.04,
    modalTheme: {
      header: "#ffe356",
      panel: "#fffbea",
      brandInk: "#6f5a00",
      textInk: "#4f3f00",
    },
    fallbackSummary: "AI co-pilot for Senior Living Sales teams",
    category: "AI SaaS",
  },
  {
    name: "Flywl",
    csvKey: "Flywheel",
    logo: flywlLogo,
    brandScale: 1.26,
    modalBrandScale: 1.1,
    modalTheme: {
      header: "#f8bc75",
      panel: "#fff5e8",
      brandInk: "#c68b45",
      textInk: "#875c24",
    },
    fallbackSummary: "Meta marketplace for buying cloud software",
    category: "AI SaaS",
  },
  {
    name: "gushwork",
    csvKey: "Gushworks",
    logo: gushworkLogo,
    brandScale: 1.24,
    modalBrandScale: 1.08,
    modalTheme: {
      header: "#62a5fc",
      panel: "#edf4ff",
      brandInk: "#2f6fbe",
      textInk: "#1f4f8e",
    },
    fallbackSummary: "AI growth agents for digital SMBs",
    category: "AI SaaS",
  },
  {
    name: "Telora",
    logo: teloraLogo,
    brandScale: 1.18,
    modalBrandScale: 1.14,
    modalTheme: {
      header: "#204363",
      panel: "#204363",
      brandInk: "#204363",
      textInk: "#1f3650",
    },
    fallbackSummary: "-1 to 0 Accelerator for young startup founders",
    category: "Accelerator",
  },
  {
    name: "Furnishka",
    logo: furnishkaLogo,
    brandScale: 1.14,
    modalBrandScale: 1.04,
    modalTheme: {
      header: "#f05b26",
      panel: "#fff2eb",
      brandInk: "#d94817",
      textInk: "#78350f",
    },
    fallbackSummary: "Value retail chain for furniture",
    category: "Consumer Economy",
  },
  {
    name: "First Coffee",
    logo: firstCoffeeLogo,
    brandScale: 1.18,
    modalBrandScale: 1.06,
    modalTheme: {
      header: "#6780e3",
      panel: "#eef2ff",
      brandInk: "#4159b8",
      textInk: "#2c418e",
    },
    fallbackSummary: "Specialty coffee retail chain targeting young urban consumers",
    category: "Consumer Economy",
  },
  {
    name: "Defendermate",
    logo: defendermateLogo,
    brandScale: 1.18,
    modalBrandScale: 1.08,
    modalTheme: {
      header: "#d392e1",
      panel: "#fcf1ff",
      brandInk: "#9c5eaa",
      textInk: "#6b3f75",
    },
    fallbackSummary: "AI powered security teammates",
    category: "AI SaaS",
  },
  {
    name: "Elevn",
    logo: elevnLogo,
    brandScale: 1.22,
    modalBrandScale: 1.08,
    modalTheme: {
      header: "#805bd7",
      panel: "#f4efff",
      brandInk: "#6240b5",
      textInk: "#4d3c75",
    },
    fallbackSummary: "Women first dating & experiences app",
    category: "Consumer Economy",
  },
  {
    name: "Reinforce Labs",
    logo: reinforceLabsLogo,
    brandScale: 1.34,
    modalBrandScale: 1.16,
    modalTheme: {
      header: "#716a96",
      panel: "#f1eff8",
      brandInk: "#544e74",
      textInk: "#3f3a57",
    },
    fallbackSummary: "AI enabled product vulnerability testing",
    category: "AI SaaS",
  },
  {
    name: "Workspot.",
    csvKey: "Workspot",
    logo: workspotLogo,
    brandScale: 1.36,
    modalBrandScale: 1.16,
    cardHoverLogoFilter: "grayscale(1) brightness(0) invert(1)",
    cardHoverPanelBackground: "rgba(255, 255, 255, 0.12)",
    modalTheme: {
      header: "#6e95c5",
      panel: "#eef4fb",
      brandInk: "#365c8c",
      textInk: "#21415f",
    },
    fallbackSummary: "Enterprise-class SaaS cloud desktop solutions",
    category: "AI SaaS",
  },
  {
    name: "SiriusAI",
    logo: siriusAiLogo,
    brandScale: 1.3,
    modalBrandScale: 1.16,
    cardHoverInk: "#ffffff",
    cardHoverLogoFilter: "grayscale(1) brightness(0) invert(1)",
    cardHoverPanelBackground: "rgba(255, 255, 255, 0.12)",
    modalTheme: {
      header: "#f27b25",
      panel: "#f8f3ee",
      headerText: "#ffffff",
      brandInk: "#686a6d",
      textInk: "#3f454b",
    },
    fallbackSummary:
      "AI-first consulting and solutions company focused on financial services",
    category: "AI SaaS",
  },
  {
    name: "Hotdata",
    csvKey: "Hotdata AI",
    logo: hotdataLogo,
    brandScale: 1.26,
    modalBrandScale: 1.14,
    preserveColor: true,
    cardBrandBackground: "#cfcfcf",
    cardHoverInk: "#ffffff",
    cardHoverLogoFilter: "none",
    cardHoverPanelBackground: "rgba(255, 255, 255, 0.12)",
    modalTheme: {
      header: "#5f7587",
      panel: "#6f8799",
      brandInk: "#ffffff",
      textInk: "#1e3a50",
    },
    fallbackSummary: "Real time Query Engine for AI Agents",
    category: "AI SaaS",
  },
];

const categoryOrder: Array<PortfolioItem["category"]> = [
  "AI SaaS",
  "Financial Services",
  "Industry 2.0",
  "Consumer Economy",
  "DeepTech",
  "Accelerator",
];

const resolvedPortfolioItems: ResolvedPortfolioItem[] = portfolioItems.map((item) => {
  const record = portfolioRecordMap.get(
    normalizeCompanyName(item.csvKey ?? item.name)
  );

  return {
    ...item,
    summary: record?.aboutCompany || item.fallbackSummary,
    popupDetails: buildPopupDetails(record),
  };
});

const renderDetailValue = (label: string, value: string) => {
  if (label === "Founders" || label === "Other Investors") {
    return <div className="modal-value">{normalizeCommaSeparated(value)}</div>;
  }

  return <div className="modal-value">{value}</div>;
};

const renderDetailColumn = (rows: Array<{ label: string; value: string }>) =>
  rows.map((row) => (
    <div className="modal-row" key={`${row.label}-${row.value}`}>
      <div className="modal-label">{row.label}</div>
      {renderDetailValue(row.label, row.value)}
    </div>
  ));

const renderBrand = (item: PortfolioItem, className: string) => {
  const colorClass = item.preserveColor ? ` ${className}--color` : "";
  const panelClass =
    className === "portfolio-card-brand" && item.cardBrandBackground
      ? ` ${className}--panel`
      : "";
  const brandScale =
    className === "portfolio-modal-brand"
      ? item.modalBrandScale ?? item.brandScale ?? 1
      : item.brandScale ?? 1;
  const brandStyle = {
    "--portfolio-brand-scale": brandScale,
    ...(className === "portfolio-card-brand" && item.cardBrandBackground
      ? { "--portfolio-card-brand-panel-bg": item.cardBrandBackground }
      : {}),
  } as CSSProperties;

  if (item.icon) {
    const lines = item.brandLines ?? [item.name];
    const variantClass =
      item.brandVariant && item.brandVariant !== "default"
        ? ` ${className}--${item.brandVariant}`
        : "";

    return (
      <div
        className={`${className} ${className}--combo${variantClass}${colorClass}${panelClass}`}
        style={brandStyle}
      >
        <img
          className={`${className}-icon`}
          src={item.icon}
          alt=""
          aria-hidden="true"
          decoding="async"
        />
        <div className={`${className}-lines`}>
          {lines.map((line) => (
            <span className={`${className}-line`} key={`${item.name}-${line}`}>
              {line}
            </span>
          ))}
        </div>
      </div>
    );
  }

  if (item.logo) {
    return (
      <div
        className={`${className} ${className}--image${colorClass}${panelClass}`}
        style={brandStyle}
      >
        <img src={item.logo} alt={`${item.name} logo`} decoding="async" />
      </div>
    );
  }

  return (
    <div className={`${className} ${className}--text`} style={brandStyle}>
      {item.name}
    </div>
  );
};

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState<"All" | PortfolioItem["category"]>(
    "All"
  );
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const categories = [
    { label: "All" as const, count: resolvedPortfolioItems.length },
    ...categoryOrder.map((label) => ({
      label,
      count: resolvedPortfolioItems.filter((item) => item.category === label).length,
    })),
  ];
  const filteredItems =
    activeCategory === "All"
      ? resolvedPortfolioItems
      : resolvedPortfolioItems.filter((item) => item.category === activeCategory);
  const total = filteredItems.length;
  const activeItem = activeIndex !== null ? filteredItems[activeIndex] : null;
  const modalStyle = activeItem
    ? ({
        "--portfolio-modal-header-bg":
          activeItem.modalTheme?.header ?? "#173a5b",
        "--portfolio-modal-panel-bg":
          activeItem.modalTheme?.panel ?? "#edf4fb",
        "--portfolio-modal-panel-surface":
          activeItem.modalTheme?.panelSurface ??
          "linear-gradient(180deg, color-mix(in srgb, var(--portfolio-modal-panel-bg, #edf4fb) 94%, white 6%) 0%, color-mix(in srgb, var(--portfolio-modal-panel-bg, #edf4fb) 97%, white 3%) 100%)",
        "--portfolio-modal-header-text":
          activeItem.modalTheme?.headerText ?? "#ffffff",
        "--portfolio-modal-brand-ink":
          activeItem.modalTheme?.brandInk ?? "#173a5b",
        "--portfolio-modal-text-ink":
          activeItem.modalTheme?.textInk ?? "#173a5b",
      } as CSSProperties)
    : undefined;

  const handleCategoryChange = (category: "All" | PortfolioItem["category"]) => {
    setActiveCategory(category);
    setActiveIndex(null);
  };

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
          <button
            type="button"
            onClick={() => handleCategoryChange(category.label)}
            className={`portfolio-pill ${activeCategory === category.label ? "active" : ""}`}
            key={category.label}
          >
            {category.label} <span className="pill-count">({category.count})</span>
          </button>
        ))}
      </section>

      <section className="portfolio-grid">
        {filteredItems.map((item, index) => {
          const hoverBackground = item.modalTheme?.header ?? "#173a5b";
          const hoverPresentation = getCardHoverPresentation(hoverBackground);

          return (
            <button
              className="portfolio-card"
              key={item.name}
              type="button"
              onClick={() => setActiveIndex(index)}
              style={
                {
                  "--portfolio-card-hover-bg": hoverBackground,
                  "--portfolio-card-hover-ink":
                    item.cardHoverInk ?? hoverPresentation.ink,
                  "--portfolio-card-hover-logo-filter":
                    item.cardHoverLogoFilter ?? hoverPresentation.logoFilter,
                  "--portfolio-card-hover-panel-bg":
                    item.cardHoverPanelBackground ?? hoverPresentation.panelBackground,
                } as CSSProperties
              }
            >
              <div className="portfolio-card-content">
                {renderBrand(item, "portfolio-card-brand")}
              </div>
            </button>
          );
        })}
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
              style={modalStyle}
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
                <div id="portfolio-modal-title" className="portfolio-modal-header-brand-wrap">
                  {renderBrand(activeItem, "portfolio-modal-header-brand")}
                </div>
              </div>
              <div className="portfolio-modal-body">
                <div className="portfolio-modal-left">
                  <div className="portfolio-modal-brand-wrap portfolio-modal-brand-wrap--ghost">
                    {renderBrand(activeItem, "portfolio-modal-ghost-brand")}
                  </div>
                </div>
                <div className="portfolio-modal-right">
                  <h3>{activeItem.summary}</h3>
                  <div className="portfolio-modal-columns">
                    <div className="portfolio-modal-col">
                      {renderDetailColumn(activeItem.popupDetails.left)}
                    </div>
                    <div className="portfolio-modal-col">
                      {renderDetailColumn(activeItem.popupDetails.right)}
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
