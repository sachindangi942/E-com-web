// components/Checkout/AddressForm.jsx
import React from 'react';
import { Form, Input, Button, Card, Typography } from 'antd';

const { Title } = Typography;

const AddressForm = ({ onNext }) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('Address:', values);
    onNext?.(values); // Optional chaining in case you want to go to next step
  };

  return (
    <Card className="shadow-sm mt-4" style={{ maxWidth: 600, margin: 'auto' }}>
      <Title level={3}>Shipping Address</Title>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          name="fullname"
          label="Full Name"
          rules={[{ required: true, message: 'Please enter your name' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="address"
          label="Address"
          rules={[{ required: true, message: 'Please enter your address' }]}
        >
          <Input.TextArea rows={3} />
        </Form.Item>

        <Form.Item
          name="city"
          label="City"
          rules={[{ required: true, message: 'Please enter city' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="state"
          label="State"
          rules={[{ required: true, message: 'Please enter state' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="zip"
          label="Zip / Postal Code"
          rules={[{ required: true, message: 'Please enter ZIP code' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="phone"
          label="Phone Number"
          rules={[{ required: true, message: 'Please enter phone number' }]}
        >
          <Input />
        </Form.Item>

        <Button type="primary" htmlType="submit" block>
          Continue to Payment
        </Button>
      </Form>
    </Card>
  );
};

export default AddressForm;
