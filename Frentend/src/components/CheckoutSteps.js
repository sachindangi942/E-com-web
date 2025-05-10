import React from "react";
import { Steps } from "antd";
import "antd/dist/reset.css"; // AntD styling (v5 ke liye alag ho sakta hai)

const { Step } = Steps;

const CheckoutSteps = ({ currentStep = 0 }) => {
  return (
<div className="my-4 px-4 d-flex justify-content-center">
  <div className="d-inline-block">
    <Steps
      current={currentStep}
      size="small"
      responsive={true}
      labelPlacement="vertical"
    >
      <Step title="Cart" />
      <Step title="Address" />
      <Step title="Payment" />
      <Step title="Summary" />
    </Steps>
  </div>
</div>

  );
};

export default CheckoutSteps;
