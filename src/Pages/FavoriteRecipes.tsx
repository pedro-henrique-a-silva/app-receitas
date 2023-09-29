import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import style from './FavoriteRecipes.module.css';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import Message from '../components/Message';
import Header from '../components/Header';
import Footer from './Footer';

function FavoriteRecipes() {
  const [favoriteRecipes, setFavoriteRecipes] = useState<any[]>([]);
  const [filteredFavoriteRecipes, setFilteredFavoriteRecipes] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  const toggleIsVisible = () => {
    setIsVisible(!isVisible);
  };

  const handleFavoriteClick = (recipeData: any) => {
    const newFavoriteRecipes = favoriteRecipes
      .filter((recipe: any) => recipe.id !== recipeData.id);

    localStorage.setItem('favoriteRecipes', JSON
      .stringify(newFavoriteRecipes));
    setFavoriteRecipes(newFavoriteRecipes);
  };

  const handleShareClick = (recipeData: any) => {
    const url = `http://localhost:3000/${recipeData.type}s/${recipeData.id}`;
    navigator.clipboard.writeText(url);
    toggleIsVisible();
  };

  const handleFilter = (filter: string) => {
    setFilteredFavoriteRecipes(filter);
  };

  useEffect(() => {
    const favoriteRecipesFromLocalStorage = JSON
      .parse(localStorage.getItem('favoriteRecipes') as string) || [];
    setFavoriteRecipes(favoriteRecipesFromLocalStorage);
  }, []);

  const favoriteRecipesToRender = favoriteRecipes.filter((recipe) => {
    if (filteredFavoriteRecipes === '') return true;
    return recipe.type === filteredFavoriteRecipes;
  });

  // if (favoriteRecipesToRender.length === 0) return (<div>Loading...</div>);

  return (
    <>
      {(isVisible) && <Message toggleIsVisible={ toggleIsVisible } />}
      <Header title="Receitas Favoritas" />
      <section>
        <button
          onClick={ () => handleFilter('') }
          data-testid="filter-by-all-btn"
          type="button"
        >
          All

        </button>
        <button
          onClick={ () => handleFilter('meal') }
          data-testid="filter-by-meal-btn"
          type="button"
        >
          Food

        </button>
        <button
          onClick={ () => handleFilter('drink') }
          data-testid="filter-by-drink-btn"
          type="button"
        >
          Drinks

        </button>
      </section>
      <ul>
        {favoriteRecipesToRender.map((recipe, index) => (
          <li className={ style.cardWrapper } key={ index }>
            <Link to={ `/${recipe.type}s/${recipe.id}` }>
              <img
                data-testid={ `${index}-horizontal-image` }
                src={ recipe.image }
                alt={ recipe.name }
              />
            </Link>
            <div>
              <Link to={ `/${recipe.type}s/${recipe.id}` }>
                <p
                  data-testid={ `${index}-horizontal-name` }
                >
                  {recipe.name}
                </p>
              </Link>

              <p
                data-testid={ `${index}-horizontal-top-text` }
              >
                {`${recipe.nationality || recipe.alcoholicOrNot} - ${recipe.category}`}
              </p>

              <div className={ style.socialButtons }>

                <button
                  onClick={ () => handleShareClick(recipe) }
                >
                  <img
                    data-testid={ `${index}-horizontal-share-btn` }
                    src={ shareIcon }
                    alt={ recipe.name }
                  />
                </button>
                <button
                  onClick={ () => handleFavoriteClick(recipe) }
                >
                  <img
                    data-testid={ `${index}-horizontal-favorite-btn` }
                    src={ blackHeartIcon }
                    alt={ recipe.name }
                  />
                </button>
              </div>
            </div>
          </li>

        ))}
      </ul>
      <Footer />
    </>
  );
}

export default FavoriteRecipes;

// caso a receita do card seja uma comida, ela apresente:
// foto da receita,
// nome,
// categoria,
// nacionalidade,
// botão de compartilhar
// botão de desfavoritar

// caso a receita do card seja uma bebida
// foto da receita
// nome
// se é alcoólica ou não
// botão de compartilhar
// botão de desfavoritar
