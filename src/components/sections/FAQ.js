import { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { LanguageContext } from "../../assets/LanguageContext";

const FAQ = () => {
    const [faqs, setFaqs] = useState([]);
    const [openIndex, setOpenIndex] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { translations, language } = useContext(LanguageContext);

    useEffect(() => {
        const fetchFAQs = async () => {
            try {
                const response = await fetch(
                    "https://api.ytumk.com.tr/v1/exapi/event/c7165832-1fad-48bc-9219-dd12e8cd2ec0/faq"
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch FAQs");
                }

                const data = await response.json();

                const formattedFaqs = data.map((faq) => ({
                    id: faq.id,
                    question: faq.question?.[language] || faq.question?.["en"] || "No Question Available",
                    answer: faq.answer?.[language] || faq.answer?.["en"] || "No Answer Available",
                }));

                setFaqs(formattedFaqs);
            } catch (error) {
                console.error("Error fetching FAQs:", error);
                setError("Could not load FAQs. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchFAQs();
    }, [language]);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="max-w-2xl mx-auto p-6">
            <h2 className="text-2xl font-bold text-light-black dark:text-dark-white mb-6">
                {translations?.sections?.faq?.title || "Frequently Asked Questions"}
            </h2>

            {loading ? (
                <p className="text-light-black dark:text-dark-white">Loading FAQs...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : faqs.length > 0 ? (
                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div key={faq.id} className="dark:bg-dark-bgcolor shadow-lg">
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
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                className="overflow-hidden"
                            >
                                <div className="p-4 text-light-black dark:text-dark-white">
                                    {faq.answer}
                                </div>
                            </motion.div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-light-black dark:text-dark-white">No FAQs available.</p>
            )}
        </div>
    );
};

export default FAQ;
