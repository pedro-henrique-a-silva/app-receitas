import React from 'react';

import { act, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { vi } from 'vitest';
import renderWithRouterAndContext from '../utils/render';
import App from '../App';

const RECIPE_CARD_01_TESTID = '0-card-name';
const RECIPE_CARD_02_TESTID = '1-card-name';
const RECIPE_CARD_03_TESTID = '2-card-name';
const RECIPE_CARD_04_TESTID = '3-card-name';
const RECIPE_CARD_05_TESTID = '4-card-name';
const RECIPE_CARD_06_TESTID = '5-card-name';
const RECIPE_CARD_07_TESTID = '6-card-name';
const RECIPE_CARD_08_TESTID = '7-card-name';
const RECIPE_CARD_09_TESTID = '8-card-name';
const RECIPE_CARD_10_TESTID = '9-card-name';
const RECIPE_CARD_11_TESTID = '10-card-name';
const RECIPE_CARD_12_TESTID = '11-card-name';

describe('Testando search bar', () => {
  test('Deve renderizar o componente SearchBar corretamente', async () => {
    const { user } = renderWithRouterAndContext(<App />, { route: '/meals' });
    await waitForElementToBeRemoved(() => screen.getByText(/Loading.../i), { timeout: 10000 });

    const searchBtn = screen.getByTestId('search-top-btn');

    expect(searchBtn).toBeInTheDocument();

    await act(async () => {
      await user.click(searchBtn);
    });
    const searchInput = screen.getByTestId('search-input');
    const ingredientSearchRadio = screen.getByTestId('ingredient-search-radio');
    const nameSearchRadio = screen.getByTestId('name-search-radio');
    const firstLetterSearchRadio = screen.getByTestId('first-letter-search-radio');

    expect(searchInput).toBeInTheDocument();
    expect(ingredientSearchRadio).toBeInTheDocument();
    expect(nameSearchRadio).toBeInTheDocument();
    expect(firstLetterSearchRadio).toBeInTheDocument();
  });

  test('Deve renderizar o componente SearchBar corretamente', async () => {
    const { user } = renderWithRouterAndContext(<App />, { route: '/meals' });
    await waitForElementToBeRemoved(() => screen.getByText(/Loading.../i), { timeout: 10000 });

    const searchBtn = screen.getByTestId('search-top-btn');

    expect(searchBtn).toBeInTheDocument();

    await act(async () => {
      await user.click(searchBtn);
    });

    const searchInput = screen.getByTestId('search-input');
    const ingredientSearchRadio = screen.getByTestId('ingredient-search-radio');
    const nameSearchRadio = screen.getByTestId('name-search-radio');
    const firstLetterSearchRadio = screen.getByTestId('first-letter-search-radio');
    const searchSubmitBtn = screen.getByTestId('exec-search-btn');

    await user.type(searchInput, 'chicken');
    await user.click(ingredientSearchRadio);

    await act(async () => {
      await user.click(searchSubmitBtn);
    });

    const recipeCard01 = screen.getByTestId(RECIPE_CARD_01_TESTID);
    const recipeCard02 = screen.getByTestId(RECIPE_CARD_02_TESTID);
    const recipeCard03 = screen.getByTestId(RECIPE_CARD_03_TESTID);

    expect(recipeCard01.textContent).toBe('Brown Stew Chicken');
    expect(recipeCard02.textContent).toBe('Chicken & mushroom Hotpot');
    expect(recipeCard03.textContent).toBe('Chicken Alfredo Primavera');
  });
});
