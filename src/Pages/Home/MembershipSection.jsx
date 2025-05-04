import React from "react";
import { useNavigate } from "react-router-dom";

const memberships = [
  {
    id: "Silver",
    name: "Silver",
    price: "9.99",
    bgColor: "bg-gradient-to-br from-gray-100 to-gray-200",
    borderColor: "border-gray-300",
    textColor: "text-gray-800",
  },
  {
    id: "Gold",
    name: "Gold",
    price: "19.99",
    bgColor: "bg-gradient-to-br from-amber-100 to-amber-200",
    borderColor: "border-amber-400",
    textColor: "text-amber-900",
  },
  {
    id: "Platinum",
    name: "Platinum",
    price: "29.99",
    bgColor: "bg-gradient-to-br from-slate-100 to-slate-200",
    borderColor: "border-slate-400",
    textColor: "text-slate-800",
  },
];

const MembershipSection = () => {
  const navigate = useNavigate();

  const handleSelectPlan = (planId, price) => {
    navigate(`/checkoutForm/${planId}/${price}`);
  };

  return (
    <div className="min-h-[600px] flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 py-16 px-4">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
          Choose Your Premium Plan
        </h2>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          Unlock exclusive features and elevate your experience with our premium
          memberships.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full">
        {memberships.map((plan) => (
          <div
            key={plan.id}
            className={`relative p-8 ${plan.bgColor} ${plan.borderColor} border rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 cursor-pointer`}
            onClick={() => handleSelectPlan(plan.id, plan.price)}
          >
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-4 py-1 rounded-full shadow-md">
              <span className={`text-sm font-semibold ${plan.textColor}`}>
                {plan.name}
              </span>
            </div>
            <div className="text-center">
              <h3 className={`text-2xl font-bold ${plan.textColor} mb-4`}>
                {plan.name} Plan
              </h3>
              <div className="flex justify-center items-baseline mb-6">
                <span className={`text-4xl font-extrabold ${plan.textColor}`}>
                  ${plan.price}
                </span>
                <span className={`text-lg ${plan.textColor} ml-1`}>/month</span>
              </div>
              <ul className="text-left space-y-3 mb-8">
                <li className={`text-sm ${plan.textColor}`}>
                  ✓ Premium Feature 1
                </li>
                <li className={`text-sm ${plan.textColor}`}>
                  ✓ Premium Feature 2
                </li>
                <li className={`text-sm ${plan.textColor}`}>
                  ✓ Premium Feature 3
                </li>
              </ul>
              <button
                className={`w-full py-1 px-6 rounded-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 transition-colors ${plan.borderColor}`}
              >
                Select Plan
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MembershipSection;
