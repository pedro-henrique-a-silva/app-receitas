import React, { useState, useEffect } from 'react';

type ButtonCardProps = {
  type: 'meals' | 'drinks';
  onCategorySelected: (category: string) => void;
};

function ButtonCard({ type, onCategorySelected }: ButtonCardProps) {
  const [categories, setCategories] = useState([]);
  const [limparFiltro, setLimparFiltro] = useState(false);

  useEffect(() => {
    // URL correta com base no tipo (meals ou drinks)
    const url = type === 'meals'
      ? 'https://www.themealdb.com/api/json/v1/1/list.php?c=list'
      : 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';

    // solicitação HTTP usando fetch para obter as categorias
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Não foi possível obter as categorias.');
        }
        return response.json();
      })
      .then((data) => {
        // Pegue as 5 primeiras categorias
        const first5Categories = data[type]
          .slice(0, 5).map((item: { strCategory: string }) => item.strCategory);
        setCategories(first5Categories);
      })
      .catch((error) => {
        console.error('Erro ao obter as categorias:', error);
      });
  }, [type]);

  const handleClearFilter = () => {
    onCategorySelected('All');
  };

  useEffect(() => {
    if (limparFiltro) {
      onCategorySelected('All');
      setLimparFiltro(false);
    }
  }, [limparFiltro, onCategorySelected]);

  return (
    <div>
      {categories.map((category, index) => (
        <button
          key={ index }
          data-testid={ `${category}-category-filter` }
          onClick={ () => onCategorySelected(category) }
        >
          {category}
        </button>
      ))}
      <button
        data-testid="All-category-filter"
        onClick={ handleClearFilter }
      >
        All
      </button>
    </div>
  );
}

export default ButtonCard;
