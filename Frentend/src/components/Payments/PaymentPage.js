import axios from "axios";
import React, { useState } from "react";
import { DOMAIN } from "../MyForms/Configs";

const PaymentPage = ({amount}) => {
  const [paymentMethod, setPaymentMethod] = useState("card");

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    const res = await loadRazorpayScript();
    if (!res) {
      alert("Razorpay SDK failed to load");
      return;
    }
const result = await axios.post(`${DOMAIN}api/create-order`,{amount})
    const options = {
      key: " rzp_live_Gw4otHaiQgCHaI", // <-- apni test key daalein
      amount: result.data.amount,
      currency: result.data.currency,
      name: "Sachin Dangi",
      description: "Test Transaction",
      order_id: result.data.id,
      handler: function (response) {
        alert("Payment successful: " + response.razorpay_payment_id);
      },
      method: {
        card: paymentMethod === "card",
        upi: paymentMethod === "upi",
        netbanking: paymentMethod === "netbanking",
      },
      prefill: {
        name: "Sachin Dangi",
        email: "sachin@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#0f172a",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div style={{ padding: "2rem" }}>
      {/* <h2>Choose Payment Method</h2>
      <select
        onChange={(e) => setPaymentMethod(e.target.value)}
        value={paymentMethod}
      >
        <option value="card">Card</option>
        <option value="upi">UPI</option>
        <option value="netbanking">NetBanking</option>
      </select>

      <br />
      <br /> */}
      {/* <button onClick={handlePayment} style={{ padding: "10px 20px" }}>
        Pay Now
      </button> */}
      <button onClick={handlePayment} className="btn btn-primary w-100">Continue with {paymentMethod}</button>
    </div>
  );
};

export default PaymentPage;
