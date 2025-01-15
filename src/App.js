import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from './components/Footer';
import Navbar from "./components/Header";
import Home from './pages/Home';
import Form from './pages/Form';
import { LanguageProvider } from "./assets/LanguageContext";

function App() {
  return (
    <LanguageProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow py-[4rem]">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/form" element={<Form />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;
