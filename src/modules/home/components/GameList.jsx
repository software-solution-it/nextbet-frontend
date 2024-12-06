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

    // Após 0.5 segundo (tempo da animação de saída), atualiza os jogos e título
    setTimeout(async () => {
      try {
        let newGames = [];
        if (selectedSubCategory === "Hot") {
          const response = await getMemberSlotHotGame(); // Chama o endpoint
          if (response.status) {
            newGames = response.data.data.d;
          }
        } else {
          // Lógica para outras subcategorias pode ser adicionada aqui
          newGames = [];
        }

        setGames(newGames);
        setTitleSubCategory(selectedSubCategory || "Subcategoria");
      } catch (error) {
        console.error("Erro ao carregar jogos:", error);
      } finally {
        setIsTransitioning(false); // Finaliza a transição de entrada
      }
    }, 500); // 0.5 segundo para completar a transição de saída
  }, [selectedSubCategory]);

  const handlePlayClick = (game) => {
    if (onGameSelect) {
      onGameSelect(game.game_id); // Passa o game_id para o componente pai
    }
  };

  // Filtrando jogos pelo nome (usando en_name)
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
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <div className="py-8 px-40" style={{ position: "relative", overflow: "visible" }}>
      {/* Contêiner animado incluindo o título */}
      <div
        className={`transition-opacity duration-[500ms] ease-in-out ${
          isTransitioning ? "opacity-0" : "opacity-100"
        }`}
        style={{ overflow: "visible", width: "100%" }}
      >
        <h2 className="text-xl font-bold mb-4">Jogos em {titleSubCategory}</h2>
        
        {/* Campo de filtro */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Filtrar jogos pelo nome..."
            value={filterTerm}
            onChange={(e) => setFilterTerm(e.target.value)}
            className="px-3 py-2 rounded border border-gray-300 w-full max-w-sm"
          />
        </div>

        {/* Grid de Jogos */}
        {displayedGames.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {displayedGames.map((game) => (
                <div
                  key={game.id}
                  className="relative text-center rounded-lg shadow-lg transition-transform transform hover:scale-105 border-4 border-transparent hover:border-green-600 overflow-hidden cursor-pointer"
                  style={{
                    height: "300px",
                    transition: "transform 0.3s ease-in-out",
                  }}
                  onClick={() => handlePlayClick(game)} // Callback chamado ao clicar
                >
                  {/* Imagem do Jogo */}
                  <div className="w-full h-full overflow-hidden rounded-t-lg">
                    <img
                      src={game.image || game.img}
                      alt={game.en_name}
                      className="w-full h-full object-cover"
                      style={{ height: "calc(100% - 50px)" }}
                    />
                  </div>

                  {/* Parte Inferior Verde com o Nome do Jogo */}
                  <div
                    className="absolute bottom-0 left-0 w-full bg-green-600 flex items-center justify-center rounded-b-lg"
                    style={{ height: "50px" }}
                  >
                    <p className="font-medium text-white">{game.en_name}</p>
                  </div>

                  {/* Ícone de jogar no hover */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-white text-black hover:scale-110 transform transition-transform duration-300">
                      <FaPlay className="text-3xl text-green-500" style={{ marginLeft: "2px" }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Paginação */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center mt-4 space-x-4">
                <button
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 disabled:opacity-50"
                >
                  Anterior
                </button>
                <span className="text-white">{currentPage} de {totalPages}</span>
                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 disabled:opacity-50"
                >
                  Próximo
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-[300px]">
            <p className="text-white text-lg">Não há jogos disponíveis para esta subcategoria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Validação de PropTypes
GameList.propTypes = {
  selectedSubCategory: PropTypes.string, // Validando que selectedSubCategory é uma string
  onGameSelect: PropTypes.func, // Callback para passar game_id ao componente pai
};

export default GameList;
