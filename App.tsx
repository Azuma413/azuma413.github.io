import React, { FC } from 'react';
import { Routes, Route } from "react-router-dom";
import Header from './components/Header';
import Profile from './components/Profile';
import News from './components/News';
import Research from './components/Research';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BlogPage from './components/BlogPage';
import ProjectDetailPage from './components/ProjectDetailPage';
import S2A2Page from './components/S2A2Page';

const Home: FC = () => (
  <>
    <Profile />
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <hr className="border-hair" />
    </div>
    <News />
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <hr className="border-hair" />
    </div>
    <Research />
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <hr className="border-hair" />
    </div>
    <Projects />
    <Contact />
  </>
);

const App: FC = () => {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Header />
      <main className="relative z-10">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPage />} />
          {/* Static path wins over the generic ":slug" route below. */}
          <Route path="/projects/s2a2" element={<S2A2Page />} />
          <Route path="/projects/:slug" element={<ProjectDetailPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
