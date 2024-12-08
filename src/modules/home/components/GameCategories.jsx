import React, { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import {
  FaFire,
  FaPlusSquare,
  FaCoins,
  FaThList,
  FaPuzzlePiece,
} from "react-icons/fa";
import { IconContext } from "react-icons";
import { getGameProviders } from "../../services/service"; // Importe a função para buscar os provedores
import './GameCategories.css'

const iconMapping = {
  HOT: FaFire,
  "Novos Jogos": FaPlusSquare,
  "Maiores Recompensas": FaCoins,
  "Todos os Provedores": FaThList,
};

const GameCategories = ({
  selectedSubCategory,
  setSelectedSubCategory,
  subcategories,
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "center", loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [providers, setProviders] = useState([]);

  const handleOpenProvidersModal = async () => {
    try {
      const data = await getGameProviders();
      setProviders(data);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Erro ao buscar provedores:", error.message);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleProviderClick = (provider) => {
    console.log("Provedor selecionado:", provider);
    setIsModalOpen(false);
  };

  useEffect(() => {
    const newIndex = subcategories.indexOf(selectedSubCategory);
    if (newIndex !== -1) {
      setSelectedIndex(newIndex);
      emblaApi?.scrollTo(newIndex);
    }
  }, [selectedSubCategory, subcategories, emblaApi]);

  return (
    <div className="py-2 px-4 md:px-20 lg:px-40 relative">
      <IconContext.Provider value={{ size: "1.2em" }}>
        <div className="embla mx-auto max-w-full" ref={emblaRef}>
          <div className="embla__container flex justify-start">
            {subcategories.map((subcategory, index) => {
              const IconComponent = iconMapping[subcategory] || FaPuzzlePiece;
              const isSelected = index === selectedIndex;
              return (
                <div
                  key={subcategory}
                  className="embla__slide flex-none px-0.5"
                  style={{ width: window.innerWidth < 640 ? "120px" : "160px" }}
                >
                  <button
                    onClick={
                      subcategory === "Todos os Provedores"
                        ? handleOpenProvidersModal
                        : () => emblaApi?.scrollTo(index)
                    }
                    className={`flex flex-col items-center justify-center w-full rounded-lg transition-colors duration-300 ${
                      isSelected
                        ? "bg-green-500 border-2 border-green-700"
                        : "bg-gray-800 hover:bg-gray-700 border-2 border-transparent"
                    }`}
                    style={{
                      height: window.innerWidth < 640 ? "60px" : "80px",
                    }}
                  >
                    <div className="mb-1">
                      <IconComponent />
                    </div>
                    <span className="text-white text-xs uppercase">
                      {subcategory}
                    </span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </IconContext.Provider>

      {isModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          onClick={handleCloseModal}
        >
          <div
            className="bg-gray-900 p-6 rounded-lg w-full max-w-3xl relative"
            style={{
              maxHeight: "80vh",
              minHeight: "300px",
              overflowY: "scroll", // Corrigido para adicionar rolagem ao modal
            }}
            onClick={(e) => e.stopPropagation()} // Impede o fechamento ao clicar dentro do modal
          >
            <button
              className="absolute top-4 right-4 text-green-500 hover:text-green-300"
              onClick={handleCloseModal}
            >
              X
            </button>
            <h2 className="text-lg font-bold text-white mb-4 text-center">
              Todos os Provedores
            </h2>
            <div
              className="grid gap-6"
              style={{
                gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
                width: "100%",
              }}
            >
              {providers.map((provider) => (
                <div
                  key={provider.distribution}
                  className="relative flex items-center justify-center text-center p-4 rounded-lg bg-gray-800 hover:cursor-pointer transition transform hover:scale-105"
                  style={{ height: "80px" }}
                  onClick={() => handleProviderClick(provider)}
                >
                  <span className="text-white text-sm font-bold card-text">
                    {provider.distribution}
                  </span>
                  <div className="absolute inset-0 rounded-lg border-2 border-transparent transition hover:border-green-500"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameCategories;
