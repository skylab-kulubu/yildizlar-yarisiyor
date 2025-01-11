import React, { useEffect, useState } from "react";
// Örnek placeholder resmi (konuşmacı resmi). 
// Resim URL'si gelmezse fallback olarak kullanılabilir.
import konusmaciImage from "../../images/konusmaci.png";

const JurySection = () => {
  // Jüri üyelerini tutacak state
  const [juries, setJuries] = useState([]);

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
        // data muhtemelen [{ id: "...", name: "...", image_url: "..." }, ...] formatındadır.
        setJuries(data);
      } catch (error) {
        console.error("Jüri verileri alınamadı:", error);
      }
    };
    fetchJuries();
  }, []);

  // Üstte 3, altta 2 olacak şekilde ayırıyoruz (en az 5 üye varsayımı!)
  const topThree = juries.slice(0, 3);
  const bottomTwo = juries.slice(3, 5);

  return (
    <section className="bg-light-bgcolor dark:bg-dark-bgcolor text-light-black dark:text-dark-white py-12 md:py-16">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">Jüri Üyelerimiz</h2>

        {/* Üstte 3'lük grid */}
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

        {/* Altta 2'lik grid */}
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

        {/* Alt taraftaki mor çizgi */}
        <div className="mt-12 mx-auto w-1/2 h-[2px] bg-dark-accentpurple"></div>
      </div>
    </section>
  );
};

export default JurySection;
