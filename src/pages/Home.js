import React from "react";
import Hero from "../components/sections/Hero";
import CategorySection from "../components/sections/CategorySection";
import JurySection from "../components/sections/JurySection";
import SponsorSection from "../components/sections/SponsorSection";

const Home = () => {
  return (
    <div className="px-32">
      <section id="anasayfa">
        <Hero />
      </section>
      <section id="kategoriler">
        <CategorySection />
      </section>
      <section id="juri">
        <JurySection />
      </section>
      <section id="sponsorlar">
        <SponsorSection />
      </section>
    </div>
  );
};

export default Home;
