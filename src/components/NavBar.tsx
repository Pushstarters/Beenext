import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

const linkClass = ({ isActive }: { isActive: boolean }) =>
  isActive ? "nav-link active" : "nav-link";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className={`navbar ${isMenuOpen ? "nav-open" : ""}`}>
      <div className="nav-top">
        <div className="brand">BeeGlobal</div>
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
        <NavLink className={linkClass} to="/" onClick={closeMenu}>
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
