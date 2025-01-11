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
    <section className="bg-light-bgcolor dark:bg-dark-bgcolor text-light-black dark:text-dark-white py-12 md:py-16">
      <div className="container mx-auto text-center">
        {/* Üst Başlık */}
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Sponsorlarımız</h2>

        {/* "Ana Sponsorumuz" metni */}
        <p className="text-lg md:text-xl font-semibold mb-8">
          Ana Sponsorumuz
        </p>

        {/* Ana Sponsor (eğer varsa) */}
        {mainSponsor && (
          <div className="flex flex-col items-center mb-8">
            <img
              src={mainSponsor.image_url}
              alt={mainSponsor.name || "Ana Sponsor"}
              className="w-40 h-40 md:w-48 md:h-48 rounded-full object-contain"
            />
            
          </div>
        )}

        {/* Alt Sponsorlar */}
        {subSponsors.length > 0 && (
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            {subSponsors.map((sponsor) => (
              <div key={sponsor.id} className="flex flex-col items-center">
                <img
                  src={sponsor.image_url}
                  alt={sponsor.name || "Alt Sponsor"}
                  className="w-16 h-16 md:w-20 md:h-20 rounded-full object-contain"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default SponsorSection;
