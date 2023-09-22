import React from 'react';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

type HeaderProp = {
  title: string;
};

function Header(props: HeaderProp) {
  const { title } = props;

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
            <img data-testid="search-top-btn" src={ searchIcon } alt="searchIcon" />
          )
          }
          <img data-testid="profile-top-btn" src={ profileIcon } alt="profileIcon" />
        </div>
      </header>
      <div>
        <h1 data-testid="page-title">{title}</h1>
      </div>
    </>
  );
}

export default Header;
