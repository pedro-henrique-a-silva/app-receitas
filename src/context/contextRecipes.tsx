import { createContext } from 'react';
import { ContextType } from '../types';

const INITIAL_STATE = {
  loginUser: {
    email: '',
    password: '',
  },
  setLoginUser: () => {},
};

const RecipesContext = createContext<ContextType>(INITIAL_STATE);

export default RecipesContext;
