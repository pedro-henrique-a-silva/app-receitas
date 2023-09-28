import React from 'react';

import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import renderWithRouterAndContext from '../utils/render';
import App from '../App';

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

describe('Testando o Componente Recipes', () => {
  test('Testa se o componente renderiza corretamente', async () => {
    renderWithRouterAndContext(<App />, { route: '/meals' });
    await waitForElementToBeRemoved(() => screen.getByText(/Loading.../i), { timeout: 10000 });

    const pageTitle = screen.getByTestId('page-title');
    const profileBtn = screen.getByTestId('profile-top-btn');
    const searchBtn = screen.getByTestId('search-top-btn');
    expect(pageTitle).toBeInTheDocument();
    expect(profileBtn).toBeInTheDocument();
    expect(searchBtn).toBeInTheDocument();
  });
  test('Testa se as 12 receitas foram renderizadas', async () => {
    renderWithRouterAndContext(<App />, { route: '/meals' });

    await waitForElementToBeRemoved(() => screen.getByText(/Loading.../i), { timeout: 10000 });

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
});
