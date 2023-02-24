import React, { useState } from "react";
import Alert from "./Alert";
import { useAppSelector } from "../store/hooks";
import FormItem from "./FormItem";

const QuantityModal = () => {
  const [quantity, setQuantity] = useState("0");

  const { showAlert } = useAppSelector((state) => state.generalUI);
  const { singleEvent } = useAppSelector((state) => state.event);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(quantity);
  };

  const handleSubmit = () => {};
  return (
    <div className="qty_modal">
      <div className="qty_modal_bg"></div>
      <div className="qty_modal_content">
        {showAlert && <Alert />}
        <h3>Before You Proceed...</h3>
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
          <button className="btn go_back">{"<"} Go back</button>
        </form>
      </div>
    </div>
  );
};

export default QuantityModal;
