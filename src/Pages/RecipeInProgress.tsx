import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import style from './RecipeInProgress.module.css';
import useFetch from '../hooks/useFetch';
import { isFavorite, isInProgress } from '../utils/utilsLocalStorage';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import Message from '../components/Message';

type RecipeInProgressProps = {
  mealOrDrink: 'meals' | 'drinks';
};

function RecipeInProgress(props: RecipeInProgressProps) {
  const { mealOrDrink } = props;
  const { recipeID } = useParams();
  // const navigate = useNavigate();

  const { recipeDetails } = useFetch(mealOrDrink, recipeID, true, false);

  const [recipesInProgress, setRecipesInProgress] = useState<any>({});
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
    navigator.clipboard.writeText(url);
    toggleIsVisible();
  };

  const handleIngredientChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    const parentEl = event.target.parentElement;
    if (isChecked) {
      (parentEl as HTMLElement).style.textDecoration = 'line-through solid rgb(0, 0, 0)';
    } else {
      (parentEl as HTMLElement).style.textDecoration = 'none';
    }
  };

  useEffect(() => {
    const recipe = JSON.parse(localStorage.getItem('inProgressRecipes') as string);
    setRecipesInProgress(recipe);
    setFavorite(isFavorite(recipeID));
  }, [recipeID]);

  const inProgress = isInProgress(mealOrDrink, recipeID);

  if (Object.entries(recipeDetails).length === 0) return (<div>Loading...</div>);

  return (
    <>
      {(isVisible) && <Message toggleIsVisible={ toggleIsVisible } />}
      <div className={ style.recipeCoverWrapper }>
        <img
          data-testid="recipe-photo"
          className={ style.recipeThumb }
          src={ recipeDetails?.strMealThumb || recipeDetails?.strDrinkThumb }
          alt="recipeThumb"
        />
        <h1
          className={ style.recipeTitle }
          data-testid="recipe-title"
        >
          {recipeDetails?.strMeal || recipeDetails?.strDrink}

        </h1>
        <h3
          className={ style.recipeCategory }
          data-testid="recipe-category"
        >
          {
          (mealOrDrink === 'meals')
            ? recipeDetails?.strCategory
            : recipeDetails?.strAlcoholic
          }

        </h3>
        <div className={ style.socialButtons }>
          <button
            data-testid="share-btn"
            onClick={ handleShareClick }
          >
            <img src={ shareIcon } alt="share Icon" />
          </button>
          <button
            onClick={ () => handleFavoriteClick(recipeDetails) }
          >
            <img
              data-testid="favorite-btn"
              src={ (favorite) ? blackHeartIcon : whiteHeartIcon }
              alt="favorite Icon"
            />
          </button>
        </div>
      </div>

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
                htmlFor={ ingredient.trim() }
              >
                <input
                  onChange={ (e) => handleIngredientChange(e) }
                  type="checkbox"
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
        className={ style.startRecipeBtn }
        data-testid="finish-recipe-btn"
      >
        Finish Recipe
      </button>
    </>
  );
}

export default RecipeInProgress;

// A foto deve ter o atributo data-testid="recipe-photo".
// O título deve ter o atributo data-testid="recipe-title".
// O botão de compartilhar deve ter o atributo data-testid="share-btn".
// O botão de favoritar deve ter o atributo data-testid="favorite-btn".
// O texto da categoria deve ter o atributo data-testid="recipe-category".
// O elemento de instruções deve ter o atributo data-testid="instructions".
// O botão para finalizar a receita deve ter o atributo data-testid="finish-recipe-btn".
