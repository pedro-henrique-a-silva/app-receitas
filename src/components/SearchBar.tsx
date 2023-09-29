import React from 'react';

function SearchBar() {
  return (
    <div>
      <input data-testid="search-input" type="text" placeholder="Digite sua busca..." />
      <div>
        <label>
          <input
            type="radio"
            data-testid="ingredient-search-radio"
            name="search-type"
          />
          Buscar por Ingrediente
        </label>
      </div>
      <div>
        <label>
          <input
            type="radio"
            data-testid="name-search-radio"
            name="search-type"
          />
          Buscar por Nome
        </label>
      </div>
      <div>
        <label>
          <input
            type="radio"
            data-testid="first-letter-search-radio"
            name="search-type"
          />
          Buscar pela Primeira Letra
        </label>
      </div>
      <button data-testid="exec-search-btn">Buscar</button>
    </div>
  );
}

export default SearchBar;
