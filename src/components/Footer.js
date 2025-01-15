import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { LanguageContext } from "../assets/LanguageContext";
import ytumLogo from "../images/ytumklogo.png";
import instaIcon from "../images/insta.png";
import linkedinIcon from "../images/linkedin.png";
import xIcon from "../images/x.png";
import skylab from "../images/skylab.png";
import weblab from "../images/weblab-color.png";

const Footer = () => {
  const [sponsors, setSponsors] = useState([]);
  const { translations } = useContext(LanguageContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.ytumk.com.tr/v1/exapi/event/c7165832-1fad-48bc-9219-dd12e8cd2ec0/sponsors"
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

  // Örnek olarak ana vs regular sponsorları alabilir, listeleyebilirsiniz.
  const mainSponsors = sponsors.filter((s) => s.main_sponsor);
  const regularSponsors = sponsors.filter((s) => !s.main_sponsor);

  return (
    <footer className="bg-black text-white py-8 px-4 md:px-8 lg:px-16 xl:px-32 border-b-8 border-dark-accentpurple">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
        {/* Sol - Sosyal Medya */}
        <div className="flex flex-col items-center md:items-start">
          <p className="text-dark-accentpurple font-bold mb-4 text-2xl">
            {translations.sections.footer.followUs}
          </p>
          <div className="grid grid-cols-3 gap-8">
            <a
              href="https://www.instagram.com/ytumk?igsh=eWZoeDFuZmYzM2Zl"
              className="w-12 h-12 flex items-center justify-center rounded"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={instaIcon} alt="Instagram" className="w-12 h-12" />
            </a>
            <a
              href="https://www.linkedin.com/company/ytumk/"
              className="w-12 h-12 flex items-center justify-center rounded"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={linkedinIcon} alt="LinkedIn" className="w-12 h-12" />
            </a>
            <a
              href="https://x.com/ytumk"
              className="w-12 h-12 flex items-center justify-center rounded"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={xIcon} alt="X" className="w-12 h-12" />
            </a>
          </div>
        </div>

        {/* Orta - (Örnek) Sponsorlar */}
        <div className="flex flex-col items-center justify-center">
          {/* Dilerseniz burada da translations.sections.sponsors.title kullanabilirsiniz. */}
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
                  className="w-20 h-20 mx-auto mb-4 bg-black object-contain rounded-full border-2 border-gray-300"
                />
              </div>
            ))}

              {mainSponsors.map((sponsor) => (
              <div
                key={sponsor.id}
                className="text-center cursor-pointer"
                onClick={() => handleSponsorClick(sponsor.website_url)}
              >
                <img
                  src={sponsor.image_url}
                  alt={sponsor.name}
                  className="w-20 h-20 mx-auto mb-4 bg-black object-contain rounded-full border-2 border-gray-300"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Sağ - YTÜMK Logo */}
        <div className="flex items-center justify-center md:justify-end">
          <img
            src={ytumLogo}
            alt="YTÜMK Logo"
            className="w-36 h-36 rounded-full"
          />
        </div>
      </div>

      <div className="mt-16 text-center">
        <div className="flex justify-center space-x-8 mt-2">
          <a
            href="https://yildizskylab.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={skylab} alt="SkyLab" className="w-12 h-12" />
          </a>
          <a
            href="https://yildizskylab.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={weblab} alt="WebLab" className="w-12 h-12" />
          </a>
        </div>
        <p className="text-md mt-4">
          {translations.sections.footer.skyLabText}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
