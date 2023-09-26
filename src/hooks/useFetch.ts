import { useEffect, useState } from 'react';

const MEALS_API_BASE_DETAILS = 'https://www.themealdb.com/api/json/v1/1/';
const DRINKS_API_BASE_DETAILS = 'https://www.thecocktaildb.com/api/json/v1/1/';

const MEALS_API_BASE_QUERY = 'https://www.themealdb.com/api/json/v1/1/';
const DRINKS_API_BASE_QUERY = 'https://www.thecocktaildb.com/api/json/v1/1/';

type UrlType = {
  [key: string]: string;
};

const detailsUrl: UrlType = {
  meals: MEALS_API_BASE_DETAILS,
  drinks: DRINKS_API_BASE_DETAILS,
};

const querysUrl: UrlType = {
  meals: MEALS_API_BASE_QUERY,
  drinks: DRINKS_API_BASE_QUERY,
};

function useRecipeDetails(
  mealOrDrink: string = '',
  recipeID: string = '',
  fetchDetails: boolean,
  fetchAll: boolean = false,
) {
  const [recipeDetails, setRecipeDetails] = useState<any>({});
  const [allRecipes, setAllRecipes] = useState<any[]>([]);

  useEffect(() => {
    const getRecipeDetails = async () => {
      if (fetchDetails) {
        const url = `${detailsUrl[mealOrDrink]}lookup.php?i=${recipeID}`;
        const detailsResponse = await fetch(url);
        const details = await detailsResponse.json();
        setRecipeDetails(details.meals?.[0] || details.drinks?.[0]);
      }

      if (fetchAll) {
        const url = `${querysUrl[mealOrDrink]}search.php?s=`;
        const allDataResponse = await fetch(url);
        const allData = await allDataResponse.json();
        setAllRecipes(allData.meals || allData.drinks);
      }
    };

    getRecipeDetails();
  }, [mealOrDrink, recipeID, fetchDetails, fetchAll]);

  return {
    recipeDetails,
    allRecipes,
  };
}

export default useRecipeDetails;
