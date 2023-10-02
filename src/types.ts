export type LoginType = {
  email: string;
  password: string;
};

export type ContextType = {
  loginUser: LoginType,
  setLoginUser: (user: any) => void;
};

export type DoneRecipeType = {
  id: string,
  type: string,
  nationality: string,
  category: string,
  alcoholicOrNot: string,
  name: string,
  image: string,
  doneDate: string,
  tags: string[]
};
