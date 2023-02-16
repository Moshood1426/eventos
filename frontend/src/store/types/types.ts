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
  name: string;
  id: number;
}
