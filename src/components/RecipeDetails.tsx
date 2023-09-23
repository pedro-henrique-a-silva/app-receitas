import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Message from './Message';
import style from './RecipeDetails.module.css';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

type RecipeDetailsProps = {
  mealOrDrink: 'meals' | 'drinks';
};

const mealsApiBase = 'https://www.themealdb.com/api/json/v1/1/';
const drinksApiBase = 'https://www.thecocktaildb.com/api/json/v1/1/';

// https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i={id-da-receita}.
// https://www.thecocktaildb.com/api/json/v1/1/search.php?s=.

// https://www.themealdb.com/api/json/v1/1/lookup.php?i={id-da-receita}.
// https://www.themealdb.com/api/json/v1/1/search.php?s=.

// strCategory
// strMealThumb
// strMeal

function RecipeDetails(props: RecipeDetailsProps) {
  const { mealOrDrink } = props;
  const { recipeID } = useParams();
  const navigate = useNavigate();

  const [recipeDetails, setRecipeDetails] = useState<any>({});
  const [recomendations, setRecomendations] = useState<any[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  const getIngredients = () => Object
    .entries(recipeDetails)
    .filter(([key, value]) => key.includes('strIngredient') && value)
    .map((values, index) => `${values[1]} ${recipeDetails[`strMeasure${index + 1}`]}`);

  const getProgressFromLocalStorage = () => JSON
    .parse(localStorage.getItem('inProgressRecipes') as string)
    || { meals: {}, drinks: {} };

  const isInProgress = () => {
    const { meals, drinks } = getProgressFromLocalStorage();
    const recipesInProgress = mealOrDrink === 'meals' ? meals : drinks;
    return recipesInProgress[recipeID as string] !== undefined;
  };

  const toggleIsVisible = () => {
    setIsVisible(!isVisible);
  };

  const handleClickStartRecipe = (inProgress: boolean) => {
    if (!inProgress) {
      navigate(`/${mealOrDrink}/${recipeID}/in-progress`);
    }
  };

  const handleShareClick = () => {
    const { location: { origin, pathname } } = window;
    const url = `${origin}${pathname}`;
    navigator.clipboard.writeText(url);
    toggleIsVisible();
  };

  useEffect(() => {
    const getData = async () => {
      const DetailsUrl = mealOrDrink === 'meals' ? mealsApiBase : drinksApiBase;
      const RecomendationsUrl = mealOrDrink === 'meals' ? drinksApiBase : mealsApiBase;

      const detailsResponse = await fetch(`${DetailsUrl}lookup.php?i=${recipeID}`);
      const recomendationResponse = await fetch(`${RecomendationsUrl}search.php?s=`);

      const details = await detailsResponse.json();
      const recomendData = await recomendationResponse.json();

      setRecipeDetails(details.meals?.[0] || details.drinks?.[0]);
      setRecomendations(recomendData.meals || recomendData.drinks);
    };

    getData();
  }, [mealOrDrink, recipeID]);

  const inProgress = isInProgress();

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
          <button>
            <img data-testid="favorite-btn" src={ whiteHeartIcon } alt="favorite Icon" />
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
              {ingredient as string}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Instructions</h3>
        <p data-testid="instructions">{recipeDetails?.strInstructions}</p>
      </div>
      {mealOrDrink === 'meals' && (
        <div className={ style.recipeVideo }>
          <iframe
            title={ recipeDetails?.strMeal }
            src={ recipeDetails?.strYoutube.replace('watch?v=', 'embed/') }
            allowFullScreen
            data-testid="video"
          />
        </div>

      )}
      <div
        className={ style.recipeCarousel }
      >
        {recomendations.slice(0, 6).map((recomendation, index) => (
          <div
            key={ index }
            data-testid={ `${index}-recommendation-card` }
          >
            <img
              src={ recomendation?.strMealThumb || recomendation?.strDrinkThumb }
              alt="recipeThumb"
            />
            <h3
              data-testid={ `${index}-recommendation-title` }
            >
              {recomendation?.strMeal || recomendation?.strDrink}

            </h3>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={ () => handleClickStartRecipe(inProgress) }
        className={ style.startRecipeBtn }
        data-testid="start-recipe-btn"
      >
        {inProgress ? 'Continue Recipe' : 'Start Recipe'}
      </button>
    </>
  );
}

// Os ingredientes devem ter o atributo data-testid="${index}-ingredient-name-and-measure".
// O texto de instruções deve ter o atributo data-testid="instructions".
// O vídeo, presente somente na tela de comidas, deve ter o atributo data-testid="video".

export default RecipeDetails;
