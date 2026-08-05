import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { lazy, Suspense, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Services from './pages/Services';
import Portfolio from './pages/Portfolio';
import Contact from './pages/Contact';

const TourismDemo = lazy(() => import('./tourism-theme/src/App'));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AppShell() {
  const { pathname } = useLocation();
  const isStandaloneDemo = pathname.startsWith('/demos/');

  return (
    <>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen relative">
        {!isStandaloneDemo && <div className="scanline" />}
        {!isStandaloneDemo && <Navbar />}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/contact" element={<Contact />} />
            <Route
              path="/demos/hospitality"
              element={
                <Suspense fallback={<div className="min-h-screen bg-slate-950" />}>
                  <TourismDemo />
                </Suspense>
              }
            />
          </Routes>
        </main>
        {!isStandaloneDemo && <Footer />}
      </div>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppShell />
    </Router>
  );
}
