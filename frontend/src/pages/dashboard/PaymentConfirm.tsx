import React from "react";
import Confetti from "react-confetti";
import useWindowSize from "../../utils/useWindowSize";
import { Link } from "react-router-dom";

const PaymentConfirm = () => {
  const { width, height } = useWindowSize();

  return (
    <div>
      <>
        {
          //@ts-ignore
          width && height && <Confetti width={width} height={height} />
        }

        <div className="checkout_content">
          <h4 className="checkout_content_title">Payment Received..</h4>
          <p>
            Congrats on securing your chance to see this amazing event
          </p>
          <Link to={"/my-tickets"} className="btn">
            View All Tickets
          </Link>
        </div>
      </>
    </div>
  );
};

export default PaymentConfirm;
