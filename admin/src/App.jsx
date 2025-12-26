import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import InvestorRelations from './pages/InvestorRelations';
import OfficeManager from './pages/OfficeManager';
import ContactManager from './pages/ContactManager';
import PartnerManager from './pages/PartnerManager';
import GalleryManager from './pages/GalleryManager';
import NewsManager from './pages/NewsManager';
import EventManager from './pages/EventManager';
import CareerManager from './pages/CareerManager';
import ApplicantManager from './pages/ApplicantManager';



import Dashboard from './pages/Dashboard';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <nav style={{ padding: '1rem', borderBottom: '1px solid #ccc', marginBottom: '1rem', display: 'flex', gap: '1rem' }}>
          <Link to="/">Dashboard</Link>
          <Link to="/investor-relations">Investor Relations</Link>
          <Link to="/offices">Offices</Link>
          <Link to="/contacts">Inquiries</Link>
          <Link to="/partners">Partners</Link>
          <Link to="/gallery">Gallery</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/investor-relations" element={<InvestorRelations />} />
          <Route path="/offices" element={<OfficeManager />} />
          <Route path="/contacts" element={<ContactManager />} />
          <Route path="/partners" element={<PartnerManager />} />
          <Route path="/gallery" element={<GalleryManager />} />
          <Route path="/news" element={<NewsManager />} />
          <Route path="/events" element={<EventManager />} />
          <Route path="/careers" element={<CareerManager />} />
          <Route path="/applicants" element={<ApplicantManager />} />



        </Routes>
      </div>
    </Router>
  );
}

export default App;
