import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouterAndContext from '../utils/render';

const ROTA_FAVORITOS = '/favorite-recipes';

const HORIZONTAL_NAME = '-horizontal-name';

const expectLocalStorageData = [
  { id: '15997', type: 'drink', nationality: '', category: 'Ordinary Drink', alcoholicOrNot: 'Optional alcohol', name: 'GG', image: 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg' },
  { id: '53065', type: 'meal', nationality: 'Japanese', category: 'Seafood', alcoholicOrNot: '', name: 'Sushi', image: 'https://www.themealdb.com/images/media/meals/g046bb1663960946.jpg' },
  { id: '53060', type: 'meal', nationality: 'Croatian', category: 'Side', alcoholicOrNot: '', name: 'Burek', image: 'https://www.themealdb.com/images/media/meals/tkxquw1628771028.jpg' },
];
afterEach(() => localStorage.clear());

describe('Testa tela de receitas favoritas', () => {
  test('Verifica se a tela de receitas favoritas é renderizada corretamente', async () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(expectLocalStorageData));
    renderWithRouterAndContext(<App />, { route: ROTA_FAVORITOS });

    // await waitForElementToBeRemoved(() => screen.getByText(/Loading.../i), { timeout: 10000 });

    const pageTitle = screen.getByTestId('page-title');
    const profileBtn = screen.getByTestId('profile-top-btn');
    // const searchBtn = screen.getByTestId('search-top-btn');

    expect(pageTitle).toBeInTheDocument();
    expect(profileBtn).toBeInTheDocument();
    // expect(searchBtn).toBeInTheDocument();

    const favorite1 = await screen.findByTestId(`0${HORIZONTAL_NAME}`);
    const favoriteImage1 = await screen.findByTestId('0-horizontal-image');
    const favoriteTopText1 = await screen.findByTestId('0-horizontal-top-text');

    const favorite2 = await screen.findByTestId(`1${HORIZONTAL_NAME}`);
    const favoriteImage2 = await screen.findByTestId('1-horizontal-image');
    const favoriteTopText2 = await screen.findByTestId('1-horizontal-top-text');

    const favorite3 = await screen.findByTestId('2-horizontal-name');
    const favoriteImage3 = await screen.findByTestId('2-horizontal-image');
    const favoriteTopText3 = await screen.findByTestId('2-horizontal-top-text');

    const filterAllBtn = await screen.findByTestId('filter-by-all-btn');
    const filterFoodBtn = await screen.findByTestId('filter-by-meal-btn');
    const filterDrinkBtn = await screen.findByTestId('filter-by-drink-btn');

    expect(filterAllBtn).toBeInTheDocument();
    expect(filterFoodBtn).toBeInTheDocument();
    expect(filterDrinkBtn).toBeInTheDocument();

    expect(favorite1).toBeInTheDocument();
    expect(favoriteImage1).toBeInTheDocument();
    expect(favoriteTopText1).toBeInTheDocument();

    expect(favorite2).toBeInTheDocument();
    expect(favoriteImage2).toBeInTheDocument();
    expect(favoriteTopText2).toBeInTheDocument();

    expect(favorite3).toBeInTheDocument();
    expect(favoriteImage3).toBeInTheDocument();
    expect(favoriteTopText3).toBeInTheDocument();
  });
  test('Verifica se botão de desfavoritar e compartilhar funcionam', async () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(expectLocalStorageData));
    const { user } = renderWithRouterAndContext(<App />, { route: ROTA_FAVORITOS });

    const favoriteRemove1 = await screen.findByTestId('0-horizontal-favorite-btn');
    const shareBtn1 = await screen.findByTestId('0-horizontal-share-btn');

    expect(favoriteRemove1).toBeInTheDocument();
    expect(shareBtn1).toBeInTheDocument();

    await user.click(shareBtn1);
    expect(screen.getByText('Link copied!')).toBeInTheDocument();

    await user.click(favoriteRemove1);
    const newFavorite1 = await screen.findByTestId('0-horizontal-name');
    expect(newFavorite1.textContent).toBe('Sushi');
  });
  test('testando Filtro de comidas', async () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(expectLocalStorageData));
    const { container, user } = renderWithRouterAndContext(<App />, { route: ROTA_FAVORITOS });

    const filterFoodBtn = await screen.findByTestId('filter-by-meal-btn');
    const filterDrinkBtn = await screen.findByTestId('filter-by-drink-btn');
    await user.click(filterFoodBtn);

    const favoritesMealsFiltered = container.querySelectorAll('ul li');
    expect(favoritesMealsFiltered.length).toBe(2);

    // const favorite1 = await screen.findByTestId('0-horizontal-name');
    // const favorite2 = await screen.findByTestId('1-horizontal-name');

    await user.click(filterDrinkBtn);

    const favoritesDrinkFiltered = container.querySelectorAll('ul li');
    expect(favoritesDrinkFiltered.length).toBe(1);

    // expect(favorite1).toBeInTheDocument();
    // expect(favorite1.textContent).toBe('Sushi');
    // expect(favorite2).toBeInTheDocument();
    // expect(favorite2.textContent).toBe('Burek');
  });
  test('testando Filtro de comidas', async () => {
    const { container } = renderWithRouterAndContext(<App />, { route: ROTA_FAVORITOS });

    const favorites = container.querySelectorAll('ul li');
    expect(favorites.length).toBe(0);
  });
});
