import { Link, useLocation } from "react-router-dom";

const Footer = () => {
  const { pathname } = useLocation();
  const footerThemeClass =
    pathname === "/contact"
      ? "bottom-bar--contact"
      : pathname === "/history"
        ? "bottom-bar--history"
        : "";

  return (
    <footer className={`bottom-bar ${footerThemeClass}`.trim()}>
      <div className="bottom-left">
        <div className="label">BUSINESS ENTITIES</div>
        <Link className="footer-link" to="/fund-of-funds">
          Fund of Funds
        </Link>
      </div>
      <div className="bottom-right">
        <Link className="contact-button" to="/contact">
          CONTACT US
        </Link>
        <div className="footer-copy">© 2026 BeeGlobal</div>
      </div>
    </footer>
  );
};

export default Footer;
