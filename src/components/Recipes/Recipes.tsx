import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ButtonCard from '../ButtonCard';
import Header from '../Header';
import style from './style.module.css';
import RecipeFetcher from '../../utils/RecipesFetch';

type Recipe = {
  strMealThumb: string;
  strDrinkThumb: string;
  strMeal: string;
  strDrink: string;
  strCategory: string;
  idMeal: string;
  idDrink: string;
};

type RecipesProps = {
  type: 'meals' | 'drinks';
};

function Recipes({ type }: RecipesProps) {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isFilterSelected, setIsFilterSelected] = useState(false); // Estado para rastrear se o filtro está selecionado
  const { recipeID, recipeInProgress } = useParams();
  const navigate = useNavigate();

  // Função para lidar com a seleção de categoria
  const handleCategorySelected = (category: string) => {
    // Se o filtro estiver selecionado, deselecione-o
    if (isFilterSelected) {
      setSelectedCategory('');
      setIsFilterSelected(false);
    } else {
      setSelectedCategory(category);
      setIsFilterSelected(true);
    }
  };

  const handleRecipeClick = (recipe: Recipe) => {
    const route = type === 'meals'
      ? `/meals/${recipe.idMeal}`
      : `/drinks/${recipe.idDrink}`;
    navigate(route);
  };

  return (
    <div>
      {type === 'meals' && (!recipeID || recipeInProgress) && (
        <Header title="Meals" />
      )}
      {type === 'drinks' && (!recipeID || recipeInProgress) && (
        <Header title="Drinks" />
      )}
      <RecipeFetcher
        type={ type }
        selectedCategory={ selectedCategory }
        isFilterSelected={ isFilterSelected }
      >
        {(recipes) => (
          <>
            <ButtonCard
              type={ type }
              onCategorySelected={ handleCategorySelected }
            />
            <h1>{type === 'meals' ? 'Comidas' : 'Bebidas'}</h1>
            <div>
              {recipes.map((recipe, index) => (
                <button
                  className={ style.cardImg }
                  key={ index }
                  data-testid={ `${index}-recipe-card` }
                  onClick={ () => handleRecipeClick(recipe) }
                >
                  <img
                    src={ type === 'meals' ? recipe.strMealThumb : recipe.strDrinkThumb }
                    alt={ type === 'meals' ? recipe.strMeal : recipe.strDrink }
                    data-testid={ `${index}-card-img` }
                  />
                  <p data-testid={ `${index}-card-name` }>
                    {type === 'meals' ? recipe.strMeal : recipe.strDrink}
                  </p>
                </button>
              ))}
            </div>
          </>
        )}
      </RecipeFetcher>
    </div>
  );
}

export default Recipes;
