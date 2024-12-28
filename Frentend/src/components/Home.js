import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Card, notification, Spin } from 'antd';
import { Container, Row, Col } from 'react-bootstrap';
import './Home.css';
import { useDispatch, useSelector } from 'react-redux';
import { DOMAIN } from './MyForms/Configs';
import { addToCart} from '../Redux/Fetures/CartSlice';
const { Meta } = Card;

export const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const cartData = useSelector((state)=>state.cart.Product.map(({_id})=>_id));
  let token = useSelector((state) => state.auth.token);
  token = JSON.parse(token);
  const dispatch = useDispatch();


  const productData = useCallback(async () => {
    try {
      setLoading(true);
      // const res = await axios.get("https://api.escuelajs.co/api/v1/products");
      const res = await axios.get(`${DOMAIN}products/getProducts`);
      setLoading(false);
      setProducts(res.data);
    } catch (error) {
      setLoading(false);
      notification.error({
        message: 'Server Error',
        description: 'Something went wrong',
        placement: 'topRight',
        duration: 3,
      });
    }
  }, []);
  useEffect(() => {
    productData();
  }, [productData]);

  const AddToCard = async ({ _id, name, price, description, image }) => {
    let CartProduct = { name, price, description, _id ,image};
    try {
     const res =  await axios.post(
        `${DOMAIN}products/addToCard`,
        CartProduct,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(addToCart(res?.data));
      notification.success({
        message: 'Product Added',
        description: 'Product added to cart',
        placement: 'topRight',
        duration: 3,
      });
    } catch (err) {
      console.log(err)
      notification.error({
        message: 'Server Error',
        description: 'Something went wrong',
        placement: 'topRight',
        duration: 3,
      });
    }
  };
  return (
    <Container className="mt-4">
      {loading ? (
        <div style={{ textAlign: 'center', marginTop: '180px' }}>
          <Spin size="large" />
        </div>
      ) : (
        <Row className="g-4">
          {products.map((obj, index) => (
            <Col xs={12} sm={6} md={4} lg={3} key={index}>
              <Card
                hoverable
                className="product-card"
                style={{
                  width: '100%',
                  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
                  borderRadius: '10px',
                  overflow: 'hidden',
                }}
                cover={
                  <img
                    alt={obj.name}
                    src={obj.image}
                    style={{ width: '100%', height: '200px', objectFit: 'fill' }}
                  />
                }
              >
                <Meta
                  title={obj.name}
                  description={obj.description.substring(0, 50) + '...'}
                />
                <div
                  style={{
                    marginTop: 10,
                    fontWeight: 'bold',
                    fontSize: '16px',
                    textAlign: 'center',
                    color: '#ff5722',
                  }}
                >
                  ₹{obj.price}
                </div>
                <div
                  style={{
                    marginTop: 10,
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  <Button
                    disabled={Object.values( cartData).includes(obj._id)}
                    style={{ flex: 1, marginRight: 5 }}
                    className="btn-add-cart"
                    onClick={() => AddToCard(obj)}
                  >
                    {Object.values( cartData).includes(obj._id) ? 'Added' : 'Add to Cart'}
                  </Button>
                  <Button
                    type="default"
                    style={{ flex: 1 }}
                    className="btn-view-details"
                  >
                    View Details
                  </Button>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};
