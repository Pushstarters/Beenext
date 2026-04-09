import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Landing from "./pages/Landing";
import Ethos from "./pages/Ethos";
import History from "./pages/History";
import Team from "./pages/Team";
import Community from "./pages/Community";
import Portfolio from "./pages/Portfolio";
import FundOfFunds from "./pages/FundOfFunds";
import Contact from "./pages/Contact";

const App = () => {
  return (
    <div className="app-shell">
      <NavBar />
      <main className="page-container">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/ethos" element={<Ethos />} />
          <Route path="/history" element={<History />} />
          <Route path="/team" element={<Team />} />
          <Route path="/community" element={<Community />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/fund-of-funds" element={<FundOfFunds />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
