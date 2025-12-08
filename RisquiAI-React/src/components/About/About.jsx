import { AboutGrid } from "./AboutGrid";

const About = () => {
  return (
    <section
      id="about-section"
      className="w-full min-h-screen px-6 py-20 pb-40"
    >
      <div className="pb-4">
        <AboutGrid />
      </div>
    </section>
  );
};

export default About;
