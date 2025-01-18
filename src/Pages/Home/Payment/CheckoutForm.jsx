import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";

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

  useEffect(() => {
    axiosSecure
      .post("/create-payment-intent", { amount: price })
      .then((res) => {
        setClientSecret(res.data.clientSecret);
      });
  }, [axiosSecure, price]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      setMessage("Stripe is not loaded yet.");
      setLoading(false);
      return;
    }

    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
      setError(error.message);
    } else {
      console.log("Payment Method", paymentMethod);
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
      setMessage("Payment successful! 🎉");
      const payment = {
        name: user.displayName,
        email: user.email,
        amount: price,
        packageName,
        date: new Date(),
        transactionId: paymentIntent.id,
      };
      const res = await axiosSecure.post("/payment", payment);
      console.log(res.data);
    }

    setLoading(false);
  };

  return (
    <div>
      <p className="text-lg">
        You selected the <strong>{packageName}</strong> plan for{" "}
        <strong>${price}</strong>.
      </p>
      <form onSubmit={handleSubmit} className="mt-4  ">
        <CardElement className="p-2 border rounded-md" />
        <button
          type="submit"
          disabled={loading || !stripe}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          {loading ? "Processing..." : "Pay Now"}
        </button>
      </form>
      <p className="text-red-500">{error}</p>
      {message && <p className="mt-2 text-green-500">{message}</p>}
    </div>
  );
};

export default CheckoutForm;
