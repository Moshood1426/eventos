import React, { useState, useRef } from "react";
import { FormItem, FormSelectItem } from "../../components";
import { ReactComponent as CreateEventSvg } from "../../assets/images/createEvent.svg";
import { BsFillCameraFill } from "react-icons/bs";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { invalidAction } from "../../store/generalUI/generalUI.actions";
import Alert from "../../components/Alert";
import { createEvent } from "../../store/event/event.action";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const initialState = {
  category: "",
  categoryOptions: [
    "Select a category",
    "Business",
    "Food & Drink",
    "Health",
    "Music",
    "Community",
    "Family & Education",
    "Fashion",
    "Film & Media",
    "Hobbies",
    "Home & Lifestyle",
    "Arts",
    "Science & Tech",
    "Sports & Fitness",
    "Travel & Outdoor",
    "Other",
  ],
  title: "",
  date: "",
  description: "",
  venue: "",
  location: "",
  price: "",
  capacity: "",
  host: "",
  //add host on submission
};

const CreateEvent = () => {
  const [formData, setFormData] = useState(initialState);
  const [imageName, setImageName] = useState("");

  const { showAlert } = useAppSelector((state) => state.generalUI);
  const dispatch = useAppDispatch();

  const formRef = useRef(null);

  const navigate = useNavigate();

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData((prevValue) => ({ ...prevValue, [name]: value }));
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) {
      setImageName("");
      return;
    }
    setImageName(event.target.files[0].name);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    //@ts-ignore
    for (let item in formData) {
      //@ts-ignore
      if (!formData[item]) {
        dispatch(invalidAction("Kindly fill all form inputs"));
        return;
      }
    }

    // @ts-ignore
    const fileUploaded = event.target[event.target.length - 2].files[0];
    if (!fileUploaded || !fileUploaded.type.startsWith("image")) {
      dispatch(invalidAction("Kindly upload an image to proceed"));
      return;
    }

    const formInfo = new FormData(formRef.current!);
    formInfo.append("image", fileUploaded);
    const date = moment(formData.date).format("MMMM Do YYYY, h:mm a");
    formInfo.set("date", date);
    try {
      await dispatch(createEvent(formInfo as unknown as HTMLFormElement));
      navigate("/single-event");
    } catch (error) {}
  };

  return (
    <div>
      <div className="register_img">
        <CreateEventSvg />
      </div>
      <h3 className="form_title">Let’s Help You Put Your Event Out There</h3>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </p>
      <form
        ref={formRef}
        className="form create_event_form"
        onSubmit={handleSubmit}
      >
        {showAlert && <Alert />}
        <div className="form_dual_row">
          <FormSelectItem
            name="category"
            onChange={handleChange}
            value={formData.category}
            options={formData.categoryOptions}
            dontLabel={true}
          />
          <FormItem
            name="date"
            type="datetime-local"
            value={formData.date}
            onChange={handleChange}
          />
        </div>
        <FormItem
          name="title"
          type="text"
          value={formData.title}
          onChange={handleChange}
          placeholder={"event name"}
        />
        <div className="form_row">
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="form_input form_text_area"
            placeholder="Enter event description"
          ></textarea>
        </div>
        <FormItem
          name="host"
          type="text"
          value={formData.host}
          onChange={handleChange}
          placeholder={"host agency"}
        />
        <div className="form_dual_row">
          <FormItem
            name="venue"
            type="text"
            value={formData.venue}
            onChange={handleChange}
            placeholder={"Event venue"}
          />
          <FormItem
            name="location"
            type="text"
            value={formData.location}
            onChange={handleChange}
            placeholder={"Location - City, State"}
          />
        </div>

        <div className="form_dual_row">
          <FormItem
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            placeholder={"Event price /ticket - $"}
          />
          <FormItem
            name="capacity"
            type="number"
            value={formData.capacity}
            onChange={handleChange}
            placeholder={"event venue capacity"}
          />
        </div>
        <div>
          <label htmlFor="file_input" className="form_file_label">
            <BsFillCameraFill />
            Upload Image
            <input
              type="file"
              id="file_input"
              className="form_file_input"
              onChange={handleImageChange}
            />
            <span className="imgName">{imageName}</span>
          </label>
        </div>

        <div className="form_dual_row">
          <button className="btn form_btn" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateEvent;
