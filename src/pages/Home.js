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
      <div class="py-20">
      </div>
      <section id="kategoriler">
        <CategorySection />
      </section>
      <div class="flex items-center justify-center py-40">
        <div class="w-2 h-2 bg-purple-600 rounded-full"></div>
        <div class="flex-1 h-px bg-purple-600"></div>
        <div class="w-2 h-2 bg-purple-600 rounded-full"></div>
      </div>
      <section id="juri">
        <JurySection />
      </section>
      <div class="flex items-center justify-center py-40">
        <div class="w-2 h-2 bg-purple-600 rounded-full"></div>
        <div class="flex-1 h-px bg-purple-600"></div>
        <div class="w-2 h-2 bg-purple-600 rounded-full"></div>
      </div>
      <section id="sponsorlar">
        <SponsorSection />
      </section>
      <div class="py-20">
      </div>
    </div>
  );
};

export default Home;
