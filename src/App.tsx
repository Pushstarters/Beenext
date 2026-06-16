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
import Disclosure from "./pages/Disclosure";
import Grievance from "./pages/Grievance";
import SeedPlatform from "./pages/SeedPlatform";
import FounderFirst from "./pages/FounderFirst";
import TransPacific from "./pages/TransPacific";

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
          <Route path="/disclosure" element={<Disclosure />} />
          <Route path="/fund-of-funds" element={<FundOfFunds />} />
          <Route path="/grievance" element={<Grievance />} />
          <Route path="/seed-platform" element={<SeedPlatform />} />
          <Route path="/founder-first" element={<FounderFirst />} />
          <Route path="/trans-pacific" element={<TransPacific />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
