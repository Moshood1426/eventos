export interface AuthState {
  user: User | null;
  token: string | null;
  clientIsUser: boolean;
}

export interface DataFetchedAction {
  type: string;
  payload: {
    showAlert: boolean;
    alertType: string;
    alertText: string;
  };
}

export interface LoginAction {
  type: string;
  payload: {
    name: string;
    role: "creator" | "consumer";
    id: number;
    token: string;
    email: string;
  };
}

export interface RegisterAction {
  type: string;
  payload: {
    email: string;
    id: number;
    token: string;
    role: "consumer" | "creator";
    name: string;
  };
}

export interface User {
  role: "consumer" | "creator";
  email: string;
  name: string;
  id: number;
}

export interface EventInst {
  id: number;
  title: string;
  description: string;
  date: string;
  venue: string;
  location: string;
  price: number | null;
  host: string;
  imgPath: string;
  category: string;
  capacity: number | null;
  createdBy: number | null;
  isFavorite?: boolean;
}

export interface SingleOrder {
  clientSecret: string;
  paymentIntentId: string;
  totalOrderAmount: null | number;
  numOfTickets: null | number;
  id: null | number;
}

// {
//   id: 17,
//   status: "pending",
//   clientSecret:
//     "pi_3MfP8cF4FMElgbnO07iK25bI_secret_lgkRGNkLS1gVDb9mVLTX3dNyu",
//   paymentIntentId: "pi_3MfP8cF4FMElgbnO07iK25bI",
//   totalOrderAmount: "75.60",
//   numOfTickets: 3,
//   event: {
//     id: 1,
//     title: "Chelsea Champions League Game",
//     price: "25.20",
//   },
// },

export interface SingleTicket {
  id: number;
  status: string;
  clientSecret: string;
  paymentIntentId: string;
  totalOrderAmount: number;
  numOfTickets: number;
  event: {
    id: number;
    title: string;
    price: number;
  };
}
