import { useEffect, useState } from 'react';

const MEALS_API_BASE = 'https://www.themealdb.com/api/json/v1/1/';
const DRINKS_API_BASE = 'https://www.thecocktaildb.com/api/json/v1/1/';

type UrlType = {
  [key: string]: string;
};

const baseURL: UrlType = {
  meals: MEALS_API_BASE,
  drinks: DRINKS_API_BASE,
};

function useRecipeDetails(
  mealOrDrink: string = '',
  recipeID: string = '',
  fetchCase: number = 0,
  category: string = '',
) {
  const [recipes, setRecipes] = useState<any[]>([]);

  useEffect(() => {
    const getRecipeDetails = async () => {
      let url = '';
      const categoryParam = category ? `filter.php?c=${category}` : 'search.php?s=';

      switch (fetchCase) {
        case 1:
          url = `${baseURL[mealOrDrink]}lookup.php?i=${recipeID}`;
          break;
        case 2:
          url = `${baseURL[mealOrDrink === 'meals' ? 'drinks' : 'meals']}search.php?s=`;
          break;
        case 3:
          url = `${baseURL[mealOrDrink]}search.php?s=`;
          break;
        case 4:
          url = `${baseURL[mealOrDrink]}list.php?c=list`;
          break;
        case 5:
          url = `${baseURL[mealOrDrink]}${categoryParam}`;
          break;
        default:
          break;
      }
      const allDataResponse = await fetch(url);
      const allData = await allDataResponse.json();

      setRecipes(allData.meals || allData.drinks);
    };

    getRecipeDetails();
  }, [mealOrDrink, recipeID, fetchCase, category]);

  return {
    recipes,
  };
}

export default useRecipeDetails;
