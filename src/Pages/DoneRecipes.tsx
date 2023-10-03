import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import { DoneRecipeType } from '../types';
import Header from '../components/Header';
import Message from '../components/Message';

function DoneRecipes() {
  const [recipesDone, setRecipesDone] = useState<DoneRecipeType[]>([]);
  const [filter, setFilter] = useState('all');
  const [isVisible, setIsVisible] = useState(false);

  const toggleIsVisible = () => {
    setIsVisible(!isVisible);
  };

  useEffect(() => {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes') || '[]');
    setRecipesDone(doneRecipes);
  }, []);

  const filterRecipes = (type: string) => {
    setFilter(type);
  };

  const copyText = async (recipe: DoneRecipeType) => {
    const recipeUrl = `${window.location.origin}/${recipe.type}s/${recipe.id}`;
    await navigator.clipboard.writeText(recipeUrl);
    toggleIsVisible();
  };

  const renderFilterButtons = () => {
    const filterTypes = ['all', 'meal', 'drink'];

    return (
      <div>
        {filterTypes.map((type) => (
          <button
            key={ type }
            onClick={ () => filterRecipes(type) }
            data-testid={ `filter-by-${type}-btn` }
          >
            {(() => {
              switch (type) {
                case 'all':
                  return 'All';
                case 'meal':
                  return 'Meals';
                case 'drink':
                  return 'Drinks';
                default:
                  return '';
              }
            })()}
          </button>
        ))}
      </div>
    );
  };

  const renderTopText = (recipe: DoneRecipeType) => {
    if (recipe.type === 'meal') {
      return `${recipe.nationality} - ${recipe.category}`;
    }
    return recipe.alcoholicOrNot;
  };

  return (
    <>
      {(isVisible) && <Message toggleIsVisible={ toggleIsVisible } />}
      <Header title="Done Recipes" />

      <div>
        {renderFilterButtons()}
        <ul>
          {recipesDone
            .filter((recipe) => filter === 'all' || recipe.type === filter)
            .map((recipe, index) => (
              <li key={ index }>
                <Link to={ `/${recipe.type}s/${recipe.id}` }>
                  <img
                    width="175px"
                    src={ recipe.image }
                    alt={ recipe.name }
                    data-testid={ `${index}-horizontal-image` }
                  />
                  <p data-testid={ `${index}-horizontal-name` }>{recipe.name}</p>
                </Link>
                <p data-testid={ `${index}-horizontal-top-text` }>
                  {renderTopText(recipe)}
                </p>
                <p data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</p>
                <div>
                  {recipe.tags.slice(0, 2).map((tag, tagIndex) => (
                    <span
                      key={ tagIndex }
                      data-testid={ `${index}-${tag}-horizontal-tag` }
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <button onClick={ () => copyText(recipe) }>
                  <img
                    data-testid={ `${index}-horizontal-share-btn` }
                    src={ shareIcon }
                    alt="Share icon"
                  />
                </button>

              </li>
            ))}
        </ul>
      </div>
    </>
  );
}

export default DoneRecipes;
