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
    const buildEndpointUrl = () => {
      const baseApiUrl = type === 'meals'
        ? 'https://www.themealdb.com/api/json/v1/1/'
        : 'https://www.thecocktaildb.com/api/json/v1/1/';

      if (selectedCategory === 'All') {
        return `${baseApiUrl}search.php?s=`;
      }
      const categoryParam = `c=${selectedCategory}`;
      return `${baseApiUrl}filter.php?${categoryParam}`;
    };

    const endpointUrl = buildEndpointUrl();

    fetch(endpointUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Não foi possível obter os dados.');
        }
        return response.json();
      })
      .then((data) => {
        if (data[type].length === 1 && selectedCategory !== 'All') {
          setRecipes(data[type]);
        } else {
          const first12Recipes = data[type].slice(0, 12);
          setRecipes(first12Recipes);
        }
      })
      .catch((error) => {
        console.error('Erro ao fazer a solicitação:', error);
      });
  }, [type, selectedCategory, isFilterSelected]);

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
