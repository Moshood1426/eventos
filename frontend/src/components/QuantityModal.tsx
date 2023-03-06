import React, { useState } from "react";
import Alert from "./Alert";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import FormItem from "./FormItem";
import { checkout } from "../store/sales/sales.actions";
import { useNavigate } from "react-router-dom";

const QuantityModal: React.FC<{ toggleSelectQty: () => void }> = ({
  toggleSelectQty,
}) => {
  const [quantity, setQuantity] = useState("1");

  const { user } = useAppSelector((state) => state.auth)
  const { showAlert } = useAppSelector((state) => state.generalUI);
  const { singleEvent } = useAppSelector((state) => state.event);
  const { order } = useAppSelector((state) => state.sales);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const qty = event.target.value;
    setQuantity(qty);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if(!user) {
      navigate("/register")
      return
    }
    const eventId = singleEvent.id;
    const result = await dispatch(checkout(eventId, +quantity));
    if (result) {
      navigate(`/checkout?payment_intent_client_secret=${order.clientSecret}`);
    }
  };

  return (
    <div className="qty_modal">
      <div className="qty_modal_bg" onClick={() => toggleSelectQty()}></div>
      <div className="qty_modal_content">
        <h4 className="qty_modal_content_title">Before You Proceed...</h4>
        {showAlert && <Alert />}
        <p className="qty_modal_content_subtitle">
          Kindly input the number of tickets you'll like to purchase for this
          event
        </p>
        <form className="form qty_modal_form" onSubmit={handleSubmit}>
          <FormItem
            name="quantity"
            type="number"
            value={quantity}
            onChange={handleChange}
            placeholder={"Event price /ticket - $"}
          />
          <button className="btn" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default QuantityModal;
