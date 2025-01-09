import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ytumLogo from "../images/ytumklogo.png";
import turkIcon from "../images/turk.png";
import engIcon from "../images/ing.png";
import modGece from "../images/mod-gece.png";
import modGunduz from "../images/mod-gunduz.png";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (darkMode) {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  };

  const handleScrollOrRedirect = () => {
    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/");
    }
  };

  const handleScroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const elementBottom = element.getBoundingClientRect().bottom; 
      const offset = window.scrollY + elementBottom - window.innerHeight; 
      window.scrollTo({ top: offset, behavior: "smooth" }); 
    }
  };

  const navigateToForm = () => {
    navigate("/form");
  };

  const [language, setLanguage] = useState('tr'); // Default language is Turkish

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    // Optionally, you can also store the selected language in localStorage
    localStorage.setItem('language', lang);
  };

  return (
    <nav className="bg-light-bgcolor dark:bg-dark-bgcolor text-light-black dark:text-dark-white sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between py-8 px-32 border-b border-light-accentpurple">
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
            <button
              onClick={handleScrollOrRedirect}
              className="hover:text-dark-accentpurple transition border-r border-dark-accentpurple pr-4"
            >
              {language === 'tr' ? <p>Ana Sayfa</p> : <p>Home Page</p>}
            </button>
          </li>
          <li>
            <button
              onClick={() => handleScroll("kategoriler")}
              className="hover:text-dark-accentpurple transition border-r border-dark-accentpurple pr-4"
            >
              Kategoriler
            </button>
          </li>
          <li>
            <button
              onClick={() => handleScroll("juri")}
              className="hover:text-dark-accentpurple transition border-r border-dark-accentpurple pr-4"
            >
              Jüri Üyeleri
            </button>
          </li>
          <li>
            <button
              onClick={() => handleScroll("sponsorlar")}
              className="hover:text-dark-accentpurple transition border-r border-dark-accentpurple pr-4"
            >
              Sponsorlarımız
            </button>
          </li>
          <li>
            <button
              onClick={navigateToForm}
              className="hover:text-dark-accentpurple transition"
            >
              Katılım Formu
            </button>
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
              onClick={() => handleLanguageChange('tr')}
            />
            <img
              src={engIcon}
              alt="İngilizce"
              className="w-[42px] h-[28px] rounded-full cursor-pointer"
              onClick={() => handleLanguageChange('en')}
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
