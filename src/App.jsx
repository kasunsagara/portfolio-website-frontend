import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/header';
import Home from './components/home';
import About from './components/about';
import Services from './components/services';
import Projects from './components/projects';
import Contact from './components/contact';
import Footer from './components/footer';
import AdminLogin from './pages/adminLogin';
import AdminPanel from './pages/adminPanel';
import AdminSkills from './pages/adminSkills';
import AdminProjects from './pages/adminProjects'; 
import AdminMessages from './pages/adminMessages';

const App = () => {
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <>
            <Header />
            <Home />
            <About />
            <Services />
            <Projects />
            <Contact />
            <Footer />
          </>
        } />

        <Route path="/admin-login" element={<AdminLogin />} />

        {/* Admin panel and nested routes */}
        <Route
          path="/admin-panel"
          element={isAdmin ? <AdminPanel /> : <Navigate to="/admin-login" />}
        >
          <Route path="skills" element={<AdminSkills />} />
          <Route path="projects" element={<AdminProjects />} />
          <Route path="messages" element={<AdminMessages />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
