import React, { useState } from "react";
import RazorpayButton from "./RazorpayButton";
import "bootstrap/dist/css/bootstrap.min.css";
import PaymentPage from "./PaymentPage";

const PaymentMethod = ({ price, discount = 20 }) => {
  const [method, setMethod] = useState("cod");
  const [paymentMethod,setPaymentMethod] = useState();
  const onlineDiscount = 181;
  const finalAmount = price - (method === "online" ? onlineDiscount : 0) - discount;

  const handleSuccess = (res) => {
    console.log("Payment Successful:", res);
    // Redirect or show success message
  };

  return (
    <div className="container mt-4">
      <div className="row">
        {/* Left Side - Payment Options */}
        <div className="col-md-7">
          <h5>Select Payment Method</h5>

          {/* Cash on Delivery */}
          <div
            className={`card mb-3 ${method === "cod" ? "border-primary" : ""}`}
            onClick={() => setMethod("cod")}
            style={{ cursor: "pointer" }}
          >
            <div className="card-body d-flex justify-content-between align-items-center">
              <div>
                <strong>₹{price}</strong>
              </div>
              <div>Cash on Delivery 🪙</div>
              <input
                type="radio"
                name="payment"
                checked={method === "cod"}
                onChange={() => {}}
              />
            </div>
          </div>

          {/* Pay Online */}
          <div
            className={`card mb-3 ${method === "online" ? "border-primary" : ""}`}
            onClick={() => setMethod("online")}
            style={{ cursor: "pointer" }}
          >
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <div className="text-decoration-line-through text-muted">₹{price}</div>
                  <div className="fw-bold fs-5">
                    ₹{price - onlineDiscount} <span className="badge bg-success">Save ₹{onlineDiscount}</span>
                  </div>
                  <small className="text-success">✔ Extra discount with bank offers</small>
                </div>
                <div>Pay Online 💳</div>
                <input
                  type="radio"
                  name="payment"
                  checked={method === "online"}
                  onChange={() => {}}
                />
              </div>

              {/* Online Payment Expanded Section (Only shown if 'online' selected) */}
              {method === "online" && (
                <div className="mt-3 pt-3 border-top">
                  <h6 className="mb-3">Pay by any UPI App → <span className="text-success">Offers Available</span></h6>
                  
                  {/* Scan and Pay Section */}
                  <div className="card mb-3">
                    <div className="card-body text-center">
                      <h6>Scan and Pay</h6>
                      <button className="btn btn-outline-primary mt-2">
                        View QR Code
                      </button>
                      <p className="text-muted mt-2">
                        Click to view and scan QR Code with any UPI App
                      </p>
                    </div>
                  </div>

                  {/* UPI ID Input */}
                  <div className="mb-3">
                    <label className="form-label fw-bold">ADD UPI ID</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g., yourname@upi"
                    />
                  </div>

                  {/* Wallet Option */}
                  <div className="card mb-3">
                    <div className="card-body">
                      <h6>Wallet → <span className="text-success">Offers Available</span></h6>
                      <div className="form-check">
                        <input className="form-check-input" type="radio" name="wallet" id="paytm" />
                        <label className="form-check-label" htmlFor="paytm">
                          Paytm Wallet
                        </label>
                      </div>
                      <div className="form-check">
                        <input className="form-check-input" type="radio" name="wallet" id="phonepe" />
                        <label className="form-check-label" htmlFor="phonepe">
                          PhonePe Wallet
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Reselling Option */}
          <hr />
          <h6>Reselling the order?</h6>
          <p className="mb-1">Click on 'Yes' to add Final Price</p>
          <div className="btn-group" role="group">
            <input type="radio" className="btn-check" name="resell" id="resell-no" defaultChecked />
            <label className="btn btn-outline-secondary" htmlFor="resell-no">No</label>
            <input type="radio" className="btn-check" name="resell" id="resell-yes" />
            <label className="btn btn-outline-secondary" htmlFor="resell-yes">Yes</label>
          </div>
        </div>

        {/* Right Side - Price Summary */}
        <div className="col-md-5 mt-4 mt-md-0">
          <div className="card">
            <div className="card-body">
              <h6>Price Details (9 Items)</h6>
              <div className="d-flex justify-content-between">
                <span>Total Product Price</span>
                <span>₹{price}</span>
              </div>
              <div className="d-flex justify-content-between text-danger">
                <span>Total Discounts</span>
                <span>- ₹{discount + (method === "online" ? onlineDiscount : 0)}</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between fw-bold">
                <span>Order Total</span>
                <span>₹{finalAmount}</span>
              </div>
              <div className="alert alert-success mt-3 py-2 mb-2">
                ✅ Yay! Your total discount is ₹{discount + (method === "online" ? onlineDiscount : 0)}
              </div>
              <p className="text-muted" style={{ fontSize: "0.9rem" }}>
                Clicking on 'Continue' will not deduct any money
              </p>

              {/* Razorpay Button (for Online Payment) */}
              <div className="mt-3">
                {method === "online" ? (
                  // <RazorpayButton
                  //   amount={finalAmount} // Razorpay expects amount in paise

                  // />
                  <PaymentPage amount={finalAmount}/>
                ) : (
                  <button className="btn btn-primary w-100">Continue with COD</button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethod;