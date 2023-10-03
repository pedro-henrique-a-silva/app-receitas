import { screen, act } from '@testing-library/react';
import renderWithRouterAndContext from '../utils/render';
import App from '../App';

const HORIZONTAL_TOP_TEXT_01 = '0-horizontal-name';
const HORIZONTAL_TOP_TEXT_02 = '1-horizontal-name';
const HORIZONTAL_TOP_TEXT_03 = '2-horizontal-name';

const FILTER_BY_ALL_BTN = 'filter-by-all-btn';
const FILTER_BY_FOOD_BTN = 'filter-by-meal-btn';
const FILTER_BY_DRINK_BTN = 'filter-by-drink-btn';

const SHARE_BTN_TESTID = '0-horizontal-share-btn';

const ROTA_DONE_RECIPES = '/done-recipes';

const doneRecipes = [
  {
    id: '52977',
    type: 'meal',
    nationality: 'Turkish',
    category: 'Side',
    alcoholicOrNot: '',
    name: 'Corba',
    image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
    doneDate: '2023-10-03T01:49:46.990Z',
    tags: ['Soup'],
  },
  {
    id: '53065',
    type: 'meal',
    nationality: 'Japanese',
    category: 'Seafood',
    alcoholicOrNot: '',
    name: 'Sushi',
    image: 'https://www.themealdb.com/images/media/meals/g046bb1663960946.jpg',
    doneDate: '2023-10-03T01:50:18.416Z',
    tags: [],
  },
  {
    id: '17141',
    type: 'drink',
    nationality: '',
    category: 'Punch / Party Drink',
    alcoholicOrNot: 'Alcoholic',
    name: 'Smut',
    image: 'https://www.thecocktaildb.com/images/media/drink/rx8k8e1504365812.jpg',
    doneDate: '2023-10-03T01:50:47.810Z',
    tags: [],
  },
];
afterEach(() => {
  localStorage.clear();
});

describe('Componente DoneRecipes', () => {
  test('Verifica se renderiza receitas concluidas', () => {
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
    renderWithRouterAndContext(<App />, { route: ROTA_DONE_RECIPES });
    // await waitForElementToBeRemoved(() => screen.getByText(/Loading.../i), { timeout: 10000 });

    const doneRecipe01 = screen.getByTestId(HORIZONTAL_TOP_TEXT_01);
    const doneRecipe02 = screen.getByTestId(HORIZONTAL_TOP_TEXT_02);
    const doneRecipe03 = screen.getByTestId(HORIZONTAL_TOP_TEXT_03);

    expect(doneRecipe01).toBeInTheDocument();
    expect(doneRecipe02).toBeInTheDocument();
    expect(doneRecipe03).toBeInTheDocument();

    expect(doneRecipe01.textContent).toBe(doneRecipes[0].name);
    expect(doneRecipe02.textContent).toBe(doneRecipes[1].name);
    expect(doneRecipe03.textContent).toBe(doneRecipes[2].name);
  });

  test('Verifica filtro de receitas concluidas', async () => {
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
    const { container, user } = renderWithRouterAndContext(<App />, { route: ROTA_DONE_RECIPES });
    // await waitForElementToBeRemoved(() => screen.getByText(/Loading.../i), { timeout: 10000 });

    const filterAllBtn = screen.getByTestId(FILTER_BY_ALL_BTN);
    const filterFoodBtn = screen.getByTestId(FILTER_BY_FOOD_BTN);
    const filterDrinkBtn = screen.getByTestId(FILTER_BY_DRINK_BTN);

    await act(async () => {
      await user.click(filterFoodBtn);
    });

    const doneReceipes01 = container.querySelectorAll('ul li');
    expect(doneReceipes01.length).toBe(2);

    await act(async () => {
      await user.click(filterDrinkBtn);
    });

    const doneReceipes02 = container.querySelectorAll('ul li');
    expect(doneReceipes02.length).toBe(1);

    await act(async () => {
      await user.click(filterAllBtn);
    });

    const doneReceipes03 = container.querySelectorAll('ul li');
    expect(doneReceipes03.length).toBe(3);
  });
  test('Testando compartilhamento de receita', async () => {
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
    const { user } = renderWithRouterAndContext(<App />, { route: ROTA_DONE_RECIPES });

    // await waitForElementToBeRemoved(() => screen.getByText(/loading.../i), { timeout: 10000 });

    const shareBtn = await screen.findByTestId(SHARE_BTN_TESTID);
    await act(async () => {
      await user.click(shareBtn);
    });

    expect(screen.getByText('Link copied!')).toBeInTheDocument();
  });
});
