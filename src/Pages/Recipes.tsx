import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ButtonCard from '../components/ButtonCard';
import Header from '../components/Header';
import style from './Recipes.module.css';
import useFetch from '../hooks/useFetch';

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
  mealOrDrink: 'meals' | 'drinks';
};

function Recipes({ mealOrDrink }: RecipesProps) {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isFilterSelected, setIsFilterSelected] = useState(false);
  const { recipes } = useFetch(mealOrDrink, '', 5, selectedCategory);
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
    const route = mealOrDrink === 'meals'
      ? `/meals/${recipe.idMeal}`
      : `/drinks/${recipe.idDrink}`;
    navigate(route);
  };

  const isMealOrDrink = (mealOrDrink === 'meals') || (mealOrDrink === 'drinks');
  const hasRecipeID = (!recipeID || recipeInProgress);

  if (recipes.length === 0) return <p>Loading...</p>;

  return (
    <div>
      {isMealOrDrink && hasRecipeID && (
        <Header
          title={
          mealOrDrink.charAt(0).toUpperCase() + mealOrDrink.slice(1)
          }
        />
      )}

      <ButtonCard
        type={ mealOrDrink }
        onCategorySelected={ handleCategorySelected }
      />
      <h1>{mealOrDrink === 'meals' ? 'Comidas' : 'Bebidas'}</h1>
      <div>
        {recipes.map((recipe, index) => (
          <button
            className={ style.cardImg }
            key={ index }
            data-testid={ `${index}-recipe-card` }
            onClick={ () => handleRecipeClick(recipe) }
          >
            <img
              src={ mealOrDrink === 'meals'
                ? recipe.strMealThumb : recipe.strDrinkThumb }
              alt={ mealOrDrink === 'meals' ? recipe.strMeal : recipe.strDrink }
              data-testid={ `${index}-card-img` }
            />
            <p data-testid={ `${index}-card-name` }>
              {mealOrDrink === 'meals' ? recipe.strMeal : recipe.strDrink}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}

export default Recipes;
