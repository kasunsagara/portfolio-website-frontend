import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast'; 
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
import AddSkill from './pages/addSkill';
import EditSkill from './pages/editSkill';
import AdminServices from './pages/adminServices';
import AddService from './pages/addService';
import EditService from './pages/editService';
import AdminProjects from './pages/adminProjects'; 
import AddProject from './pages/addProject';
import EditProject from './pages/editProject';
import AdminMessages from './pages/adminMessages';

const App = () => {
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  return (
    <Router>
      <Toaster position="top-right"/>
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
          <Route path="skills/add-skill" element={<AddSkill />} />
          <Route path="skills/edit-skill/:id" element={<EditSkill />} />
          <Route path="services" element={<AdminServices />} />
          <Route path="services/add-service" element={<AddService />} />
          <Route path="services/edit-service/:id" element={<EditService />} />
          <Route path="projects" element={<AdminProjects />} />
          <Route path="projects/add-project" element={<AddProject />} />
          <Route path="projects/edit-project/:id" element={<EditProject />} />
          <Route path="messages" element={<AdminMessages />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
