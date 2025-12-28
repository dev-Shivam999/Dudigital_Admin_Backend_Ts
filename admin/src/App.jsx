import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import InvestorRelations from "./pages/InvestorRelations";
import OfficeManager from "./pages/OfficeManager";
import ContactManager from "./pages/ContactManager";
import PartnerManager from "./pages/PartnerManager";
import GalleryManager from "./pages/GalleryManager";
import NewsManager from "./pages/NewsManager";
import EventManager from "./pages/EventManager";
import CareerManager from "./pages/CareerManager";
import ApplicantManager from "./pages/ApplicantManager";
import SalesExpertManager from "./pages/SalesExpertManager";
import VideoManager from "./pages/VideoManager";
import BlogManager from "./pages/BlogManager";
import BlogEditor from "./pages/BlogEditor";
import TeamMemberManager from "./pages/TeamMemberManager";
import Dashboard from "./pages/Dashboard";
import "./components/Layout.css";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="investor-relations" element={<InvestorRelations />} />
          <Route path="offices" element={<OfficeManager />} />
          <Route path="contacts" element={<ContactManager />} />
          <Route path="partners" element={<PartnerManager />} />
          <Route path="gallery" element={<GalleryManager />} />
          <Route path="news" element={<NewsManager />} />
          <Route path="events" element={<EventManager />} />
          <Route path="careers" element={<CareerManager />} />
          <Route path="applicants" element={<ApplicantManager />} />
          <Route path="sales-experts" element={<SalesExpertManager />} />
          <Route path="videos" element={<VideoManager />} />
          <Route path="blogs" element={<BlogManager />} />
          <Route path="blogs/new" element={<BlogEditor />} />
          <Route path="blogs/edit/:id" element={<BlogEditor />} />
          <Route path="team-members" element={<TeamMemberManager />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
