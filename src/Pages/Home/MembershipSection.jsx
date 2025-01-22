import React from "react";
import { useNavigate } from "react-router-dom";

const memberships = [
  {
    id: "Silver",
    name: "Silver",
    price: "9.99",
    bgColor: "bg-gray-300",
  },
  { id: "Gold", name: "Gold", price: "19.99", bgColor: "bg-yellow-400" },
  {
    id: "Platinum",
    name: "Platinum",
    price: "29.99",
    bgColor: "bg-gray-300",
  },
];

const MembershipSection = () => {
  const navigate = useNavigate();

  const handleSelectPlan = (planId, price) => {
    navigate(`/checkoutForm/${planId}/${price}`);
  };

  return (
    <div className="min-h-[400px] flex flex-col items-center justify-center bg-gray-100 p-6">
      <h2 className="text-3xl font-bold mb-6">Upgrade to Premium</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {memberships.map((plan) => (
          <div
            key={plan.id}
            className={`p-10 ${plan.bgColor} text-gray-800 rounded-lg shadow-lg cursor-pointer hover:scale-105 transition`}
            onClick={() => handleSelectPlan(plan.id, plan.price)}
          >
            <h3 className="text-xl font-semibold">{plan.name} Plan</h3>
            <p className="text-lg font-medium">{plan.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MembershipSection;
