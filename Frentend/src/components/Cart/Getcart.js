// import React, { useEffect, useState, useCallback } from 'react';
// import { DOMAIN } from '../MyForms/Configs';
// import { Col, Container, Row } from 'react-bootstrap';
// import { Button, Card, notification, Spin } from 'antd';
// import Meta from 'antd/es/card/Meta';
// import { PlusOutlined, MinusOutlined, DeleteOutlined } from '@ant-design/icons';
// import axios from 'axios';
// import { useSelector } from 'react-redux';

// export const Getcart = () => {
//     let token = useSelector(state => state.auth.token);
//     token = JSON.parse(token);
//     const [cartData, setCardData] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [totalBill, setTotalBill] = useState(0);

//     const productData = useCallback(async () => {
//         try {
//             setLoading(true);
//             const res = await axios.get(`${DOMAIN}products/cartData`, {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 },
//             });
//             const updatedData = res.data.map(item => ({ ...item, quantity: 1 })); 
//             setCardData(updatedData);
//             const bill = updatedData.reduce((sum, item) => sum + item.price, 0);
//             setTotalBill(bill);
//             setLoading(false);
//         } catch (error) {
//             console.error("Error fetching products:", error);
//         }
//     }, [token]);

//     useEffect(() => {
//         productData();
//     }, [productData]);

//     const handleQuantityChange = (id, delta) => {
//         setCardData(prevData => {
//             const updatedData = prevData.map(item => {
//                 if (item._id === id) {
//                     const newQuantity = Math.max(1, item.quantity + delta);
//                     return { ...item, quantity: newQuantity };
//                 }
//                 return item;
//             });
//             const newTotalBill = updatedData.reduce((sum, item) => sum + item.price * item.quantity, 0);
//             setTotalBill(newTotalBill);
//             return updatedData;
//         });
//     };

//     const RemoveProducts = async ({ _id }) => {
//         try {
//             await axios.post(`${DOMAIN}products/removecart`, { _id }, {
//                 headers: {
//                     Authorization: `Bearer ${token}`
//                 }
//             });
//             notification.success({
//                 message: 'Item Removed',
//                 description: 'Product removed from your cart.',
//                 placement: 'topRight',
//                 duration: 3,
//             });
//             productData();
//         } catch (err) {
//             console.log(err);
//         }
//     };

//     return (
//         <Container className="mt-4">
//             {loading ? (
//                 <div style={{ textAlign: 'center', marginTop: '180px' }}>
//                     <Spin size="large" />
//                 </div>
//             ) : (
//                 <Row>
//                     <Col xs={12} sm={8} md={8} lg={8}>
//                         <Row className="g-4">
//                             {cartData.map((obj, index) => (
//                                 <Col xs={12} key={index}>
//                                     <Card
//                                         hoverable
//                                         className="product-card"
//                                         style={{
//                                             width: '100%',
//                                             boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
//                                             borderRadius: '10px',
//                                             overflow: 'hidden',
//                                         }}
//                                         cover={
//                                             <img
//                                                 alt={obj.title}
//                                                 src={obj.image}
//                                                 style={{ width: '100%', height: '200px', objectFit: 'cover' }}
//                                             />
//                                         }
//                                     >
//                                         <Meta
//                                             title={obj.title}
//                                             description={obj.description.substring(0, 50) + '...'}
//                                         />
//                                         <div
//                                             style={{
//                                                 marginTop: 10,
//                                                 fontWeight: 'bold',
//                                                 fontSize: '16px',
//                                                 textAlign: 'center',
//                                                 color: '#ff5722',
//                                             }}
//                                         >
//                                             ₹{obj.price} x {obj.quantity}
//                                         </div>
//                                         <div
//                                             style={{
//                                                 marginTop: 10,
//                                                 display: 'flex',
//                                                 justifyContent: 'space-between',
//                                                 alignItems: 'center',
//                                             }}
//                                         >

//                                             {obj.quantity > 1 ? (
//                                                 <Button
//                                                     icon={<MinusOutlined />}
//                                                     type="primary"
//                                                     danger
//                                                     onClick={() => handleQuantityChange(obj._id, -1)}
//                                                 />
//                                             ) : (
//                                                 <Button
//                                                     icon={<DeleteOutlined />}
//                                                     type="primary"
//                                                     danger
//                                                     onClick={() => RemoveProducts(obj)}
//                                                 />
//                                             )}
//                                             <div
//                                                 style={{
//                                                     padding: '0 15px',
//                                                     fontSize: '16px',
//                                                     fontWeight: 'bold',
//                                                     color: '#333',
//                                                 }}
//                                             >
//                                                Quantity: {obj.quantity}
//                                             </div>
//                                             <Button
//                                                 icon={<PlusOutlined />}
//                                                 type="primary"
//                                                 onClick={() => handleQuantityChange(obj._id, 1)}
//                                             />
//                                         </div>
//                                     </Card>
//                                 </Col>
//                             ))}
//                         </Row>
//                     </Col>
//                     <Col xs={12} sm={4} md={4} lg={4}>
//                         <div
//                             style={{
//                                 padding: '20px',
//                                 boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
//                                 borderRadius: '10px',
//                                 backgroundColor: '#f9f9f9',
//                             }}
//                         >
//                             <h4 style={{ textAlign: 'center', color: '#333', marginBottom: '20px' }}>Total Bill</h4>
//                             <p
//                                 style={{
//                                     fontSize: '18px',
//                                     fontWeight: 'bold',
//                                     textAlign: 'center',
//                                     color: '#ff5722',
//                                 }}
//                             >
//                                 Total Bill: ₹{totalBill}
//                             </p>
//                             <Button
//                                 type="primary"
//                                 style={{ width: '100%' }}
//                                 className="btn-view-details"
//                             >
//                                 Pay
//                             </Button>
//                         </div>
//                     </Col>
//                 </Row>
//             )}
//         </Container>
//     );
// };

import React, { useEffect, useState, useCallback } from 'react';
import { DOMAIN } from '../MyForms/Configs';
import { Col, Container, Row } from 'react-bootstrap';
import { Button, Card, notification, Spin } from 'antd';
import Meta from 'antd/es/card/Meta';
import { PlusOutlined, MinusOutlined, DeleteOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart } from '../../Redux/Fetures/CartSlice';

export const Getcart = () => {
    const dispatch = useDispatch();
    let token = useSelector(state => state.auth.token);
    token = JSON.parse(token);
    const [cartData, setCardData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalBill, setTotalBill] = useState(0);

    const productData = useCallback(async () => {
        try {
            setLoading(true);
            const res = await axios.get(`${DOMAIN}products/cartData`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const updatedData = res.data.map(item => ({ ...item, quantity: 1 }));
            setCardData(updatedData);
            const bill = updatedData.reduce((sum, item) => sum + item.price, 0);
            setTotalBill(bill);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    }, [token,dispatch]);

    useEffect(() => {
        productData();
    }, [productData]);

    const handleQuantityChange = (id, delta) => {
        setCardData(prevData => {
            const updatedData = prevData.map(item => {
                if (item._id === id) {
                    const newQuantity = Math.max(1, item.quantity + delta);
                    return { ...item, quantity: newQuantity };
                }
                return item;
            });
            const newTotalBill = updatedData.reduce((sum, item) => sum + item.price * item.quantity, 0);
            setTotalBill(newTotalBill);
            return updatedData;
        });
    };

    const RemoveProducts = async ({ _id }) => {
        try {
            await axios.post(`${DOMAIN}products/removecart`, { _id }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            notification.success({
                message: 'Item Removed',
                description: 'Product removed from your cart.',
                placement: 'topRight',
                duration: 3,
            });
            dispatch(removeFromCart(_id));
            productData();
        } catch (err) {
            notification.error({
                message: 'serwer Err',
                description: 'cart data fetching feild.',
                placement: 'topRight',
                duration: 3,
            });
        }
    };
    return (
        <Container fluid className="mt-4">
            {loading ? (
                <div className="text-center" style={{ marginTop: '180px' }}>
                    <Spin size="large" />
                </div>
            ) : (
                <Row>
                    <Col xs={12} sm={8} md={8} lg={8}>
                        <Row className="g-4">
                            {cartData.map((obj, index) => (
                                <Col xs={12} key={index}>
                                    <Card
                                        hoverable
                                        className="product-card shadow-sm rounded "
                                        cover={
                                            <img
                                                alt={obj.name}
                                                src={obj.image}
                                                className="w-100"
                                                style={{ height: '200px', objectFit: 'cover' }}
                                            />
                                        }
                                    >
                                        <Meta
                                            title={obj.name}
                                            description={obj.description.substring(0, 500) + '...'}
                                        />
                                        <div className="text-center mt-2 fw-bold text-danger">
                                            ₹{obj.price} x {obj.quantity}
                                        </div>
                                        <div className="d-flex justify-content-between align-items-center mt-2">
                                            {obj.quantity > 1 ? (
                                                <Button
                                                    icon={<MinusOutlined />}
                                                    type="primary"
                                                    danger
                                                    onClick={() => handleQuantityChange(obj._id, -1)}
                                                />
                                            ) : (
                                                <Button
                                                    icon={<DeleteOutlined />}
                                                    type="primary"
                                                    danger
                                                    onClick={() => RemoveProducts(obj)}
                                                />
                                            )}
                                            <div className="px-3 fw-bold text-secondary">
                                                {obj.quantity}
                                            </div>
                                            <Button
                                                icon={<PlusOutlined />}
                                                type="primary"
                                                onClick={() => handleQuantityChange(obj._id, 1)}
                                            />
                                        </div>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </Col>
                    <Col xs={12} sm={4} md={4} lg={4}>
                        <div className="p-3 shadow-sm rounded bg-light">
                            <h4 className="text-center text-dark mb-3">Total Bill</h4>
                            <p className="fs-5 fw-bold text-center text-danger">
                                Total Bill: ₹{totalBill}
                            </p>
                            <Button
                                type="primary"
                                className="w-100 btn-view-details"
                            >
                                Pay
                            </Button>
                        </div>
                    </Col>
                </Row>
            )}
        </Container>
    );
};
