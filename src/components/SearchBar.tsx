import React, { useState } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { MEALS_API_BASE, DRINKS_API_BASE, fetchApi } from '../utils/fetchAPi';

const FIRST_LETTER_SEARCH_TYPE = 'First letter';

function SearchBar() {
  const [searchType, setSearchType] = useState('Ingredient');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchType(event.target.value);
  };

  const handleSearchTermChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const navigate: NavigateFunction = useNavigate();

  async function handleSearch(): Promise<void> {
    const isValid = validateSearch();

    if (!isValid) {
      return;
    }

    const apiEndpoint = buildApiEndpoint();

    if (apiEndpoint) {
      const data = await fetchData(apiEndpoint);
      setSearchResults(data);

      if (data.length === 1) {
        const recipeId = data[0].idMeal || data[0].idDrink;
        redirectToRecipeDetails(recipeId);
      }
    } else {
      // Handle invalid searchType
    }
  }

  function validateSearch(): boolean {
    if (searchType === FIRST_LETTER_SEARCH_TYPE && searchTerm.length !== 1) {
      window.alert('Your search must have only 1 (one) character');
      return false;
    }
    return true;
  }

  function buildApiEndpoint(): string {
    let apiEndpoint = '';

    const isDrinksPage = window.location.pathname.includes('/drinks');

    switch (searchType) {
      case 'Ingredient':
        apiEndpoint = isDrinksPage ? DRINKS_API_BASE : MEALS_API_BASE;
        apiEndpoint += `filter.php?i=${searchTerm}`;
        break;
      case 'Name':
        apiEndpoint = isDrinksPage ? DRINKS_API_BASE : MEALS_API_BASE;
        apiEndpoint += `search.php?s=${searchTerm}`;
        break;
      case FIRST_LETTER_SEARCH_TYPE:
        if (searchTerm.length === 1) {
          apiEndpoint = isDrinksPage ? DRINKS_API_BASE : MEALS_API_BASE;
          apiEndpoint += `search.php?f=${searchTerm}`;
        }
        break;
      default:
        break;
    }

    return apiEndpoint;
  }

  async function fetchData(apiEndpoint: string): Promise<any[]> {
    try {
      return await fetchApi(apiEndpoint);
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  function redirectToRecipeDetails(recipeId: string): void {
    const isDrinksPage = window.location.pathname.includes('/drinks');
    const routePrefix: 'drinks' | 'meals' = isDrinksPage ? 'drinks' : 'meals';
    navigate(`/${routePrefix}/${recipeId}`);
  }

  return (
    <div>
      <input
        data-testid="search-input"
        type="text"
        placeholder="Digite sua busca..."
        value={ searchTerm }
        onChange={ handleSearchTermChange }
      />
      <div>
        <label>
          <input
            type="radio"
            data-testid="ingredient-search-radio"
            name="search-type"
            value="Ingredient"
            checked={ searchType === 'Ingredient' }
            onChange={ handleSearchTypeChange }
          />
          Ingredient
        </label>
        <label>
          <input
            type="radio"
            data-testid="name-search-radio"
            name="search-type"
            value="Name"
            checked={ searchType === 'Name' }
            onChange={ handleSearchTypeChange }
          />
          Name
        </label>
        <label>
          <input
            type="radio"
            data-testid="first-letter-search-radio"
            name="search-type"
            value="First letter"
            checked={ searchType === 'First letter' }
            onChange={ handleSearchTypeChange }
          />
          First letter
        </label>
      </div>
      <button data-testid="exec-search-btn" onClick={ handleSearch }>
        Search
      </button>
      <div>
        <h2>Search Results</h2>
        <div>
          {searchResults.slice(0, 12).map((recipe, index) => (
            <div key={ index } data-testid={ `${index}-recipe-card` }>
              <img
                src={ recipe.strMealThumb || recipe.strDrinkThumb }
                alt={ recipe.strMeal || recipe.strDrink }
                data-testid={ `${index}-card-img` }
              />
              <p data-testid={ `${index}-card-name` }>
                { recipe.strMeal || recipe.strDrink }
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
