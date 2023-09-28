import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import style from './RecipeCover.module.css';

type RecipeCoverProps = {
  mealOrDrink: 'meals' | 'drinks';
  recipeDetails: any;
  favorite: boolean;
  handleShareClick: () => void;
  handleFavoriteClick: (recipeData: any) => void;
};

function RecipeCover(props: RecipeCoverProps) {
  const {
    mealOrDrink,
    recipeDetails,
    favorite,
    handleShareClick,
    handleFavoriteClick } = props;

  return (
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
        <button
          onClick={ () => handleFavoriteClick(recipeDetails) }
        >
          <img
            data-testid="favorite-btn"
            src={ (favorite) ? blackHeartIcon : whiteHeartIcon }
            alt="favorite Icon"
          />
        </button>
      </div>
    </div>
  );
}

export default RecipeCover;
