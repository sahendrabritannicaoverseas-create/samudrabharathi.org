import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Activities from './components/Activities';
import ActivityPage from './components/ActivityPage';
import ScrollToTop from './components/ScrollToTop';
import Events from './components/Events';
import Gallery from './components/Gallery';
import Videos from './components/Videos';
import Contact from './components/Contact';
import Admin from './components/Admin';
import Donate from './components/Donate';
import { WeatherDashboard } from './components/WeatherDashboard';

const HomePage = () => (
  <>
    <Hero />
    <About />
    <Activities />
    <Events />
    <Gallery />
    <Videos />
    <WeatherDashboard />
    <Contact />
  </>
);

const ActivitiesPage = () => (
  <div className="pt-20">
    <Activities />
    <Contact />
  </div>
);

const EventsPage = () => (
  <div className="pt-20">
    <Events />
    <Contact />
  </div>
);

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/activities" element={<ActivitiesPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/activity/:id" element={<ActivityPage />} />
          <Route path="/event/:id" element={<ActivityPage />} />
          <Route path="/weather" element={<div className="pt-20 bg-slate-950 min-h-screen"><WeatherDashboard /><Contact /></div>} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/donate" element={<><Donate /><Contact /></>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
