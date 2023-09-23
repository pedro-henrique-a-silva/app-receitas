import React from 'react';
import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import App from '../App';
import renderWithRouterAndContext from '../utils/render';

describe.only('Testa tela de detalhes de receita', () => {
  test.only('Testando tela de detalhes de comida', async () => {
    const { user } = renderWithRouterAndContext(<App />, { route: '/meals/52771' });

    await waitForElementToBeRemoved(() => screen.getByText(/loading.../i), { timeout: 10000 });

    const recipePhoto = await screen.findByTestId('recipe-photo');
    const recipeTitle = await screen.findByTestId('recipe-title');
    const recipeCategory = await screen.findByTestId('recipe-category');

    expect(recipePhoto).toBeInTheDocument();
    expect(recipeTitle).toBeInTheDocument();
    expect(recipeCategory).toBeInTheDocument();
  });
});
