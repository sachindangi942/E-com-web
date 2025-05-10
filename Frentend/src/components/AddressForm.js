// // components/Checkout/AddressForm.jsx
// import React from 'react';
// import { Form, Input, Button, Card, Typography } from 'antd';
// import { useDispatch } from 'react-redux';
// import { currentSteps } from '../Redux/Fetures/CheckoutSteps';

// const { Title } = Typography;

// const AddressForm = ({ onNext }) => {
//   const [form] = Form.useForm();
//   const dispatch = useDispatch();

//   const onFinish = (values) => {
//     console.log('Address:', values);
//     onNext?.(values); // Optional chaining in case you want to go to next step
//     dispatch(currentSteps(2))
//   };

//   return (
//     <Card className="shadow-sm mt-4" style={{ maxWidth: 600, margin: 'auto' }}>
//       <Title level={3}>Shipping Address</Title>
//       <Form
//         form={form}
//         layout="vertical"
//         onFinish={onFinish}
//         autoComplete="off"
//       >
//         <Form.Item
//           name="fullname"
//           label="Full Name"
//           rules={[{ required: true, message: 'Please enter your name' }]}
//         >
//           <Input />
//         </Form.Item>

//         <Form.Item
//           name="address"
//           label="Address"
//           rules={[{ required: true, message: 'Please enter your address' }]}
//         >
//           <Input.TextArea rows={3} />
//         </Form.Item>

//         <Form.Item
//           name="city"
//           label="City"
//           rules={[{ required: true, message: 'Please enter city' }]}
//         >
//           <Input />
//         </Form.Item>

//         <Form.Item
//           name="state"
//           label="State"
//           rules={[{ required: true, message: 'Please enter state' }]}
//         >
//           <Input />
//         </Form.Item>

//         <Form.Item
//           name="zip"
//           label="Zip / Postal Code"
//           rules={[{ required: true, message: 'Please enter ZIP code' }]}
//         >
//           <Input />
//         </Form.Item>

//         <Form.Item
//           name="phone"
//           label="Phone Number"
//           rules={[{ required: true, message: 'Please enter phone number' }]}
//         >
//           <Input />
//         </Form.Item>

//         <Button type="primary" htmlType="submit" block

//         >
//           Continue to Payment
//         </Button>
//       </Form>
//     </Card>
//   );
// };

// export default AddressForm;



// without google map autofill location components/Checkout/AddressForm.jsx
import React, { useEffect } from 'react';
import { Form, Input, Button, Card, Typography, message } from 'antd';
import { useDispatch } from 'react-redux';
import { currentSteps } from '../Redux/Fetures/CheckoutSteps';

const { Title } = Typography;

const AddressForm = ({ onNext }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const onFinish = (values) => {
    console.log('Address:', values);
    onNext?.(values);
    dispatch(currentSteps(2));
  };

  const addressFields = [
    {
      name: 'fullname',
      label: 'Full Name',
      inputType: 'input',
      message: 'Please enter your name',
    },
    {
      name: 'address',
      label: 'Address',
      inputType: 'textarea',
      message: 'Please enter your address',
    },
    {
      name: 'city',
      label: 'City',
      inputType: 'input',
      message: 'Please enter city',
    },
    {
      name: 'state',
      label: 'State',
      inputType: 'input',
      message: 'Please enter state',
    },
    {
      name: 'zip',
      label: 'Zip / Postal Code',
      inputType: 'input',
      message: 'Please enter ZIP code',
    },
    {
      name: 'phone',
      label: 'Phone Number',
      inputType: 'input',
      message: 'Please enter phone number',
    },
  ];

  // 🔄 Fetch current location on component mount
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const res = await fetch(
            `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=43f0529ad71646ea817d609ae471f7ca`
          );
          const data = await res.json();

          if (data?.results?.length > 0) {
            const location = data.results[0].components;

            form.setFieldsValue({
              address: data.results[0].formatted,
              city: location.city || location.town || '',
              state: location.state || '',
            });
          } else {
            message.warning('Location not found from coordinates');
          }
        } catch (err) {
          console.error('Geocoding error:', err);
          message.error('Failed to fetch address from coordinates');
        }
      },
      (error) => {
        console.error(error);
        message.warning('Permission denied or location unavailable');
      }
    );
  }, [form]);

  return (
    <Card className="shadow-sm mt-4" style={{ maxWidth: 600, margin: 'auto' }}>
      <Title level={3}>Shipping Address</Title>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
      >
        {addressFields.map((field) => (
          <Form.Item
            key={field.name}
            name={field.name}
            label={field.label}
            rules={[{ required: true, message: field.message }]}
          >
            {field.inputType === 'textarea' ? (
              <Input.TextArea rows={3} />
            ) : (
              <Input />
            )}
          </Form.Item>
        ))}

        <Button type="primary" htmlType="submit" block>
          Continue to Payment
        </Button>
      </Form>
    </Card>
  );
};

export default AddressForm;



// // components/Checkout/AddressForm.jsx
// import React, { useState, useEffect, useCallback } from 'react';
// import { Form, Input, Button, Card, Typography, message, Row, Col } from 'antd';
// import { useDispatch } from 'react-redux';
// import { currentSteps } from '../Redux/Fetures/CheckoutSteps';
// import { GoogleMap, LoadScript, Marker, Autocomplete } from '@react-google-maps/api';

// const { Title } = Typography;

// const AddressForm = ({ onNext }) => {
//   const [form] = Form.useForm();
//   const [location, setLocation] = useState({ lat: 28.6139, lng: 77.2090 }); // Default location (Delhi)
//   const [address, setAddress] = useState('');
//   const [autocomplete, setAutocomplete] = useState(null);
//   const dispatch = useDispatch();

//   const onFinish = (values) => {
//     console.log('Address:', values);
//     onNext?.(values);
//     dispatch(currentSteps(2));
//   };

//   // This function will set the location from Google Maps
//   const onMarkerDragEnd = useCallback((e) => {
//     setLocation({
//       lat: e.latLng.lat(),
//       lng: e.latLng.lng(),
//     });
//     getAddressFromCoords(e.latLng.lat(), e.latLng.lng());
//   }, []);

//   // Fetch address from coordinates using reverse geocoding
//   const getAddressFromCoords = async (lat, lng) => {
//     try {
//       const res = await fetch(
//         `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=YOUR_GOOGLE_API_KEY`
//       );
//       const data = await res.json();
//       if (data.status === 'OK') {
//         const formattedAddress = data.results[0]?.formatted_address;
//         setAddress(formattedAddress);
//         form.setFieldsValue({
//           address: formattedAddress,
//           city: data.results[0]?.address_components.find((comp) => comp.types.includes('locality'))?.long_name || '',
//           state: data.results[0]?.address_components.find((comp) => comp.types.includes('administrative_area_level_1'))?.long_name || '',
//           zip: data.results[0]?.address_components.find((comp) => comp.types.includes('postal_code'))?.long_name || '',
//         });
//       }
//     } catch (error) {
//       message.error('Failed to fetch address.');
//     }
//   };

//   // Handle place change from Autocomplete input
//   const onPlaceChanged = () => {
//     const place = autocomplete.getPlace();
//     if (place.geometry) {
//       setLocation({
//         lat: place.geometry.location.lat(),
//         lng: place.geometry.location.lng(),
//       });
//       setAddress(place.formatted_address);
//       form.setFieldsValue({
//         address: place.formatted_address,
//         city: place.address_components.find((comp) => comp.types.includes('locality'))?.long_name || '',
//         state: place.address_components.find((comp) => comp.types.includes('administrative_area_level_1'))?.long_name || '',
//         zip: place.address_components.find((comp) => comp.types.includes('postal_code'))?.long_name || '',
//       });
//     }
//   };

//   useEffect(() => {
//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         const { latitude, longitude } = position.coords;
//         setLocation({ lat: latitude, lng: longitude });
//         getAddressFromCoords(latitude, longitude);
//       },
//       (error) => {
//         console.error('Error getting location:', error);
//         message.warning('Unable to fetch location');
//       }
//     );
//   }, []);

//   return (
//     <Card className="shadow-sm mt-4" style={{ maxWidth: 600, margin: 'auto' }}>
//       <Title level={3}>Shipping Address</Title>
//       <Form form={form} layout="vertical" onFinish={onFinish} autoComplete="off">
//         <Form.Item name="fullname" label="Full Name" rules={[{ required: true, message: 'Please enter your name' }]}>
//           <Input />
//         </Form.Item>

//         <Form.Item name="address" label="Address" rules={[{ required: true, message: 'Please enter your address' }]}>
//           <Input.TextArea rows={3} />
//         </Form.Item>

//         <Form.Item name="city" label="City" rules={[{ required: true, message: 'Please enter city' }]}>
//           <Input />
//         </Form.Item>

//         <Form.Item name="state" label="State" rules={[{ required: true, message: 'Please enter state' }]}>
//           <Input />
//         </Form.Item>

//         <Form.Item name="zip" label="Zip / Postal Code" rules={[{ required: true, message: 'Please enter ZIP code' }]}>
//           <Input />
//         </Form.Item>

//         <Form.Item name="phone" label="Phone Number" rules={[{ required: true, message: 'Please enter phone number' }]}>
//           <Input />
//         </Form.Item>

//         <LoadScript googleMapsApiKey="YOUR_GOOGLE_API_KEY">
//           <GoogleMap
//             mapContainerStyle={{ width: '100%', height: '300px' }}
//             center={location}
//             zoom={15}
//             onLoad={(map) => {
//               const input = document.getElementById('autocomplete');
//               const options = { fields: ['place_id', 'geometry', 'formatted_address', 'address_components'] };
//               const newAutocomplete = new window.google.maps.places.Autocomplete(input, options);
//               newAutocomplete.addListener('place_changed', onPlaceChanged);
//               setAutocomplete(newAutocomplete);
//             }}
//           >
//             <Marker position={location} draggable onDragEnd={onMarkerDragEnd} />
//           </GoogleMap>

//           <Row gutter={[16, 16]} className="mt-4">
//             <Col span={24}>
//               <Input id="autocomplete" placeholder="Search for an address" />
//             </Col>
//           </Row>
//         </LoadScript>

//         <Button type="primary" htmlType="submit" block>
//           Continue to Payment
//         </Button>
//       </Form>
//     </Card>
//   );
// };

// export default AddressForm;
