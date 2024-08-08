import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Modal, Box, Typography } from "@mui/material";
import { createCustomer, saveOrder, stripePayment } from "../api/service";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import Input from "../components/Input/Input";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const Checkout = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [address, setAddress] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [country, setCountry] = useState();
  const [city, setCity] = useState();
  const [postalCode, setPostalCode] = useState();
  const [state, setState] = useState();

  const [cardNumber, setCardNumber] = useState();
  const [expiryMonth, setExpiryMonth] = useState();
  const [expiryYear, setExpiryYear] = useState();
  const [cvc, setCvc] = useState();

  const [checkoutButtonDisable, setCheckoutButtonDisable] = useState(true);
  const [newCustomerId, setNewCustomerId] = useState();
  const { cartList } = useSelector((state) => state.cart);

  const totalPrice = cartList.reduce(
    (price, item) => price + item.qty * item.price,
    0
  );

  const stripePromise = loadStripe('pk_test_51Pjhy92MAdf1D5fXT5mHaA81owJF7G2wLnb2cVaacgEH5qOTaq6LHpdjXgRotUMYoZdTtFCZntbeuaGdAJWIdtz600IlOHqQqL');
  const options = {
    // passing the client secret obtained from the server
    clientSecret: 'sk_test_51Pjhy92MAdf1D5fXWUJFRQroZie0jS3KFymyAtEYj9AQcZ4uu9TAvd3oAasybvjHc4aHEHUGFMdBmguhOOryYJkI00Sh8X4Nh3',
  };

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
    await stripePayment(cardNumber, expiryMonth, expiryYear, cvc, 'pk_test_51Pjhy92MAdf1D5fXT5mHaA81owJF7G2wLnb2cVaacgEH5qOTaq6LHpdjXgRotUMYoZdTtFCZntbeuaGdAJWIdtz600IlOHqQqL', totalPrice)
    await saveOrder(newCustomerId, 'shipping', totalPrice, 1, 2);
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
                onClick={handleOpen}
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
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Row className="justify-content-center">
                <Col>

                    <Input name="Card Number" value={cardNumber} type="input" changeHandler={setCardNumber} />
                    <Input name="Expiry Month" value={expiryMonth} type="input" changeHandler={setExpiryMonth} />
                    <Input name="Expiry year" value={expiryYear} type="input" changeHandler={setExpiryYear} />
                    <Input name="CVC" value={cvc} type="input" changeHandler={setCvc} />
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
                      Confirm
                    </button>

                </Col>
              </Row>
            </Box>
          </Modal>
        </Row>
      </Container>
    </section>
  );
};

export default Checkout;
