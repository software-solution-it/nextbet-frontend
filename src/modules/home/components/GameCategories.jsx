import React, { useState, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import {
  FaFire,
  FaPlusSquare,
  FaCoins,
  FaThList,
  FaPuzzlePiece,
} from "react-icons/fa";
import { IconContext } from "react-icons";
import { getGameProviders } from "../../services/service";
import "./GameCategories.css";

const iconMapping = {
  HOT: FaFire,
  "Novos Jogos": FaPlusSquare,
  Recompensas: FaCoins,
  "Live Cassino": FaThList,
};

const GameCategories = ({
  selectedSubCategory,
  setSelectedSubCategory,
  subcategories,
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: true,
  });
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
        <div className="bg-gray-800 w-full rounded-lg">
          <div className="embla mx-auto max-w-full overflow-hidden" ref={emblaRef}>
            <div className="embla__container flex gap-2">
              {subcategories.map((subcategory, index) => {
                const IconComponent = iconMapping[subcategory] || FaPuzzlePiece;
                const isSelected = index === selectedIndex;

                return (
                  <div key={subcategory} className="embla__slide flex-none px-3">
                    <button
                      onClick={() => {
                        setSelectedSubCategory(subcategory);
                        emblaApi?.scrollTo(index);
                      }}
                      className={`flex flex-row items-center justify-center w-full p-2 rounded-lg transition-colors duration-300 ${
                        isSelected ? "bg-green-600 text-white" : "text-gray-400"
                      }`}
                    >
                      <IconComponent className="mr-2" />
                      <span className="text-xs md:text-sm">{subcategory}</span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </IconContext.Provider>

      {isModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          onClick={handleCloseModal}
        >
          <div
            className="bg-gray-900 p-6 rounded-lg w-full max-w-md md:max-w-3xl relative"
            style={{
              maxHeight: "90vh",
              overflowY: "auto",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-green-500 hover:text-green-300"
              onClick={handleCloseModal}
            >
              X
            </button>
            <h2 className="text-lg font-bold text-white mb-4 text-center">
              Live Cassino
            </h2>
            <div
              className="grid gap-4"
              style={{
                gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))",
              }}
            >
              {providers.map((provider) => (
                <div
                  key={provider.distribution}
                  className="relative flex items-center justify-center text-center p-3 rounded-lg bg-gray-800 hover:cursor-pointer transition transform hover:scale-105"
                  onClick={() => handleProviderClick(provider)}
                >
                  <span className="text-white text-sm font-bold">
                    {provider.distribution}
                  </span>
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
