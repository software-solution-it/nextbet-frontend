import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const GameCategories = ({
  selectedSubCategory,
  setSelectedSubCategory,
  subcategories,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);

  // Ajuste responsivo do número de itens por página
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerPage(2); // Telas menores: 2 itens
      } else {
        setItemsPerPage(3); // Telas maiores: 3 itens
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalPages = Math.ceil(subcategories.length / itemsPerPage);

  useEffect(() => {
    if (subcategories.length > 0) {
      setSelectedSubCategory(subcategories[0]);
    } else {
      setSelectedSubCategory(null);
    }

    setIsVisible(false);
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);

    return () => clearTimeout(timer);
  }, [subcategories, setSelectedSubCategory]);

  const handleClick = (subcategory) => {
    setSelectedSubCategory(subcategory);
  };

  // Função auxiliar para transição suave de página
  const changePageWithTransition = (newPage) => {
    setIsVisible(false);
    setTimeout(() => {
      setCurrentPage(newPage);
      setIsVisible(true);
    }, 300); // Ajuste o tempo conforme necessário
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      changePageWithTransition(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      changePageWithTransition(currentPage + 1);
    }
  };

  const currentSubcategories = subcategories.slice(
    currentPage * itemsPerPage,
    currentPage * itemsPerPage + itemsPerPage
  );

  return (
    <div className="relative py-4">
      <h2 className="text-center text-green-600 font-bold text-lg mb-4">Subcategorias</h2>

      <div
        className={`flex items-center justify-center gap-4 transition-opacity duration-500 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Botão Anterior */}
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 0}
          className={`text-white bg-gray-800 p-2 rounded-full shadow-md transition-colors duration-300 ${
            currentPage === 0 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-700 cursor-pointer"
          }`}
          title="Página anterior"
          style={{ flexShrink: 0 }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Subcategorias com tamanho fixo */}
        {currentSubcategories.map((subcategory) => (
          <button
            key={subcategory}
            onClick={() => handleClick(subcategory)}
            className={`rounded text-white hover:text-green-500 border-b-2 transition-all duration-300 text-base uppercase cursor-pointer ${
              selectedSubCategory === subcategory
                ? "text-green-500 border-green-500"
                : "border-transparent"
            }`}
            style={{
              width: "180px", // Tamanho fixo para largura
              height: "50px", // Altura fixa
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {subcategory}
          </button>
        ))}

        {/* Botão Próximo */}
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages - 1}
          className={`text-white bg-gray-800 p-2 rounded-full shadow-md transition-colors duration-300 ${
            currentPage === totalPages - 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-700 cursor-pointer"
          }`}
          title="Próxima página"
          style={{ flexShrink: 0 }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

GameCategories.propTypes = {
  selectedSubCategory: PropTypes.string,
  setSelectedSubCategory: PropTypes.func.isRequired,
  subcategories: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default GameCategories;
