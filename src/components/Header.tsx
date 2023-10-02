import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

type HeaderProp = {
  title: string;
  updateRecipes: (recipesData: any[]) => void;
};

function Header(props: HeaderProp) {
  const { title, updateRecipes } = props;

  const [toggleSearchBar, setToggleSearchBar] = useState(false);

  const rotasSemHeader = ['profile', 'done recipes', 'favorite recipes'];

  return (
    <>
      <header>
        <div>
          <h1>Logo</h1>
        </div>
        <h1>RECIPES app</h1>
        <div>
          {
          (!rotasSemHeader.some((rota) => rota === title.toLowerCase()))
          && (

            <button
              onClick={ () => setToggleSearchBar(!toggleSearchBar) }
            >
              <img
                data-testid="search-top-btn"
                src={ searchIcon }
                alt="searchIcon"
              />
            </button>
          )
          }
          <NavLink to="/profile">
            <img data-testid="profile-top-btn" src={ profileIcon } alt="profileIcon" />
          </NavLink>
        </div>
      </header>
      {toggleSearchBar && <SearchBar updateRecipes={ updateRecipes } />}
      <div>
        <h1 data-testid="page-title">{title}</h1>
      </div>
    </>
  );
}

export default Header;
