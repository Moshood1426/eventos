import React, { useState } from "react";
import { Navbar, NavMenu } from "../components";
import { ReactComponent as Welcome } from "../assets/images/welcomeImg.svg";
import FormItem from "../components/FormItem";
import FormSelectItem from "../components/FormSelectItem";

const initialState = {
  name: "",
  role: "customer",
  roleOptions: ["select role", "customer", "creator"],
  email: "",
  password: "",
};

const Register = () => {
  const [formData, setFormData] = useState(initialState);
  const [forgotCredentials, setForgotCredentials] = useState(false);
  const [clientIsUser, setClientIsUser] = useState(false);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData((prevValue) => ({ ...prevValue, [name]: value }));
  };

  const handleSubmit = () => {};

  return (
    <div>
      <Navbar setClientIsUser={setClientIsUser}/>
      <div className="register_cont">
        <div className="register_img">
          <Welcome />
        </div>
        <h3 className="form_title">Register</h3>
        <p>
          Welcome to our world. Select creator role to have access to event
          creation
        </p>
        <form onSubmit={handleSubmit} className="form">
          {!clientIsUser && (
            <div className="form_dual_row">
              <FormItem
                name={"name"}
                placeholder={"name"}
                type={"text"}
                value={formData.name}
                onChange={handleChange}
              />
              <FormSelectItem
                name={"role"}
                options={formData.roleOptions}
                value={formData.role}
                onChange={handleChange}
                dontLabel={true}
              />
            </div>
          )}

          <FormItem
            name={"email"}
            placeholder={"email address"}
            type={"email"}
            value={formData.email}
            onChange={handleChange}
          />
          <FormItem
            name={"password"}
            placeholder={"password"}
            type={"password"}
            value={formData.password}
            onChange={handleChange}
          />
          <div className="form_dual_row">
            <button className="btn" type="submit">
              Submit
            </button>
          </div>
          {clientIsUser ? (
            <span
              className="forgot-pass"
              onClick={() => setForgotCredentials(true)}
            >
              Forgot password? Let's help recover...
            </span>
          ) : (
            <span className="forgot-pass" onClick={() => setClientIsUser(true)}>
              Already a user? Click here to login
            </span>
          )}
        </form>
      </div>
    </div>
  );
};

export default Register;
