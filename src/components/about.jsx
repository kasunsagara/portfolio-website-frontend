const About = () => (
    <section id="about" className="py-16 bg-primary text-white px-4">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold text-secondary mb-6">About Me</h2>
        <p className="text-xl text-white leading-relaxed max-w-2xl mx-auto">
          I am a dedicated Computer Science student passionate about technology, software development, and problem-solving. My journey in the tech world has been exciting, and I am eager to make meaningful contributions in the field.
        </p>
        <div className="mt-8">
          <a
            href="#projects"
            className="inline-block py-3 px-8 text-lg font-semibold bg-secondary text-primary rounded-lg shadow-md hover:bg-primary hover:text-white transition duration-300"
          >
            View My Projects
          </a>
        </div>
      </div>
    </section>
  );
  
  export default About;
  