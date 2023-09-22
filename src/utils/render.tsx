import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import RecipesProvider from '../context/recipesProvider';

const renderWithRouterAndContext = (ui: JSX.Element, { route = '/' } = {}) => {
  window.history.pushState({}, '', route);

  return {
    user: userEvent.setup(),
    ...render(
      <BrowserRouter>
        <RecipesProvider>
          { ui }
        </RecipesProvider>
      </BrowserRouter>,
    ),
  };
};

export default renderWithRouterAndContext;
