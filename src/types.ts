export type LoginType = {
  email: string;
  password: string;
};

export type Recipe = {
  strMealThumb: string;
  strDrinkThumb: string;
  strMeal: string;
  strDrink: string;
  strCategory: string;
  idMeal: string;
  idDrink: string;
};

export type ContextType = {
  loginUser: LoginType,
  recipes: Recipe[],
  updateRecipes: (recipesData: any[]) => void,
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
