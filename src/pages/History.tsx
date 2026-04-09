import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type WheelEvent,
} from "react";

import historyCsv from "../data/history.csv?raw";

type HistoryCsvRow = {
  company: string;
  founders: string;
  description: string;
  foundedIn: string;
  location: string;
  sector: string;
};

type HistoryRow = {
  year: string;
  company: string;
  founders: string;
  region: string;
  description: string;
};

const WHEEL_DELTA_THRESHOLD = 45;

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

const sentenceCase = (value: string) => value.replace(/\s+/g, " ").trim();

const parseHistoryCsv = (csvText: string): HistoryRow[] => {
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
      const [company, founders, description, foundedIn, location, sector] =
        parseCsvLine(line);

      const row: HistoryCsvRow = {
        company: sentenceCase(company),
        founders: sentenceCase(founders),
        description: sentenceCase(description),
        foundedIn: sentenceCase(foundedIn),
        location: sentenceCase(location),
        sector: sentenceCase(sector),
      };

      return {
        year: row.foundedIn,
        company: row.company,
        founders: row.founders,
        region: row.location,
        description: row.description,
      };
    })
    .filter((row) => row.company && row.year);
};

const historyRows = parseHistoryCsv(historyCsv);
const foundingYearOptions = [...new Set(historyRows.map((row) => row.year))];
const regionOptions = [...new Set(historyRows.map((row) => row.region))];

const History = () => {
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const rowsRef = useRef<HTMLDivElement | null>(null);
  const wheelDeltaRef = useRef(0);
  const filteredRows = historyRows.filter((row) => {
    if (selectedYear && row.year !== selectedYear) {
      return false;
    }

    if (selectedRegion && row.region !== selectedRegion) {
      return false;
    }

    return true;
  });

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

      const maxIndex = Math.max(0, filteredRows.length - 1);
      const clampedIndex = Math.max(0, Math.min(maxIndex, nextIndex));

      rowsElement.scrollTo({
        top: clampedIndex * rowHeight,
        behavior: "smooth",
      });
    },
    [filteredRows.length, getRowHeight]
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
        scrollRowsToIndex(filteredRows.length - 1);
      }
    },
    [filteredRows.length, scrollRowsByStep, scrollRowsToIndex]
  );

  useEffect(() => {
    return () => {
      wheelDeltaRef.current = 0;
    };
  }, []);

  useEffect(() => {
    const rowsElement = rowsRef.current;
    if (!rowsElement) {
      return;
    }

    rowsElement.scrollTo({
      top: 0,
      behavior: "auto",
    });
  }, [selectedRegion, selectedYear]);

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
          <label
            className={`filter-pill filter-pill--select${selectedYear ? " filter-pill--active" : ""}`}
          >
            <span>Founding Year</span>
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
            <select
              className="filter-select"
              aria-label="Filter by founding year"
              value={selectedYear}
              onChange={(event) => setSelectedYear(event.target.value)}
            >
              <option value="">All years</option>
              {foundingYearOptions.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </label>
          <label
            className={`filter-pill filter-pill--select${selectedRegion ? " filter-pill--active" : ""}`}
          >
            <span>Region</span>
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
            <select
              className="filter-select"
              aria-label="Filter by region"
              value={selectedRegion}
              onChange={(event) => setSelectedRegion(event.target.value)}
            >
              <option value="">All regions</option>
              {regionOptions.map((region) => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </select>
          </label>
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
          {filteredRows.map((row, index) => (
            <div className="history-row" key={`${row.year}-${row.company}-${index}`}>
              <div className="cell year">{row.year}</div>
              <div className="cell company">{row.company}</div>
              <div className="cell founders">{row.founders}</div>
              <div className="cell amount">{row.region}</div>
              <div className="cell desc">{row.description}</div>
            </div>
          ))}
          {filteredRows.length === 0 && (
            <div className="history-row history-row--empty">
              <div className="cell desc">No companies match the selected filters.</div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default History;
