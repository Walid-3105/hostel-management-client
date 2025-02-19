"use client";

import winterImage from "../../assets/winter-offer.jpg";
import studentImage from "../../assets/student-offer.jpg";
import longStay from "../../assets/long-stay.jpg";
import { Link } from "react-router-dom";

const offers = [
  {
    id: 1,
    title: "Winter Special - 20% Off",
    description: "Enjoy a cozy stay with a special 20% discount this winter.",
    price: "$9.99/month",
    image: winterImage,
  },
  {
    id: 2,
    title: "Student Exclusive - Save 25%",
    description: "Special offer for students! Show your ID and get 25% off.",
    price: "$19.99/month",
    image: studentImage,
  },
  {
    id: 3,
    title: "Long Stay Package - Save More",
    description: "Stay for 6 months or more and enjoy exclusive discounts.",
    price: "$29.99/month",
    image: longStay,
  },
];

const OffersSection = () => {
  return (
    <div className="container mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center mb-6">
        Special Offers & Discounts
      </h2>
      <div className="grid md:grid-cols-3 gap-6">
        {offers.map((offer) => (
          <div
            key={offer.id}
            className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200"
          >
            <img
              src={offer.image}
              alt={offer.title}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold mt-2">{offer.title}</h3>
              <p className="text-gray-600">{offer.description}</p>
              <p className="text-lg font-bold text-green-600 mt-2">
                {offer.price}
              </p>
              <Link to={`/checkoutForm/Gold/19.99`}>
                <button className="btn btn-sm bg-blue-800 mt-2 text-white">
                  Claim Offer
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OffersSection;
