import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { LanguageContext } from "../../assets/LanguageContext";

const SponsorSection = () => {
  const [sponsors, setSponsors] = useState([]);
  const { translations } = useContext(LanguageContext); // <-- Çeviri context

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.ytumk.com.tr/v1/exapi/sponsors/c7165832-1fad-48bc-9219-dd12e8cd2ec0"
        );
        setSponsors(response.data);
      } catch (error) {
        console.error("Error fetching sponsor data:", error);
      }
    };
    fetchData();
  }, []);

  const handleSponsorClick = (url) => {
    if (url) {
      window.open(url, "_blank");
    }
  };

  const mainSponsors = sponsors.filter((sponsor) => sponsor.main_sponsor);
  const regularSponsors = sponsors.filter((sponsor) => !sponsor.main_sponsor);

  return (
    <section className="bg-light-bgcolor dark:bg-dark-bgcolor text-light-black dark:text-dark-white py-12 md:py-16">
      <div className="container mx-auto text-center">
        {/* Başlık -> Sponsorlarımız / Our Sponsors */}
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
          {translations.sections.sponsors.title}
        </h2>

        {/* Ana Sponsor -> Ana Sponsorumuz / Our Main Sponsor */}
        <p className="text-2xl mb-4">
          {translations.sections.sponsors.mainTitle}
        </p>
        <div className="flex justify-center gap-16 flex-wrap mb-8">
          {mainSponsors.map((sponsor) => (
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

        {/* Diğer Sponsorlar -> Diğer Sponsorlarımız / Other Sponsors */}
        {/* Eğer bunu tekrar aktif hale getirecekseniz: */}
        {/* 
        <p className="text-2xl mb-4">
          {translations.sections.sponsors.otherTitle}
        </p>
        <div className="flex justify-center gap-8 flex-wrap">
          {regularSponsors.map((sponsor) => (
            <div
              key={sponsor.id}
              className="text-center cursor-pointer"
              onClick={() => handleSponsorClick(sponsor.website_url)}
            >
              <img
                src={sponsor.image_url}
                alt={sponsor.name}
                className="w-24 h-24 mx-auto mb-4 bg-black object-contain rounded-full border-2 border-gray-300"
              />
              <p className="text-lg font-semibold">{sponsor.name}</p>
            </div>
          ))}
        </div>
        */}
      </div>
    </section>
  );
};

export default SponsorSection;
