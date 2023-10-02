export const MEALS_API_BASE = 'https://www.themealdb.com/api/json/v1/1/';
export const DRINKS_API_BASE = 'https://www.thecocktaildb.com/api/json/v1/1/';

export type UrlType = {
  [key: string]: string;
};

export interface MealData {
  idMeal: string;
  strMeal: string;
}

export const baseURL: UrlType = {
  meals: MEALS_API_BASE,
  drinks: DRINKS_API_BASE,
};

export const fetchApi = async (url: string) => {
  const allDataResponse = await fetch(url);
  const allData = await allDataResponse.json();

  return allData.meals || allData.drinks;
};

export const fetchAllOrByCategory = async (mealOrDrink: string, category: string) => {
  const categoryParam = category ? `filter.php?c=${category}` : 'search.php?s=';
  const url = `${baseURL[mealOrDrink]}${categoryParam}`;
  return fetchApi(url);
};

export const fetchDetails = async (mealOrDrink: string, recipeID: string | undefined) => {
  const url = `${baseURL[mealOrDrink]}lookup.php?i=${recipeID}`;
  return fetchApi(url);
};

export const fetchCategories = async (mealOrDrink: string) => {
  const url = `${baseURL[mealOrDrink]}list.php?c=list`;
  return fetchApi(url);
};
