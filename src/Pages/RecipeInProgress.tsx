import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import style from './RecipeInProgress.module.css';
import { getFromLocalStorage,
  isFavorite,
  saveToLocalStorage } from '../utils/utilsLocalStorage';

import Message from '../components/Message';
import { fetchDetails } from '../utils/fetchAPi';
import RecipeCover from '../components/RecipeCover';

type RecipeInProgressProps = {
  mealOrDrink: 'meals' | 'drinks';
};

function RecipeInProgress(props: RecipeInProgressProps) {
  const { mealOrDrink } = props;
  const { recipeID } = useParams();
  const navigate = useNavigate();

  const [recipeDetails, setRecipeDetails] = useState<any>({});

  const [recipeInProgress, setRecipeInProgress] = useState<boolean[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [favorite, setFavorite] = useState(false);

  const getIngredients = () => Object
    .entries(recipeDetails)
    .filter(([key, value]) => key.includes('strIngredient') && value)
    .map((values, index) => (`${values[1]} ${recipeDetails[`strMeasure${index + 1}`]
    || ''}`));

  const toggleIsVisible = () => {
    setIsVisible(!isVisible);
  };

  const handleFavoriteClick = (recipeData: any) => {
    const id = recipeData.idMeal || recipeData.idDrink;
    const type = mealOrDrink.replace('s', '');
    const nationality = recipeData.strArea || '';
    const category = recipeData.strCategory;
    const alcoholicOrNot = recipeData.strAlcoholic || '';
    const name = recipeData.strMeal || recipeData.strDrink;
    const image = recipeData.strMealThumb || recipeData.strDrinkThumb;

    const newFavoriteRecipe = {
      id,
      type,
      nationality,
      category,
      alcoholicOrNot,
      name,
      image,
    };

    const recipesLocalStorage = JSON
      .parse(localStorage.getItem('favoriteRecipes') as string)
      || [];

    if (isFavorite(recipeID)) {
      const newFavoriteRecipes = recipesLocalStorage
        .filter((recipe: any) => recipe.id !== recipeID);

      localStorage.setItem('favoriteRecipes', JSON
        .stringify(newFavoriteRecipes));

      setFavorite(false);
    } else {
      localStorage.setItem('favoriteRecipes', JSON
        .stringify([...recipesLocalStorage, newFavoriteRecipe]));

      setFavorite(true);
    }
  };

  const handleShareClick = () => {
    const { location: { origin, pathname } } = window;
    const url = `${origin}${pathname}`;
    navigator.clipboard.writeText(url.replace('/in-progress', ''));
    toggleIsVisible();
  };

  const handleIngredientChange = (
    ingredientID: number,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const isChecked = event.target.checked;
    const parentEl = event.target.parentElement;
    let ingredientsProgress: boolean[] = recipeInProgress;

    if (ingredientsProgress.length === 0) {
      ingredientsProgress = getIngredients().map(() => false);
    }

    if (isChecked) {
      // (parentEl as HTMLElement).style.textDecoration = 'line-through solid rgb(0, 0, 0)';
      (parentEl as HTMLElement).classList.add(style.ingredientChecked);
    } else {
      (parentEl as HTMLElement).classList.remove(style.ingredientChecked);
      // (parentEl as HTMLElement).style.textDecoration = 'none';
    }

    ingredientsProgress = ingredientsProgress
      .map((ingredient, index) => (index === ingredientID ? isChecked : ingredient));

    saveToLocalStorage(mealOrDrink, recipeID, ingredientsProgress);
    setRecipeInProgress(ingredientsProgress);
  };

  const handleFinishRecipe = () => {
    const dateNow = new Date();
    const newFinishRecipe = {
      id: recipeDetails.idMeal || recipeDetails.idDrink,
      type: mealOrDrink.replace('s', ''),
      nationality: recipeDetails.strArea || '',
      category: recipeDetails.strCategory,
      alcoholicOrNot: recipeDetails.strAlcoholic || '',
      name: recipeDetails.strMeal || recipeDetails.strDrink,
      image: recipeDetails.strMealThumb || recipeDetails.strDrinkThumb,
      doneDate: dateNow.toISOString(),
      tags: (recipeDetails.strTags) ? recipeDetails.strTags.split(',') : [],
    };

    const recipesLocalStorage = JSON
      .parse(localStorage.getItem('doneRecipes') as string)
      || [];

    localStorage.setItem('doneRecipes', JSON
      .stringify([...recipesLocalStorage, newFinishRecipe]));

    navigate('/done-recipes');
  };

  useEffect(() => {
    const getDetails = async () => {
      const details = await fetchDetails(mealOrDrink, recipeID);
      if (details) {
        setRecipeDetails(details[0]);
      }
    };

    const recipeInProgressLocalStore = getFromLocalStorage('inProgressRecipes')
    || { meals: {}, drinks: {} };
    let ingredientsProgress = [];

    const recipesData = recipeInProgressLocalStore[mealOrDrink];
    if (Object.keys(recipesData).includes(recipeID as string)) {
      ingredientsProgress = recipesData[recipeID as string];
    }

    getDetails();
    setRecipeInProgress(ingredientsProgress);
    setFavorite(isFavorite(recipeID));
  }, [recipeID, mealOrDrink]);

  // const inProgress = isInProgress(mealOrDrink, recipeID);

  if (Object.entries(recipeDetails).length === 0) return (<div>Loading...</div>);

  return (
    <>
      {(isVisible) && <Message toggleIsVisible={ toggleIsVisible } />}
      <RecipeCover
        mealOrDrink={ mealOrDrink }
        favorite={ favorite }
        handleShareClick={ handleShareClick }
        handleFavoriteClick={ handleFavoriteClick }
        recipeDetails={ recipeDetails }
      />
      <div>
        <h3>Ingredients</h3>
        <ul>
          {getIngredients().map((ingredient, index) => (
            <li
              key={ index }
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              <label
                data-testid={ `${index}-ingredient-step` }
                className={ (recipeInProgress[index]) ? style.ingredientChecked : '' }
                htmlFor={ ingredient.trim() }
              >
                <input
                  onChange={ (e) => handleIngredientChange(index, e) }
                  type="checkbox"
                  checked={ (recipeInProgress.length === 0)
                    ? false : recipeInProgress[index] }
                  name={ ingredient.trim() }
                  id={ ingredient.trim() }
                />
                {ingredient as string}
              </label>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Instructions</h3>
        <p data-testid="instructions">{recipeDetails?.strInstructions}</p>
      </div>
      <button
        type="button"
        onClick={ handleFinishRecipe }
        disabled={ recipeInProgress.some((ingredient) => ingredient === false) }
        className={ style.finishRecipeBtn }
        data-testid="finish-recipe-btn"
      >
        Finish Recipe
      </button>
    </>
  );
}

export default RecipeInProgress;
