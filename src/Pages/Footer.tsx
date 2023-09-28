import { useNavigate } from 'react-router-dom';
import './Footer.css';

function Footer() {
  const navigate = useNavigate();
  const toDrinks = () => navigate('/drinks');
  const toMeals = () => navigate('/meals');
  return (
    <footer className="footer" data-testid="footer">
      <button onClick={ toDrinks }>
        <img
          src="/src/images/drinkIcon.svg"
          alt="Drink Icon"
          data-testid="drinks-bottom-btn"
        />
      </button>
      <button onClick={ toMeals }>
        <img
          src="src/images/mealIcon.svg"
          alt="Meal Icon"
          data-testid="meals-bottom-btn"
        />
      </button>
    </footer>
  );
}

export default Footer;
