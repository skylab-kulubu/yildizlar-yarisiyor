import React from "react";
import crossLogo from "../../images/cross.png";

const SponsorSection = () => {
  return (
    <section className="pb-20 bg-light-bgcolor dark:bg-dark-bgcolor text-light-black dark:text-dark-white flex justify-center items-center">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">Sponsorlarımız</h2>
        <p className="text-2xl mb-4">Ana Sponsorumuz</p>
        <img src={crossLogo} alt="Ana Sponsor" className="w-20 h-30 mx-auto mb-6 rounded-full" />
        <div className="flex justify-center gap-4">
          {[...Array(5)].map((_, index) => (
            <img
              key={index}
              src={crossLogo}
              alt="Sponsor Logo"
              className="w-10 h-10 rounded-full"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SponsorSection;
