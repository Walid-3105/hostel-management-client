"use client";

import { FaSearch, FaBed, FaCreditCard, FaSmile } from "react-icons/fa";

const steps = [
  {
    id: 1,
    title: "Search for a Hostel",
    icon: <FaSearch />,
    color: "text-blue-500",
  },
  {
    id: 2,
    title: "Choose a Room",
    icon: <FaBed />,
    color: "text-green-500",
  },
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
  return (
    <div className="relative overflow-hidden py-12 bg-gray-100">
      <h2 className="text-4xl font-bold text-center mb-10 text-gray-800">
        🚆 How It Works
      </h2>

      <div className="relative w-full overflow-hidden">
        {/* Marquee Container */}
        <div className="flex w-max animate-marquee space-x-8">
          {[...steps, ...steps].map((step, index) => (
            <div
              key={index}
              className="min-w-[250px] bg-white shadow-lg rounded-xl p-6 border border-gray-200 flex flex-col items-center text-center"
            >
              <div className={`text-5xl ${step.color} mb-4`}>{step.icon}</div>
              <h3 className="text-lg font-semibold">{step.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
