import { useState } from "react";
import aarushiImg from "../public/team/Aarushi.webp";
import anirudhImg from "../public/team/anirudhgarg_img..webp";
import devanshiImg from "../public/team/Devanshi-Photoroom.png";
import nupurImg from "../public/team/Nupur.png";
import piyushImg from "../public/team/Piyush.png";
import sakshamImg from "../public/team/Saksham.webp";
import teruImg from "../public/team/Teru.png";
import yoshiImg from "../public/team/Yoshi-Photoroom.png";

type TeamMember = {
  name: string;
  role: string;
  image: string;
  bio: string[];
  linkedin: string;
};

const teamMembers: TeamMember[] = [
  {
    name: "Aarushi",
    role: "Team Member",
    image: aarushiImg,
    bio: [
      "Aarushi is part of the core team at BeeGlobal Ventures.",
    ],
    linkedin: "https://www.linkedin.com",
  },
  {
    name: "Anirudh Garg",
    role: "Team Member",
    image: anirudhImg,
    bio: [
      "Anirudh Garg is part of the core team at BeeGlobal Ventures.",
    ],
    linkedin: "https://www.linkedin.com",
  },
  {
    name: "Devanshi",
    role: "Team Member",
    image: devanshiImg,
    bio: [
      "Devanshi is part of the core team at BeeGlobal Ventures.",
    ],
    linkedin: "https://www.linkedin.com",
  },
  {
    name: "Nupur",
    role: "Team Member",
    image: nupurImg,
    bio: [
      "Nupur is part of the core team at BeeGlobal Ventures.",
    ],
    linkedin: "https://www.linkedin.com",
  },
  {
    name: "Piyush",
    role: "Team Member",
    image: piyushImg,
    bio: [
      "Piyush is part of the core team at BeeGlobal Ventures.",
    ],
    linkedin: "https://www.linkedin.com",
  },
  {
    name: "Saksham",
    role: "Team Member",
    image: sakshamImg,
    bio: [
      "Saksham is part of the core team at BeeGlobal Ventures.",
    ],
    linkedin: "https://www.linkedin.com",
  },
  {
    name: "Teru",
    role: "Team Member",
    image: teruImg,
    bio: [
      "Teru is part of the core team at BeeGlobal Ventures.",
    ],
    linkedin: "https://www.linkedin.com",
  },
  {
    name: "Yoshi",
    role: "Team Member",
    image: yoshiImg,
    bio: [
      "Yoshi is part of the core team at BeeGlobal Ventures.",
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
