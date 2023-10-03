import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Message from '../components/Message';
import Carousel from '../components/Carousel';
import style from './RecipeDetails.module.css';
import {
  isFavorite,
  isInProgress,
} from '../utils/utilsLocalStorage';
import { fetchDetails } from '../utils/fetchAPi';
import RecipeCover from '../components/RecipeCover';

type RecipeDetailsProps = {
  mealOrDrink: 'meals' | 'drinks';
};

function RecipeDetails(props: RecipeDetailsProps) {
  const { mealOrDrink } = props;
  const { recipeID } = useParams();
  const navigate = useNavigate();

  const [recipeDetails, setRecipeDetails] = useState<any>({});

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

  const handleClickStartRecipe = () => {
    navigate(`/${mealOrDrink}/${recipeID}/in-progress`);
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

  useEffect(() => {
    const getDetails = async () => {
      const details = await fetchDetails(mealOrDrink, recipeID);
      if (details) {
        setRecipeDetails(details[0]);
      }
    };
    getDetails();
    setFavorite(isFavorite(recipeID));
  }, [recipeID, mealOrDrink]);

  const inProgress = isInProgress(mealOrDrink, recipeID);

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
      <Carousel mealOrDrink={ mealOrDrink } />
      <button
        type="button"
        onClick={ () => handleClickStartRecipe() }
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
