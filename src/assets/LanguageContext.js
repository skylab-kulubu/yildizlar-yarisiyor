import React, { createContext, useState, useEffect } from 'react';
import languages from '../assets/languages.json';

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(localStorage.getItem('language') || 'tr');
  const [translations, setTranslations] = useState(languages[language]);

  useEffect(() => {
    setTranslations(languages[language]);
  }, [language]);

  const changeLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  return (
    <LanguageContext.Provider value={{ language, translations, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};