"use client";

import { motion, useAnimation } from "framer-motion";
import { FaSearch, FaBed, FaCreditCard, FaSmile } from "react-icons/fa";
import { useEffect } from "react";

const steps = [
  {
    id: 1,
    title: "Search for a Hostel",
    icon: <FaSearch />,
    color: "text-blue-500",
  },
  { id: 2, title: "Choose a Room", icon: <FaBed />, color: "text-green-500" },
  {
    id: 3,
    title: "Book & Pay Online",
    icon: <FaCreditCard />,
    color: "text-purple-500",
  },
  {
    id: 4,
    title: "Enjoy Your Stay",
    icon: <FaSmile />,
    color: "text-yellow-500",
  },
];

const HowItWorks = () => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      x: ["0%", "-100%"],
      transition: { repeat: Infinity, duration: 6, ease: "linear" },
    });
  }, [controls]);

  return (
    <div className="relative overflow-hidden py-12 bg-gray-100">
      <h2 className="text-4xl font-bold text-center mb-10 text-gray-800">
        🚆 How It Works
      </h2>

      <motion.div
        className="flex space-x-8 w-max"
        animate={controls}
        onMouseEnter={() => controls.stop()} // Pause on hover
        onMouseLeave={() =>
          controls.start({
            x: ["0%", "-100%"],
            transition: { repeat: Infinity, duration: 10, ease: "linear" },
          })
        }
      >
        {[...steps, ...steps].map((step, index) => (
          <div
            key={index}
            className="min-w-[250px] bg-white shadow-lg rounded-xl p-6 border border-gray-200 flex flex-col items-center text-center"
          >
            <div className={`text-5xl ${step.color} mb-4`}>{step.icon}</div>
            <h3 className="text-lg font-semibold">{step.title}</h3>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default HowItWorks;
