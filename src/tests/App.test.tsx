import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndContext from '../utils/render';

describe('Testa a Tela de login', () => {
  test('Verifica se a página de login é renderizada', () => {
    renderWithRouterAndContext(<App />);
    const emailInput = screen.getByRole('textbox', {
      name: /Email/i,
    });
    const passwordInput = screen.getByLabelText(/senha/i) as HTMLInputElement;
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
      name: /Email/i,
    }) as HTMLInputElement;
    const passwordInput = screen.getByLabelText(/senha/i) as HTMLInputElement;
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
      name: /Email/i,
    }) as HTMLInputElement;
    const emailText = screen.getByText(/Email/i);
    const passwordInput = screen.getByLabelText(/senha/i) as HTMLInputElement;
    const entryBtn = screen.getByRole('button', {
      name: /enter/i,
    });

    await userEvent.type(emailInput, testEmail);
    await userEvent.type(passwordInput, '1234567');
    expect(entryBtn).toBeEnabled();

    await userEvent.click(entryBtn);
    expect(emailText).not.toBeInTheDocument();
  });
});
