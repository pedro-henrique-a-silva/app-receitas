import style from './Carousel.module.css';
import useFetch from '../hooks/useFetch';

type CarouselProps = {
  mealOrDrink: 'meals' | 'drinks';
};

function Carousel(props: CarouselProps) {
  const { mealOrDrink } = props;
  const {
    allRecipes: recomendations } = useFetch(mealOrDrink, '0', false, true);

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
