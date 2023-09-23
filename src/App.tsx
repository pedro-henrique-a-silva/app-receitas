import { Route, Routes } from 'react-router-dom';
import Login from './Pages/Login';
import Meals from './Pages/Meals';
import Drinks from './Pages/Drinks';
import Profile from './Pages/Profile';
import DoneRecipes from './Pages/DoneRecipes';
import FavoriteRecipes from './Pages/FavoriteRecipes';
import RecipeDetails from './components/RecipeDetails';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Login /> } />
      <Route path="/meals" element={ <Meals /> } />
      <Route path="/drinks" element={ <Drinks /> } />
      <Route path="/meals/:recipeID" element={ <RecipeDetails mealOrDrink="meals" /> } />
      <Route
        path="/meals/:recipeID/in-progress"
        element={ <RecipeDetails mealOrDrink="meals" /> }
      />
      <Route
        path="/drinks/:recipeID"
        element={ <RecipeDetails mealOrDrink="drinks" /> }
      />
      <Route
        path="/drinks/:recipeID/in-progress"
        element={ <RecipeDetails mealOrDrink="drinks" /> }
      />
      <Route path="/profile" element={ <Profile /> } />
      <Route path="/done-recipes" element={ <DoneRecipes /> } />
      <Route path="/favorite-recipes" element={ <FavoriteRecipes /> } />
    </Routes>
  );
}

export default App;
