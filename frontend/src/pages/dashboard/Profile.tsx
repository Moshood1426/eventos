import React, { useState, useEffect } from "react";
import { FormItem, FormSelectItem } from "../../components";
import Alert from "../../components/Alert";
import { invalidAction } from "../../store/generalUI/generalUI.actions";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

const initialState = {
  name: "",
  role: "consumer",
  roleOptions: ["consumer", "creator"],
  email: "",
  oldPassword: "",
  newPassword: "",
  confirmNewPassword: "",
};

const Profile = () => {
  const [formData, setFormData] = useState(initialState);

  const { user } = useAppSelector((state) => state.auth);
  const { showAlert } = useAppSelector((state) => state.generalUI);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user) {
      const { name, email, role } = user;
      setFormData((prevVal) => ({ ...prevVal, name, email, role }));
    }
  }, []);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData((prevValue) => ({ ...prevValue, [name]: value }));
  };

  const handleAccountSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const { name, email } = formData;
    if (!name || !email) {
      dispatch(invalidAction("Kindly fill all necessary details"));
    }
  };

  const handlePasswordSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const { oldPassword, newPassword, confirmNewPassword } = formData;

    if (!oldPassword || !newPassword || !confirmNewPassword) {
      dispatch(invalidAction("Kindly fill all necessary details"));
    }
  };

  return (
    <div className="profile">
      <h3>Profile</h3>
      <div className="profile_account">
        <form className="profile_account_form" onSubmit={handleAccountSubmit}>
          {showAlert && <Alert />}
          <span className="profile_account_title">Account Settings</span>
          <FormItem
            name={"name"}
            type={"text"}
            value={formData.name}
            onChange={handleChange}
            labelText={"Name"}
            label={true}
          />
          <FormItem
            name={"email"}
            type={"email"}
            value={formData.email}
            onChange={handleChange}
            labelText={"Email"}
            label={true}
          />
          <FormSelectItem
            name={"role"}
            options={formData.roleOptions}
            value={formData.role}
            onChange={handleChange}
            disabled={true}
          />
          <div className="form_dual_row">
            <button className="btn form_btn" type="submit">
              Update Profile
            </button>
          </div>
        </form>
        <form className="profile_account_form" onSubmit={handlePasswordSubmit}>
          <span className="profile_account_title">Password Settings</span>
          {showAlert && <Alert />}
          <FormItem
            name={"oldPassword"}
            type={"text"}
            value={formData.oldPassword}
            onChange={handleChange}
            labelText={"Old password"}
            label={true}
          />
          <FormItem
            name={"newPassword"}
            type={"text"}
            value={formData.newPassword}
            onChange={handleChange}
            labelText={"New password"}
            label={true}
          />
          <FormItem
            name={"confirmNewPassword"}
            type={"text"}
            value={formData.confirmNewPassword}
            onChange={handleChange}
            labelText={"Confirm new password"}
            label={true}
          />
          <div className="form_dual_row">
            <button className="btn form_btn" type="submit">
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
