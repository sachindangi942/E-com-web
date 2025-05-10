import { Steps } from 'antd';
import React from 'react';
import { Container, Navbar } from 'react-bootstrap';
import { useSelector } from 'react-redux';
const {Step} = Steps
const CartHeader = () => {
    const currentStep = useSelector(state=>state.steps);
    return (
        <Navbar className="shadow-non border   py-3 position-relative">
            <Container>
                {/* Left - Logo */}
                <Navbar.Brand href="/" className="fw-bold text-primary fs-4">
                    Smart Market
                </Navbar.Brand>

                {/* Center - Checkout Steps */}
                <div className="position-absolute top-50 start-50 translate-middle text-muted fw-semibold d-flex align-items-center gap-3">
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
            </Container>
        </Navbar>
    );
};

export default CartHeader;
