"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";

const faqs = [
  {
    question: "What are the check-in and check-out times?",
    answer: "Check-in starts from 2:00 PM, and check-out is before 11:00 AM.",
  },
  {
    question: "Are there any discounts for students or long stays?",
    answer: "Yes! We offer special discounts for students and long-term stays.",
  },
  {
    question: "Is there free Wi-Fi available?",
    answer:
      "Absolutely! All our rooms and common areas have free high-speed Wi-Fi.",
  },
  {
    question: "Can I cancel or modify my booking?",
    answer:
      "Yes, cancellations and modifications are allowed within 24 hours before check-in.",
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="container mx-auto px-6 py-12">
      <h2 className="text-4xl font-bold text-center mb-10 text-gray-800">
        ❓ Frequently Asked Questions
      </h2>
      <div className="max-w-2xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-gray-300 rounded-lg overflow-hidden"
          >
            <button
              className="w-full flex justify-between items-center px-6 py-4 text-lg font-semibold bg-white hover:bg-gray-100 transition"
              onClick={() => toggleFAQ(index)}
            >
              {faq.question}
              <motion.div
                animate={{ rotate: openIndex === index ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <FaChevronDown className="text-gray-500" />
              </motion.div>
            </button>
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={
                openIndex === index
                  ? { height: "auto", opacity: 1 }
                  : { height: 0, opacity: 0 }
              }
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden px-6 bg-gray-50"
            >
              <p className="py-4 text-gray-600">{faq.answer}</p>
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQSection;
