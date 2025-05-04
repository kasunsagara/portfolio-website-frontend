import React from 'react';
import Header from './components/header';
import Welcome from './components/welcome';
import About from './components/about';
import Projects from './components/projects';
import Contact from './components/contact';
import Footer from './components/footer';

const App = () => {
  return (
    <div>
      <Header />
      <Welcome />
      <About />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
};

export default App;
