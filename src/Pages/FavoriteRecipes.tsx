import React from 'react';
import Header from '../components/Header';
import Profile from './Profile';

function FavoriteRecipes() {
  return (
    <>
      <Header title="Favorite Recipes" isProfile isSearch={ false } />
      <Profile />
    </>
  );
}

export default FavoriteRecipes;
