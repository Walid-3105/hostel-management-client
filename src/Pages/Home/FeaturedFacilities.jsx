import React from "react";
import {
  FaWifi,
  FaBed,
  FaUtensils,
  FaShieldAlt,
  FaUserTie,
  FaCar,
} from "react-icons/fa";

const FeaturedFacilities = () => {
  const facilities = [
    {
      icon: <FaWifi size={32} className="text-blue-600" />,
      name: "Free Wi-Fi",
    },
    {
      icon: <FaBed size={32} className="text-green-600" />,
      name: "Comfortable Rooms",
    },
    {
      icon: <FaUtensils size={32} className="text-red-600" />,
      name: "Cafeteria",
    },
    {
      icon: <FaShieldAlt size={32} className="text-purple-600" />,
      name: "24/7 Security",
    },
    {
      icon: <FaUserTie size={32} className="text-yellow-600" />,
      name: "Friendly Staff",
    },
    {
      icon: <FaCar size={32} className="text-gray-600" />,
      name: "Parking Available",
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-gray-100 text-center my-14 px-4">
      <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
        🏨 Featured Facilities
      </h2>
      <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
        Experience top-notch services for a comfortable and memorable stay.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {facilities.map((facility, index) => (
          <div
            key={index}
            className="flex flex-col items-center bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 cursor-pointer"
          >
            {facility.icon}
            <p className="mt-3 text-lg font-semibold text-gray-800">
              {facility.name}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedFacilities;
