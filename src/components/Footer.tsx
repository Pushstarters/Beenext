import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bottom-bar">
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
