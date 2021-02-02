export interface Users {
  [index: number]: {
    id: number;
    name: string;
    username: string;
    password: string;
    email: string;
  };
}

export interface User {
  id: number;
  name: string;
  username: string;
  password: string;
  email: string;
}
