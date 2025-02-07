import { useState, useContext } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { LanguageContext } from "../../assets/LanguageContext";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const { translations } = useContext(LanguageContext); // <-- Çeviri context

  const faqs = [
    { question: "1. Soru", answer: "1. Soru Cevabı" },
    { question: "2. Soru", answer: "2. Soru Cevabı" },
    { question: "3. Soru", answer: "3. Soru Cevabı" },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-light-black dark:text-dark-white mb-6">
        {translations.sections.faq.title}
      </h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="dark:bg-dark-bgcolor shadow-lg">
            <button
              className="flex justify-between items-center w-full text-light-black dark:text-dark-white font-semibold text-lg p-4"
              onClick={() => toggleFAQ(index)}
            >
              {faq.question}
              {openIndex === index ? (
                <ChevronUp className="text-light-black dark:text-dark-white" />
              ) : (
                <ChevronDown className="text-light-black dark:text-dark-white" />
              )}
            </button>
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{
                height: openIndex === index ? "auto" : 0,
                opacity: openIndex === index ? 1 : 0,
              }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              {openIndex === index && (
                <div className="p-4 text-light-black dark:text-dark-white">
                  {faq.answer}
                </div>
              )}
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
