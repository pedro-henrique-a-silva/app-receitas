type ButtonCardProps = {
  onCategorySelected: (category: string) => void;
  categories: any[];
};

function ButtonCard({ onCategorySelected, categories }: ButtonCardProps) {
  const handleClearFilter = () => {
    onCategorySelected('');
  };
  console.log('renderizando button card');

  console.log(categories);

  return (
    <div>
      {categories.map((category, index) => (
        <button
          key={ index }
          data-testid={ `${category.strCategory}-category-filter` }
          onClick={ () => onCategorySelected(category.strCategory) }
        >
          {category.strCategory}
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
