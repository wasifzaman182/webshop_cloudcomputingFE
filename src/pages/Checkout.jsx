import { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  addToCart,
  decreaseQty,
  deleteProduct,
} from "../app/features/cart/cartSlice";

import Input from "../components/Input/Input";
const Checkout = () => {
  const { cartList } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  // middlware to localStorage
  const totalPrice = cartList.reduce(
    (price, item) => price + item.qty * item.price,
    0
  );
  useEffect(() => {
    window.scrollTo(0, 0);
    // if(CartItem.length ===0) {
    //   const storedCart = localStorage.getItem("cartItem");
    //   setCartItem(JSON.parse(storedCart));
    // }
  }, []);
  return (
    <section className="cart-items">
      <Container>
        <Row className="justify-content-center">
          <Col md={8}>
            <Input name="Email" type="input" />
            <Input name="Email" type="select" />
            <Row>
              <Col>
                <Input name="First Name" type="input" />
              </Col>
              <Col>
                <Input name="Last Name" type="input" />
              </Col>
            </Row>
            <Input name="Address" type="input" />
            <Row>
              <Col>
                <Input name="City" type="input" />
              </Col>
              <Col>
                <Input name="Postal Code" type="input" />
              </Col>
            </Row>
            <Input name="Phone Number" type="input" />
          </Col>
          <Col md={4}>
            <div className="cart-total">
              <h2>Cart Summary</h2>
              <div className=" d_flex">
                <h4>Total Price :</h4>
                <h3>${totalPrice}.00</h3>
              </div>
            </div>
            <Link
              to={"/checkout"}
              style={{
                textDecoration: "none",
              }}
            >
              <button
                aria-label="Add"
                type="submit"
                className="add"
                style={{
                  padding: `15px 15px`,
                  backgroundColor: "#0f3460",
                  color: "white",
                  fontSize: "17px",
                  borderRadius: "7px",
                  width: "220px",
                }}
              >
                Checkout
              </button>
            </Link>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Checkout;
