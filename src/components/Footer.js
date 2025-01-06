import React from "react";
import ytumLogo from "../images/ytumklogo.png";
import instaIcon from "../images/insta.png";
import linkedinIcon from "../images/linkedin.png";
import discordIcon from "../images/discord.png";
import xIcon from "../images/x.png";
import crossLogo from "../images/cross.png";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-10 px-32 border-b-8 border-dark-accentpurple">
      <div className="container mx-auto flex w-full justify-between items-center">
        {/* Sol - Sosyal Medya */}
        <div className="flex flex-col items-center justify-center">
          <p className="text-dark-accentpurple font-bold mb-4 text-2xl">Bizi Takip Edin</p>
          <div className="grid grid-cols-2 gap-8">
            <a href="instagram.com" className="w-12 h-12 flex items-center justify-center rounded">
              <img src={instaIcon} alt="Instagram" className="w-12 h-12" />
            </a>
            <a href="linkedin.com" className="w-12 h-12 flex items-center justify-center rounded">
              <img src={linkedinIcon} alt="LinkedIn" className="w-12 h-12" />
            </a>
            <a href="x.com" className="w-12 h-12 flex items-center justify-center rounded">
              <img src={xIcon} alt="X" className="w-12 h-12" />
            </a>
            <a href="discord.com" className="w-12 h-12 flex items-center justify-center rounded">
              <img src={discordIcon} alt="Discord" className="w-12 h-12" />
            </a>
          </div>
        </div>

        {/* Orta - Sponsorlar */}
        <div className="flex flex-col items-center justify-center">
          {/* Büyük Cross */}
          <img src={crossLogo} alt="Cross Logo" className="w-32 h-32 mb-4 rounded-full" />
          {/* Küçük Cross Logolar */}
          <div className="flex space-x-4 justify-center items-center">
            {[...Array(5)].map((_, index) => (
              <img
                key={index}
                src={crossLogo}
                alt="Cross Logo"
                className="w-16 h-16  rounded-full"
              />
            ))}
          </div>
        </div>

        {/* Sağ - YTÜMK Logo */}
        <div className="flex items-center justify-end">
          <img src={ytumLogo} alt="YTÜMK Logo" className="w-32 h-32 rounded-full" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
