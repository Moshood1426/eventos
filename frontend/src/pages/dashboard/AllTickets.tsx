import React, { useEffect, useState } from "react";
import {
  FormItem,
  FormSelectItem,
  Loading,
  SingleTicket,
} from "../../components";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getAllEvents } from "../../store/event/event.action";
import Alert from "../../components/Alert";

const AllTickets = () => {
  const [formData, setFormData] = useState({
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
    date: "",
    title: "",
    price: "",
  });
  const dispatch = useAppDispatch();
  const { allEvents } = useAppSelector((state) => state.event);
  const { isLoading, showAlert } = useAppSelector((state) => state.generalUI);

  useEffect(() => {
    const category = new URLSearchParams(window.location.search).get(
      "category"
    );
    const title = new URLSearchParams(window.location.search).get("title");
    console.log(category);
    if (category || title) {
      setFormData((prevValue) => ({
        ...prevValue,
        category: category ? category : "",
        title: title ? title : "",
      }));
    }
  }, []);

  useEffect(() => {
    const filterObj = {
      price: +formData.price,
      category: formData.category,
      title: formData.title,
      date: formData.date,
    };
    dispatch(getAllEvents(filterObj));

    //eslint-disable-next-line
  }, [formData]);

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const name = event.target.name;
    const value = event.target.value;

    setFormData((prevValue) => ({ ...prevValue, [name]: value }));
  };

  return (
    <div>
      <h4 className="tickets_header">Explore Tickets</h4>
      {showAlert && <Alert />}
      <div className="tickets_container">
        <div className="tickets_filter">
          <h5>Filters</h5>
          <form className="tickets_filter_form">
            <FormSelectItem
              name="category"
              onChange={handleChange}
              value={formData.category}
              options={formData.categoryOptions}
              dontLabel={true}
            />
            <FormItem
              name="title"
              type="text"
              value={formData.title}
              onChange={handleChange}
              placeholder={"event name"}
            />

            <FormItem
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              placeholder={"Max Event price - $"}
            />
            <FormItem
              name="date"
              type="datetime-local"
              value={formData.date}
              onChange={handleChange}
              placeholder={"Select a date"}
            />
          </form>
        </div>
        <div className="tickets_content">
          {isLoading ? (
            <Loading />
          ) : allEvents.length < 1 ? (
            <span>No tickets available for purchase right now</span>
          ) : (
            <div>
              {allEvents.map((item, index) => {
                return (
                  <SingleTicket
                    key={item.id}
                    {...item}
                    price={item.price!}
                    number={index + 1}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllTickets;
