import moment from "moment";

export const configureURL = (
  url: string,
  filterObj: {
    price: number;
    category: string;
    title: string;
    date: string;
  }
) => {
  let result = url;
  const { price, category, title, date } = filterObj;
  if (price !== 0) {
    result = result + `&price=${price}`;
  }
  if (category !== "Select a category") {
    if (category.split(" ").length > 1) {
      result = result + `&category=${category.replace("&", "_")}`;
    } else {
      result = result + `&category=${category}`;
    }
  }
  if (title) {
    result = result + `&title=${title}`;
  }
  if (date) {
    const newDate = moment(date).format("LLL");
    result = result + `&date=${newDate}`;
  }
  return result;
};
