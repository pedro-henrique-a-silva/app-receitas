import { useEffect, useState } from 'react';
import style from './Carousel.module.css';
import { fetchAllOrByCategory } from '../utils/fetchAPi';

type CarouselProps = {
  mealOrDrink: 'meals' | 'drinks';
};

function Carousel(props: CarouselProps) {
  const { mealOrDrink } = props;
  const [recomendations, setRecomendations] = useState<any[]>([]);

  useEffect(() => {
    const getData = async () => {
      const mealOrDrinkRecomend = mealOrDrink === 'meals' ? 'drinks' : 'meals';
      const recomendData = await fetchAllOrByCategory(mealOrDrinkRecomend, '');
      setRecomendations(recomendData.slice(0, 6));
    };
    getData();
  });

  return (
    <div
      className={ style.recipeCarousel }
    >
      {recomendations.map((recomendation, index) => (
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
