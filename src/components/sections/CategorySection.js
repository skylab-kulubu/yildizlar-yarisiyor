import React, { useContext } from "react";
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
          {translations.sections.category.awardTitle}
        </h2>

        {/* Üst Kategoriler: Beste / Cover */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 max-w-4xl mx-auto">
          {/* Sol kolon */}
          <div className="text-center md:text-right">
            <h3 className="text-2xl font-semibold mb-3">
              {translations.sections.category.compoHeading}
            </h3>
            <p className="leading-relaxed">
              {translations.categories.compo}
            </p>
          </div>

          {/* Sağ kolon */}
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-semibold mb-3">
              {translations.sections.category.coverHeading}
            </h3>
            <p className="leading-relaxed">
              {translations.categories.cover}
            </p>
          </div>
        </div>

        {/* ALT KATEGORİLER */}
        <div className="mt-10">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
            {translations.sections.category.subCategoryTitle}
          </h2>

          <div className="text-center">
            <h3 className="text-2xl font-semibold mb-3">
              {translations.sections.category.individualHeading}
            </h3>
            <p className="leading-relaxed w-full md:w-1/3 mx-auto">
              {translations.categories.individual}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
