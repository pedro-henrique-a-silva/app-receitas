import React from 'react';

import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from './Footer';

function Meals() {
  const { recipeID, recipeInProgress } = useParams();

  return (
    <>
      {(!recipeID || recipeInProgress) && <Header title="Meals" />}

      <h1>categorias</h1>
      <Footer />
    </>
  );
}

export default Meals;
