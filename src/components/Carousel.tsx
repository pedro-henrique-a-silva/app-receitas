import React, { useEffect, useState } from 'react';
import style from './Carousel.module.css';

type CarouselProps = {
  mealOrDrink: 'meals' | 'drinks';
};

const mealsApiBase = 'https://www.themealdb.com/api/json/v1/1/';
const drinksApiBase = 'https://www.thecocktaildb.com/api/json/v1/1/';

function Carousel(props: CarouselProps) {
  const { mealOrDrink } = props;
  const [recomendations, setRecomendations] = useState<any[]>([]);

  useEffect(() => {
    const getRecomendations = async () => {
      const RecomendationsUrl = mealOrDrink === 'meals' ? drinksApiBase : mealsApiBase;
      const recomendationResponse = await fetch(`${RecomendationsUrl}search.php?s=`);
      const recomendData = await recomendationResponse.json();
      setRecomendations(recomendData.meals || recomendData.drinks);
    };
    getRecomendations();
  });
  return (
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
  );
}

export default Carousel;
