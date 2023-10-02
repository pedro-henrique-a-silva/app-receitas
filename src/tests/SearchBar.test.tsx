import { screen } from '@testing-library/react';
import SearchBar from '../components/SearchBar';
import renderWithRouterAndContext from '../utils/render';

test('Deve renderizar o componente SearchBar corretamente', () => {
  renderWithRouterAndContext(<SearchBar />);

  expect(screen.getByTestId('search-input')).toBeInTheDocument();
  expect(screen.getByTestId('ingredient-search-radio')).toBeInTheDocument();
  expect(screen.getByTestId('name-search-radio')).toBeInTheDocument();
  expect(screen.getByTestId('first-letter-search-radio')).toBeInTheDocument();
  expect(screen.getByTestId('exec-search-btn')).toBeInTheDocument();
});
