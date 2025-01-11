import React, { useEffect, useState } from "react";

const SponsorSection = () => {
  const [sponsors, setSponsors] = useState([]);

  useEffect(() => {
    const fetchSponsors = async () => {
      try {
        const response = await fetch(
          "https://api.ytumk.com.tr/v1/exapi/sponsors/c7165832-1fad-48bc-9219-dd12e8cd2ec0"
        );
        if (!response.ok) {
          throw new Error("Sponsor verileri çekilirken hata oluştu.");
        }
        const data = await response.json();
        // Örnek data yapısı:
        // [
        //   {
        //     "id": "...",
        //     "event_id": "...",
        //     "main_sponsor": true/false,
        //     "name": "...",
        //     "website_url": "...",
        //     "image_url": "...",
        //     ...
        //   },
        //   ...
        // ]
        setSponsors(data);
      } catch (error) {
        console.error("Sponsor verileri alınamadı:", error);
      }
    };
    fetchSponsors();
  }, []);

  // Tek bir ana sponsor (main_sponsor === true) varsa onu alıyoruz
  const mainSponsor = sponsors.find((s) => s.main_sponsor === true);

  // Geri kalan sponsorları (alt sponsorlar) listelemek için
  const subSponsors = sponsors.filter((s) => s.main_sponsor === false);

  return (
    <section className="bg-light-bgcolor dark:bg-dark-bgcolor text-light-black dark:text-dark-white flex justify-center items-center h-[calc(100vh-104px)]">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">Sponsorlarımız</h2>
        <p className="mb-4">Ana Sponsorumuz</p>
        <img src={crossLogo} alt="Ana Sponsor" className="w-20 h-20 mx-auto mb-6" />
        <div className="flex justify-center gap-4">
          {[...Array(5)].map((_, index) => (
            <img
              key={index}
              src={crossLogo}
              alt="Sponsor Logo"
              className="w-10 h-10"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SponsorSection;
