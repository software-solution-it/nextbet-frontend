import PropTypes from "prop-types"; // Importando PropTypes
import { useEffect, useState } from "react";
import { getMemberSlotHotGame } from "../../services/service"; // Importando o endpoint de integração
import { FaPlay } from "react-icons/fa"; // Ícone de jogar

const GameList = ({ selectedSubCategory, onGameSelect }) => {
  const [games, setGames] = useState([]);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [titleSubCategory, setTitleSubCategory] = useState(selectedSubCategory || "Subcategoria");

  // Estados para filtro e paginação
  const [filterTerm, setFilterTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const gamesPerPage = 50;

  // Atualiza os jogos e controla a transição
  useEffect(() => {
    setIsTransitioning(true);
    setFilterTerm(""); // Resetar o filtro ao trocar de subcategoria
    setCurrentPage(1); // Resetar a paginação

    setTimeout(async () => {
      try {
        let newGames = [];
        if (selectedSubCategory === "Hot") {
          const response = await getMemberSlotHotGame(); // Chama o endpoint
          if (response.status) {
            newGames = response.data.data.d;
          }
        } else {
          newGames = [];
        }

        setGames(newGames);
        setTitleSubCategory(selectedSubCategory || "Subcategoria");
      } catch (error) {
        console.error("Erro ao carregar jogos:", error);
      } finally {
        setIsTransitioning(false);
      }
    }, 500);
  }, [selectedSubCategory]);

  const handlePlayClick = (game) => {
    if (onGameSelect) {
      onGameSelect(game.game_id);
    }
  };

  // Filtrando jogos pelo nome
  const filteredGames = games.filter((game) => {
    const gameName = game.en_name ? game.en_name.toLowerCase() : "";
    return gameName.includes(filterTerm.toLowerCase());
  });

  // Lógica de paginação
  const totalPages = Math.ceil(filteredGames.length / gamesPerPage);
  const startIndex = (currentPage - 1) * gamesPerPage;
  const endIndex = startIndex + gamesPerPage;
  const displayedGames = filteredGames.slice(startIndex, endIndex);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentPage((prev) => prev + 1);
        setIsTransitioning(false);
      }, 500);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentPage((prev) => prev - 1);
        setIsTransitioning(false);
      }, 500);
    }
  };

  return (
    <div className="py-8 px-4 md:px-20 lg:px-40" style={{ position: "relative", overflow: "visible" }}>
      <h2 className="text-lg md:text-xl font-bold mb-4">Jogos em {titleSubCategory}</h2>

      {/* Paginação no topo */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center mb-4 space-x-4">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className="px-3 py-2 text-sm md:text-base rounded bg-green-400 hover:bg-gray-600 disabled:opacity-50"
          >
            Anterior
          </button>
          <span className="text-white font-bold text-sm md:text-base">
            Página {currentPage} de {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="px-3 py-2 text-sm md:text-base rounded bg-green-400 hover:bg-gray-600 disabled:opacity-50"
          >
            Próximo
          </button>
        </div>
      )}

      {/* Campo de filtro */}
      <div className="mb-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Filtrar jogos pelo nome..."
            value={filterTerm}
            onChange={(e) => setFilterTerm(e.target.value)}
            className="px-4 py-2 pl-10 pr-4 rounded-lg border border-gray-600 bg-gray-800 text-white w-full focus:outline-none focus:ring-2 focus:ring-green-600"
          />
          {/* Ícone de lupa */}
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-600">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
              <path d="M11.742 10.742a6 6 0 1 0-1.415 1.415 6 6 0 0 0 1.415-1.415zM12 6a6 6 0 1 1-6-6 6 6 0 0 1 6 6z" />
            </svg>
          </span>
        </div>
      </div>

      {/* Grid de Jogos */}
      <div
        className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 transition-opacity duration-500 ease-in-out ${
          isTransitioning ? "opacity-0" : "opacity-100"
        }`}
      >
        {displayedGames.length > 0 ? (
          displayedGames.map((game) => (
            <div
              key={game.id}
              className="relative text-center rounded-lg shadow-lg transition-transform transform hover:scale-105 border-4 border-transparent hover:border-green-600 overflow-hidden cursor-pointer"
              style={{
                height: "250px", // Diminuindo a altura do card em dispositivos menores
                transition: "transform 0.3s ease-in-out",
              }}
              onClick={() => handlePlayClick(game)}
            >
              <div className="w-full h-full overflow-hidden rounded-t-lg">
                <img
                  src={game.image || game.img}
                  alt={game.en_name}
                  className="w-full h-full object-cover"
                  style={{ height: "calc(100% - 50px)" }}
                />
              </div>
              <div
                className="absolute bottom-0 left-0 w-full bg-green-600 flex items-center justify-center rounded-b-lg"
                style={{ height: "40px" }} // Reduzindo a altura do título em dispositivos menores
              >
                <p className="font-medium text-white text-xs md:text-sm lg:text-base">{game.en_name}</p>
              </div>
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300">
                <div className="flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full bg-white text-black hover:scale-110 transform transition-transform duration-300">
                  <FaPlay className="text-2xl md:text-3xl text-green-500" style={{ marginLeft: "2px" }} />
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center h-[300px]">
            <p className="text-white text-lg">Não há jogos disponíveis para esta subcategoria.</p>
          </div>
        )}
      </div>

      {/* Media Queries para diferentes resoluções */}
      <style jsx>{`
        @media (max-width: 1920px) {
          .grid {
            grid-template-columns: repeat(5, minmax(0, 1fr));
          }
        }

        @media (max-width: 1360px) {
          .grid {
            grid-template-columns: repeat(4, minmax(0, 1fr));
          }
        }

        @media (max-width: 1024px) {
          .grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }
        }

        @media (max-width: 768px) {
          .grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .text-lg {
            font-size: 1rem;
          }

          .text-base {
            font-size: 0.875rem;
          }

          .text-sm {
            font-size: 0.75rem;
          }
        }
      `}</style>
    </div>
  );
};

// Validação de PropTypes
GameList.propTypes = {
  selectedSubCategory: PropTypes.string,
  onGameSelect: PropTypes.func,
};

export default GameList;