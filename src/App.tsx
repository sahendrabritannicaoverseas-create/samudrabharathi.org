import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Activities from './components/Activities';
import Gallery from './components/Gallery';
import Videos from './components/Videos';
import Contact from './components/Contact';
import Admin from './components/Admin';

function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <About />
      <Activities />
      <Gallery />
      <Videos />
      <Contact />
      <Admin />
    </div>
  );
}

export default App;
