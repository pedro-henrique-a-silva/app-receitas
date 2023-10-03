import React from 'react';
import { act, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { vi } from 'vitest';
import App from '../App';
import renderWithRouterAndContext from '../utils/render';

const ROTA_COMIDA = '/meals/52771/in-progress';
const ROTA_BEBIDA = '/drinks/15997/in-progress';
const RECIPE_PHOTO_TESTID = 'recipe-photo';
const RECIPE_TITLE_TESTID = 'recipe-title';
const RECIPE_CATEGORY_TESTID = 'recipe-category';
const SHARE_BTN_TESTID = 'share-btn';
const FAVORITE_BTN_TESTID = 'favorite-btn';
const FINISH_BTN_TESTID = 'finish-recipe-btn';
const ALCOHOOL_OPTIONAL = 'Optional alcohol';
const INGREDIENTS_STEP_TESTID = 'ingredient-step';

beforeEach(() => {
  vi.spyOn(Date.prototype, 'toISOString').mockReturnValue('2023-09-27T19:33:56.687Z');
});

afterEach(() => {
  localStorage.clear();
  vi.restoreAllMocks();
});
describe('Testa tela de detalhes de receita', () => {
  test('Testando tela de Receita em progresso', async () => {
    renderWithRouterAndContext(<App />, { route: ROTA_COMIDA });

    await waitForElementToBeRemoved(() => screen.getByText(/loading.../i));

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

    const ingredients1 = await screen.findByTestId('0-ingredient-name-and-measure');
    const ingredients2 = await screen.findByTestId('1-ingredient-name-and-measure');
    const ingredients3 = await screen.findByTestId('2-ingredient-name-and-measure');
    const ingredients4 = await screen.findByTestId('3-ingredient-name-and-measure');
    const ingredients5 = await screen.findByTestId('4-ingredient-name-and-measure');
    const ingredients6 = await screen.findByTestId('5-ingredient-name-and-measure');
    const ingredients7 = await screen.findByTestId('6-ingredient-name-and-measure');
    const ingredients8 = await screen.findByTestId('7-ingredient-name-and-measure');

    expect(ingredients1.innerHTML).toContain('penne rigate');
    expect(ingredients1.innerHTML).toContain('1 pound');
    expect(ingredients2.innerHTML).toContain('olive oil');
    expect(ingredients2.innerHTML).toContain('1/4 cup');
    expect(ingredients3.innerHTML).toContain('garlic');
    expect(ingredients3.innerHTML).toContain('3 cloves');
    expect(ingredients4.innerHTML).toContain('chopped tomatoes');
    expect(ingredients4.innerHTML).toContain('1 tin');
    expect(ingredients5.innerHTML).toContain('red chile flakes');
    expect(ingredients5.innerHTML).toContain('1/2 teaspoon');
    expect(ingredients6.innerHTML).toContain('italian seasoning');
    expect(ingredients6.innerHTML).toContain('1/2 teaspoon');
    expect(ingredients7.innerHTML).toContain('basil');
    expect(ingredients7.innerHTML).toContain('6 leaves');
    expect(ingredients8.innerHTML).toContain('Parmigiano-Reggiano');
    expect(ingredients8.innerHTML).toContain('spinkling');
  });
  test('Testando botão de compartilhamento e favoritar', async () => {
    const inProgressRecipes = { drinks: { 15997: [] }, meals: { 52771: [] } };
    const favoriteRecipes = [
      {
        id: '52771',
        type: 'meal',
        nationality: 'Italian',
        category: 'Vegetarian',
        alcoholicOrNot: '',
        name: 'Spicy Arrabiata Penne',
        image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
      },
    ];
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));

    const { user } = renderWithRouterAndContext(<App />, { route: ROTA_COMIDA });

    await waitForElementToBeRemoved(() => screen.getByText(/loading.../i));

    const shareBtn = await screen.findByTestId(SHARE_BTN_TESTID);
    const favoriteBtn = await screen.findByTestId(FAVORITE_BTN_TESTID);
    const ingredients1 = await screen.findByTestId(`0-${INGREDIENTS_STEP_TESTID}`);
    await act(async () => {
      await user.click(ingredients1);
    });

    expect(window.getComputedStyle(ingredients1).textDecoration).toBe('line-through solid black');
    await act(async () => {
      await user.click(ingredients1);
    });

    expect(window.getComputedStyle(ingredients1).textDecoration).toBe('');
    await act(async () => {
      await user.click(shareBtn);
    });

    expect(screen.getByText('Link copied!')).toBeInTheDocument();
    await act(async () => {
      await user.click(favoriteBtn);
    });
    const favoritesFromStorage1 = JSON.parse(localStorage.getItem('favoriteRecipes') as string);
    expect(favoritesFromStorage1).toEqual(favoriteRecipes);
    await act(async () => {
      await user.click(favoriteBtn);
    });
    const favoritesFromStorage2 = JSON.parse(localStorage.getItem('favoriteRecipes') as string);
    expect(favoritesFromStorage2).toEqual([]);
  });

  test('Testando se renderiza os drinks corretamentes', async () => {
    renderWithRouterAndContext(<App />, { route: ROTA_BEBIDA });

    await waitForElementToBeRemoved(() => screen.getByText(/loading.../i));

    const recipePhoto = await screen.findByTestId(RECIPE_PHOTO_TESTID);
    const recipeTitle = await screen.findByTestId(RECIPE_TITLE_TESTID);
    const recipeCategory = await screen.findByTestId(RECIPE_CATEGORY_TESTID);
    const shareBtn = await screen.findByTestId(SHARE_BTN_TESTID);
    const favoriteBtn = await screen.findByTestId(FAVORITE_BTN_TESTID);

    expect(recipePhoto).toBeInTheDocument();

    expect(recipeTitle).toBeInTheDocument();
    expect(recipeTitle.innerHTML).toBe('GG');

    expect(recipeCategory).toBeInTheDocument();
    expect(recipeCategory.innerHTML).toBe(ALCOHOOL_OPTIONAL);

    expect(shareBtn).toBeInTheDocument();
    expect(favoriteBtn).toBeInTheDocument();

    const ingredients1 = await screen.findByTestId('0-ingredient-name-and-measure');
    const ingredients2 = await screen.findByTestId('1-ingredient-name-and-measure');
    const ingredients3 = await screen.findByTestId('2-ingredient-name-and-measure');

    expect(ingredients1.innerHTML).toContain('Galliano');
    expect(ingredients1.innerHTML).toContain('2 1/2 shots');
    expect(ingredients2.innerHTML).toContain('Ginger ale');
    expect(ingredients3.innerHTML).toContain('Ice');
  });

  test('Testando compartilhamento de bebidas', async () => {
    const favoriteRecipeDrinks = [
      {
        id: '15997',
        type: 'drink',
        nationality: '',
        category: 'Ordinary Drink',
        alcoholicOrNot: ALCOHOOL_OPTIONAL,
        name: 'GG',
        image: 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg',
      },
    ];

    const { user } = renderWithRouterAndContext(<App />, { route: ROTA_BEBIDA });

    await waitForElementToBeRemoved(() => screen.getByText(/loading.../i));

    const shareBtn = await screen.findByTestId(SHARE_BTN_TESTID);
    const favoriteBtn = await screen.findByTestId(FAVORITE_BTN_TESTID);
    await act(async () => {
      await user.click(shareBtn);
    });

    expect(screen.getByText('Link copied!')).toBeInTheDocument();
    await act(async () => {
      await user.click(favoriteBtn);
    });
    const favoritesFromStorage1 = JSON.parse(localStorage.getItem('favoriteRecipes') as string);
    expect(favoritesFromStorage1).toEqual(favoriteRecipeDrinks);
    await act(async () => {
      await user.click(favoriteBtn);
    });
    const favoritesFromStorage2 = JSON.parse(localStorage.getItem('favoriteRecipes') as string);
    expect(favoritesFromStorage2).toEqual([]);
  });
  test('Testa se salva receita de bebida no localStorage quando concluida', async () => {
    const dateNow = new Date();
    const expectedDoneRecipes = {
      id: '15997',
      nationality: '',
      name: 'GG',
      category: 'Ordinary Drink',
      image: 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg',
      tags: [],
      alcoholicOrNot: ALCOHOOL_OPTIONAL,
      type: 'drink',
      doneDate: dateNow.toISOString(),
    };

    const { user } = renderWithRouterAndContext(<App />, { route: ROTA_BEBIDA });

    await waitForElementToBeRemoved(() => screen.getByText(/loading.../i));

    const finishBtn = await screen.findByTestId(FINISH_BTN_TESTID);

    await act(async () => {
      const ingredients1 = await screen.findByTestId(`0-${INGREDIENTS_STEP_TESTID}`);
      await user.click(ingredients1);
      const ingredients2 = await screen.findByTestId(`1-${INGREDIENTS_STEP_TESTID}`);
      await user.click(ingredients2);
      const ingredients3 = await screen.findByTestId(`2-${INGREDIENTS_STEP_TESTID}`);
      await user.click(ingredients3);

      await user.click(finishBtn);
    });

    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes') as string);
    expect(doneRecipes[0]).toEqual(expectedDoneRecipes);
  });

  test('Testa se salva receita de comida no localStorage quando concluida', async () => {
    const dateNow = new Date();
    const expectedDoneRecipes = {
      id: '52771',
      nationality: 'Italian',
      name: 'Spicy Arrabiata Penne',
      category: 'Vegetarian',
      image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
      tags: [
        'Pasta',
        'Curry',
      ],
      alcoholicOrNot: '',
      type: 'meal',
      doneDate: dateNow.toISOString(),
    };

    const { user } = renderWithRouterAndContext(<App />, { route: ROTA_COMIDA });

    await waitForElementToBeRemoved(() => screen.getByText(/loading.../i));

    const finishBtn = await screen.findByTestId(FINISH_BTN_TESTID);

    await act(async () => {
      const ingredients1 = await screen.findByTestId(`0-${INGREDIENTS_STEP_TESTID}`);
      await user.click(ingredients1);
      const ingredients2 = await screen.findByTestId(`1-${INGREDIENTS_STEP_TESTID}`);
      await user.click(ingredients2);
      const ingredients3 = await screen.findByTestId(`2-${INGREDIENTS_STEP_TESTID}`);
      await user.click(ingredients3);
      const ingredients4 = await screen.findByTestId(`3-${INGREDIENTS_STEP_TESTID}`);
      await user.click(ingredients4);
      const ingredients5 = await screen.findByTestId(`4-${INGREDIENTS_STEP_TESTID}`);
      await user.click(ingredients5);
      const ingredients6 = await screen.findByTestId(`5-${INGREDIENTS_STEP_TESTID}`);
      await user.click(ingredients6);
      const ingredients7 = await screen.findByTestId(`6-${INGREDIENTS_STEP_TESTID}`);
      await user.click(ingredients7);
      const ingredients8 = await screen.findByTestId(`7-${INGREDIENTS_STEP_TESTID}`);
      await user.click(ingredients8);
      await user.click(finishBtn);
    });

    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes') as string);
    expect(doneRecipes[0]).toEqual(expectedDoneRecipes);
  });
});
