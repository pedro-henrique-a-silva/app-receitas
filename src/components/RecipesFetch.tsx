import React, { useEffect, useState } from 'react';

type Recipe = {
  strMealThumb: string;
  strDrinkThumb: string;
  strMeal: string;
  strDrink: string;
  strCategory: string;
  idMeal: string;
  idDrink: string;
};

type RecipeFetcherProps = {
  type: 'meals' | 'drinks';
  selectedCategory: string;
  isFilterSelected: boolean;
  children: (recipes: Recipe[]) => React.ReactNode;
};

function RecipeFetcher({
  type,
  selectedCategory,
  isFilterSelected,
  children,
}: RecipeFetcherProps) {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    // Defina a URL correta com base no tipo (meals ou drinks)
    const url = type === 'meals'
      ? 'https://www.themealdb.com/api/json/v1/1/search.php?s='
      : 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

    const categoryParam = selectedCategory === 'All' ? '' : selectedCategory;

    // Faça a solicitação HTTP usando fetch
    fetch(`${url}${categoryParam}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Não foi possível obter os dados.');
        }
        return response.json();
      })
      .then((data) => {
        // Pegue as 12 primeiras receitas
        const first12Recipes = data[type].slice(0, 12);
        setRecipes(first12Recipes);
      })
      .catch((error) => {
        console.error('Erro ao fazer a solicitação:', error);
      });
  }, [type, selectedCategory]);

  return <>{children(recipes)}</>;
}

export default RecipeFetcher;
