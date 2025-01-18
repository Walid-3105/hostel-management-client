import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm"; // Ensure correct import

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_PK);

const Payment = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white p-6 rounded-lg shadow-md w-full">
        <h2 className="text-2xl font-bold mb-4">Secure Payment</h2>
        <Elements stripe={stripePromise}>
          <CheckoutForm /> {/* Ensure it's wrapped inside <Elements> */}
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
