import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Navbar, CheckoutForm } from "../../components";
import Alert from "../../components/Alert";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
  "pk_test_51L9xvYJpNW4oWp0MXQxdl3qhB8VxY3MuAwFjEG3qVPomZt2ag1eM2OBMcWG4hJD1Y9b58M9kkJYvpss1XuVkGDDz00exYQZgzk"
);

const Checkout = () => {
  const [clientSecret, setClientSecret] = useState("");

  const { singleEvent } = useAppSelector((state) => state.event);
  const { showAlert } = useAppSelector((state) => state.generalUI);
  const dispatch = useAppDispatch();

  useEffect(() => {}, []);

  const goBack = () => {};

  const options = {
    clientSecret,
  };

  return (
    <div>
      <div className="checkout_container">
        <span
          className="checkout_cancel"
          onClick={() => {
            goBack();
          }}
        >
          ❌
        </span>
        <h4>Make Payment</h4>
        {singleEvent ? (
          <div className="checkout_order">
            <p className="checkout_order_details">
              Category: {singleEvent.category} - Location:{" "}
              {singleEvent.location}
            </p>
            <h4 className="checkout_order_title">{singleEvent.title}</h4>
            <p className="checkout_order_amount">
              Total Amount: ${singleEvent.price}
            </p>
          </div>
        ) : (
          <p>No item to purchase</p>
        )}
        {showAlert && <Alert />}
        {clientSecret && (
          <Elements options={options} stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        )}
      </div>
    </div>
  );
};

export default Checkout;
