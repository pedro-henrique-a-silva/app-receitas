import { screen, waitFor } from '@testing-library/react';
import App from '../App';
import renderWithRouterAndContext from '../utils/render';
import Recipes from '../components/Recipes/Recipes';

const pageTitleEl = 'page-title';
const profileTopButtonEl = 'profile-top-btn';
const firstMeals = '/meals/52977';

test('verificação se os elemento HTML estão na tela', async () => {
  renderWithRouterAndContext(<App />, { route: '/meals' });
  await waitFor(() => {
    screen.getByTestId(pageTitleEl);
    screen.getByTestId(profileTopButtonEl);
  });
});
describe('Testa o componente Recipes Details', () => {
  test('Verifiica se o componente renderiza os botões de filtragem corretamente', async () => {

  });
  test('Testa se as 12 receitas são carregadas corretamente na rota "/meals"', async () => {
    renderWithRouterAndContext(
      <Recipes type="meals" />,
      { route: '/meals' },
    );
    await waitFor(() => {
      screen.getByText('Corba');
    });
    screen.getAllByText('Corba');
  });

  test('Verifica rota Done Recipes', async () => {
    renderWithRouterAndContext(<App />, { route: '/done-recipes' });

    const pageTitle = screen.getByTestId(pageTitleEl);
    const profileBtn = screen.getByTestId(profileTopButtonEl);

    expect(pageTitle).toBeInTheDocument();
    expect(profileBtn).toBeInTheDocument();
    // expect(screen.getByTestId('searchTopButtonEl')).not.toBeInTheDocument();
  });

  test('Verifica rota Favorites Recipes', async () => {
    renderWithRouterAndContext(<App />, { route: '/favorite-recipes' });

    const pageTitle = screen.getByTestId(pageTitleEl);
    const profileBtn = screen.getByTestId(profileTopButtonEl);

    expect(pageTitle).toBeInTheDocument();
    expect(profileBtn).toBeInTheDocument();
    // expect(screen.getByTestId('searchTopButtonEl')).not.toBeInTheDocument();
  });

  test('Verifica RecipeDetailsMeals', () => {
    renderWithRouterAndContext(<App />, { route: firstMeals });
  });

  test('Verifica RecipeDetailsDrinks', () => {
    renderWithRouterAndContext(<App />, { route: '/drinks/15977' });
  });
  test('Teste se a rota /meals renderiza corretamente', async () => {
    renderWithRouterAndContext(<App />, { route: '/meals' });
    const pageTitle = screen.getByTestId(pageTitleEl);
    const profileBtn = screen.getByTestId(profileTopButtonEl);
    const searchBtn = screen.getByTestId('search-top-btn');
    expect(pageTitle).toBeInTheDocument();
    expect(profileBtn).toBeInTheDocument();
    expect(searchBtn).toBeInTheDocument();
  });
  test('Teste se  useEffect do Recipes funciona corretamente', async () => {
    renderWithRouterAndContext(<App />, { route: '/meals' });
  });
});
