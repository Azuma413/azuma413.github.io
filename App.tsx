import React, { FC } from 'react';
import { Routes, Route } from "react-router-dom";
import Header from './components/Header';
import Profile from './components/Profile';
import Research from './components/Research';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BlogPage from './components/BlogPage';
import ProjectDetailPage from './components/ProjectDetailPage';

const Home: FC = () => (
  <>
    <Profile />
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
          <Route path="/projects/:slug" element={<ProjectDetailPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
