import React, { useState } from 'react';
import { fetchMealsByFirstLetter,
  fetchMealsByIngredient, fetchMealsByName } from '../utils/fetchAPi';

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

  const handleSearch = async () => {
    // eslint-disable-next-line sonarjs/no-duplicate-string
    if (searchType === 'First letter' && searchTerm.length !== 1) {
      window.alert('Your search must have only 1 (one) character');
      return;
    }

    let data = [];

    switch (searchType) {
      case 'Ingredient':
        data = await fetchMealsByIngredient(searchTerm);
        break;
      case 'Name':
        data = await fetchMealsByName(searchTerm);
        break;
      case 'First letter':
        if (searchTerm.length === 1) {
          data = await fetchMealsByFirstLetter(searchTerm);
        } else {
          window.alert('Your search must have only 1 (one) character');
        }
        break;
      default:
        break;
    }

    setSearchResults(data);
  };

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
        <ul>
          {searchResults.map((meal) => (
            <li key={ meal.idMeal }>{ meal.strMeal }</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default SearchBar;
