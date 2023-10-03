import React from 'react';

import { act, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { vi } from 'vitest';
import renderWithRouterAndContext from '../utils/render';
import App from '../App';

// import categorysMeal from './mocks/mealCategories.js';
// import categorysDrink from './mocks/categorysDrink';

// import * as allMeals from './mocks/meals.js';
// import allDrinks from './mocks/drinks.js';
// import mealFiltered from './mocks/mealFiltered';

const RECIPE_CARD_01_TESTID = '0-recipe-card';
const RECIPE_CARD_02_TESTID = '1-recipe-card';
const RECIPE_CARD_03_TESTID = '2-recipe-card';
const RECIPE_CARD_04_TESTID = '3-recipe-card';
const RECIPE_CARD_05_TESTID = '4-recipe-card';
const RECIPE_CARD_06_TESTID = '5-recipe-card';
const RECIPE_CARD_07_TESTID = '6-recipe-card';
const RECIPE_CARD_08_TESTID = '7-recipe-card';
const RECIPE_CARD_09_TESTID = '8-recipe-card';
const RECIPE_CARD_10_TESTID = '9-recipe-card';
const RECIPE_CARD_11_TESTID = '10-recipe-card';
const RECIPE_CARD_12_TESTID = '11-recipe-card';

const RECIPE_CARD_NAME_01_TESTID = '0-card-name';

const RECIPE_PHOTO_TESTID = 'recipe-photo';
const RECIPE_TITLE_TESTID = 'recipe-title';
const RECIPE_CATEGORY_TESTID = 'recipe-category';
const SHARE_BTN_TESTID = 'share-btn';
const FAVORITE_BTN_TESTID = 'favorite-btn';

afterEach(() => vi.restoreAllMocks());
describe('Testando o Componente Recipes', () => {
  test('Testa se o componente renderiza corretamente', async () => {
    renderWithRouterAndContext(<App />, { route: '/meals' });
    await waitForElementToBeRemoved(() => screen.getByText(/Loading.../i));

    const pageTitle = screen.getByTestId('page-title');
    const profileBtn = screen.getByTestId('profile-top-btn');
    const searchBtn = screen.getByTestId('search-top-btn');
    expect(pageTitle).toBeInTheDocument();
    expect(profileBtn).toBeInTheDocument();
    expect(searchBtn).toBeInTheDocument();
  });

  test('Testa se as 12 receitas foram renderizadas', async () => {
    // vi.spyOn(global, 'fetch').mockResolvedValue({
    //   json: async () => allMeals,
    // } as Response);
    // console.log(allMeals);

    renderWithRouterAndContext(<App />, { route: '/meals' });

    await waitForElementToBeRemoved(() => screen.getByText(/Loading.../i));

    const recipeCards1 = await screen.findByTestId(RECIPE_CARD_01_TESTID);
    const recipeCards2 = await screen.findByTestId(RECIPE_CARD_02_TESTID);
    const recipeCards3 = await screen.findByTestId(RECIPE_CARD_03_TESTID);
    const recipeCards4 = await screen.findByTestId(RECIPE_CARD_04_TESTID);
    const recipeCards5 = await screen.findByTestId(RECIPE_CARD_05_TESTID);
    const recipeCards6 = await screen.findByTestId(RECIPE_CARD_06_TESTID);
    const recipeCards7 = await screen.findByTestId(RECIPE_CARD_07_TESTID);
    const recipeCards8 = await screen.findByTestId(RECIPE_CARD_08_TESTID);
    const recipeCards9 = await screen.findByTestId(RECIPE_CARD_09_TESTID);
    const recipeCards10 = await screen.findByTestId(RECIPE_CARD_10_TESTID);
    const recipeCards11 = await screen.findByTestId(RECIPE_CARD_11_TESTID);
    const recipeCards12 = await screen.findByTestId(RECIPE_CARD_12_TESTID);

    expect(recipeCards1).toBeInTheDocument();
    expect(recipeCards2).toBeInTheDocument();
    expect(recipeCards3).toBeInTheDocument();
    expect(recipeCards4).toBeInTheDocument();
    expect(recipeCards5).toBeInTheDocument();
    expect(recipeCards6).toBeInTheDocument();
    expect(recipeCards7).toBeInTheDocument();
    expect(recipeCards8).toBeInTheDocument();
    expect(recipeCards9).toBeInTheDocument();
    expect(recipeCards10).toBeInTheDocument();
    expect(recipeCards11).toBeInTheDocument();
    expect(recipeCards12).toBeInTheDocument();
  });
  test('Testa se botão de filtro por categoria é limpar filtro funciona corretamente', async () => {
    // vi.spyOn(global, 'fetch').mockResolvedValueOnce({
    //   json: async () => allMeals,
    // } as Response).mockResolvedValueOnce({
    //   json: async () => categorysMeal,
    // } as Response).mockResolvedValueOnce({
    //   json: async () => mealFiltered,
    // } as Response)
    //   .mockResolvedValueOnce({
    //     json: async () => allMeals,
    //   } as Response);

    const { user } = renderWithRouterAndContext(<App />, { route: '/meals' });
    await waitForElementToBeRemoved(() => screen.getByText(/Loading.../i));

    const recipeCardBefore1 = await screen.findByTestId(RECIPE_CARD_NAME_01_TESTID);
    const categoryBeef = await screen.findByTestId('Beef-category-filter');
    expect(recipeCardBefore1.textContent).toBe('Corba');

    await act(async () => {
      await user.click(categoryBeef);
    });

    await waitForElementToBeRemoved(() => screen.getByText(/Loading.../i));
    const recipeCardAfter1 = await screen.findByTestId(RECIPE_CARD_NAME_01_TESTID);
    expect(recipeCardAfter1.textContent).toBe('Beef and Mustard Pie');
    // await new Promise((resolve) => { setTimeout(resolve, 1000); });

    await act(async () => {
      const clearFilter = await screen.findByTestId('All-category-filter');
      await user.click(clearFilter);
    });

    await waitForElementToBeRemoved(() => screen.getByText(/Loading.../i));

    // await new Promise((resolve) => { setTimeout(resolve, 1000); });
    expect(recipeCardBefore1.textContent).toBe('Corba');
  });

  test('Testando se ao clicar em um card de comida redireciona para a rota de detalhes', async () => {
    // vi.spyOn(global, 'fetch').mockResolvedValue({
    //   json: async () => allMeals,
    // } as Response);

    const { user } = renderWithRouterAndContext(<App />, { route: '/meals' });
    await waitForElementToBeRemoved(() => screen.getByText(/Loading.../i));

    await act(async () => {
      const recipeCard = await screen.findByTestId(RECIPE_CARD_01_TESTID);
      await user.click(recipeCard);
    });

    await waitForElementToBeRemoved(() => screen.getByText(/Loading.../i));

    const recipePhoto = await screen.findByTestId(RECIPE_PHOTO_TESTID);
    const recipeTitle = await screen.findByTestId(RECIPE_TITLE_TESTID);
    const recipeCategory = await screen.findByTestId(RECIPE_CATEGORY_TESTID);
    const shareBtn = await screen.findByTestId(SHARE_BTN_TESTID);
    const favoriteBtn = await screen.findByTestId(FAVORITE_BTN_TESTID);

    expect(recipePhoto).toBeInTheDocument();
    expect(recipeTitle).toBeInTheDocument();
    expect(recipeCategory).toBeInTheDocument();
    expect(shareBtn).toBeInTheDocument();
    expect(favoriteBtn).toBeInTheDocument();
  });

  test('Testando se ao clicar em um card de bebida redireciona para a rota de detalhes', async () => {
    // vi.spyOn(global, 'fetch').mockResolvedValue({
    //   json: async () => allDrinks,
    // } as Response);

    const { user } = renderWithRouterAndContext(<App />, { route: '/drinks' });
    await waitForElementToBeRemoved(() => screen.getByText(/Loading.../i));

    await act(async () => {
      const recipeCard = await screen.findByTestId(RECIPE_CARD_01_TESTID);
      await user.click(recipeCard);
    });

    await waitForElementToBeRemoved(() => screen.getByText(/Loading.../i));

    const recipePhoto = await screen.findByTestId(RECIPE_PHOTO_TESTID);
    const recipeTitle = await screen.findByTestId(RECIPE_TITLE_TESTID);
    const recipeCategory = await screen.findByTestId(RECIPE_CATEGORY_TESTID);
    const shareBtn = await screen.findByTestId(SHARE_BTN_TESTID);
    const favoriteBtn = await screen.findByTestId(FAVORITE_BTN_TESTID);

    expect(recipePhoto).toBeInTheDocument();
    expect(recipeTitle).toBeInTheDocument();
    expect(recipeCategory).toBeInTheDocument();
    expect(shareBtn).toBeInTheDocument();
    expect(favoriteBtn).toBeInTheDocument();
  });
});
