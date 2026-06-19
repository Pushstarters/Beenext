import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import beeglobalLogo from "../public/beeglobal-logo.png";

const CloseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <path d="M2 2L16 16M16 2L2 16" stroke="#132e35" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const linkClass = ({ isActive }: { isActive: boolean }) =>
  isActive ? "nav-link active" : "nav-link";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className={`navbar ${isMenuOpen ? "nav-open" : ""}`}>
      <div className="nav-top">
        <NavLink className="brand" to="/" end onClick={closeMenu}>
          <img src={beeglobalLogo} alt="BeeGlobal" className="brand-logo" />
        </NavLink>
        <button
          className={`nav-toggle ${isMenuOpen ? "open" : ""}`}
          type="button"
          aria-label="Toggle navigation menu"
          aria-controls="main-navigation"
          aria-expanded={isMenuOpen}
          onClick={toggleMenu}
        >
          <span className="nav-toggle-line" />
          <span className="nav-toggle-line" />
          <span className="nav-toggle-line" />
        </button>
      </div>
      <div className={`nav-links ${isMenuOpen ? "is-open" : ""}`} id="main-navigation">
        <button className="nav-close-btn" onClick={closeMenu} aria-label="Close navigation menu">
          <CloseIcon />
        </button>
        <NavLink className={linkClass} to="/ethos" end onClick={closeMenu}>
          Ethos
        </NavLink>
        <NavLink className={linkClass} to="/history" onClick={closeMenu}>
          History
        </NavLink>
        <NavLink className={linkClass} to="/team" onClick={closeMenu}>
          Team
        </NavLink>
        <NavLink className={linkClass} to="/community" onClick={closeMenu}>
          Community
        </NavLink>
        <NavLink className={linkClass} to="/portfolio" onClick={closeMenu}>
          Portfolio
        </NavLink>
      </div>
    </nav>
  );
};

export default NavBar;
