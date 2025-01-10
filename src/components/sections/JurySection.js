import React from "react";
import konusmaciImage from "../../images/konusmaci.png";

const JurySection = () => {
  const juryMembers = [
    { name: "Jüri Üyesi 1" },
    { name: "Jüri Üyesi 2" },
    { name: "Jüri Üyesi 3" },
    { name: "Jüri Üyesi 4" },
    { name: "Jüri Üyesi 5" },
  ];

  return (
    <section className="bg-light-bgcolor dark:bg-dark-bgcolor text-light-black dark:text-dark-white flex justify-center items-center">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-12">Jüri Üyelerimiz</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {juryMembers.map((member, index) => (
            <div key={index} className="flex flex-col items-center w-full sm:w-1/2 md:w-1/4">
              <img
                src={konusmaciImage}
                alt="Jüri Üyesi"
                className="w-36 h-36 rounded-xl shadow-md"
              />
              <p className="mt-2">{member.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default JurySection;