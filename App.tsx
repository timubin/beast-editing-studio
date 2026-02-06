import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import {
  Navbar,
  Hero,
  Services,
  Pricing,
  Portfolio,
  WebDesignServices,
  StartupPackage,
  TheBeastDifference,
  About,
  Stats,
  Testimonial,
  Contact,
  Footer,
  AiProjectsSignup,
  ViewAllProjects,
  Blog,
  TermsOfService,
  PrivacyPolicy,
  Login,
  Dashboard,
  WhatsAppButton,
  DynamicPage,
  HomepageCustomSections
} from './components';

const Home: React.FC = () => (
  <>
    <Hero />
    <Services />
    <Pricing />
    <Portfolio />
    <WebDesignServices />
    <StartupPackage />
    <TheBeastDifference />
    <About />
    <Stats />
    <Testimonial />
    <HomepageCustomSections />
    <Contact />
  </>
);

import { SiteProvider } from './context/SiteContext';

const PublicLayout: React.FC = () => {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
};

const App: React.FC = () => {
  return (
    <SiteProvider>
      <Router>
        <div className="min-h-screen bg-black text-white selection:bg-red-600 selection:text-white">
          <Routes>
            {/* Public Routes - Wrapped with Navbar & Footer */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/ai-signup" element={<AiProjectsSignup />} />
              <Route path="/projects" element={<ViewAllProjects />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/terms" element={<TermsOfService />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/page/:path" element={<DynamicPage />} />
            </Route>

            {/* Admin Routes - No Navbar or Footer */}
            <Route path="/login" element={<Login />} />
            <Route path="/admin/dashboard" element={<Dashboard />} />
          </Routes>
        </div>
      </Router>
    </SiteProvider>
  );
};

export default App;
