import { FaUniversity, FaSchool } from "react-icons/fa";

export default function About() {
  return (
    <section
      id="about"
      className="flex items-center justify-center min-h-screen bg-primary text-white px-4 py-24"
    >
      <div className="container mx-auto flex flex-col md:flex-row justify-center items-center gap-0 text-center">
        {/* Left: Image */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src="/picture2.jpg"
            alt="Kasun Sagara"
            className="rounded-2xl shadow-lg w-1/2 h-96 object-cover border-4 border-accent"
          />
        </div>

        {/* Right: Education Content */}
        <div className="w-full md:w-1/2 text-left">
          <h2 className="text-5xl font-bold text-accent mb-10">About Me</h2>
          <div className="space-y-10 text-left">
            <div>
              <h3 className="text-xl font-semibold text-accent flex items-center gap-4 mb-4">
                <FaUniversity className="text-3xl" />
                <span>Trincomalee Campus, Eastern University of Sri Lanka</span>
              </h3>
              <p className="text-lg font-medium mb-2">
                Bachelor of Computer Science [BCS]
              </p>
              <p className="text-sm mb-2">July 2023 - Present</p>
              <p className="text-base leading-relaxed">
                This degree focuses on programming, software development,
                databases, and computer <br />
                systems, with both theoretical and practical project experience. It also includes full stack <br />
                web development, covering both frontend and backend technologies. Students build <br />
                applications and sharpen problem solving skills for the tech industry.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-accent flex items-center gap-4 mb-4">
                <FaSchool className="text-3xl" />
                <span>R/Dharmaloka Maha Vidyalaya, Pelmadulla</span>
              </h3>
              <p className="text-lg font-medium mb-2">GCE Advanced Level</p>
              <p className="text-sm mb-2">Completed 2021</p>
              <p className="text-base leading-relaxed mb-1">
                Specialized in the maths stream with a Z-score of{" "}
                <span className="font-semibold">0.7018</span>.
              </p>
              <ul className="list-disc list-inside text-base ml-2">
                <li>Combined Maths – C</li>
                <li>Physics – C</li>
                <li>Chemistry – C</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
