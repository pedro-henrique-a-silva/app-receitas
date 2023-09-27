import { Route, Routes } from 'react-router-dom';
import Login from './Pages/Login';
import Profile from './Pages/Profile';
import DoneRecipes from './Pages/DoneRecipes';
import FavoriteRecipes from './Pages/FavoriteRecipes';
import Recipes from './components/Recipes/Recipes';
import RecipeDetails from './components/RecipeDetails';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Login /> } />
      <Route path="/meals" element={ <Recipes type="meals" /> } />
      <Route path="/drinks" element={ <Recipes type="drinks" /> } />
      <Route path="/profile" element={ <Profile /> } />
      <Route path="/meals/:recipeID" element={ <RecipeDetails type="meals" /> } />
      <Route path="/drinks/:recipeID" element={ <RecipeDetails type="drinks" /> } />
      <Route path="/profile" element={ <Profile /> } />
      <Route path="/done-recipes" element={ <DoneRecipes /> } />
      <Route path="/favorite-recipes" element={ <FavoriteRecipes /> } />
    </Routes>
  );
}

export default App;
