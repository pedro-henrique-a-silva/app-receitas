import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ButtonCard from '../components/ButtonCard';
import Header from '../components/Header';
import style from './Recipes.module.css';
import { fetchAllOrByCategory, fetchCategories } from '../utils/fetchAPi';
import Footer from './Footer';
import RecipesContext from '../context/contextRecipes';
import { Recipe } from '../types';

type RecipesProps = {
  mealOrDrink: 'meals' | 'drinks';
};

function Recipes({ mealOrDrink }: RecipesProps) {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categorys, setCategorys] = useState<any[]>([]);
  const { recipeID, recipeInProgress } = useParams();
  const navigate = useNavigate();

  const { recipes, updateRecipes } = useContext(RecipesContext);

  // Função para lidar com a seleção de categoria
  const handleCategorySelected = (category: string) => {
    // Se o filtro estiver selecionado, deselecione-o
    if (category === selectedCategory) {
      setSelectedCategory('');
    } else {
      setSelectedCategory(category);
    }
  };

  const handleRecipeClick = (recipe: Recipe) => {
    const route = mealOrDrink === 'meals'
      ? `/meals/${recipe.idMeal}`
      : `/drinks/${recipe.idDrink}`;
    navigate(route);
  };

  useEffect(() => {
    const getRecipes = async () => {
      const recipesData = await fetchAllOrByCategory(mealOrDrink, selectedCategory);
      if (recipesData) {
        updateRecipes(recipesData.slice(0, 12));
      }
    };

    getRecipes();
  }, [mealOrDrink, selectedCategory]);

  useEffect(() => {
    const getCategorys = async () => {
      const categorysData = await fetchCategories(mealOrDrink);
      if (categorysData) {
        setCategorys(categorysData.slice(0, 5));
      }

      if (!categorysData.slice(0, 5).includes(selectedCategory)) {
        setSelectedCategory('');
      }
    };

    getCategorys();
  }, [mealOrDrink]);

  const isMealOrDrink = (mealOrDrink === 'meals') || (mealOrDrink === 'drinks');
  const hasRecipeID = (!recipeID || recipeInProgress);

  if (recipes.length === 0 || categorys.length === 0) return <p>Loading...</p>;

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
        categories={ categorys }
        onCategorySelected={ handleCategorySelected }
      />
      <h1>{mealOrDrink === 'meals' ? 'Comidas' : 'Bebidas'}</h1>
      <div>
        {recipes.splice(0, 12).map((recipe, index) => (
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
      <Footer />
    </div>
  );
}

export default Recipes;
