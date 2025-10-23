import React, { FC } from 'react';
// Fix: Corrected import for react-router-dom.
import { Routes, Route } from "react-router-dom";
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BlogPage from './components/BlogPage';
import ProjectDetailPage from './components/ProjectDetailPage';

const Home: FC = () => (
  <>
    <Hero />
    <About />
    <Projects />
    <Skills />
    <Contact />
  </>
);

const App: FC = () => {
  return (
    <div className="min-h-screen bg-slate-900 overflow-x-hidden">
      <Header />
      <main className="relative z-10">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPage />} />
          <Route path="/projects/:slug" element={<ProjectDetailPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
