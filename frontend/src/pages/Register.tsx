import React, { useState, useEffect } from "react";
import { Navbar } from "../components";
import { ReactComponent as Welcome } from "../assets/images/welcomeImg.svg";
import FormItem from "../components/FormItem";
import FormSelectItem from "../components/FormSelectItem";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useNavigate } from "react-router-dom";
import {
  registerUser,
  loginUser,
  toggleClientIsUser,
} from "../store/auth/auth.actions";
import Alert from "../components/Alert";
import { invalidAction } from "../store/generalUI/generalUI.actions";
import { authActions } from "../store/auth/auth.slice";

const initialState: {
  email: string;
  password: string;
  name: string;
  role: "consumer" | "creator";
  roleOptions: string[];
} = {
  name: "",
  role: "consumer",
  roleOptions: ["consumer", "creator"],
  email: "",
  password: "",
};

const Register = () => {
  const [formData, setFormData] = useState(initialState);

  const { user, clientIsUser } = useAppSelector((state) => state.auth);
  const { showAlert } = useAppSelector((state) => state.generalUI);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/marketplace");
    }
  }, [user]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData((prevValue) => ({ ...prevValue, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const { name, role, email, password } = formData;
    if (!email || !password) {
      dispatch(invalidAction("Kindly input all necessary values"));
      return;
    }
    if (!clientIsUser && (!name || !role)) {
      dispatch(invalidAction("Kindly input all necessary values"));
      return;
    }

    let userObj;
    if (!clientIsUser) {
      userObj = { name, role, email: email.toLowerCase(), password };
      dispatch(registerUser(userObj));
    } else {
      userObj = { email: email.toLowerCase(), password };
      dispatch(loginUser(userObj));
    }
  };

  return (
    <div>
      <Navbar />
      <div className="register_cont">
        <div className="register_img">
          <Welcome />
        </div>
        <h3 className="form_title">{clientIsUser ? "Sign In" : "Register"}</h3>
        <p>
          {clientIsUser
            ? "Kindly input your details so we can help fetch your account"
            : "Welcome to our world. Select creator role to have access to event creation"}
        </p>
        <form onSubmit={handleSubmit} className="form">
          {showAlert && <Alert />}
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
              onClick={() => dispatch(toggleClientIsUser(false))}
            >
              Don't have an account? Let's register...
            </span>
          ) : (
            <span
              className="forgot-pass"
              onClick={() => dispatch(toggleClientIsUser(true))}
            >
              Already a user? Click here to login
            </span>
          )}
        </form>
      </div>
    </div>
  );
};

export default Register;
