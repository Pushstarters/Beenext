import { useEffect, useRef, useState } from "react";
import buildingSvg from "../public/ethos/building.svg";
import ellipseSvg from "../public/ethos/ellipse.svg";
import globeDefaultSvgUrl from "../public/ethos/globe-inline-default.svg";
import globeHighlightSvgUrl from "../public/ethos/globe-inline-highlight.svg";
import timelineDotsSvg from "../public/ethos/timeline-dots.svg";

type ActiveSection = null | 1 | 2 | 3;

const PILLARS = [
  { n: 1, label: "Institutional Seed Platform" },
  { n: 2, label: "Founder-First, Always" },
  { n: 3, label: "The Trans-Pacific Bridge" },
] as const;

// ─── Section 1 ───────────────────────────────────────────────────────────────

const MILESTONES = [
  {
    title: "Day 1: Ideation",
    desc: "The first 100 days. We sit in the trenches to refine the core thesis.",
    rightLabel: "Ideation",
    labelTop: "80%",
  },
  {
    title: "Product-Market Fit",
    desc: "Iterating until the signal is undeniable. Connecting with first jobs.",
    rightLabel: "Market Fit",
    labelTop: "56%",
  },
  {
    title: "Scale & Expansion",
    desc: "Building the engine. Hiring key executives. Entering new markets.",
    rightLabel: "Scale & Expansion",
    labelTop: "31%",
  },
  {
    title: "Liquidity Event",
    desc: "The bell rings. But the partnership remains.",
    rightLabel: "Liquidity Event",
    labelTop: "7%",
  },
] as const;

const Section1 = () => {
  // -1 = not started yet, 0-3 = active step
  const [step, setStep] = useState(-1);
  const [fading, setFading] = useState(false);
  const initTimerRef = useRef<number | null>(null);
  const stepTimerRef = useRef<number | null>(null);
  const fadeTimerRef = useRef<number | null>(null);

  // Kick off 2000ms after mount
  useEffect(() => {
    initTimerRef.current = window.setTimeout(() => setStep(0), 2000);
    return () => {
      if (initTimerRef.current !== null) window.clearTimeout(initTimerRef.current);
    };
  }, []);

  // Advance one step every 2s; after step 3 fade out and reset
  useEffect(() => {
    if (step < 0) return;
    // 1.5s between each step; 4.5s pause only after the final step
    const delay = step < 3 ? 1500 : 4500;
    stepTimerRef.current = window.setTimeout(() => {
      if (step < 3) {
        setStep((s) => s + 1);
      } else {
        setFading(true);
        fadeTimerRef.current = window.setTimeout(() => {
          setStep(0);
          setFading(false);
          fadeTimerRef.current = null;
        }, 500);
      }
      stepTimerRef.current = null;
    }, delay);
    return () => {
      if (stepTimerRef.current !== null) {
        window.clearTimeout(stepTimerRef.current);
        stepTimerRef.current = null;
      }
      if (fadeTimerRef.current !== null) {
        window.clearTimeout(fadeTimerRef.current);
        fadeTimerRef.current = null;
      }
    };
  }, [step]);

  // clip-path: reveal building from bottom upward
  // step -1 or fading → fully hidden; step 0 → 25%; step 3 → 100%
  const clipTop = step < 0 || fading ? 100 : Math.max(0, 75 - step * 25);
  const isWaitingToStart = step < 0;

  return (
    <div className="ethos-s1">
      <div className="ethos-s1-left">
        <h2 className="ethos-section-heading">The Institutional Seed Platform</h2>
        <p className="ethos-section-sub">
          A visual and narrative representation of long-term
          partnership—from day 1 to IPO. We don&apos;t just invest; we build
          alongside you.
        </p>
        <div
          className={`ethos-timeline${fading ? " ethos-timeline--fading" : ""}${isWaitingToStart ? " ethos-timeline--hidden" : ""}`}
        >
          <img
            src={timelineDotsSvg}
            alt=""
            className="ethos-timeline-guide"
            aria-hidden="true"
            draggable={false}
          />
          {MILESTONES.map((m, i) => (
            <div
              key={i}
              className={`ethos-ms${i <= step ? " ethos-ms--active" : ""}`}
            >
              <div className="ethos-ms-track">
                <div className="ethos-ms-dot" />
                {i < 3 && <div className="ethos-ms-line" />}
              </div>
              <div className="ethos-ms-body">
                {i <= step && (
                  <>
                    <span className="ethos-ms-title">{m.title}</span>
                    <span className="ethos-ms-desc">{m.desc}</span>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div
        className={`ethos-s1-right${fading ? " ethos-s1-right--fading" : ""}${isWaitingToStart ? " ethos-s1-right--hidden" : ""}`}
      >
        <div className="ethos-building-wrap">
          {MILESTONES.map((m, i) => (
            <span
              key={i}
              className={`ethos-building-rlabel${i <= step && !fading ? " ethos-building-rlabel--visible" : ""}`}
              style={{ top: m.labelTop }}
            >
              {m.rightLabel}
            </span>
          ))}
          <img
            src={buildingSvg}
            alt="Growth stages building illustration"
            className="ethos-building-img"
            style={{ clipPath: `inset(${clipTop}% 0 0 0)` }}
            draggable={false}
          />
          <img
            src={ellipseSvg}
            alt=""
            className="ethos-building-ellipse"
            aria-hidden="true"
            draggable={false}
            style={{ top: `${clipTop}%` }}
          />
        </div>
      </div>
    </div>
  );
};

// ─── Section 2 ───────────────────────────────────────────────────────────────

const FOUNDER_CARDS = [
  {
    title: "The Veteran Operator",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="11" stroke="#163b58" strokeWidth="1.5" />
        <path
          d="M7 12l3.5 3.5L17 8"
          stroke="#163b58"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    text: "Founders with scar tissue. You've scaled before, and you're ready to apply deep sector expertise to solve massive problems.",
    tags: ["Deep Sector Depth", "Operational Excellence", "Execution Ready"],
  },
  {
    title: "The Visionary Builder",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="11" stroke="#163b58" strokeWidth="1.5" />
        <path
          d="M12 7v2M12 15v2M7 12h2M15 12h2M8.93 8.93l1.41 1.41M13.66 13.66l1.41 1.41M8.93 15.07l1.41-1.41M13.66 10.34l1.41-1.41"
          stroke="#163b58"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
    text: "Young founders attacking white spaces with brave thinking. You see what others miss and aren't afraid to break the rules.",
    tags: ["New Categories", "First Principles", "Brave Thinking Ready"],
  },
];

const Section2 = () => (
  <div className="ethos-s2">
    <h2 className="ethos-s2-heading">
      We back founders who know how to build &mdash; whether they&apos;ve done
      it before or are doing it now.
    </h2>
    <div className="ethos-founder-cards">
      {FOUNDER_CARDS.map((card) => (
        <div className="ethos-founder-card" key={card.title}>
          <div className="ethos-founder-card-head">
            <div className="ethos-founder-card-icon">{card.icon}</div>
            <h3 className="ethos-founder-card-title">{card.title}</h3>
          </div>
          <p className="ethos-founder-card-text">{card.text}</p>
          <div className="ethos-founder-card-tags">
            {card.tags.map((tag) => (
              <span className="ethos-tag" key={tag}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

// ─── Section 3 ───────────────────────────────────────────────────────────────

const Section3 = () => {
  const [globeMarkup, setGlobeMarkup] = useState({ base: "", highlight: "" });

  useEffect(() => {
    let cancelled = false;

    const loadGlobeMarkup = async () => {
      const [baseResponse, highlightResponse] = await Promise.all([
        fetch(globeDefaultSvgUrl),
        fetch(globeHighlightSvgUrl),
      ]);

      const [base, highlight] = await Promise.all([
        baseResponse.text(),
        highlightResponse.text(),
      ]);

      if (!cancelled) {
        setGlobeMarkup({ base, highlight });
      }
    };

    void loadGlobeMarkup();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="ethos-s3">
      <div className="ethos-globe-wrapper" aria-hidden="true">
        {globeMarkup.base ? (
          <div
            className="ethos-globe-default"
            dangerouslySetInnerHTML={{ __html: globeMarkup.base }}
          />
        ) : null}
        {globeMarkup.highlight ? (
          <div
            className="ethos-globe-highlighted"
            dangerouslySetInnerHTML={{ __html: globeMarkup.highlight }}
          />
        ) : null}
      </div>
      <div className="ethos-s3-text">
        <h2 className="ethos-section-heading ethos-section-heading--center">
          The Trans-Pacific Bridge
        </h2>
        <p className="ethos-section-sub ethos-section-sub--center">
          Deep Japanese roots powering India&apos;s next decade. Helping Indian
          founders scale into Japan, Korea, and Taiwan.
        </p>
      </div>
    </div>
  );
};

// ─── Main page ────────────────────────────────────────────────────────────────

const Ethos = () => {
  const [activeSection, setActiveSection] = useState<ActiveSection>(null);
  const [titleMoved, setTitleMoved] = useState(false);
  const [circlesVisible, setCirclesVisible] = useState(false);
  const [sectionKey, setSectionKey] = useState(0);
  // sectionEntered drives the CSS transition: false = start (off-screen), true = visible
  const [sectionEntered, setSectionEntered] = useState(false);
  const enterRafRef = useRef<number | null>(null);
  const t1Ref = useRef<number | null>(null);
  const t2Ref = useRef<number | null>(null);

  useEffect(() => {
    // One-time sequence on mount:
    // 1000ms → title drifts up
    // 1220ms → circles slide in after the title move starts reading clearly
    t1Ref.current = window.setTimeout(() => setTitleMoved(true), 1000);
    t2Ref.current = window.setTimeout(() => setCirclesVisible(true), 1220);
    return () => {
      if (t1Ref.current !== null) window.clearTimeout(t1Ref.current);
      if (t2Ref.current !== null) window.clearTimeout(t2Ref.current);
    };
  }, []);

  // Whenever sectionKey changes (new section picked), reset to hidden then animate in
  useEffect(() => {
    if (activeSection === null) {
      setSectionEntered(false);
      return;
    }
    // Reset to hidden state immediately
    setSectionEntered(false);
    if (enterRafRef.current !== null) cancelAnimationFrame(enterRafRef.current);
    // Double RAF: first frame paints the hidden state, second triggers the transition
    enterRafRef.current = requestAnimationFrame(() => {
      enterRafRef.current = requestAnimationFrame(() => {
        setSectionEntered(true);
        enterRafRef.current = null;
      });
    });
    return () => {
      if (enterRafRef.current !== null) {
        cancelAnimationFrame(enterRafRef.current);
        enterRafRef.current = null;
      }
    };
  }, [sectionKey, activeSection]);

  const handleCircleClick = (n: 1 | 2 | 3) => {
    setActiveSection(n);
    setSectionKey((k) => k + 1);
  };

  const isSection = activeSection !== null;

  return (
    <div className="ethos-page">
      {/* Hero area — contains both the heading block and the circles */}
      <div className={`ethos-hero${isSection ? " ethos-hero--section" : ""}`}>
        {/* Heading + subtitle — fades out when a section is active */}
        <div
          className={`ethos-hero-text${isSection ? " ethos-hero-text--hidden" : titleMoved ? " ethos-hero-text--moved" : ""}`}
          aria-hidden={isSection}
        >
          <h1 className="ethos-title">What We Believe</h1>
          <p className="ethos-subtitle">
            A trans-Pacific venture platform built on institutional depth,
            founder-first principles, and cross-border conviction
          </p>
        </div>

        {/* Pillar circles */}
        <nav
          className={`ethos-circles${circlesVisible ? " ethos-circles--visible" : ""}${isSection ? " ethos-circles--top" : ""}`}
          aria-label="Ethos sections"
        >
          {PILLARS.map(({ n, label }) => (
            <button
              key={n}
              className={`ethos-circle${activeSection === n ? " ethos-circle--active" : ""}`}
              onClick={() => handleCircleClick(n)}
              aria-pressed={activeSection === n}
            >
              <span className="ethos-circle-num">{n}</span>
              <span className="ethos-circle-label">{label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Section content */}
      {isSection && (
        <div className={`ethos-section${sectionEntered ? " ethos-section--entered" : ""}`}>
          {activeSection === 1 && <Section1 />}
          {activeSection === 2 && <Section2 />}
          {activeSection === 3 && <Section3 />}
        </div>
      )}
    </div>
  );
};

export default Ethos;
