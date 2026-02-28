type HistoryRow = {
  year: string;
  company: string;
  amount: string;
  description: string;
  muted?: boolean;
};

const filters = ["Region", "Sector", "First Partnered"];

const historyRows: HistoryRow[] = [
  {
    year: "2015",
    company: "Company Name",
    amount: "25Mn",
    description:
      "An Online marketplace designed to streamline B2B transactions in the speciality Chemical Sector. An Online marketplace designed to streamline B2B transactions in the speciality Chemical Sector.",
  },
  {
    year: "2016",
    company: "Company Name",
    amount: "25Mn",
    description:
      "An Online marketplace designed to streamline B2B transactions in the speciality Chemical Sector. An Online marketplace designed to streamline B2B transactions in the speciality Chemical Sector.",
  },
  {
    year: "2016",
    company: "Company Name",
    amount: "25Mn",
    description:
      "An Online marketplace designed to streamline B2B transactions in the speciality Chemical Sector. An Online marketplace designed to streamline B2B transactions in the speciality Chemical Sector.",
  },
  {
    year: "2016",
    company: "Company Name",
    amount: "25Mn",
    description:
      "An Online marketplace designed to streamline B2B transactions in the speciality Chemical Sector. An Online marketplace designed to streamline B2B transactions in the speciality Chemical Sector.",
  },
  {
    year: "2017",
    company: "Company Name",
    amount: "25Mn",
    description:
      "An Online marketplace designed to streamline B2B transactions in the speciality Chemical Sector. An Online marketplace designed to streamline B2B transactions in the speciality Chemical Sector.",
    muted: true,
  },
];

const History = () => {
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

        <div className="history-rows">
          {historyRows.map((row, index) => (
            <div
              className={`history-row ${row.muted ? "muted" : ""}`}
              key={`${row.year}-${row.company}-${index}`}
            >
              <div className="cell year">{row.year}</div>
              <div className="cell company">{row.company}</div>
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
