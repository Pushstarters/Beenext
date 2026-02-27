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
    company: "Company Name1",
    amount: "25Mn",
    description:
      "An Online marketplace designed to streamline B2B transactions in the speciality Chemical Sector. An Online marketplace designed to streamline B2B transactions in the speciality Chemical Sector.",
  },
  {
    year: "2016",
    company: "Company Name1",
    amount: "25Mn",
    description:
      "An Online marketplace designed to streamline B2B transactions in the speciality Chemical Sector. An Online marketplace designed to streamline B2B transactions in the speciality Chemical Sector.",
  },
  {
    year: "2016",
    company: "Company Name1",
    amount: "25Mn",
    description:
      "An Online marketplace designed to streamline B2B transactions in the speciality Chemical Sector. An Online marketplace designed to streamline B2B transactions in the speciality Chemical Sector.",
  },
  {
    year: "2016",
    company: "Company Name1",
    amount: "25Mn",
    description:
      "An Online marketplace designed to streamline B2B transactions in the speciality Chemical Sector. An Online marketplace designed to streamline B2B transactions in the speciality Chemical Sector.",
  },
  {
    year: "2017",
    company: "Company Name1",
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
              {filter} <span className="chev">▾</span>
            </button>
          ))}
        </div>

        <div className="history-rows">
          {historyRows.map((row) => (
            <div
              className={`history-row ${row.muted ? "muted" : ""}`}
              key={`${row.year}-${row.company}`}
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
