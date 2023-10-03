import { useState } from 'react';
import RecipesContext from './contextRecipes';
import { Recipe } from '../types';

type RecipesProviderProps = {
  children: React.ReactNode;
};

function RecipesProvider({ children }: RecipesProviderProps) {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  const updateRecipes = (recipesData: any[]) => {
    setRecipes((prev) => recipesData || prev);
  };

  const context = {
    recipes,
    updateRecipes,
  };

  return (
    <RecipesContext.Provider value={ context }>
      { children }
    </RecipesContext.Provider>
  );
}

export default RecipesProvider;
