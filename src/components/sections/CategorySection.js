import React, {useContext}  from "react";
import { LanguageContext } from "../../assets/LanguageContext";

const CategorySection = () => {
  const { translations } = useContext(LanguageContext);


  return (
    <section
      className="
        bg-light-bgcolor
        dark:bg-dark-bgcolor
        text-light-black
        dark:text-dark-white
        py-12
        md:py-16
      "
    >
      <div className="container mx-auto px-4">
        {/* ÖDÜL KATEGORİLERİ BAŞLIĞI */}
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Ödül Kategorileri
        </h2>

        {/* Üst Kategoriler: Beste / Cover */}
        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            gap-8
            md:gap-16
            max-w-4xl
            mx-auto
          "
        >
          {/* Sol kolon (md'den itibaren text-right) */}
          <div className="text-center md:text-right">
            <h3 className="text-2xl font-semibold mb-3">Beste Kategorisi</h3>
            <p className="leading-relaxed">
              {translations.categories.compo}
            </p>
          </div>

          {/* Sağ kolon (md'den itibaren text-left) */}
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-semibold mb-3">Cover Kategorisi</h3>
            <p className="leading-relaxed">
              {translations.categories.cover}
            </p>
          </div>
        </div>

        {/* ALT KATEGORİLER */}
        <div className="mt-10">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 ">
            Alt Kategori
          </h2>

          <div className="text-center md:text-center">
            <h3 className="text-2xl font-semibold mb-3 ">
              Bireysel Performans
            </h3>
            <p className="leading-relaxed w-1/3 text-center mx-auto">
              {translations.categories.individual}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
