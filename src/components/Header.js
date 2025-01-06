import React, { useState } from "react";
import ytumLogo from "../images/ytumklogo.png";
import turkIcon from "../images/turk.png";
import engIcon from "../images/ing.png";
import modGece from "../images/mod-gece.png";
import modGunduz from "../images/mod-gunduz.png";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (darkMode) {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  };

  return (
    <nav className="bg-light-bgcolor dark:bg-dark-bgcolor text-light-black dark:text-dark-white">
      <div className="container mx-auto flex items-center justify-between py-8 px-32">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img
            src={ytumLogo}
            alt="Yıldız Teknik Üniversitesi Logo"
            className={`w-10 h-10 transition duration-300 ${
              darkMode ? "filter invert-0" : "filter invert"
            }`}
          />
          <span className="font-bold text-lg">YILDIZLAR YARIŞIYOR</span>
        </div>

        {/* Menü */}
        <ul className="flex items-center space-x-6">
          <li>
            <a
              href="#anasayfa"
              className="hover:text-dark-accentpurple transition border-r border-dark-accentpurple pr-4"
            >
              Ana Sayfa
            </a>
          </li>
          <li>
            <a
              href="#kategoriler"
              className="hover:text-dark-accentpurple transition border-r border-dark-accentpurple pr-4"
            >
              Kategoriler
            </a>
          </li>
          <li>
            <a
              href="#juri"
              className="hover:text-dark-accentpurple transition border-r border-dark-accentpurple pr-4"
            >
              Jüri Üyeleri
            </a>
          </li>
          <li>
            <a
              href="#sponsorlar"
              className="hover:text-dark-accentpurple transition border-r border-dark-accentpurple pr-4"
            >
              Sponsorlarımız
            </a>
          </li>
          <li>
            <a
              href="#katilimformu"
              className="hover:text-dark-accentpurple transition"
            >
              Katılım Formu
            </a>
          </li>
        </ul>

        {/* Dil ve Mod Toggle */}
        <div className="flex items-center space-x-4">
          {/* Dil */}
          <div className="flex items-center space-x-2">
            <img
              src={turkIcon}
              alt="Türkçe"
              className="w-[42px] h-[28px] rounded-full cursor-pointer"
            />
            <img
              src={engIcon}
              alt="İngilizce"
              className="w-[42px] h-[28px] rounded-full cursor-pointer"
            />
          </div>

          {/* Koyu Mod Toggle */}
          <button onClick={toggleDarkMode} className="w-8 h-8">
            <img
              src={darkMode ? modGece : modGunduz}
              alt="Koyu Mod"
              className="w-full h-full"
            />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
