import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import RecipesProvider from '../context/recipesProvider';

const renderWithRouterAndContext = (component: React.ReactNode) => render(
  <BrowserRouter>
    <RecipesProvider>
      { component }
    </RecipesProvider>
  </BrowserRouter>,
);

export default renderWithRouterAndContext;
