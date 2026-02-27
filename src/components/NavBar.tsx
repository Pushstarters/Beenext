import { NavLink } from "react-router-dom";

const linkClass = ({ isActive }: { isActive: boolean }) =>
  isActive ? "nav-link active" : "nav-link";

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="brand">BeeGlobal</div>
      <div className="nav-links">
        <NavLink className={linkClass} to="/">
          Ethos
        </NavLink>
        <NavLink className={linkClass} to="/history">
          History
        </NavLink>
        <NavLink className={linkClass} to="/team">
          Team
        </NavLink>
        <NavLink className={linkClass} to="/community">
          Community
        </NavLink>
        <NavLink className={linkClass} to="/portfolio">
          Portfolio
        </NavLink>
        <NavLink className={linkClass} to="/community">
          Community
        </NavLink>
      </div>
    </nav>
  );
};

export default NavBar;
