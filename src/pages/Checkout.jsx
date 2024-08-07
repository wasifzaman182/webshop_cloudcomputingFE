import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createCustomer, saveOrder } from "../api/service";

import Input from "../components/Input/Input";

const Checkout = () => {
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [address, setAddress] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [country, setCountry] = useState();
  const [city, setCity] = useState();
  const [postalCode, setPostalCode] = useState();
  const [state, setState] = useState();

  const [checkoutButtonDisable, setCheckoutButtonDisable] = useState(true);
  const [newCustomerId, setNewCustomerId] = useState();
  const { cartList } = useSelector((state) => state.cart);

  const totalPrice = cartList.reduce(
    (price, item) => price + item.qty * item.price,
    0
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const saveCustomer = async () => {
    console.log("Saving customer information");

    const customer = await createCustomer(
      firstName,
      lastName,
      email,
      phoneNumber,
      address,
      postalCode,
      country,
      state,
      city
    );

    console.log("Customer information saved!");

    setCheckoutButtonDisable(false);
    setNewCustomerId(customer.id);
  };

  const createOrder = async () => {
    await saveOrder(newCustomerId, 'shipping', totalPrice, address, address);
  };

  const checkoutButtonClassName =
    "add " + (checkoutButtonDisable ? "disable" : "");

  return (
    <section className="cart-items">
      <Container>
        <Row className="justify-content-center">
          <Col md={8}>
            <Input
              name="Email"
              type="input"
              value={email}
              changeHandler={setEmail}
            />
            <Input
              name="Country"
              type="select"
              value={country}
              changeHandler={setCountry}
            />
            <Row>
              <Col>
                <Input
                  name="First Name"
                  type="input"
                  value={firstName}
                  changeHandler={setFirstName}
                />
              </Col>
              <Col>
                <Input
                  name="Last Name"
                  type="input"
                  value={lastName}
                  changeHandler={setLastName}
                />
              </Col>
            </Row>
            <Input
              name="Address"
              type="input"
              value={address}
              changeHandler={setAddress}
            />
            <Input
              name="State"
              type="input"
              value={state}
              changeHandler={setState}
            />
            <Row>
              <Col>
                <Input
                  name="City"
                  type="input"
                  value={city}
                  changeHandler={setCity}
                />
              </Col>
              <Col>
                <Input
                  name="Postal Code"
                  type="input"
                  value={postalCode}
                  changeHandler={setPostalCode}
                />
              </Col>
            </Row>
            <Input
              name="Phone Number"
              type="input"
              value={phoneNumber}
              changeHandler={setPhoneNumber}
            />
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
                onClick={createOrder}
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
