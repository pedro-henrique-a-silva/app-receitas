import { useState } from 'react';
import RecipesContext from './contextRecipes';
import { LoginType, Recipe } from '../types';

type RecipesProviderProps = {
  children: React.ReactNode;
};

const LOGIN_INITIAL_STATE = {
  email: '',
  password: '',
};

function RecipesProvider({ children }: RecipesProviderProps) {
  const [loginUser, setLoginUser] = useState<LoginType>(LOGIN_INITIAL_STATE);
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  const updateRecipes = (recipesData: any[]) => {
    setRecipes((prev) => recipesData || prev);
  };

  const context = {
    loginUser,
    recipes,
    updateRecipes,
    setLoginUser,
  };

  return (
    <RecipesContext.Provider value={ context }>
      { children }
    </RecipesContext.Provider>
  );
}

export default RecipesProvider;
