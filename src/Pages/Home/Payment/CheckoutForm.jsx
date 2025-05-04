import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import toast from "react-hot-toast";

const CheckoutForm = () => {
  const stripe = useStripe();
  const { user } = useAuth();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { packageName, price } = useParams();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("stripe"); // State for payment method selection

  useEffect(() => {
    if (paymentMethod === "stripe") {
      axiosSecure
        .post("/create-payment-intent", { amount: price })
        .then((res) => {
          setClientSecret(res.data.clientSecret);
        });
    }
    // Add logic for other payment methods in the future
  }, [axiosSecure, price, paymentMethod]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (paymentMethod === "stripe") {
      if (!stripe || !elements) {
        setMessage("Stripe is not loaded yet.");
        setLoading(false);
        return;
      }

      const card = elements.getElement(CardElement);
      if (card === null) {
        setLoading(false);
        return;
      }

      const { error, paymentMethod: stripePaymentMethod } =
        await stripe.createPaymentMethod({
          type: "card",
          card,
        });

      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      } else {
        setError("");
      }

      // Confirm payment
      const { paymentIntent, error: confirmError } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: card,
            billing_details: {
              email: user?.email || "anonymous",
              name: user?.displayName || "anonymous",
            },
          },
        });

      if (confirmError) {
        setMessage(confirmError.message);
      } else if (paymentIntent.status === "succeeded") {
        toast.success("Payment done");
        setMessage("Payment successful! 🎉");
        const payment = {
          name: user.displayName,
          email: user.email,
          amount: price,
          packageName,
          date: new Date(),
          transactionId: paymentIntent.id,
        };
        await axiosSecure.post("/payment", payment);
      }
    } else {
      // Placeholder for future payment method
      setMessage("This payment method is not yet implemented.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 py-12 px-4 mt-10">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-6 sm:p-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-4">
          Checkout for {packageName} Plan
        </h2>
        <div className="bg-blue-50 rounded-lg p-4 mb-6 text-center">
          <p className="text-base sm:text-lg text-gray-700">
            Plan:{" "}
            <span className="font-semibold text-blue-700">{packageName}</span>
            <br />
            Amount:{" "}
            <span className="font-semibold text-blue-700">${price}</span>/month
          </p>
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Payment Method
          </label>
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={() => setPaymentMethod("stripe")}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                paymentMethod === "stripe"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Credit/Debit Card
            </button>
            <button
              type="button"
              onClick={() => setPaymentMethod("other")}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                paymentMethod === "other"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Other (Coming Soon)
            </button>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {paymentMethod === "stripe" ? (
            <div className="border border-gray-200 rounded-lg p-4 bg-gray-50 shadow-sm">
              <CardElement
                options={{
                  style: {
                    base: {
                      fontSize: "16px",
                      color: "#1f2937",
                      "::placeholder": {
                        color: "#9ca3af",
                      },
                    },
                    invalid: {
                      color: "#ef4444",
                    },
                  },
                }}
              />
            </div>
          ) : (
            <div className="text-center text-gray-500">
              This payment method will be available soon.
            </div>
          )}
          <button
            type="submit"
            disabled={loading || !stripe || paymentMethod !== "stripe"}
            className={`w-full py-3 px-6 rounded-lg font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200 ${
              loading || !stripe || paymentMethod !== "stripe"
                ? "opacity-60 cursor-not-allowed"
                : ""
            }`}
          >
            {loading ? "Processing..." : "Confirm Payment"}
          </button>
        </form>
        {error && (
          <p className="mt-3 text-sm text-red-600 text-center">{error}</p>
        )}
        {message && (
          <p className="mt-3 text-sm text-green-600 text-center">{message}</p>
        )}
      </div>
    </div>
  );
};

export default CheckoutForm;
