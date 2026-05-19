import { useCallback, useEffect, useRef, useState } from "react";

const UNDERLINE_CYCLE_MS = 2500;
const UNDERLINE_INTERVAL_MS = 5000;

const Contact = () => {
  const [isUnderlineCycling, setIsUnderlineCycling] = useState(false);
  const underlineTimerRef = useRef<number | null>(null);
  const underlineIntervalRef = useRef<number | null>(null);
  const underlineFrameRef = useRef<number | null>(null);

  const triggerUnderlineCycle = useCallback(() => {
    if (underlineTimerRef.current !== null) {
      window.clearTimeout(underlineTimerRef.current);
      underlineTimerRef.current = null;
    }
    if (underlineFrameRef.current !== null) {
      window.cancelAnimationFrame(underlineFrameRef.current);
      underlineFrameRef.current = null;
    }
    setIsUnderlineCycling(false);
    underlineFrameRef.current = window.requestAnimationFrame(() => {
      setIsUnderlineCycling(true);
      underlineTimerRef.current = window.setTimeout(() => {
        setIsUnderlineCycling(false);
        underlineTimerRef.current = null;
      }, UNDERLINE_CYCLE_MS);
      underlineFrameRef.current = null;
    });
  }, []);

  useEffect(() => {
    triggerUnderlineCycle();
    underlineIntervalRef.current = window.setInterval(
      triggerUnderlineCycle,
      UNDERLINE_INTERVAL_MS
    );
    return () => {
      if (underlineIntervalRef.current !== null) {
        window.clearInterval(underlineIntervalRef.current);
        underlineIntervalRef.current = null;
      }
      if (underlineTimerRef.current !== null) {
        window.clearTimeout(underlineTimerRef.current);
        underlineTimerRef.current = null;
      }
      if (underlineFrameRef.current !== null) {
        window.cancelAnimationFrame(underlineFrameRef.current);
        underlineFrameRef.current = null;
      }
    };
  }, [triggerUnderlineCycle]);

  return (
    <div className="contact-page">
      <section className="contact-hero">
        <div className="contact-copy">
          <h1 className="contact-title">
            Let&apos;s build something
            meaningful{" "}
            <span
              className={`contact-underline ${isUnderlineCycling ? "contact-underline--cycling" : ""}`}
            >
              <span className="contact-underline-text">together</span>
              <svg
                className="contact-underline-mark"
                width="278"
                height="14"
                viewBox="0 0 278 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M2 11.2631C12.5258 11.4863 30.1557 11.493 39.5046 9.57949C49.8183 7.46791 55.4153 8.55815 66.5623 6.31115C80.4281 3.51675 99.174 2.46772 105.142 1.90633C109.279 1.51696 113.383 2.01456 120.554 2.4647C134.856 3.36209 146.542 3.59189 156.294 4.38066C175.594 5.94121 190.976 5.62274 195.935 6.2995C202.005 7.12827 215.051 7.2067 224.818 7.99212C228.704 8.30465 237.628 9.2375 248.896 9.3492C254.815 9.40786 265.348 9.9141 279.341 10.0258C289.352 10.1057 297.478 10.1442 302.219 9.69056"
                  stroke="#B8444F"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>
          <p className="contact-subtitle">
            Got a question, idea, or opportunity in mind? We&apos;d love to hear from you.
            Reach out and our team will get back to you shortly.
          </p>
          <a className="contact-cta" href="mailto:hello@beeglobal.vc">
            <span>Email Us</span>
            <svg className="contact-cta-arrow" width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M18.7167 5.04053V14.7637H13.7081V6.41724C13.1575 6.62086 10.1371 7.80073 8.78502 11.0063C7.30619 14.5121 9.01139 17.5848 9.2513 18H9.23971e-06C-0.00429683 14.4801 1.49668 11.1552 4.12892 8.72162C6.67442 6.36865 10.1027 5.04053 13.6724 5.04053H18.7167Z" fill="white"/>
              <path d="M18.7166 0C18.7166 1.39148 18.1525 2.65193 17.2403 3.56421C16.3415 4.46357 15.1038 5.02459 13.7345 5.03997C13.7154 5.04058 13.6958 5.04058 13.6767 5.04058H3.88898V0H18.7166Z" fill="white"/>
            </svg>
          </a>
        </div>
      </section>
    </div>
  );
};

export default Contact;
