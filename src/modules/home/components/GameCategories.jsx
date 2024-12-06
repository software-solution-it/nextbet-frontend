import PropTypes from "prop-types";
import { useEffect, useMemo, useState } from "react";

const GameCategories = ({ selectedCategory, selectedSubCategory, setSelectedSubCategory, subcategoriesByCategory }) => {
  // Estado para controlar a visibilidade das subcategorias
  const [isVisible, setIsVisible] = useState(false);

  // UseMemo para memorizar as subcategorias com base na categoria selecionada
  const subcategories = useMemo(() => {
    return subcategoriesByCategory[selectedCategory] || [];
  }, [selectedCategory, subcategoriesByCategory]);

  useEffect(() => {
    // Define a subcategoria inicial e exibe as subcategorias após 500ms
    if (subcategories.length > 0) {
      setSelectedSubCategory(subcategories[0]);
    } else {
      setSelectedSubCategory(null);
    }

    // Esconde as subcategorias antes de redefinir
    setIsVisible(false);

    const timer = setTimeout(() => {
      setIsVisible(true); // Mostra as subcategorias após 500ms
    }, 500);

    return () => clearTimeout(timer); // Limpa o timer ao desmontar
  }, [selectedCategory, subcategories, setSelectedSubCategory]);

  const handleClick = (subcategory) => {
    setSelectedSubCategory(subcategory); // Atualiza a subcategoria selecionada
  };

  return (
    <div
      className={`flex justify-center items-center gap-2 py-4 transition-opacity duration-700 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {subcategories.map((subcategory) => (
        <button
          key={subcategory}
          onClick={() => handleClick(subcategory)}
          className={`py-2 px-6 rounded text-white hover:text-green-500 
                border-b-2 transition-all duration-300 text-base
                ${
                  selectedSubCategory === subcategory
                    ? "text-green-500 border-green-500"
                    : "border-transparent"
                }`}
          style={{ minWidth: "120px" }} // Garantindo que todos os botões tenham o mesmo tamanho mínimo
        >
          {subcategory}
        </button>
      ))}
    </div>
  );
};

// Validação de props
GameCategories.propTypes = {
  selectedCategory: PropTypes.string.isRequired,
  selectedSubCategory: PropTypes.string,
  setSelectedSubCategory: PropTypes.func.isRequired,
  subcategoriesByCategory: PropTypes.object.isRequired,
};

export default GameCategories;
