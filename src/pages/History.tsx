import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
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
  url: string;
};

type HistoryRow = {
  year: string;
  company: string;
  founders: string;
  region: string;
  description: string;
  url: string;
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
      const [company, founders, description, foundedIn, location, sector, url] =
        parseCsvLine(line);

      const row: HistoryCsvRow = {
        company: sentenceCase(company),
        founders: sentenceCase(founders),
        description: sentenceCase(description),
        foundedIn: sentenceCase(foundedIn),
        location: sentenceCase(location),
        sector: sentenceCase(sector),
        url: (url ?? "").trim(),
      };

      return {
        year: row.foundedIn,
        company: row.company,
        founders: row.founders,
        region: row.location,
        description: row.description,
        url: row.url,
      };
    })
    .filter((row) => row.company && row.year);
};

const historyRows = parseHistoryCsv(historyCsv);
const foundingYearOptions = [...new Set(historyRows.map((row) => row.year))];
const regionOptions = [...new Set(historyRows.map((row) => row.region))];

const COMPANY_ACCENT_COLORS: Record<string, string> = {
  "NoBroker": "#fd3752",
  "Servify": "#410099",
  "Healthians": "#00a0a8",
  "ShipRocket": "#735ae5",
  "Cropin": "#04A5D9",
  "PropertyShare": "#112025",
  "WorkIndia": "#33418a",
  "Fyle.ai": "#1ada4d",
  "Droom": "#eb7362",
  "HackerEarth": "#384fdc",
  "DailyRounds": "#950203",
  "GetMyParking": "#23AD5E",
  "Faasos": "#252525",
  "Idfy": "#1c43b9",
  "Industrybuying.com": "#EC4519",
  "CitrusPay": "#f7941d",
  "Locus": "#543B61",
  "Tracxn": "#FF7400",
  "BharatPe": "#00AFCB",
  "Open": "#663399",
  "Smallcase": "#0051ba",
  "Mobile Premier League": "#ff3366",
  "EasyDiner": "#FF4815",
  "SafeGold": "#00bbb4",
  "mFine": "#0095b6",
  "Niramai": "#862452",
  "Revv": "#1daba2",
  "M2P Solutions": "#BD2027",
  "M1Exchange": "#035B9F",
  "Fleetx": "#203254",
  "Skuad.io": "#0092f4",
  "Appforbharat": "#f97316",
  "Loadshare": "#3987FD",
  "Animall": "#15857c",
  "Procol": "#1375e4",
  "Winuall.com": "#ff6b00",
  "Agnikul": "#446641",
  "BlueSky Analytics": "#2563eb",
  "Kenko Health": "#00b386",
  "Lucidity": "#8aec64",
  "IndiaFilings": "#0F172A",
  "Driffle": "#388AFD",
  "Fitbudd": "#FF5E19",
  "Zoplar": "#e02424",
  "Bummer": "#f3c500",
  "Scimplifi": "#2563eb",
  "Furnishka": "#a0522d",
  "Defendermate": "#A936F6",
  "Axirium Aerospace": "#003366",
  "Workspot": "#0693e3",
};

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
            className={`filter-pill filter-pill--select history-filter history-filter--year${selectedYear ? " filter-pill--active" : ""}`}
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
            className={`filter-pill filter-pill--select history-filter history-filter--location${selectedRegion ? " filter-pill--active" : ""}`}
          >
            <span>Location</span>
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

        <div className="history-rows-header">
          <div className="history-rows-header-cell">Company Name</div>
          <div className="history-rows-header-cell">Founders</div>
          <div className="history-rows-header-cell">Description</div>
          <div className="history-rows-header-cell">Founding Year</div>
          <div className="history-rows-header-cell">Location</div>
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
            <div
              className="history-row"
              key={`${row.year}-${row.company}-${index}`}
              style={
                COMPANY_ACCENT_COLORS[row.company]
                  ? ({ "--row-accent": COMPANY_ACCENT_COLORS[row.company] } as CSSProperties)
                  : undefined
              }
            >
              <div className="cell company">
                {row.url ? (
                  <a href={row.url} target="_blank" rel="noopener noreferrer">
                    {row.company}
                  </a>
                ) : (
                  row.company
                )}
              </div>
              <div className="cell founders">{row.founders}</div>
              <div className="cell desc">{row.description}</div>
              <div className="cell year">{row.year}</div>
              <div className="cell amount">{row.region}</div>
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
