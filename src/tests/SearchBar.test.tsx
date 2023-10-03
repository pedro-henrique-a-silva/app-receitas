import React from 'react';

import { act, screen, waitForElementToBeRemoved } from '@testing-library/react';
import renderWithRouterAndContext from '../utils/render';
import App from '../App';

const RECIPE_CARD_01_TESTID = '0-card-name';
const RECIPE_CARD_02_TESTID = '1-card-name';
const RECIPE_CARD_03_TESTID = '2-card-name';

const SEARCH_INPUT_TESTID = 'search-input';
const SEARCH_BTN = 'search-top-btn';
const INGREDIENT_SEARCH_RADIO = 'ingredient-search-radio';
const NAME_SEARCH_RADIO = 'name-search-radio';
const FIRST_LETTER_SEARCH_RADIO = 'first-letter-search-radio';
const EXEC_SEARCH_BTN = 'exec-search-btn';

describe('Testando search bar', () => {
  test('Deve renderizar o componente SearchBar corretamente', async () => {
    const { user } = renderWithRouterAndContext(<App />, { route: '/meals' });
    await waitForElementToBeRemoved(() => screen.getByText(/Loading.../i));

    const searchBtn = screen.getByTestId(SEARCH_BTN);

    expect(searchBtn).toBeInTheDocument();

    await act(async () => {
      await user.click(searchBtn);
    });
    const searchInput = screen.getByTestId(SEARCH_INPUT_TESTID);
    const ingredientSearchRadio = screen.getByTestId(INGREDIENT_SEARCH_RADIO);
    const nameSearchRadio = screen.getByTestId(NAME_SEARCH_RADIO);
    const firstLetterSearchRadio = screen.getByTestId(FIRST_LETTER_SEARCH_RADIO);

    expect(searchInput).toBeInTheDocument();
    expect(ingredientSearchRadio).toBeInTheDocument();
    expect(nameSearchRadio).toBeInTheDocument();
    expect(firstLetterSearchRadio).toBeInTheDocument();
  });

  test('Testa pesquisa de comida por ingrediente', async () => {
    const { user } = renderWithRouterAndContext(<App />, { route: '/meals' });
    await waitForElementToBeRemoved(() => screen.getByText(/Loading.../i));

    const searchBtn = screen.getByTestId(SEARCH_BTN);

    expect(searchBtn).toBeInTheDocument();

    await act(async () => {
      await user.click(searchBtn);
    });

    const searchInput = screen.getByTestId(SEARCH_INPUT_TESTID);
    const ingredientSearchRadio = screen.getByTestId(INGREDIENT_SEARCH_RADIO);
    const searchSubmitBtn = screen.getByTestId(EXEC_SEARCH_BTN);

    await act(async () => {
      await user.type(searchInput, 'chicken');
      await user.click(ingredientSearchRadio);
      await user.click(searchSubmitBtn);
    });

    await new Promise((resolve) => { setTimeout(resolve, 1000); });

    const recipeCard01 = screen.getByTestId(RECIPE_CARD_01_TESTID);
    const recipeCard02 = screen.getByTestId(RECIPE_CARD_02_TESTID);
    const recipeCard03 = screen.getByTestId(RECIPE_CARD_03_TESTID);

    expect(recipeCard01.textContent).toBe('Brown Stew Chicken');
    expect(recipeCard02.textContent).toBe('Chicken & mushroom Hotpot');
    expect(recipeCard03.textContent).toBe('Chicken Alfredo Primavera');
  });

  test('Testa pesquisa de comida por nome', async () => {
    const { user } = renderWithRouterAndContext(<App />, { route: '/meals' });
    await waitForElementToBeRemoved(() => screen.getByText(/Loading.../i));

    const searchBtn = screen.getByTestId(SEARCH_BTN);

    expect(searchBtn).toBeInTheDocument();

    await act(async () => {
      await user.click(searchBtn);
    });

    const searchInput = screen.getByTestId(SEARCH_INPUT_TESTID);
    const nameSearchRadio = screen.getByTestId(NAME_SEARCH_RADIO);
    const searchSubmitBtn = screen.getByTestId(EXEC_SEARCH_BTN);

    await act(async () => {
      await user.type(searchInput, 'soup');
      await user.click(nameSearchRadio);
      await user.click(searchSubmitBtn);
    });

    await new Promise((resolve) => { setTimeout(resolve, 1000); });

    const recipeCard01 = screen.getByTestId(RECIPE_CARD_01_TESTID);
    const recipeCard02 = screen.getByTestId(RECIPE_CARD_02_TESTID);
    const recipeCard03 = screen.getByTestId(RECIPE_CARD_03_TESTID);

    expect(recipeCard01.textContent).toBe('Leblebi Soup');
    expect(recipeCard02.textContent).toBe('Red Peas Soup');
    expect(recipeCard03.textContent).toBe('Egg Drop Soup');
  });

  test('Testa pesquisa de comida pela primeira letra', async () => {
    const { user } = renderWithRouterAndContext(<App />, { route: '/meals' });
    await waitForElementToBeRemoved(() => screen.getByText(/Loading.../i));

    const searchBtn = screen.getByTestId(SEARCH_BTN);

    expect(searchBtn).toBeInTheDocument();

    await act(async () => {
      await user.click(searchBtn);
    });

    const searchInput = screen.getByTestId(SEARCH_INPUT_TESTID);
    const firstLetterSearchRadio = screen.getByTestId(FIRST_LETTER_SEARCH_RADIO);
    const searchSubmitBtn = screen.getByTestId(EXEC_SEARCH_BTN);

    await act(async () => {
      await user.type(searchInput, 'a');
      await user.click(firstLetterSearchRadio);
      await user.click(searchSubmitBtn);
    });

    await new Promise((resolve) => { setTimeout(resolve, 1000); });

    const recipeCard01 = screen.getByTestId(RECIPE_CARD_01_TESTID);
    const recipeCard02 = screen.getByTestId(RECIPE_CARD_02_TESTID);
    const recipeCard03 = screen.getByTestId(RECIPE_CARD_03_TESTID);

    expect(recipeCard01.textContent).toBe('Apple Frangipan Tart');
    expect(recipeCard02.textContent).toBe('Apple & Blackberry Crumble');
    expect(recipeCard03.textContent).toBe('Apam balik');
  });

  test('Testa pesquisa de bebida por ingrediente', async () => {
    const { user } = renderWithRouterAndContext(<App />, { route: '/drinks' });
    await waitForElementToBeRemoved(() => screen.getByText(/Loading.../i));

    const searchBtn = screen.getByTestId(SEARCH_BTN);

    expect(searchBtn).toBeInTheDocument();

    await act(async () => {
      await user.click(searchBtn);
    });

    const searchInput = screen.getByTestId(SEARCH_INPUT_TESTID);
    const ingredientSearchRadio = screen.getByTestId(INGREDIENT_SEARCH_RADIO);
    const searchSubmitBtn = screen.getByTestId(EXEC_SEARCH_BTN);

    await act(async () => {
      await user.type(searchInput, 'lemon');
      await user.click(ingredientSearchRadio);
      await user.click(searchSubmitBtn);
    });

    await new Promise((resolve) => { setTimeout(resolve, 1000); });

    const recipeCard01 = screen.getByTestId(RECIPE_CARD_01_TESTID);
    const recipeCard02 = screen.getByTestId(RECIPE_CARD_02_TESTID);
    const recipeCard03 = screen.getByTestId(RECIPE_CARD_03_TESTID);

    expect(recipeCard01.textContent).toBe('A True Amaretto Sour');
    expect(recipeCard02.textContent).toBe('Boston Sour');
    expect(recipeCard03.textContent).toBe('Brandy Cobbler');
  });

  test('Testa pesquisa de bebida por nome', async () => {
    const { user } = renderWithRouterAndContext(<App />, { route: '/drinks' });
    await waitForElementToBeRemoved(() => screen.getByText(/Loading.../i));

    const searchBtn = screen.getByTestId(SEARCH_BTN);

    expect(searchBtn).toBeInTheDocument();

    await act(async () => {
      await user.click(searchBtn);
    });

    const searchInput = screen.getByTestId(SEARCH_INPUT_TESTID);
    const nameSearchRadio = screen.getByTestId(NAME_SEARCH_RADIO);
    const searchSubmitBtn = screen.getByTestId(EXEC_SEARCH_BTN);

    await act(async () => {
      await user.type(searchInput, 'gin');
      await user.click(nameSearchRadio);
      await user.click(searchSubmitBtn);
    });

    await new Promise((resolve) => { setTimeout(resolve, 1000); });

    const recipeCard01 = screen.getByTestId(RECIPE_CARD_01_TESTID);
    const recipeCard02 = screen.getByTestId(RECIPE_CARD_02_TESTID);
    const recipeCard03 = screen.getByTestId(RECIPE_CARD_03_TESTID);

    expect(recipeCard01.textContent).toBe('Gin Fizz');
    expect(recipeCard02.textContent).toBe('Gin Sour');
    expect(recipeCard03.textContent).toBe('Pink Gin');
  });

  test('Testa pesquisa de bebida pela primeira letra', async () => {
    const { user } = renderWithRouterAndContext(<App />, { route: '/drinks' });
    await waitForElementToBeRemoved(() => screen.getByText(/Loading.../i));

    const searchBtn = screen.getByTestId(SEARCH_BTN);

    expect(searchBtn).toBeInTheDocument();

    await act(async () => {
      await user.click(searchBtn);
    });

    const searchInput = screen.getByTestId(SEARCH_INPUT_TESTID);
    const firstLetterSearchRadio = screen.getByTestId(FIRST_LETTER_SEARCH_RADIO);
    const searchSubmitBtn = screen.getByTestId(EXEC_SEARCH_BTN);

    await act(async () => {
      await user.type(searchInput, 'a');
      await user.click(firstLetterSearchRadio);
      await user.click(searchSubmitBtn);
    });

    await new Promise((resolve) => { setTimeout(resolve, 1000); });

    const recipeCard01 = screen.getByTestId(RECIPE_CARD_01_TESTID);
    const recipeCard02 = screen.getByTestId(RECIPE_CARD_02_TESTID);
    const recipeCard03 = screen.getByTestId(RECIPE_CARD_03_TESTID);

    expect(recipeCard01.textContent).toBe('A1');
    expect(recipeCard02.textContent).toBe('ABC');
    expect(recipeCard03.textContent).toBe('Ace');
  });

  test('Testa se redireciona para rota de detalhes se pesquisa de comida retorna uma receita', async () => {
    const { user } = renderWithRouterAndContext(<App />, { route: '/meals' });
    await waitForElementToBeRemoved(() => screen.getByText(/Loading.../i));

    const searchBtn = screen.getByTestId(SEARCH_BTN);

    expect(searchBtn).toBeInTheDocument();

    await act(async () => {
      await user.click(searchBtn);
    });

    const searchInput = screen.getByTestId(SEARCH_INPUT_TESTID);
    const nameSearchRadio = screen.getByTestId(NAME_SEARCH_RADIO);
    const searchSubmitBtn = screen.getByTestId(EXEC_SEARCH_BTN);

    await act(async () => {
      await user.type(searchInput, 'Arrabiata');
      await user.click(nameSearchRadio);
      await user.click(searchSubmitBtn);
    });

    await new Promise((resolve) => { setTimeout(resolve, 600); });

    const recipetitleDetails = screen.getByTestId('recipe-title');

    expect(recipetitleDetails).toBeInTheDocument();
    expect(recipetitleDetails.textContent).toBe('Spicy Arrabiata Penne');
  });

  test('Testa se redireciona para rota de detalhes se pesquisa de bebida retorna uma receita', async () => {
    const { user } = renderWithRouterAndContext(<App />, { route: '/drinks' });
    await waitForElementToBeRemoved(() => screen.getByText(/Loading.../i));

    const searchBtn = screen.getByTestId(SEARCH_BTN);

    expect(searchBtn).toBeInTheDocument();

    await act(async () => {
      await user.click(searchBtn);
    });

    const searchInput = screen.getByTestId(SEARCH_INPUT_TESTID);
    const nameSearchRadio = screen.getByTestId(NAME_SEARCH_RADIO);
    const searchSubmitBtn = screen.getByTestId(EXEC_SEARCH_BTN);

    await act(async () => {
      await user.type(searchInput, 'Aquamarine');
      await user.click(nameSearchRadio);
      await user.click(searchSubmitBtn);
    });

    await new Promise((resolve) => { setTimeout(resolve, 600); });

    const recipetitleDetails = screen.getByTestId('recipe-title');

    expect(recipetitleDetails).toBeInTheDocument();
    expect(recipetitleDetails.textContent).toBe('Aquamarine');
  });

  test('Testa validação de primeira letra na pesquisa de bebida pela primeira letra', async () => {
    const { user } = renderWithRouterAndContext(<App />, { route: '/drinks' });
    await waitForElementToBeRemoved(() => screen.getByText(/Loading.../i));

    const searchBtn = screen.getByTestId(SEARCH_BTN);

    expect(searchBtn).toBeInTheDocument();

    await act(async () => {
      await user.click(searchBtn);
    });

    const searchInput = screen.getByTestId(SEARCH_INPUT_TESTID);
    const firstLetterSearchRadio = screen.getByTestId(FIRST_LETTER_SEARCH_RADIO);
    const searchSubmitBtn = screen.getByTestId(EXEC_SEARCH_BTN);

    await act(async () => {
      await user.type(searchInput, 'aaaa');
      await user.click(firstLetterSearchRadio);
      await user.click(searchSubmitBtn);
    });

    await new Promise((resolve) => { setTimeout(resolve, 1000); });

    const recipeCard01 = screen.getByTestId(RECIPE_CARD_01_TESTID);
    const recipeCard02 = screen.getByTestId(RECIPE_CARD_02_TESTID);

    expect(recipeCard01.textContent).toBe('GG');
    expect(recipeCard02.textContent).toBe('A1');
  });

  test('Testa falha no filtro', async () => {
    const { user } = renderWithRouterAndContext(<App />, { route: '/meals' });
    await waitForElementToBeRemoved(() => screen.getByText(/Loading.../i));

    const searchBtn = screen.getByTestId(SEARCH_BTN);

    expect(searchBtn).toBeInTheDocument();

    await act(async () => {
      await user.click(searchBtn);
    });

    const searchInput = screen.getByTestId(SEARCH_INPUT_TESTID);
    const nameSearchRadio = screen.getByTestId(NAME_SEARCH_RADIO);
    const searchSubmitBtn = screen.getByTestId(EXEC_SEARCH_BTN);

    await act(async () => {
      await user.type(searchInput, 'xablau');
      await user.click(nameSearchRadio);
      await user.click(searchSubmitBtn);
    });

    await new Promise((resolve) => { setTimeout(resolve, 1000); });

    const recipeCard01 = screen.getByTestId(RECIPE_CARD_01_TESTID);
    const recipeCard02 = screen.getByTestId(RECIPE_CARD_02_TESTID);

    expect(recipeCard01.textContent).toBe('Corba');
    expect(recipeCard02.textContent).toBe('Sushi');
  });
});
