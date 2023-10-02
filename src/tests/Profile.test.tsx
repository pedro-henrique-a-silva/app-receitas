import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import Profile from '../Pages/Profile';
import renderWithRouterAndContext from '../utils/render';
import DoneRecipes from '../Pages/DoneRecipes';
import FavoriteRecipes from '../Pages/FavoriteRecipes';
import Login from '../Pages/Login';

test('testes da pagina de Profile', async () => {
  renderWithRouterAndContext(<Profile />);

  const h2 = screen.getByTestId('profile-email');
  const buttonDone = screen.getByTestId('profile-done-btn');
  const buttonFavorite = screen.getByTestId('profile-favorite-btn');
  const buttonLogout = screen.getByTestId('profile-logout-btn');

  expect(h2).toBeInTheDocument();
  expect(buttonDone).toBeInTheDocument();
  expect(buttonFavorite).toBeInTheDocument();
  expect(buttonLogout).toBeInTheDocument();

  await userEvent.click(buttonDone);
  renderWithRouterAndContext(<DoneRecipes />);

  await userEvent.click(buttonFavorite);
  renderWithRouterAndContext(<FavoriteRecipes />);

  await userEvent.click(buttonLogout);
  renderWithRouterAndContext(<Login />);
});
