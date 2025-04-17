
import React from "react";
import axios from "axios";
import { DOMAIN } from "../MyForms/Configs";

const RazorpayButton = ({amount}) => {
  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

    if (!res) {
      alert("Razorpay SDK failed to load.");
      return;
    }

    const result = await axios.post(`${DOMAIN}api/create`);

    const options = {
      key: "rzp_test_3mfGBELpcMMv0w", // dashboard से
      amount: result.data.amount,
      currency: result.data.currency,
      name: "Sachin Dangi",
      description: "Test Transaction",
      order_id: result.data.id,
      handler: function (response) {
        alert("Payment successful!");
        console.log(response);
      },
      prefill: {
        name: "Sachin Dangi",
        email: "sachin@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div style={{ textAlign: "center", marginTop: 50 }}>
      <h2>Pay ₹{amount} using Razorpay</h2>
      <button onClick={handlePayment} style={{ padding: "10px 20px", fontSize: "16px" }}>
        Pay Now
      </button>
    </div>
  );
};

export default RazorpayButton;
