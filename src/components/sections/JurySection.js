import React, { useEffect, useState, useContext } from "react";
import { LanguageContext } from "../../assets/LanguageContext";
import konusmaciImage from "../../images/konusmaci.png";

const JurySection = () => {
  const [juries, setJuries] = useState([]);
  const { translations } = useContext(LanguageContext);

  useEffect(() => {
    const fetchJuries = async () => {
      try {
        const response = await fetch(
          "https://api.ytumk.com.tr/v1/exapi/juries/c7165832-1fad-48bc-9219-dd12e8cd2ec0"
        );
        if (!response.ok) {
          throw new Error("Jüri verileri çekilirken hata oluştu.");
        }
        const data = await response.json();
        setJuries(data);
      } catch (error) {
        console.error("Jüri verileri alınamadı:", error);
      }
    };
    fetchJuries();
  }, []);

  // Üstte 3, altta 2 olacak şekilde ayırma (en az 5 üye varsa)
  const topThree = juries.slice(0, 3);
  const bottomTwo = juries.slice(3, 5);

  return (
    <section className="bg-light-bgcolor dark:bg-dark-bgcolor text-light-black dark:text-dark-white py-12 md:py-16">
      <div className="container mx-auto text-center">
        {/* "Jüri Üyelerimiz" / "Our Jury Members" */}
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          {translations.sections.jury.title}
        </h2>

        {juries.length === 0 ? (
          <p className="text-xl">{translations.sections.jury.comingSoon}</p>
        ) : (
          <>
            <div className="grid grid-cols-3 gap-6 mb-8 place-items-center">
              {topThree.map((jury) => (
                <div key={jury.id} className="flex flex-col items-center">
                  <img
                    src={jury.image_url || konusmaciImage}
                    alt={jury.name || "Jüri Üyesi"}
                    className="w-32 h-32 rounded-lg shadow-md object-cover"
                  />
                  <p className="mt-2 text-sm md:text-base">
                    {jury.name || "Bilinmeyen"}
                  </p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-6 place-items-center">
              {bottomTwo.map((jury) => (
                <div key={jury.id} className="flex flex-col items-center">
                  <img
                    src={jury.image_url || konusmaciImage}
                    alt={jury.name || "Jüri Üyesi"}
                    className="w-32 h-32 rounded-lg shadow-md object-cover"
                  />
                  <p className="mt-2 text-sm md:text-base">
                    {jury.name || "Bilinmeyen"}
                  </p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default JurySection;
