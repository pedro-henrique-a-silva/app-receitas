import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import RecipesContext from '../context/contextRecipes';

function Login() {
  const { loginUser,
    setLoginUser } = useContext(RecipesContext);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setLoginUser({
      ...loginUser,
      [name]: value,
    });
  };

  const validateForm = (): boolean => {
    const passwordLength = loginUser.password.length;
    const regexEmail = /[^\s@]+@[^\s@]+\.[^\s@]+/gi;

    if (passwordLength < 7) {
      return false;
    }
    return regexEmail.test(loginUser.email);
  };

  const navigate = useNavigate();
  const toMealsAfterClick = () => navigate('/meals');

  const setUserLocalStorage = () => localStorage
    .setItem('user', JSON.stringify({ email: loginUser.email }));

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setUserLocalStorage();
    toMealsAfterClick();
  };

  return (
    <form
      onSubmit={ onSubmit }
    >
      <label htmlFor="email">
        e-mail
        <input
          data-testid="email-input"
          type="text"
          id="email"
          name="email"
          value={ loginUser.email }
          onChange={ handleChange }
        />
      </label>

      <label htmlFor="password">
        Senha
        <input
          data-testid="password-input"
          type="text"
          id="password"
          name="password"
          value={ loginUser.password }
          onChange={ handleChange }
        />
      </label>

      <button
        data-testid="login-submit-btn"
        disabled={ !validateForm() }
        type="submit"
      >
        Enter
      </button>
    </form>
  );
}

export default Login;
