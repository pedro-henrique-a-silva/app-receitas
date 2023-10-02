import { screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DoneRecipes from '../Pages/DoneRecipes';
import renderWithRouterAndContext from '../utils/render';

beforeEach(() => {
  renderWithRouterAndContext(<DoneRecipes />);
});

describe('Componente DoneRecipes', () => {
  it('Renderiza botoes de filtro', () => {
    const allButton = screen.getByTestId('filter-by-all-btn');
    const mealButton = screen.getByTestId('filter-by-meal-btn');
    const drinkButton = screen.getByTestId('filter-by-drink-btn');
    expect(allButton).toBeInTheDocument();
    expect(mealButton).toBeInTheDocument();
    expect(drinkButton).toBeInTheDocument();
  });
  it('Testa se o botão de filtrar funciona', () => {
    const mealButton = screen.getByTestId('filter-by-meal-btn');
    fireEvent.click(mealButton);
  });

  it('Copia o texto da receita', async () => {
    const shareButton = screen.getByTestId('0-horizontal-share-btn');
    await userEvent.click(shareButton);
    waitFor(() => {
      const linkCopiedMessage = screen.getByText('Link copied!');
      expect(linkCopiedMessage).toBeInTheDocument();
    });
  });
});
