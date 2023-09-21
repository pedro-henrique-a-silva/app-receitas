export type LoginType = {
  email: string;
  password: string;
};

export type ContextType = {
  loginUser: LoginType,
  setLoginUser: (user: any) => void;
};
