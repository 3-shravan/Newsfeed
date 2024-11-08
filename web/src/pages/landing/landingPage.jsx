import "./landingPage.css";

import { Link } from "react-router-dom";

const LandingPage = () => {
  const hero = {
    title: "Welcome to our website",
    specialCharacter: "!",
    description: "We are a company that does stuff",
  };
  const services = {
    title: "Our Services",
  };

  return (
    <main className="landingPage">
      {/* Hero Section */}
      <div className="hero">
        <div className="heroContent">
          <h1>
            {hero.title}{" "}
            <span className="specialcharacter">{hero.specialCharacter}</span>
          </h1>
          <p>{hero.description}</p>
        </div>
      </div>

      {/* Services Section */}
      <section id="services" className="services">
        <h2>{services.title}</h2>
      </section>
    </main>
  );
};

export default LandingPage;
