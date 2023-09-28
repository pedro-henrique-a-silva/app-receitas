import { Route, Routes } from 'react-router-dom';
import Login from './Pages/Login';
import Profile from './Pages/Profile';
import DoneRecipes from './Pages/DoneRecipes';
import FavoriteRecipes from './Pages/FavoriteRecipes';
import Recipes from './Pages/Recipes';
import RecipeDetails from './Pages/RecipeDetails';
import RecipeInProgress from './Pages/RecipeInProgress';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Login /> } />

      <Route path="/meals" element={ <Recipes mealOrDrink="meals" /> } />
      <Route path="/drinks" element={ <Recipes mealOrDrink="drinks" /> } />
      <Route path="/meals/:recipeID" element={ <RecipeDetails mealOrDrink="meals" /> } />
      <Route
        path="/meals/:recipeID/in-progress"
        element={ <RecipeInProgress mealOrDrink="meals" /> }
      />
      <Route
        path="/drinks/:recipeID"
        element={ <RecipeDetails mealOrDrink="drinks" /> }
      />
      <Route
        path="/drinks/:recipeID/in-progress"
        element={ <RecipeInProgress mealOrDrink="drinks" /> }
      />
      <Route path="/profile" element={ <Profile /> } />
      <Route path="/done-recipes" element={ <DoneRecipes /> } />
      <Route path="/favorite-recipes" element={ <FavoriteRecipes /> } />
    </Routes>
  );
}

export default App;
