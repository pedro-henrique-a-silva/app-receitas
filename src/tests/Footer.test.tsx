import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Footer from '../Pages/Footer';

test('O componente Footer renderiza corretamente', () => {
  render(
    <BrowserRouter>
      <Footer />
    </BrowserRouter>,
  );

  const footer = screen.getByTestId('footer');
  expect(footer).toBeInTheDocument();

  const drinksIcon = screen.getByTestId('drinks-bottom-btn');
  expect(drinksIcon).toBeInTheDocument();

  const mealsIcon = screen.getByTestId('meals-bottom-btn');
  expect(mealsIcon).toBeInTheDocument();
});

test('O componente footer rederiza no final da página', () => {
  render(
    <BrowserRouter>
      <Footer />
    </BrowserRouter>,
  );

  const footer = screen.getByTestId('footer');
  expect(footer).toHaveStyle('position: fixed;');
  expect(footer).toHaveStyle('bottom: 0;');
});
