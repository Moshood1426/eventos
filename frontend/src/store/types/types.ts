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
  date: number;
  venue: string;
  location: string;
  price: number;
  host: string;
  imgPath: string;
  category: string;
  capacity: number;
  createdBy: number;
}
