export interface AuthState {
  user: User | null;
  token: string | null;
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
    email: string;
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
  email: string;
  id: number;
}
