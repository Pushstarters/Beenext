import { useState } from "react";

type TeamMember = {
  name: string;
  role: string;
  image: string;
  bio: string[];
  linkedin: string;
};

const teamMembers: TeamMember[] = [
  {
    name: "Alex Mercer",
    role: "Partner",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
    bio: [
      "Alex is the Managing Partner at BeeGlobal Ventures and started the firm in 2012.",
      "His active portfolio includes clean AI, applied climate, and digital infrastructure.",
      "Alex received his B.S. in Electrical Engineering and Computer Science from MIT.",
    ],
    linkedin: "https://www.linkedin.com",
  },
  {
    name: "Riya Khanna",
    role: "Principal",
    image:
      "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=600&q=80",
    bio: [
      "Riya leads founder partnerships and early talent networks across the firm.",
      "Her portfolio spans marketplace and fintech infrastructure platforms.",
      "She previously led product at a high-growth SaaS company.",
    ],
    linkedin: "https://www.linkedin.com",
  },
  {
    name: "Omar Basu",
    role: "Investor",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80",
    bio: [
      "Omar focuses on B2B commerce, logistics, and applied AI platforms.",
      "He is passionate about operational scaling and zero-to-one execution.",
      "Omar holds degrees in Industrial Engineering and Finance.",
    ],
    linkedin: "https://www.linkedin.com",
  },
  {
    name: "Nina Rao",
    role: "Platform",
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80",
    bio: [
      "Nina leads community, founder programs, and ecosystem partnerships.",
      "She previously built operator networks across Southeast Asia.",
      "Nina studied Organizational Psychology and Design.",
    ],
    linkedin: "https://www.linkedin.com",
  },
  {
    name: "Aarav Mehta",
    role: "Investor",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80",
    bio: [
      "Aarav supports diligence and works closely with portfolio leadership teams.",
      "He specializes in go-to-market strategy and systems thinking.",
      "Aarav is a former founder and operator.",
    ],
    linkedin: "https://www.linkedin.com",
  },
  {
    name: "Isha Patel",
    role: "Operations",
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80",
    bio: [
      "Isha runs finance, talent, and investor relations across the firm.",
      "She leads BeeGlobal's founder care and portfolio services teams.",
      "Isha holds an MBA in Strategy and Operations.",
    ],
    linkedin: "https://www.linkedin.com",
  },
  {
    name: "David Lin",
    role: "Partner",
    image:
      "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=600&q=80",
    bio: [
      "David backs technical founders building category-defining platforms.",
      "He previously founded a cybersecurity company acquired in 2021.",
      "David holds a dual degree in Computer Science and Economics.",
    ],
    linkedin: "https://www.linkedin.com",
  },
  {
    name: "Ethan Wright",
    role: "Principal",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
    bio: [
      "Ethan leads seed investments across SaaS, fintech, and infrastructure.",
      "He is a former growth lead at a global payments company.",
      "Ethan holds a B.S. in Computer Engineering.",
    ],
    linkedin: "https://www.linkedin.com",
  },
];

const Team = () => {
  const [activeMember, setActiveMember] = useState<TeamMember | null>(null);

  return (
    <div className="team-page">
      <section className="team-hero">
        <h1 className="team-title">The Core Team</h1>
        <p className="team-subtitle">
          Our team brings together deep sector expertise, operational insight,
          and an unwavering commitment to backing bold founders.
        </p>
      </section>

      <section className="team-grid">
        {teamMembers.map((member) => (
          <button
            className="team-card"
            key={`${member.name}-${member.role}`}
            type="button"
            onClick={() => setActiveMember(member)}
          >
            <div className="team-photo">
              <img src={member.image} alt={member.name} />
              <span className="team-photo-name">{member.name}</span>
            </div>
          </button>
        ))}
      </section>

      <div
        className={`team-drawer ${activeMember ? "open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-hidden={!activeMember}
      >
        <button
          className="drawer-close"
          type="button"
          onClick={() => setActiveMember(null)}
          aria-label="Close"
        >
          &times;
        </button>
        {activeMember && (
          <div className="drawer-inner">
            <h2 className="drawer-title">{activeMember.name}</h2>
            <div className="drawer-content">
              <div className="drawer-media">
                <img src={activeMember.image} alt={activeMember.name} />
              </div>
              <div className="drawer-text">
                <div className="drawer-bio">
                  {activeMember.bio.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>
                <a
                  className="drawer-linkedin"
                  href={activeMember.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${activeMember.name} LinkedIn`}
                >
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 40 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4.80765 0C2.15087 0 0.00042983 2.15431 0 4.80507C0 7.45841 2.15044 9.61229 4.80808 9.61229C7.45841 9.61229 9.61186 7.45841 9.61186 4.80507C9.61186 2.15388 7.45798 0 4.80765 0Z"
                      fill="white"
                    />
                    <path
                      d="M8.95127 13.2585H0.661133V39.9312H8.95127V13.2585Z"
                      fill="white"
                    />
                    <path
                      d="M30.0563 12.5953C26.0236 12.5953 23.3195 14.8064 22.2127 16.9031H22.1018V13.2586H14.1508H14.1504V39.9308H22.4332V26.7359C22.4332 23.2573 23.0956 19.8878 27.4085 19.8878C31.6595 19.8878 31.7163 23.8663 31.7163 26.959V39.9304H40.0004V25.3007C40.0004 18.1195 38.4508 12.5953 30.0563 12.5953Z"
                      fill="white"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Team;
