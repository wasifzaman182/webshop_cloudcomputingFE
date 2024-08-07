import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  addToCart,
  decreaseQty,
  deleteProduct,
} from "../app/features/cart/cartSlice";
import { createCustomer } from "../api/service";

import Input from "../components/Input/Input";
const Checkout = () => {
  const [checkoutButtonDisable, setCheckoutButtonDisable] = useState(true);
  const { cartList } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  // middlware to localStorage
  const totalPrice = cartList.reduce(
    (price, item) => price + item.qty * item.price,
    0
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const saveCustomer = async () => {
    console.log("Saving customer information");
    // await createCustomer();
    console.log("Customer information saved!");
    setCheckoutButtonDisable(false);
  };

  const checkoutButtonClassName =
    "add " + (checkoutButtonDisable ? "disable" : "");

  return (
    <section className="cart-items">
      <Container>
        <Row className="justify-content-center">
          <Col md={8}>
            <Input name="Email" type="input" />
                <Input name="Country" type="select" />
            <Row>
              <Col>
                <Input name="First Name" type="input" />
              </Col>
              <Col>
                <Input name="Last Name" type="input" />
              </Col>
            </Row>
            <Input name="Address" type="input" />
            <Input name="State" type="input" />
            <Row>
              <Col>
                <Input name="City" type="input" />
              </Col>
              <Col>
                <Input name="Postal Code" type="input" />
              </Col>
            </Row>
            <Input name="Phone Number" type="input" />
            <button
              aria-label="Add"
              type="submit"
              className="add"
              onClick={saveCustomer}
              style={{
                padding: `15px 15px`,
                backgroundColor: "#0f3460",
                color: "white",
                fontSize: "17px",
                borderRadius: "7px",
                width: "220px",
              }}
            >
              Save
            </button>
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
                className={checkoutButtonClassName}
                disabled={checkoutButtonDisable}
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
