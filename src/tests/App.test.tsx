import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndContext from '../utils/render';

const pageTitleEl = 'page-title';
const profileTopButtonEl = 'profile-top-btn';
const searchTopButtonEl = 'search-top-btn';

describe('Testa a Tela de login', () => {
  test('Verifica se a página de login é renderizada', () => {
    renderWithRouterAndContext(<App />);
    const emailInput = screen.getByRole('textbox', {
      name: /e-mail/i,
    });
    const passwordInput = screen.getByRole('textbox', {
      name: /senha/i,
    });
    const entryBtn = screen.getByRole('button', {
      name: /enter/i,
    });
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(entryBtn).toBeInTheDocument();
    expect(entryBtn).toBeDisabled();
  });
  const testEmail = 'trybe@trybe.com';
  test('Verifica se a validação implementada no login funciona corretamente.', async () => {
    renderWithRouterAndContext(<App />);
    const emailInput = screen.getByRole('textbox', {
      name: /e-mail/i,
    }) as HTMLInputElement;
    const passwordInput = screen.getByRole('textbox', {
      name: /senha/i,
    }) as HTMLInputElement;
    const entryBtn = screen.getByRole('button', {
      name: /enter/i,
    });
    expect(entryBtn).toBeDisabled();
    await userEvent.type(emailInput, 'tieta@agreste');
    await userEvent.type(passwordInput, '1234');
    expect(entryBtn).toBeDisabled();

    await userEvent.type(emailInput, testEmail);
    await userEvent.type(passwordInput, '123456');
    expect(entryBtn).toBeEnabled();
  });
  test('Verifica se ao clicar em entrar há mudança de rota.', async () => {
    renderWithRouterAndContext(<App />);

    const emailInput = screen.getByRole('textbox', {
      name: /e-mail/i,
    }) as HTMLInputElement;
    const emailText = screen.getByText(/e-mail/i);
    const passwordInput = screen.getByRole('textbox', {
      name: /senha/i,
    }) as HTMLInputElement;
    const entryBtn = screen.getByRole('button', {
      name: /enter/i,
    });

    await userEvent.type(emailInput, testEmail);
    await userEvent.type(passwordInput, '1234567');
    expect(entryBtn).toBeEnabled();

    await userEvent.click(entryBtn);
    expect(emailText).not.toBeInTheDocument();
  });

  test('Verifica se o header está sendo renderizado corretamente.', async () => {
    const { user } = renderWithRouterAndContext(<App />, { route: '/meals' });

    const pageTitle = screen.getByTestId(pageTitleEl);
    const profileBtn = screen.getByTestId(profileTopButtonEl);
    const searchBtn = screen.getByTestId(searchTopButtonEl);

    expect(pageTitle).toBeInTheDocument();
    expect(profileBtn).toBeInTheDocument();
    expect(searchBtn).toBeInTheDocument();

    await user.click(searchBtn);

    const searchInput = screen.getByTestId('search-input');
    expect(searchInput).toBeInTheDocument();
  });

  test('Verifica rota de Drinks', async () => {
    renderWithRouterAndContext(<App />, { route: '/drinks' });

    const pageTitle = screen.getByTestId(pageTitleEl);
    const profileBtn = screen.getByTestId(profileTopButtonEl);
    const searchBtn = screen.getByTestId(searchTopButtonEl);

    expect(pageTitle).toBeInTheDocument();
    expect(profileBtn).toBeInTheDocument();
    expect(searchBtn).toBeInTheDocument();
  });

  test('Verifica rota profile', async () => {
    renderWithRouterAndContext(<App />, { route: '/profile' });

    const pageTitle = screen.getByTestId(pageTitleEl);
    const profileBtn = screen.getByTestId(profileTopButtonEl);

    expect(pageTitle).toBeInTheDocument();
    expect(profileBtn).toBeInTheDocument();
    // expect(screen.getByTestId('searchTopButtonEl')).not.toBeInTheDocument();
  });

  test('Verifica rota Done Recipes', async () => {
    renderWithRouterAndContext(<App />, { route: '/done-recipes' });

    const allButton = screen.getByTestId('filter-by-all-btn');

    expect(allButton).toBeInTheDocument();
    // expect(screen.getByTestId('searchTopButtonEl')).not.toBeInTheDocument();
  });

  test('Verifica rota Favorites Recipes', async () => {
    renderWithRouterAndContext(<App />, { route: '/favorite-recipes' });

    const pageTitle = screen.getByTestId(pageTitleEl);
    const profileBtn = screen.getByTestId(profileTopButtonEl);

    expect(pageTitle).toBeInTheDocument();
    expect(profileBtn).toBeInTheDocument();
    // expect(screen.getByTestId('searchTopButtonEl')).not.toBeInTheDocument();
  });
});
