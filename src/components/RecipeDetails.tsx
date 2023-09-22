import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import style from './RecipeDetails.module.css';

type RecipeDetailsProps = {
  mealOrDrink: 'meal' | 'drink';
};

const mealsApiBase = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';
const drinksApiBase = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';

// https://www.themealdb.com/api/json/v1/1/lookup.php?i={id-da-receita}.
// https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i={id-da-receita}.

// strCategory
// strMealThumb
// strMeal

function RecipeDetails(props: RecipeDetailsProps) {
  const { mealOrDrink } = props;
  const { recipeID } = useParams();

  const [recipeDetails, setRecipeDetails] = useState<any>({});

  const getIngredients = () => Object
    .entries(recipeDetails)
    .filter(([key, value]) => key.includes('strIngredient') && value)
    .map((values, index) => `${values[1]} ${recipeDetails[`strMeasure${index + 1}`]}`);

  useEffect(() => {
    const apiBase = mealOrDrink === 'meal' ? mealsApiBase : drinksApiBase;
    fetch(`${apiBase}${recipeID}`)
      .then((response) => response.json())
      .then((data) => setRecipeDetails(data.meals?.[0] || data.drinks?.[0]));
  }, [mealOrDrink, recipeID]);

  console.log(recipeDetails);

  if (Object.entries(recipeDetails).length === 0) return (<div>Loading...</div>);

  return (
    <>
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
          (mealOrDrink === 'meal')
            ? recipeDetails?.strCategory
            : recipeDetails?.strAlcoholic
          }

        </h3>
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
      {mealOrDrink === 'meal' && (
        <iframe
          title={ recipeDetails?.strMeal }
          width="300"
          height="300"
          src={ recipeDetails?.strYoutube.replace('watch?v=', 'embed/') }
          allowFullScreen
          data-testid="video"
        />

      )}
    </>
  );
}

// Os ingredientes devem ter o atributo data-testid="${index}-ingredient-name-and-measure".
// O texto de instruções deve ter o atributo data-testid="instructions".
// O vídeo, presente somente na tela de comidas, deve ter o atributo data-testid="video".

export default RecipeDetails;
