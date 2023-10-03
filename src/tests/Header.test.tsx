import React from 'react';
import { act, screen, waitForElementToBeRemoved } from '@testing-library/react';
import App from '../App';
import renderWithRouterAndContext from '../utils/render';

const pageTitleEl = 'page-title';
const profileTopButtonEl = 'profile-top-btn';

const SEARCH_INPUT_TESTID = 'search-input';
const SEARCH_BTN = 'search-top-btn';
const INGREDIENT_SEARCH_RADIO = 'ingredient-search-radio';
const NAME_SEARCH_RADIO = 'name-search-radio';
const FIRST_LETTER_SEARCH_RADIO = 'first-letter-search-radio';

describe('Testa se Header esta funcionando corretamente', () => {
  test('Verifica se o header não esta presente na tela de login', async () => {
    renderWithRouterAndContext(<App />);

    expect(screen.queryByTestId(pageTitleEl)).not.toBeInTheDocument();
    expect(screen.queryByTestId(profileTopButtonEl)).not.toBeInTheDocument();
  });

  test('Verifica se o header está sendo renderizado corretamente.', async () => {
    const { user } = renderWithRouterAndContext(<App />, { route: '/meals' });

    await waitForElementToBeRemoved(() => screen.getByText(/Loading.../i));

    const pageTitle = screen.getByTestId(pageTitleEl);
    const profileBtn = screen.getByTestId(profileTopButtonEl);

    expect(pageTitle).toBeInTheDocument();
    expect(profileBtn).toBeInTheDocument();

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

    await act(async () => {
      await user.click(searchBtn);
    });

    expect(screen.queryByTestId(SEARCH_INPUT_TESTID)).not.toBeInTheDocument();
    expect(screen.queryByTestId(INGREDIENT_SEARCH_RADIO)).not.toBeInTheDocument();
    expect(screen.queryByTestId(NAME_SEARCH_RADIO)).not.toBeInTheDocument();
    expect(screen.queryByTestId(FIRST_LETTER_SEARCH_RADIO)).not.toBeInTheDocument();
  });

  test('Verifica rota de Drinks', async () => {
    renderWithRouterAndContext(<App />, { route: '/drinks' });

    await waitForElementToBeRemoved(() => screen.getByText(/Loading.../i));

    const pageTitle = screen.getByTestId(pageTitleEl);
    const profileBtn = screen.getByTestId(profileTopButtonEl);
    const searchBtn = screen.getByTestId(SEARCH_BTN);

    expect(pageTitle).toBeInTheDocument();
    expect(profileBtn).toBeInTheDocument();
    expect(searchBtn).toBeInTheDocument();
  });

  test('Verifica rota done recipes', async () => {
    renderWithRouterAndContext(<App />, { route: '/done-recipes' });

    const pageTitle = screen.getByTestId(pageTitleEl);
    const profileBtn = screen.getByTestId(profileTopButtonEl);

    expect(pageTitle).toBeInTheDocument();
    expect(profileBtn).toBeInTheDocument();
    expect(screen.queryByTestId(SEARCH_BTN)).not.toBeInTheDocument();
  });
  test('Verifica rota favorite recipes', async () => {
    renderWithRouterAndContext(<App />, { route: '/favorite-recipes' });

    const pageTitle = screen.getByTestId(pageTitleEl);
    const profileBtn = screen.getByTestId(profileTopButtonEl);

    expect(pageTitle).toBeInTheDocument();
    expect(profileBtn).toBeInTheDocument();
    expect(screen.queryByTestId(SEARCH_BTN)).not.toBeInTheDocument();
  });

  test('Verifica rota profile', async () => {
    renderWithRouterAndContext(<App />, { route: '/profile' });

    const pageTitle = screen.getByTestId(pageTitleEl);
    const profileBtn = screen.getByTestId(profileTopButtonEl);

    expect(pageTitle).toBeInTheDocument();
    expect(profileBtn).toBeInTheDocument();
    expect(screen.queryByTestId(SEARCH_BTN)).not.toBeInTheDocument();
  });
});
