import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Footer from '../Pages/Footer';
import renderWithRouterAndContext from '../utils/render';

beforeEach(() => {
  renderWithRouterAndContext(<Footer />);
});

test('O componente Footer renderiza corretamente', () => {
  const footer = screen.getByTestId('footer');
  expect(footer).toBeInTheDocument();

  const drinksIcon = screen.getByTestId('drinks-bottom-btn');
  expect(drinksIcon).toBeInTheDocument();

  const mealsIcon = screen.getByTestId('meals-bottom-btn');
  expect(mealsIcon).toBeInTheDocument();
});

test('O componente Footer rederiza no final da página', () => {
  const footer = screen.getByTestId('footer');
  expect(footer).toHaveStyle('position: fixed;');
  expect(footer).toHaveStyle('bottom: 0;');
});

test('O botão de bebidas redireciona para a página de bebidas ao ser clicado', async () => {
  const drinksIcon = screen.getByTestId('drinks-bottom-btn');
  expect(drinksIcon).toBeInTheDocument();

  await userEvent.click(drinksIcon);

  waitFor(() => {
    const drinksHeader = screen.getByTitle('Drinks');
    expect(drinksHeader).toBeInTheDocument();
  });
});

test('O botão de refeições redireciona para a página de refeições ao ser clicado', async () => {
  const mealsIcon = screen.getByTestId('meals-bottom-btn');
  expect(mealsIcon).toBeInTheDocument();

  await userEvent.click(mealsIcon);

  waitFor(() => {
    const mealsHeader = screen.getByTitle('Meals');
    expect(mealsHeader).toBeInTheDocument();
  });
});
