import React, { useEffect, useState } from "react";
// Örnek placeholder resmi (konuşmacı resmi). 
// Resim URL'si gelmezse fallback olarak kullanılabilir.
import konusmaciImage from "../../images/konusmaci.png";

const JurySection = () => {
  return (
    <section className="bg-light-bgcolor dark:bg-dark-bgcolor text-light-black dark:text-dark-white h-[calc(100vh-104px)] flex justify-center items-center">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">Jüri Üyelerimiz</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="flex flex-col items-center">
              <img
                src={konusmaciImage}
                alt="Jüri Üyesi"
                className="w-24 h-24 rounded-lg shadow-md"
              />
              <p className="mt-2">Lorem Ipsum</p>
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