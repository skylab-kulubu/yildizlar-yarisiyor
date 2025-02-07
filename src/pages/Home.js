import React from "react";
import Hero from "../components/sections/Hero";
import CategorySection from "../components/sections/CategorySection";
import JurySection from "../components/sections/JurySection";
import SponsorSection from "../components/sections/SponsorSection";
import FAQ from "../components/sections/FAQ";

const Home = () => {
  return (
    <div className="mt-0 px-4 md:px-8 lg:px-16 xl:px-32">
  <section id="anasayfa" className="mb-8">
    <Hero />
  </section>
  <section id="kategoriler" className="mb-8 py-8">
    <CategorySection />
  </section>
      <div class="flex items-center justify-center py-20 md:py-24 lg:py-32 xl:py-40">
        <div class="w-2 h-2 bg-purple-600 rounded-full"></div>
        <div class="flex-1 h-px bg-purple-600"></div>
        <div class="w-2 h-2 bg-purple-600 rounded-full"></div>
      </div>
      <section id="juri" className="mb-0">
        <JurySection />
      </section>
      <div class="flex items-center justify-center py-20 md:py-24 lg:py-32 xl:py-40">
        <div class="w-2 h-2 bg-purple-600 rounded-full"></div>
        <div class="flex-1 h-px bg-purple-600"></div>
        <div class="w-2 h-2 bg-purple-600 rounded-full"></div>
      </div>
      <section id="sponsorlar" className="mb-20">
        <SponsorSection />
      </section>
      <div class="flex items-center justify-center py-20 md:py-24 lg:py-32 xl:py-40">
        <div class="w-2 h-2 bg-purple-600 rounded-full"></div>
        <div class="flex-1 h-px bg-purple-600"></div>
        <div class="w-2 h-2 bg-purple-600 rounded-full"></div>
      </div>
      <section id="sorular" className="mb-20">
        <FAQ />
      </section>
    </div>
  );
};

export default Home;
