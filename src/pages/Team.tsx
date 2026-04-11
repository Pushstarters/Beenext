import { Fragment, useState } from "react";

import aarushiImg from "../public/team/Aarushi-new.png";
import anirudhImg from "../public/team/anirudh-new.png";
import devanshiImg from "../public/team/devanshi-new.png";
import nupurImg from "../public/team/nupur-new.png";
import piyushImg from "../public/team/piyush-new-bg.png";
import sakshamImg from "../public/team/saksham-new.png";
import teruImg from "../public/team/teru-new.png";
import yoshiImg from "../public/team/yoshi-new.png";

type TeamMember = {
  name: string;
  role: string;
  subtitle?: string;
  image: string;
  bullets: string[];
  linkedin: string;
};

const teamMembers: TeamMember[] = [
  {
    name: "Anirudh Garg",
    role: "General Partner",
    subtitle: "India Lead, BEENEXT",
    image: anirudhImg,
    bullets: [
      "Ex-strategy team at **Flipkart**, **Deep-Tech investor** at **Speciale Invest**",
      "**GP advisor** / scout for **Makena Capital** (**USD 20B** fund of fund on Sandhill road)",
    ],
    linkedin: "https://www.linkedin.com/in/anirudh-garg98/",
  },
  {
    name: "Saksham Pant",
    role: "Principal",
    subtitle: "India CoLead, BEENEXT",
    image: sakshamImg,
    bullets: [
      "Ex-investment team at **Athera Venture Partners**",
      "Previously worked at **Uber (P&L)** and **Nvidia**",
    ],
    linkedin: "https://www.linkedin.com/in/saksham-pant/",
  },
  {
    name: "Teruhide Sato",
    role: "Senior Advisor",
    subtitle: "Founder, BEENEXT",
    image: teruImg,
    bullets: [
      "**3x entrepreneur** (BEENOS **listed** on **Tokyo Stock Exchange**)",
      "Executive member of **Silicon Valley Japan Platform**, trustee of International House of Japan",
    ],
    linkedin: "https://www.linkedin.com/in/teruhidesato/",
  },
  {
    name: "Yoshi Okubo",
    role: "Partner",
    subtitle: "Asia Community Lead",
    image: yoshiImg,
    bullets: [
      "**Founding member of East Ventures**",
      "SEA's largest growth fund (USD 900M)",
      "10 yrs. of cross-border VC experience at Japan's largest CVC; SEA value add for 20+ Japanese companies",
    ],
    linkedin: "https://www.linkedin.com/in/yoshi-okubo-65042929/",
  },
  {
    name: "Aarushi Sharma",
    role: "VP, Investments",
    image: aarushiImg,
    bullets: [
      "Sector specialist: **Financial Services, SaaS and AI**",
      "Ex-**investment** team at **Bertelsmann India Investments** (USD 500M fund)",
    ],
    linkedin: "https://www.linkedin.com/in/aarushisharmasrcc/",
  },
  {
    name: "Devanshi Kesaria",
    role: "Head of Platform",
    image: devanshiImg,
    bullets: [
      "Working across **India capital strategy**, **portfolio value creation** & investments.",
      "Previously **managed** private investment portfolios for **family offices** at **Avendus**",
    ],
    linkedin: "https://www.linkedin.com/in/devanshi-kesaria-1b9a7128/",
  },
  {
    name: "Nupur Kedia",
    role: "Head of Finance",
    image: nupurImg,
    bullets: [
      "14 years of experience in corporate taxation at Ernst & Young with specialisation in venture capital funds and start-ups",
      "CA (2011-2014)",
    ],
    linkedin: "https://www.linkedin.com/in/nupur-kedia-796977110/",
  },
  {
    name: "Piyush Agarwal",
    role: "Investments",
    image: piyushImg,
    bullets: [
      "Sector Specialist: Consumer, Health, Consumer Tech,",
      "Ex-OneCard, ShareChat and Flipkart",
    ],
    linkedin: "https://www.linkedin.com/in/piyush-agarwal-a8b338149/",
  },
];

const Team = () => {
  const [activeMember, setActiveMember] = useState<TeamMember | null>(null);

  const renderBullet = (line: string) => {
    const parts = line.split(/(\*\*.*?\*\*)/g).filter(Boolean);

    return parts.map((part, index) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={`${part}-${index}`}>{part.slice(2, -2)}</strong>;
      }

      return <Fragment key={`${part}-${index}`}>{part}</Fragment>;
    });
  };

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
            <div className="drawer-header">
              <div>
                <h2 className="drawer-title">{activeMember.name}</h2>
                <p className="drawer-meta-line">
                  <span className="drawer-role">
                    {activeMember.role}
                    {activeMember.subtitle ? "," : ""}
                  </span>
                  {activeMember.subtitle && (
                    <span className="drawer-subtitle">{activeMember.subtitle}</span>
                  )}
                </p>
              </div>
            </div>
            <div className="drawer-content">
              <div className="drawer-media">
                <img src={activeMember.image} alt={activeMember.name} />
              </div>
              <div className="drawer-text">
                <ul className="drawer-bio">
                  {activeMember.bullets.map((line) => (
                    <li key={line}>{renderBullet(line)}</li>
                  ))}
                </ul>
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
                      fill="currentColor"
                    />
                    <path
                      d="M8.95127 13.2585H0.661133V39.9312H8.95127V13.2585Z"
                      fill="currentColor"
                    />
                    <path
                      d="M30.0563 12.5953C26.0236 12.5953 23.3195 14.8064 22.2127 16.9031H22.1018V13.2586H14.1508H14.1504V39.9308H22.4332V26.7359C22.4332 23.2573 23.0956 19.8878 27.4085 19.8878C31.6595 19.8878 31.7163 23.8663 31.7163 26.959V39.9304H40.0004V25.3007C40.0004 18.1195 38.4508 12.5953 30.0563 12.5953Z"
                      fill="currentColor"
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
