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
      icon: <FaWifi size={30} className="text-blue-500" />,
      name: "Free Wi-Fi",
    },
    {
      icon: <FaBed size={30} className="text-green-500" />,
      name: "Comfortable Rooms",
    },
    {
      icon: <FaUtensils size={30} className="text-red-500" />,
      name: "Cafeteria",
    },
    {
      icon: <FaShieldAlt size={30} className="text-purple-500" />,
      name: "24/7 Security",
    },
    {
      icon: <FaUserTie size={30} className="text-yellow-500" />,
      name: "Friendly Staff",
    },
    {
      icon: <FaCar size={30} className="text-gray-500" />,
      name: "Parking Available",
    },
  ];

  return (
    <section className="py-12 bg-gray-100 text-center my-14 p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">
        🏨 Featured Facilities
      </h2>
      <p className="text-gray-600 mb-8">
        Experience top-notch services for a comfortable stay.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {facilities.map((facility, index) => (
          <div
            key={index}
            className="flex flex-col items-center bg-white p-4 rounded-lg shadow-md"
          >
            {facility.icon}
            <p className="mt-2 text-lg font-semibold">{facility.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedFacilities;
