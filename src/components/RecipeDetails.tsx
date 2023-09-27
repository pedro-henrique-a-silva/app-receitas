import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import style from './recipeDetails.module.css';

type RecipeDetailsProps = {
  type: 'meals' | 'drinks';
};

function RecipeDetails({ type }: RecipeDetailsProps) {
  const { recipeID } = useParams();
  const [recipeDetails, setRecipeDetails] = useState<any>(null);

  useEffect(() => {
    // Função para buscar os detalhes da receita com base no ID
    const fetchRecipeDetails = async () => {
      const response = await fetch(
        type === 'meals'
          ? `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeID}`
          : `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${recipeID}`,
      );

      const data = await response.json();
      if (data && data[type]) {
        setRecipeDetails(data[type][0]); // Armazena os detalhes da receita no estado
      }
    };

    fetchRecipeDetails();
  }, [type, recipeID]);

  return (
    <div>
      <button
        type="button"
        data-testid="button"
        onClick={ () => window.history.back() }
      >
        Voltar
      </button>
      {recipeDetails && (
        <>
          <h1>{recipeDetails.strMeal || recipeDetails.strDrink}</h1>
          <img
            className={ style.cardImgDetails }
            src={
              type === 'meals'
                ? recipeDetails.strMealThumb
                : recipeDetails.strDrinkThumb
            }
            alt={ recipeDetails.strMeal || recipeDetails.strDrink }
          />
          <p>
            Ingredientes:
            {' '}
            {recipeDetails.ingredients}
          </p>
          <p>
            Instruções:
            {' '}
            {recipeDetails.strInstructions}
          </p>
        </>
      )}
    </div>
  );
}

export default RecipeDetails;
