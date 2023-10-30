import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import RecipesProvider from './context/recipesProvider';

ReactDOM
  .createRoot(document.getElementById('root') as HTMLElement)
  .render(
    <BrowserRouter>
      <RecipesProvider>
        <App />
      </RecipesProvider>
    </BrowserRouter>,

  );
