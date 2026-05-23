const OFFICERS = [
  {
    title: "Complaint Redressal Officer (CRO)",
    name: "Nupur Kedia",
    email: "nupur@beeglobal.com",
    mobile: "+91 9844166835",
  },
  {
    title: "Complaint Redressal Appellate Officer (CRAO)",
    name: "Anirudh Garg",
    email: "anirudh@beeglobal.com",
    mobile: "+91 9999699047",
  },
];

const Grievance = () => (
  <div className="grievance-page">
    <div className="grievance-hero">
      <h1 className="grievance-title">
        Complaint Handling and Grievance Redressal Policy
      </h1>
      <a className="grievance-download" href="/complaint-handling-policy.pdf" download="Complaint Handling Policy.pdf">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
          <path d="M9 1v10M9 11l-3-3M9 11l3-3" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M1 13v2a2 2 0 002 2h12a2 2 0 002-2v-2" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
        Download Full Policy (PDF)
      </a>
    </div>

    <div className="grievance-cards">
      {OFFICERS.map((o) => (
        <div className="grievance-card" key={o.title}>
          <h2 className="grievance-card-title">{o.title}</h2>
          <div className="grievance-card-row">
            <svg className="grievance-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <circle cx="8" cy="5" r="3.25" stroke="#6b7280" strokeWidth="1.3"/>
              <path d="M1.5 14.5c0-3.314 2.91-6 6.5-6s6.5 2.686 6.5 6" stroke="#6b7280" strokeWidth="1.3" strokeLinecap="round"/>
            </svg>
            <div>
              <div className="grievance-label">Name</div>
              <div className="grievance-value grievance-value--bold">{o.name}</div>
            </div>
          </div>
          <div className="grievance-card-row">
            <svg className="grievance-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <rect x="1" y="3" width="14" height="10" rx="1.5" stroke="#6b7280" strokeWidth="1.3"/>
              <path d="M1.5 4l6.5 5 6.5-5" stroke="#6b7280" strokeWidth="1.3" strokeLinecap="round"/>
            </svg>
            <div>
              <div className="grievance-label">Email</div>
              <div className="grievance-value">{o.email}</div>
            </div>
          </div>
          <div className="grievance-card-row">
            <svg className="grievance-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 1.5h2.5l1 3-1.5 1a9 9 0 004.5 4.5l1-1.5 3 1V12A1.5 1.5 0 0112 13.5C6.2 13.5 2.5 9.8 2.5 4A1.5 1.5 0 014 2.5" stroke="#6b7280" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <div>
              <div className="grievance-label">Mobile</div>
              <div className="grievance-value">{o.mobile}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default Grievance;
