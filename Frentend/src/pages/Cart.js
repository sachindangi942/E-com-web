// // import React, { useEffect, useState, } from 'react';
// // import { DOMAIN } from '../components/MyForms/Configs';
// // import { Col, Container, Row } from 'react-bootstrap';
// // import { Button, Card, Image, notification, Popconfirm, Spin } from 'antd';
// // import Meta from 'antd/es/card/Meta';
// // import { PlusOutlined, MinusOutlined, DeleteOutlined } from '@ant-design/icons';
// // import axios from 'axios';
// // import { useDispatch, useSelector } from 'react-redux';
// // import { removeFromCart } from '../Redux/Fetures/CartSlice';
// // import { fetchCartData, updateProductQuantity } from '../components/Utils/CartApiUtils';

// // export const Cart = () => {
// //     const dispatch = useDispatch();
// //     let token = useSelector(state => state.auth.token);
// //     token = JSON.parse(token);
// //     const [cartData, setCardData] = useState([]);
// //     const [loading, setLoading] = useState(false);
// //     const [totalBill, setTotalBill] = useState(0);

// //     useEffect(() => {
// //         const fetchData = async () => {
// //             try {
// //                 setLoading(true);
// //                 const { updatedData, totalBill } = await fetchCartData(token, DOMAIN);
// //                 setTotalBill(totalBill);
// //                 setCardData(updatedData);
// //                 setLoading(false);

// //             } catch (error) {
// //                 console.log("fetchin cart data error", error);
// //                 setLoading(false);
// //             }
// //         }
// //         fetchData();
// //     }, [token])


// //     const handleQuantityChange = async (_id, delta) => {
// //         await updateProductQuantity(_id, delta, token, DOMAIN, setCardData, setTotalBill);
// //     }

// //     const RemoveProducts = async ({ _id }) => {
// //         try {
// //             await axios.post(`${DOMAIN}products/removecart`, { _id }, {
// //                 headers: {
// //                     Authorization: `Bearer ${token}`
// //                 }
// //             });
// //             notification.success({
// //                 message: 'Item Removed',
// //                 description: 'Product removed from your cart.',
// //                 placement: 'topRight',
// //                 duration: 3,
// //             });
// //             setCardData((prevData) => {
// //                 const updatedData = prevData.filter(item => item._id !== _id);
// //                 setTotalBill(updatedData.reduce((sum, item) => sum + item.price * item.quantity, 0));
// //                 return updatedData
// //             });
// //             dispatch(removeFromCart(_id));
// //         } catch (err) {
// //             notification.error({
// //                 message: 'serwer Err',
// //                 description: 'cart data fetching feild.',
// //                 placement: 'topRight',
// //                 duration: 3,
// //             });
// //         }
// //     };
// //     return (
// //         <Container fluid className="mt-4">
// //             {loading ? (
// //                 <div className="text-center" style={{ marginTop: '180px' }}>
// //                     <Spin size="large" />
// //                 </div>
// //             ) : (
// //                 <Row>
// //                     <Col xs={12} sm={6} md={6} lg={6} >
// //                         <Row className="g-4">
// //                             {cartData.map((obj, index) => (
// //                                 <Col xs={12} key={index} >
// //                                     <Card
// //                                         hoverable
// //                                         className="product-card shadow-sm rounded "
// //                                         cover={
// //                                             <Image
// //                                                 height={200}
// //                                                 width="100%"
// //                                                 alt={obj.name}
// //                                                 src={obj.image}
// //                                                 style={{ objectFit: 'fill' }}
// //                                             />
// //                                         }
// //                                     >
// //                                         <Meta
// //                                             title={obj.name}
// //                                             description={obj.description.substring(0, 500) + '...'}
// //                                         />
// //                                         <div className="text-center mt-2 fw-bold text-danger">
// //                                             ₹{obj.price} x {obj.quantity}
// //                                         </div>
// //                                         <div className="d-flex justify-content-between align-items-center mt-2">
// //                                             {obj.quantity > 1 ? (
// //                                                 <Button
// //                                                     icon={<MinusOutlined />}
// //                                                     type="primary"
// //                                                     danger
// //                                                     onClick={() => handleQuantityChange(obj._id, -1)}
// //                                                 />
// //                                             ) : (
// //                                                 <Popconfirm
// //                                                     title="Are you sure you want to Remove Product?"
// //                                                     onConfirm={() => RemoveProducts(obj)}
// //                                                     okText="Yes"
// //                                                     cancelText="No"
// //                                                 >
// //                                                     <Button
// //                                                         icon={<DeleteOutlined />}
// //                                                         type="primary"
// //                                                         danger
// //                                                     />
// //                                                 </Popconfirm>
// //                                             )}
// //                                             <div className="px-3 fw-bold text-secondary">
// //                                                 {obj.quantity}
// //                                             </div>
// //                                             <Button
// //                                                 icon={<PlusOutlined />}
// //                                                 type="primary"
// //                                                 onClick={() => handleQuantityChange(obj._id, 1)}
// //                                             />
// //                                         </div>
// //                                     </Card>
// //                                 </Col>
// //                             ))}
// //                         </Row>
// //                     </Col>
// //                     <Col xs={12} sm={6} md={6} lg={6}>
// //                         <div className="p-3 shadow-sm rounded bg-light">
// //                             <h4 className="text-center text-dark mb-3">Total Bill</h4>
// //                             <p className="fs-5 fw-bold text-center text-danger">
// //                                 Total Bill: ₹{totalBill}
// //                             </p>
// //                             <Button
// //                                 type="primary"
// //                                 className="w-100 btn-view-details"
// //                             >
// //                                 Pay
// //                             </Button>
// //                         </div>
// //                     </Col>
// //                 </Row>
// //             )}
// //         </Container>
// //     );
// // };




















// import React, { useEffect, useState } from 'react';
// import { DOMAIN } from '../components/MyForms/Configs';
// import { Col, Container, Row } from 'react-bootstrap';
// import { Button, Card, Image, notification, Modal, Spin } from 'antd';
// import Meta from 'antd/es/card/Meta';
// import { PlusOutlined, MinusOutlined, DeleteOutlined, LoadingOutlined } from '@ant-design/icons';
// import axios from 'axios';
// import { useDispatch, useSelector } from 'react-redux';
// import { removeFromCart } from '../Redux/Fetures/CartSlice';
// import { fetchCartData, updateProductQuantity } from '../components/Utils/CartApiUtils';

// export const Cart = () => {
//     const dispatch = useDispatch();
//     let token = useSelector(state => state.auth.token);
//     token = JSON.parse(token);
//     const [cartData, setCardData] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [totalBill, setTotalBill] = useState(0);
//     const [isModalVisible, setIsModalVisible] = useState(false);
//     const [productToRemove, setProductToRemove] = useState(null);
//     const [buttonLoadin, setButtonLoading] = useState({});

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 setLoading(true);
//                 const { updatedData, totalBill } = await fetchCartData(token, DOMAIN);
//                 setTotalBill(totalBill);
//                 setCardData(updatedData);
//                 setLoading(false);
//             } catch (error) {
//                 console.log("fetchin cart data error", error);
//                 setLoading(false);
//             }
//         };
//         fetchData();
//     }, [token]);

//     const handleQuantityChange = async (_id, delta) => {
//         try {
//             setButtonLoading((prev) => ({ ...prev, [_id]: true }))
//             await updateProductQuantity(_id, delta, token, DOMAIN, setCardData, setTotalBill);
//         } catch (error) {
//             console.log(error);
//         } finally {
//             setButtonLoading((prev) => ({ ...prev, [_id]: false }));
//         }

//     };

//     const showModal = (product) => {
//         setProductToRemove(product);
//         setIsModalVisible(true);
//     };

//     const handleOk = async () => {
//         if (productToRemove) {
//             await RemoveProducts(productToRemove);
//         }
//         setIsModalVisible(false);
//     };

//     const handleCancel = () => {
//         setIsModalVisible(false);
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
//                 duration: 2,
//             });
//             setCardData((prevData) => {
//                 const updatedData = prevData.filter(item => item._id !== _id);
//                 setTotalBill(updatedData.reduce((sum, item) => sum + item.price * item.quantity, 0));
//                 return updatedData;
//             });
//             dispatch(removeFromCart(_id));
//         } catch (err) {
//             notification.error({
//                 message: 'Server Error',
//                 description: 'Cart data fetching failed.',
//                 placement: 'topRight',
//                 duration: 3,
//             });
//         }
//     };

//     return (
//         <Container fluid className="mt-4">
//             {loading ? (
//                 <div className="text-center" style={{ marginTop: '180px' }}>
//                     <Spin size="large" />
//                 </div>
//             ) : (
//                 <Row>
//                     <Col xs={12} sm={6} md={6} lg={6}>
//                         <Row className="g-4">
//                             {cartData.map((obj, index) => (
//                                 <Col xs={12} key={index}>
//                                     <Card
//                                         hoverable
//                                         className="product-card shadow-sm rounded "
//                                         cover={
//                                             <Image
//                                                 height={200}
//                                                 width="100%"
//                                                 alt={obj.name}
//                                                 src={obj.image}
//                                                 style={{ objectFit: 'fill' }}
//                                             />
//                                         }
//                                     >
//                                         <Meta
//                                             title={obj.name}
//                                             description={obj.description.substring(0, 500) + '...'}
//                                         />
//                                         <div className="text-center mt-2 fw-bold text-danger">
//                                             ₹{obj.price} x {obj.quantity}
//                                         </div>
//                                         <div className="d-flex justify-content-between align-items-center mt-2">
//                                             {obj.quantity > 1 ? (
//                                                 <Button
//                                                     disabled={buttonLoadin[obj._id]}
//                                                     icon={buttonLoadin[obj._id] ? <Spin indicator={<LoadingOutlined />} /> : <MinusOutlined />}
//                                                     type="primary"
//                                                     danger
//                                                     onClick={() => handleQuantityChange(obj._id, -1)}
//                                                 />
//                                             ) : (
//                                                 <Button
//                                                     icon={<DeleteOutlined />}
//                                                     type="primary"
//                                                     danger
//                                                     onClick={() => showModal(obj)}
//                                                 />
//                                             )}
//                                             <div className="px-3 fw-bold text-secondary">
//                                                 {obj.quantity}
//                                             </div>
//                                             <Button
//                                                 disabled={buttonLoadin[obj._id]}
//                                                 icon={buttonLoadin[obj._id] ? <Spin indicator={<LoadingOutlined />} /> : <PlusOutlined />}
//                                                 type="primary"
//                                                 onClick={() => handleQuantityChange(obj._id, 1)}
//                                             />
//                                         </div>
//                                     </Card>
//                                 </Col>
//                             ))}
//                         </Row>
//                     </Col>
//                     <Col xs={12} sm={6} md={6} lg={6}>
//                         <div className="p-3 shadow-sm rounded bg-light">
//                             <h4 className="text-center text-dark mb-3">Total Bill</h4>
//                             <p className="fs-5 fw-bold text-center text-danger">
//                                 Total Bill: ₹{totalBill}
//                             </p>
//                             <Button
//                                 type="primary"
//                                 className="w-100 btn-view-details"
//                             >
//                                 Pay
//                             </Button>
//                         </div>
//                     </Col>
//                 </Row>
//             )}

//             <Modal
//                 title="Are you sure you want to remove this product?"
//                 open={isModalVisible}
//                 onOk={handleOk}
//                 onCancel={handleCancel}
//                 okText="Yes "
//                 cancelText="No"
//             >
//                 <p>Click Yes to confirm the removal of the product.</p>
//             </Modal>
//         </Container>
//     );
// };








import React, { useEffect, useState } from 'react';
import { DOMAIN } from '../components/MyForms/Configs';
import { Col, Container, Row } from 'react-bootstrap';
import {
    Button,
    Card,
    Image,
    notification,
    Modal,
    Spin,
    Empty,
    Divider,
    Typography,
    Badge
} from 'antd';
import Meta from 'antd/es/card/Meta';
import {
    PlusOutlined,
    MinusOutlined,
    DeleteOutlined,
    LoadingOutlined,
    ShoppingCartOutlined
} from '@ant-design/icons';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart } from '../Redux/Fetures/CartSlice';
import { fetchCartData, updateProductQuantity } from '../components/Utils/CartApiUtils';
import RazorpayButton from '../components/Payments/RazorpayButton';
import CheckoutSteps from '../components/CheckoutSteps';
import AddressForm from '../components/AddressForm';

const { Title, Text } = Typography;

export const Cart = () => {
    const dispatch = useDispatch();
    let token = useSelector(state => state.auth.token);
    token = JSON.parse(token);

    const [cartData, setCardData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalBill, setTotalBill] = useState(0);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [productToRemove, setProductToRemove] = useState(null);
    const [buttonLoading, setButtonLoading] = useState({});
    const [checkoutLoading, setCheckoutLoading] = useState(false);
    const [showRazorpayButton, setShowRazorpayButton] = useState(false);
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [orderDetails, setOrderDetails] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const { updatedData, totalBill } = await fetchCartData(token, DOMAIN);
                setTotalBill(totalBill);
                setCardData(updatedData);
                setLoading(false);
            } catch (error) {
                notification.error({
                    message: 'Error',
                    description: 'Failed to load cart items',
                    placement: 'topRight'
                });
                setLoading(false);
            }
        };
        fetchData();
    }, [token]);

    const handleQuantityChange = async (_id, delta) => {
        try {
            setButtonLoading(prev => ({ ...prev, [_id]: true }));
            await updateProductQuantity(_id, delta, token, DOMAIN, setCardData, setTotalBill);
        } catch {
            notification.error({
                message: 'Error',
                description: 'Failed to update quantity',
                placement: 'topRight'
            });
        } finally {
            setButtonLoading(prev => ({ ...prev, [_id]: false }));
        }
    };

    const showRemoveConfirm = (product) => {
        setProductToRemove(product);
        setIsModalVisible(true);
    };

    const handleRemoveConfirm = async () => {
        if (productToRemove) {
            await RemoveProducts(productToRemove);
        }
        setIsModalVisible(false);
    };

    const handleRemoveCancel = () => {
        setIsModalVisible(false);
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
                placement: 'topRight'
            });
            setCardData(prevData => {
                const updatedData = prevData.filter(item => item._id !== _id);
                setTotalBill(updatedData.reduce((sum, item) => sum + item.price * item.quantity, 0));
                return updatedData;
            });
            dispatch(removeFromCart(_id));
        } catch {
            notification.error({
                message: 'Server Error',
                description: 'Failed to remove item from cart',
                placement: 'topRight'
            });
        }
    };

    const handleCheckout = () => {
        setCheckoutLoading(true);
        setShowRazorpayButton(true);
        setTimeout(() => {
            setCheckoutLoading(false);
            notification.success({
                message: 'Order Placed',
                description: 'Your order has been placed successfully!',
                placement: 'topRight'
            });
        }, 2000);
    };

    const handlePaymentSuccess = (orderDetails) => {
        setPaymentSuccess(true);
        setOrderDetails(orderDetails);
    };

    const calculateTotalItems = () => {
        return cartData.reduce((total, item) => total + item.quantity, 0);
    };

    return (
        <Container className="py-4">
            <CheckoutSteps />
            <AddressForm/>
            <Title level={2} className="text-center mb-4">
                <ShoppingCartOutlined /> Your Shopping Cart
                {cartData.length > 0 && (
                    <Badge
                        count={calculateTotalItems()}
                        style={{ backgroundColor: '#52c41a', marginLeft: 10 }}
                    />
                )}
            </Title>

            {loading ? (
                <div className="text-center" style={{ margin: '100px 0' }}>
                    <Spin size="large" tip="Loading your cart..." />
                </div>
            ) : cartData.length === 0 ? (
                <div className="text-center" style={{ margin: '50px 0' }}>
                    <Empty
                        image={<ShoppingCartOutlined style={{ fontSize: '48px', color: '#1890ff' }} />}
                        imageStyle={{ height: 100 }}
                        description={<Text type="secondary">Your cart is empty. Start shopping now!</Text>}
                    >
                        <Button type="primary" href="/products">Browse Products</Button>
                    </Empty>
                </div>
            ) : paymentSuccess ? (
                <div className="text-center" style={{ margin: '50px 0' }}>
                    <Title level={3} type="success">Order Successful!</Title>
                    <Text>Your order has been placed successfully. Order details:</Text>
                    <pre>{JSON.stringify(orderDetails, null, 2)}</pre>
                    <Button type="primary" href="/products">Continue Shopping</Button>
                </div>
            ) : (
                <Row gap={4}>
                    <Col xs={24} lg={8} ms={8}>
                        <Card className="shadow-sm">
                            {cartData.map((obj, index) => (
                                <React.Fragment key={obj._id}>
                                    <Row align="middle" gutter={[16, 16]} className="mb-3">
                                        <Col xs={24} sm={6} md={5}>
                                            <Image
                                                height={120}
                                                width="100%"
                                                alt={obj.name}
                                                src={obj.image}
                                                style={{ objectFit: 'contain', borderRadius: 8 }}
                                                preview={false}
                                            />
                                        </Col>
                                        <Col xs={24} sm={18} md={19}>
                                            <div className="d-flex flex-column h-100">
                                                <Meta
                                                    title={obj.name}
                                                    description={<Text ellipsis={{ rows: 2 }}>{obj.description}</Text>}
                                                />
                                                <div className="mt-2">
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <Title level={5} className="mb-0 text-danger">
                                                            ₹{obj.price * obj.quantity}{' '}
                                                            <Text type="secondary">(₹{obj.price} × {obj.quantity})</Text>
                                                        </Title>
                                                        <div className="d-flex align-items-center">
                                                            {obj.quantity > 1 ? (
                                                                <Button
                                                                    disabled={buttonLoading[obj._id]}
                                                                    icon={buttonLoading[obj._id] ? <Spin indicator={<LoadingOutlined />} /> : <MinusOutlined />}
                                                                    type="primary"
                                                                    danger
                                                                    size="small"
                                                                    onClick={() => handleQuantityChange(obj._id, -1)}
                                                                />
                                                            ) : (
                                                                <Button
                                                                    icon={<DeleteOutlined />}
                                                                    type="primary"
                                                                    danger
                                                                    size="small"
                                                                    onClick={() => showRemoveConfirm(obj)}
                                                                />
                                                            )}
                                                            <Text strong className="mx-3">
                                                                {obj.quantity}
                                                            </Text>
                                                            <Button
                                                                disabled={buttonLoading[obj._id]}
                                                                icon={buttonLoading[obj._id] ? <Spin indicator={<LoadingOutlined />} /> : <PlusOutlined />}
                                                                type="primary"
                                                                size="small"
                                                                onClick={() => handleQuantityChange(obj._id, 1)}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                    {index < cartData.length - 1 && <Divider />}
                                </React.Fragment>
                            ))}
                        </Card>
                    </Col>
                    <Col xs={24} lg={4} ms={4} className="position-stiky" style={{ top: '20px', zIndex: 10 }}>
                        <Card title="Order Summary" className="shadow-sm">
                            <Row justify="space-between" className="mb-2">
                                <Col><Text>Subtotal ({calculateTotalItems()} items)</Text></Col>
                                <Col><Text strong>₹{totalBill}</Text></Col>
                            </Row>
                            <Row justify="space-between" className="mb-2">
                                <Col><Text>Shipping</Text></Col>
                                <Col><Text strong>FREE</Text></Col>
                            </Row>
                            <Divider className="my-2" />
                            <Row justify="space-between" className="mb-2">
                                <Col><Text strong>Total</Text></Col>
                                <Col><Title level={4} className="mb-0 text-danger">₹{totalBill}</Title></Col>
                            </Row>
                            <Button
                                type="primary"
                                size="large"
                                block
                                loading={checkoutLoading}
                                onClick={handleCheckout}
                                className="mt-3"
                            >
                                Proceed to Checkout
                            </Button>
                            <Button type="text" block href="/" className="mt-2">
                                Continue Shopping
                            </Button>
                        </Card>
                    </Col>
                </Row>
            )}

            <Modal
                title="Confirm Removal"
                open={isModalVisible}
                onOk={handleRemoveConfirm}
                onCancel={handleRemoveCancel}
                okText="Remove"
                cancelText="Keep Item"
                okButtonProps={{ danger: true }}
            >
                <p>Are you sure you want to remove this item from your cart?</p>
            </Modal>

            {showRazorpayButton && (
                <div className="mt-4">
                    <RazorpayButton amount={totalBill} onSuccess={handlePaymentSuccess} />
                </div>
            )}
        </Container>
    );
};



