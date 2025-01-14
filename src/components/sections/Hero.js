import React, { useContext } from "react";
import konserImage from "../../images/eski-yildizlar-yarisiyor.png";
import { LanguageContext } from "../../assets/LanguageContext";

const Hero = () => {
  const { translations } = useContext(LanguageContext);

  return (
    <section className="bg-light-bgcolor dark:bg-dark-bgcolor text-light-black dark:text-dark-white h-[calc(100vh-104px)] flex justify-center items-center">
      <div className="container mx-auto flex flex-col md:flex-row items-center gap-8">
        <img
          src={konserImage}
          alt="Konser"
          className="rounded-[4.5rem] w-full md:w-1/2 aspect-w-1 aspect-h-1 shadow-lg"
        />
        <div className="text-center md:text-left w-1/2 mobile-l:w-2/3 p-4">
          <h1 className="text-4xl font-bold mb-4">{translations.hero.title}</h1>
          <p className="">
            {translations.hero.description}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;