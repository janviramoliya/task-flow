type registerRequest = {
  name: string;
  email: string;
  password: string;
  role: "admin" | "user";
};

type loginRequest = {
  email: string;
  password: string;
};

export type { registerRequest, loginRequest };
