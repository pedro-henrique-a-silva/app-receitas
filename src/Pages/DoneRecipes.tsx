import React from 'react';
import Header from '../components/Header';
import Footer from './Footer';
import Profile from './Profile';

function DoneRecipes() {
  return (
    <>
      <Header title="Done Recipes" isProfile isSearch={ false } />
      <Profile />
      <h1>categorias</h1>
      <Footer />
    </>
  );
}

export default DoneRecipes;
