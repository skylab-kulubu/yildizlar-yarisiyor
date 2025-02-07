import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ytumLogo from "../images/ytumklogo.png";
import turkIcon from "../images/turk.png";
import engIcon from "../images/ing.png";
import modGece from "../images/mod-gece.png";
import modGunduz from "../images/mod-gunduz.png";
import axios from "axios";
import { LanguageContext } from "../assets/LanguageContext";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, translations, changeLanguage } =
    useContext(LanguageContext);

  const navigate = useNavigate();
  const location = useLocation();

  const [logo, setLogo] = useState("");
  const [title, setTitle] = useState("");

  const [isFormActive, setFormActive] = useState(false);

  useEffect(() => {
    document.documentElement.classList.add("dark");

    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.ytumk.com.tr/v1/exapi/event/c7165832-1fad-48bc-9219-dd12e8cd2ec0"
        );
        setLogo(response.data.image_url);
        setTitle(response.data.name);
        setFormActive(response.data.active);
        console.log("Fetched title:", response.data.title);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const toggleDarkMode = () => {
    setIsMenuOpen(false);
    setDarkMode(!darkMode);
    if (darkMode) {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  };

  const handleScrollOrRedirect = () => {
    setIsMenuOpen(false);
    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/");
    }
  };

  const handleScroll = (id) => {
    setIsMenuOpen(false);
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
    setIsMenuOpen(false);
    navigate("/form");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-light-bgcolor dark:bg-dark-bgcolor text-light-black dark:text-dark-white fixed top-0 z-50 w-full">
      <div className="container mx-auto flex items-center justify-between py-4 px-4 md:px-8 lg:px-20 border-b border-light-accentpurple">
        <div className="flex items-center space-x-2">
          <img
            src={logo}
            alt="Yıldız Teknik Üniversitesi Logo"
            className={`w-20 mobile-l:w-36 transition duration-300 h-auto ${
              darkMode ? "" : "filter invert"
            }`}
          />
        </div>
        <div className="laptop:hidden">
          <button
            onClick={toggleMenu}
            className={`focus:outline-none ${
              darkMode ? "text-dark-white" : "text-dark-black"
            }`}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={
                  isMenuOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16M4 18h16"
                }
              ></path>
            </svg>
          </button>
        </div>

        <ul
          className={`py-4 absolute top-16 left-0 w-full bg-light-bgcolor dark:bg-dark-bgcolor laptop:static laptop:flex laptop:flex-row items-center justify-center space-y-4 laptop:space-y-0 laptop:space-x-6 ${
            isMenuOpen ? "flex flex-col" : "hidden"
          } laptop:flex`}
        >
          <li>
            <button
              onClick={handleScrollOrRedirect}
              className="hover:text-dark-accentpurple transitio"
            >
              {translations.header.home}
            </button>
          </li>
          <li>
            <button
              onClick={() => handleScroll("kategoriler")}
              className="hover:text-dark-accentpurple transition laptop:border-l laptop:border-dark-accentpurple pl-0 laptop:pl-4"
            >
              {translations.header.categories}
            </button>
          </li>
          <li>
            <button
              onClick={() => handleScroll("juri")}
              className="hover:text-dark-accentpurple transition laptop:border-l laptop:border-dark-accentpurple pl-0 laptop:pl-4"
            >
              {translations.header.jury}
            </button>
          </li>
          <li>
            <button
              onClick={() => handleScroll("sponsorlar")}
              className="hover:text-dark-accentpurple transition laptop:border-l laptop:border-dark-accentpurple pl-0 laptop:pl-4"
            >
              {translations.header.sponsors}
            </button>
          </li>
          <li>
            <button
              onClick={() => handleScroll("sorular")}
              className="hover:text-dark-accentpurple transition laptop:border-l laptop:border-dark-accentpurple pl-0 laptop:pl-4"
            >
              {translations.header.faq} 
            </button>
          </li>
          {isFormActive && (
            <li>
              <button
                onClick={navigateToForm}
                className="hover:text-dark-accentpurple transition laptop:border-l laptop:border-dark-accentpurple pl-0 laptop:pl-4"
              >
                {translations.header.form}
              </button>
            </li>
          )}
          <li className="flex flex-col items-center space-y-4 laptop:hidden">
            <div className="flex items-center space-x-2">
              <img
                src={turkIcon}
                alt="Türkçe"
                className="w-[28px] h-[18px] rounded-full cursor-pointer"
                onClick={() => changeLanguage("tr")}
              />
              <img
                src={engIcon}
                alt="İngilizce"
                className="w-[28px] h-[18px] rounded-full cursor-pointer"
                onClick={() => changeLanguage("en")}
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

        <div className="hidden laptop:flex items-center">
          <div className="flex items-center">
            <img
              src={turkIcon}
              alt="Türkçe"
              className="w-[28px] h-[18px] md:w-[42px] md:h-[28px] rounded-full cursor-pointer p-1"
              onClick={() => changeLanguage("tr")}
            />
            <img
              src={engIcon}
              alt="İngilizce"
              className="w-[28px] h-[18px] md:w-[42px] md:h-[28px] rounded-full cursor-pointer p-1"
              onClick={() => changeLanguage("en")}
            />
            <div className="flex items-center space-x-2">
              <button
                onClick={toggleDarkMode}
                className="w-6 h-6 md:w-8 md:h-8 p-1"
              >
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
