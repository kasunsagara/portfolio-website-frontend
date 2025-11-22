import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast'; 
import Header from './components/header';
import Home from './components/home';
import About from './components/about';
import Services from './components/services';
import Projects from './components/projects';
import Contact from './components/contact';
import Footer from './components/footer';
import Secret from './pages/secret';

const App = () => {

  return (
    <BrowserRouter>
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

        <Route path="/secret" element={<Secret />} />

      </Routes>
    </BrowserRouter>
  );
};

export default App;
