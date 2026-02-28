import { type KeyboardEvent, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const UNDERLINE_CYCLE_MS = 2500;

const Landing = () => {
  const [isUnderlineCycling, setIsUnderlineCycling] = useState(false);
  const underlineTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (underlineTimerRef.current !== null) {
        window.clearTimeout(underlineTimerRef.current);
      }
    };
  }, []);

  const triggerUnderlineCycle = () => {
    if (isUnderlineCycling) {
      return;
    }

    setIsUnderlineCycling(true);
    underlineTimerRef.current = window.setTimeout(() => {
      setIsUnderlineCycling(false);
      underlineTimerRef.current = null;
    }, UNDERLINE_CYCLE_MS);
  };

  const handleUnderlineKeyDown = (event: KeyboardEvent<HTMLSpanElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      triggerUnderlineCycle();
    }
  };

  return (
    <div className="page-wrap">
      <section className="hero">
        <div className="hero-inner">
          <h1 className="hero-title">
            Backing Founders Who
            <br />
            Reshape Markets
          </h1>
          <p className="hero-subtitle">
            Building India&apos;s most loved{" "}
            <span
              className={`underline ${isUnderlineCycling ? "underline--cycling" : ""}`}
              role="button"
              tabIndex={0}
              onClick={triggerUnderlineCycle}
              onKeyDown={handleUnderlineKeyDown}
              aria-label="Animate underline"
            >
              <span className="underline-text">institutional seed platform.</span>
              <svg
                className="underline-mark"
                width="262"
                height="12"
                viewBox="0 0 262 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M2 10.0834C10.8671 10.2715 25.7177 10.2772 33.5933 8.66446C42.2816 6.88532 46.9965 7.80396 56.385 5.91202C68.0634 3.55863 83.8554 2.67519 88.8815 2.20219C92.3665 1.87424 95.8225 2.29337 101.863 2.67233C113.904 3.42772 123.74 3.62116 131.952 4.28505C148.204 5.59897 161.157 5.33075 165.332 5.90061C170.442 6.5982 181.428 6.66422 189.654 7.32528C192.927 7.58835 200.444 8.37383 209.935 8.46786C214.921 8.51725 223.791 8.94369 235.565 9.03772C243.989 9.105 250.826 9.13744 254.815 8.75563C255.772 8.56758 256.524 8.19147 257.288 7.99771C258.052 7.80396 258.804 7.80396 259.579 7.80396"
                  stroke="#B8444F"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </p>
          <Link to="/portfolio" className="cta-button">
            OUR PORTFOLIO <span>›</span>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Landing;
