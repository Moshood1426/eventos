import React from "react";
import { useAppSelector } from "../store/hooks";

const Alert = () => {
  const { alertType, alertText } = useAppSelector((state) => state.generalUI);

  return <div className={`alert alert-${alertType}`}>{alertText}</div>;
};

export default Alert;
