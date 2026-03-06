import { useCallback, useEffect, useRef, type KeyboardEvent, type WheelEvent } from "react";

type HistoryRow = {
  year: string;
  company: string;
  url: string;
  amount: string;
  description: string;
  muted?: boolean;
};

const filters = ["Region", "Sector", "First Partnered"];
const WHEEL_DELTA_THRESHOLD = 45;

const historyRows: HistoryRow[] = [
  {
    year: "2015",
    company: "Company Name",
    url: "#",
    amount: "25Mn",
    description:
      "An Online marketplace designed to streamline B2B transactions in the speciality Chemical Sector. An Online marketplace designed to streamline B2B transactions in the speciality Chemical Sector.",
  },
  {
    year: "2016",
    company: "Company Name",
    url: "#",
    amount: "25Mn",
    description:
      "An Online marketplace designed to streamline B2B transactions in the speciality Chemical Sector. An Online marketplace designed to streamline B2B transactions in the speciality Chemical Sector.",
  },
  {
    year: "2016",
    company: "Company Name",
    url: "#",
    amount: "25Mn",
    description:
      "An Online marketplace designed to streamline B2B transactions in the speciality Chemical Sector. An Online marketplace designed to streamline B2B transactions in the speciality Chemical Sector.",
  },
  {
    year: "2016",
    company: "Company Name",
    url: "#",
    amount: "25Mn",
    description:
      "An Online marketplace designed to streamline B2B transactions in the speciality Chemical Sector. An Online marketplace designed to streamline B2B transactions in the speciality Chemical Sector.",
  },
  {
    year: "2017",
    company: "Company Name",
    url: "#",
    amount: "25Mn",
    description:
      "An Online marketplace designed to streamline B2B transactions in the speciality Chemical Sector. An Online marketplace designed to streamline B2B transactions in the speciality Chemical Sector.",
  },
  {
    year: "2022",
    company: "Company Name",
    url: "#",
    amount: "25Mn",
    description:
      "An Online marketplace designed to streamline B2B transactions in the speciality Chemical Sector. An Online marketplace designed to streamline B2B transactions in the speciality Chemical Sector.",
  },
  {
    year: "2023",
    company: "Company Name",
    url: "#",
    amount: "25Mn",
    description:
      "An Online marketplace designed to streamline B2B transactions in the speciality Chemical Sector. An Online marketplace designed to streamline B2B transactions in the speciality Chemical Sector.",
  },
  {
    year: "2024",
    company: "Company Name",
    url: "#",
    amount: "25Mn",
    description:
      "An Online marketplace designed to streamline B2B transactions in the speciality Chemical Sector. An Online marketplace designed to streamline B2B transactions in the speciality Chemical Sector.",
  },
  {
    year: "2025",
    company: "Company Name",
    url: "#",
    amount: "25Mn",
    description:
      "An Online marketplace designed to streamline B2B transactions in the speciality Chemical Sector. An Online marketplace designed to streamline B2B transactions in the speciality Chemical Sector.",
  },
];

const History = () => {
  const rowsRef = useRef<HTMLDivElement | null>(null);
  const wheelDeltaRef = useRef(0);

  const getRowHeight = useCallback(() => {
    const rowsElement = rowsRef.current;
    if (!rowsElement) {
      return 0;
    }

    const firstRow = rowsElement.querySelector<HTMLElement>(".history-row");
    return firstRow?.offsetHeight ?? 0;
  }, []);

  const scrollRowsToIndex = useCallback(
    (nextIndex: number) => {
      const rowsElement = rowsRef.current;
      const rowHeight = getRowHeight();
      if (!rowsElement || !rowHeight) {
        return;
      }

      const maxIndex = Math.max(0, historyRows.length - 1);
      const clampedIndex = Math.max(0, Math.min(maxIndex, nextIndex));

      rowsElement.scrollTo({
        top: clampedIndex * rowHeight,
        behavior: "smooth",
      });
    },
    [getRowHeight]
  );

  const scrollRowsByStep = useCallback(
    (direction: 1 | -1) => {
      const rowsElement = rowsRef.current;
      const rowHeight = getRowHeight();
      if (!rowsElement || !rowHeight) {
        return;
      }

      const currentIndex = Math.round(rowsElement.scrollTop / rowHeight);
      scrollRowsToIndex(currentIndex + direction);
    },
    [getRowHeight, scrollRowsToIndex]
  );

  const handleRowsWheel = useCallback(
    (event: WheelEvent<HTMLDivElement>) => {
      const rowsElement = rowsRef.current;
      if (!rowsElement || rowsElement.scrollHeight <= rowsElement.clientHeight) {
        return;
      }

      event.preventDefault();
      wheelDeltaRef.current += event.deltaY;

      if (Math.abs(wheelDeltaRef.current) < WHEEL_DELTA_THRESHOLD) {
        return;
      }

      const direction: 1 | -1 = wheelDeltaRef.current > 0 ? 1 : -1;
      wheelDeltaRef.current = 0;
      scrollRowsByStep(direction);
    },
    [scrollRowsByStep]
  );

  const handleRowsKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "ArrowDown" || event.key === "PageDown") {
        event.preventDefault();
        scrollRowsByStep(1);
        return;
      }

      if (event.key === "ArrowUp" || event.key === "PageUp") {
        event.preventDefault();
        scrollRowsByStep(-1);
        return;
      }

      if (event.key === "Home") {
        event.preventDefault();
        scrollRowsToIndex(0);
        return;
      }

      if (event.key === "End") {
        event.preventDefault();
        scrollRowsToIndex(historyRows.length - 1);
      }
    },
    [scrollRowsByStep, scrollRowsToIndex]
  );

  useEffect(() => {
    return () => {
      wheelDeltaRef.current = 0;
    };
  }, []);

  return (
    <div className="history-page">
      <section className="history-hero">
        <h1 className="history-title">Fueling Founders Since Day One</h1>
        <p className="history-subtitle">
          We didn&apos;t just watch India grow over the past decade; we backed its
          most ambitious builders from Day Zero
        </p>
      </section>

      <section className="history-table">
        <div className="history-filters">
          {filters.map((filter) => (
            <button className="filter-pill" type="button" key={filter}>
              <span>{filter}</span>
              <svg
                className="chev"
                width="10"
                height="6"
                viewBox="0 0 10 6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M1 1L5 5L9 1"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          ))}
        </div>

        <div
          className="history-rows"
          ref={rowsRef}
          onWheel={handleRowsWheel}
          onKeyDown={handleRowsKeyDown}
          tabIndex={0}
          role="region"
          aria-label="Investment history timeline"
        >
          {historyRows.map((row, index) => (
            <div
              className={`history-row ${row.muted ? "muted" : ""}`}
              key={`${row.year}-${row.company}-${index}`}
            >
              <div className="cell year">{row.year}</div>
              <div className="cell company">
                <a className="history-company-link" href={row.url} aria-label={`Open ${row.company}`}>
                  {row.company}
                </a>
              </div>
              <div className="cell amount">{row.amount}</div>
              <div className="cell desc">{row.description}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default History;
