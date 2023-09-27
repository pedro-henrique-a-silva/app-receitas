import React from 'react';

import { screen } from '@testing-library/react';
import renderWithRouterAndContext from '../utils/render';
import App from '../App';

describe('Testando o Componente Recipes', () => {
  test('Testa se o componente renderiza corretamente', async () => {
    renderWithRouterAndContext(<App />, { route: '/meals' });
    const pageTitle = screen.getByTestId('page-title');
    const profileBtn = screen.getByTestId('profile-top-btn');
    const searchBtn = screen.getByTestId('search-top-btn');
    expect(pageTitle).toBeInTheDocument();
    expect(profileBtn).toBeInTheDocument();
    expect(searchBtn).toBeInTheDocument();
  });
});
