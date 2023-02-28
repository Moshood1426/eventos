import React, { useState, useRef, useEffect } from "react";
import { FormItem, FormSelectItem } from "../../components";
import { ReactComponent as CreateEventSvg } from "../../assets/images/createEvent.svg";
import { BsFillCameraFill } from "react-icons/bs";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { invalidAction } from "../../store/generalUI/generalUI.actions";
import Alert from "../../components/Alert";
import {
  createEvent,
  editEvent as execEditEvent,
} from "../../store/event/event.action";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { eventActions } from "../../store/event/event.slice";

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
  const [eventEditId, setEventEditId] = useState<null | number>(null);

  const { showAlert } = useAppSelector((state) => state.generalUI);
  const { editEvent, singleEvent } = useAppSelector((state) => state.event);
  const dispatch = useAppDispatch();

  const formRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (editEvent) {
      if (!singleEvent.id) {
        dispatch(eventActions.setEditEvent(false));
      } else {
        const date = new Date(singleEvent.date).toISOString().substring(0, 16);

        const newFormData = {
          category: singleEvent.category,
          title: singleEvent.title,
          date: date,
          description: singleEvent.description,
          venue: singleEvent.venue,
          location: singleEvent.location,
          price: singleEvent.price!.toString(),
          capacity: singleEvent.capacity!.toString(),
          host: singleEvent.host,
        };
        setFormData((prevValue) => ({ ...prevValue, ...newFormData }));
        setEventEditId(singleEvent.id);
      }
    }
  }, [editEvent]);

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const name = event.target.name;
    const value = event.target.value;

    setFormData((prevValue) => ({ ...prevValue, [name]: value }));
  };

  //handle changes on image input
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) {
      setImageName("");
      return;
    }
    setImageName(event.target.files[0].name);
  };

  //handles form submit
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
    const formInfo = new FormData(formRef.current!);

    //if user wants to edit details event without new image
    if (editEvent && !fileUploaded) {
      const date = moment(formData.date).format("LLL");
      formInfo.set("date", date);

      let userData = {}; // creates a user json
      formInfo.forEach(function (value, key) {
        //@ts-ignore
        userData[key] = value; // populates user json with form data
      });

      const eventId = await dispatch(
        execEditEvent(userData as unknown as HTMLFormElement, eventEditId!)
      );
      if (eventId) {
        navigate(`/single-event/${eventId}`);
      }
      return;
    }

    // if user wants to edit image alongside event or create new event
    if (!fileUploaded || !fileUploaded.type.startsWith("image")) {
      dispatch(invalidAction("Kindly upload an image to proceed"));
      return;
    }

    formInfo.append("image", fileUploaded);
    const date = moment(formData.date).format("LLL");
    formInfo.set("date", date);

    let eventId: number | false;
    if (editEvent) {
      let userData = {}; // creates a user json
      formInfo.forEach(function (value, key) {
        //@ts-ignore
        userData[key] = value; // populates user json with form data
      });
      eventId = await dispatch(
        execEditEvent(userData as unknown as HTMLFormElement, eventEditId!)
      );
    } else {
      eventId = await dispatch(
        createEvent(formInfo as unknown as HTMLFormElement)
      );
    }

    if (eventId) {
      navigate(`/single-event/${eventId}`);
    }
  };

  return (
    <div>
      <div className="register_img">
        <CreateEventSvg />
      </div>
      <h3 className="form_title">
        {editEvent
          ? "Edit Event Details"
          : "Let’s Help You Put Your Event Out There"}
      </h3>
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
            Submit {editEvent && " Changes"}
          </button>
          <span className="clr_form">
            Clear Form
          </span>
        </div>
      </form>
    </div>
  );
};

export default CreateEvent;
