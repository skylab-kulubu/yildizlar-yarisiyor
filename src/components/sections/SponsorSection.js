import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

const SponsorSection = () => {
  const [sponsors, setSponsors] = useState([]); // State for all sponsor data

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.ytumk.com.tr/v1/exapi/sponsors/c7165832-1fad-48bc-9219-dd12e8cd2ec0"
        );
        setSponsors(response.data); // Store the entire array in state
      } catch (error) {
        console.error("Error fetching sponsor data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSponsorClick = (url) => {
    if (url) {
      window.open(url, "_blank"); // Open the sponsor's website in a new tab
    }
  };

  return (
    <section className="bg-light-bgcolor dark:bg-dark-bgcolor text-light-black dark:text-dark-white py-12 md:py-16">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">Sponsorlarımız</h2>
        <p className="text-2xl mb-4">Ana Sponsorumuz</p>
        <div className="flex justify-center gap-16 flex-wrap">
          {sponsors.map((sponsor) => (
            <div
              key={sponsor.id}
              className="text-center cursor-pointer"
              onClick={() => handleSponsorClick(sponsor.website_url)}
            >
              <img
                src={sponsor.image_url}
                alt={sponsor.name}
                className="w-36 h-36 mx-auto mb-4 bg-black object-contain rounded-full border-2 border-gray-300"
              />
              <p className="text-lg font-semibold">{sponsor.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SponsorSection;
