import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { CheckoutForm } from "../../components";
import Alert from "../../components/Alert";
import { useAppSelector } from "../../store/hooks";
import { Elements } from "@stripe/react-stripe-js";

import { useNavigate } from "react-router-dom";

const stripePromise = loadStripe(
  "pk_test_51KquqlF4FMElgbnODSdLfBuLsEDCQLJy0PxFlQWA5SxOIgcnbhSbe92FEUySR9vWUIJR3zPpwNZnRmGn0zYFYZLO00hEMl9PW1"
);

const Checkout = () => {
  const [clientSecret, setClientSecret] = useState("");

  const { singleEvent } = useAppSelector((state) => state.event);
  const { showAlert } = useAppSelector((state) => state.generalUI);
  const { order } = useAppSelector((state) => state.sales);

  const navigate = useNavigate();

  useEffect(() => {
    if (!order.clientSecret) {
      navigate("/single-ticket");
    }
    setClientSecret(order.clientSecret);
    //eslint-disable-next-line
  }, []);

  const goBack = () => {
    navigate("/single-ticket");
  };

  const options = {
    clientSecret,
  };

  return (
    <div className="checkout_container">
      <div className="checkout_content">
        <span
          className="checkout_content_cancel"
          onClick={() => {
            goBack();
          }}
        >
          ❌
        </span>
        <h5 className="checkout_content_title">Complete Payment</h5>
        {singleEvent ? (
          <div className="checkout_content_order">
            <h5 className="checkout_order_title">{singleEvent.title}</h5>
            <p className="checkout_order_details">
              Category: {singleEvent.category} - Location:{" "}
              {singleEvent.location}
            </p>
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
