const Welcome = () => (
    <section id="welcome" className="flex items-center justify-center min-h-screen bg-primary text-white text-center px-4">
      <div className="max-w-lg">
        <h1 className="text-5xl font-bold text-secondary mb-4">Hi, I'm Kasun Sagara</h1>
        <p className="text-xl text-secondary mb-8">Computer Science Student @ Eastern University</p>
        <a
          href="#about"
          className="inline-block py-2 px-6 text-lg font-semibold bg-secondary text-primary rounded-lg shadow-lg hover:bg-primary hover:text-white transition duration-300"
        >
          Learn More About Me
        </a>
      </div>
    </section>
  );
  
  export default Welcome;
  