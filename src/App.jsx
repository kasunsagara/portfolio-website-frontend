import React from 'react';
import Header from './components/header';
import Welcome from './components/welcome';
import About from './components/about';

import Contact from './components/contact';
import Footer from './components/footer';

const App = () => {
  return (
    <div>
      <Header />
      <Welcome />
      <About />

      <Contact />
      <Footer />
    </div>
  );
};

export default App;
