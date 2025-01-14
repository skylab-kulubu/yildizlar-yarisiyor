import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ytumLogo from "../images/ytumklogo.png";
import turkIcon from "../images/turk.png";
import engIcon from "../images/ing.png";
import modGece from "../images/mod-gece.png";
import modGunduz from "../images/mod-gunduz.png";
import axios from "axios";
import languages from "../assets/languages.json"; // Dil çevirileri

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(true); // Set initial state to true for dark mode
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [language, setLanguage] = useState('tr'); // Default language is Turkish
  const [translations, setTranslations] = useState(languages[language].header); // Set initial translations

  const navigate = useNavigate();
  const location = useLocation();

  const [logo, setLogo] = useState(""); // Add state for logo
  const [title, setTitle] = useState(""); // Add state for title

  useEffect(() => {
    // Add dark mode class to html element on mount
    document.documentElement.classList.add("dark");

    // Fetch data from the API
    const fetchData = async () => {
      try {
        const response = await axios.get("https://api.ytumk.com.tr/v1/exapi/event/c7165832-1fad-48bc-9219-dd12e8cd2ec0");
        setLogo(response.data.image_url); // Assuming the API response has a 'logo' field
        setTitle(response.data.name); // Assuming the API response has a 'title' field
        console.log("Fetched title:", response.data.title); // Print the title in the terminal
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Update translations whenever the language state changes
    setTranslations(languages[language].header);
  }, [language]);

  const toggleDarkMode = () => {
    setIsMenuOpen(false); // Close the menu
    setDarkMode(!darkMode);
    if (darkMode) {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  };

  const handleScrollOrRedirect = () => {
    setIsMenuOpen(false); // Close the menu
    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/");
    }
  };

  const handleScroll = (id) => {
    setIsMenuOpen(false); // Close the menu
    if (location.pathname !== "/") {
      navigate("/", { state: { scrollTo: id } });
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const navigateToForm = () => {
    setIsMenuOpen(false); // Close the menu
    navigate("/form");
  };

  const handleLanguageChange = (lang) => {
    setIsMenuOpen(false);
    setLanguage(lang); // Update the language state
    localStorage.setItem('language', lang);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-light-bgcolor dark:bg-dark-bgcolor text-light-black dark:text-dark-white sticky top-0 z-50 w-full">
      <div className="container mx-auto flex items-center justify-between py-4 px-4 md:px-8 lg:px-20 border-b border-light-accentpurple">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img
            src={logo}
            alt="Yıldız Teknik Üniversitesi Logo"
            className={`w-20 h-max mobile-l:w-36 transition duration-300 ${darkMode ? "filter invert-0" : "filter invert"
              }`}
          />
        </div>

        {/* Hamburger Menu for Mobile */}
        <div className="laptop:hidden">
          <button onClick={toggleMenu} className={`focus:outline-none ${darkMode ? 'text-dark-white' : 'text-dark-black'}`}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
            </svg>
          </button>
        </div>

        {/* Menü */}
        <ul className={`py-4 absolute mobile-l:top-32 top-21 left-0 w-full bg-light-bgcolor dark:bg-dark-bgcolor laptop:static laptop:flex laptop:flex-row items-center justify-center space-y-4 laptop:space-y-0 laptop:space-x-6 ${isMenuOpen ? "flex flex-col" : "hidden"} laptop:flex`}>
          <li>
            <button
              onClick={handleScrollOrRedirect}
              className="hover:text-dark-accentpurple transition laptop:border-r laptop:border-dark-accentpurple pr-0 laptop:pr-4"
            >
              {translations.home}
            </button>
          </li>
          <li>
            <button
              onClick={() => handleScroll("kategoriler")}
              className="hover:text-dark-accentpurple transition laptop:border-r laptop:border-dark-accentpurple pr-0 laptop:pr-4"
            >
              {translations.categories}
            </button>
          </li>
          <li>
            <button
              onClick={() => handleScroll("juri")}
              className="hover:text-dark-accentpurple transition laptop:border-r laptop:border-dark-accentpurple pr-0 laptop:pr-4"
            >
              {translations.jury}
            </button>
          </li>
          <li>
            <button
              onClick={() => handleScroll("sponsorlar")}
              className="hover:text-dark-accentpurple transition laptop:border-r laptop:border-dark-accentpurple pr-0 laptop:pr-4"
            >
              {translations.sponsors}
            </button>
          </li>
          <li>
            <button
              onClick={navigateToForm}
              className="hover:text-dark-accentpurple transition"
            >
              {translations.form}
            </button>
          </li>
          {/* Dil ve Mod Toggle for Mobile */}
          <li className="flex flex-col items-center space-y-4 laptop:hidden">
            <div className="flex items-center space-x-2">
              <img
                src={turkIcon}
                alt="Türkçe"
                className="w-[28px] h-[18px] rounded-full cursor-pointer"
                onClick={() => handleLanguageChange('tr')}
              />
              <img
                src={engIcon}
                alt="İngilizce"
                className="w-[28px] h-[18px] rounded-full cursor-pointer"
                onClick={() => handleLanguageChange('en')}
              />
              <button onClick={toggleDarkMode} className="w-6 h-6">
                <img
                  src={darkMode ? modGece : modGunduz}
                  alt="Koyu Mod"
                  className="w-full h-full"
                />
              </button>
            </div>
          </li>
        </ul>

        {/* Dil ve Mod Toggle for Desktop */}
        <div className="hidden laptop:flex items-center">
          <div className="flex items-center">
            <img
              src={turkIcon}
              alt="Türkçe"
              className="w-[28px] h-[18px] md:w-[42px] md:h-[28px] rounded-full cursor-pointer p-1"
              onClick={() => handleLanguageChange('tr')}
            />
            <img
              src={engIcon}
              alt="İngilizce"
              className="w-[28px] h-[18px] md:w-[42px] md:h-[28px] rounded-full cursor-pointer p-1"
              onClick={() => handleLanguageChange('en')}
            />
            <div className="flex items-center space-x-2">
              <button onClick={toggleDarkMode} className="w-6 h-6 md:w-8 md:h-8 p-1">
                <img
                  src={darkMode ? modGece : modGunduz}
                  alt="Koyu Mod"
                  className="w-full h-full"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;