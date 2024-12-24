import { FaSearch, FaTrash, FaPlay, FaSpinner, FaTimes } from "react-icons/fa";
import { useState, useEffect, useRef, useCallback } from "react";
import {
  addGameToFavorites,
  getFavoriteGames,
  getGamesByProvider,
  removeGameFromFavorites
} from "../../services/service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as thinStar } from "@fortawesome/free-regular-svg-icons";

const GameProviderFilter = ({
  isModalOpen,
  closeModal,
  openModal,
  onGameSelect
}) => {
  const [filterTerm, setFilterTerm] = useState("");
  const [games, setGames] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);
  const [favoriteGames, setFavoriteGames] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const favoriteGamesRef = useRef(favoriteGames);
  const pageSize = 24; // Número de jogos por página

  const gameListRef = useRef(null);
  const modalRef = useRef(null);

  // Sincronização do ref com favoriteGames
  useEffect(() => {
    favoriteGamesRef.current = favoriteGames;
  }, [favoriteGames]);

  // Carregar histórico de busca do localStorage ao montar o componente
  useEffect(() => {
    const storedHistory = localStorage.getItem("searchHistory");
    if (storedHistory) {
      setSearchHistory(JSON.parse(storedHistory));
    }
  }, []);

  // Atualizar o localStorage sempre que o histórico de busca mudar
  useEffect(() => {
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
  }, [searchHistory]);

  // Manipular a mudança no campo de busca
  const handleFilterChange = (e) => {
    const newTerm = e.target.value;
    setFilterTerm(newTerm);

    if (
      newTerm.trim().length >= 3 &&
      !searchHistory.includes(newTerm.trim()) &&
      newTerm.trim().length <= 40
    ) {
      setSearchHistory((prev) => {
        const updatedHistory = [...prev, newTerm.trim()];
        return updatedHistory.slice(0, 10); // Limitar a 10 termos
      });
    }
  };

  // Manipular o pressionar da tecla Enter para iniciar a busca
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (
        filterTerm.trim().length > 3 &&
        filterTerm.trim().length <= 40 &&
        !searchHistory.includes(filterTerm.trim())
      ) {
        setSearchHistory((prev) => {
          const updatedHistory = [...prev, filterTerm.trim()];
          return updatedHistory.slice(0, 10);
        });
      }
      // Iniciar nova busca com reset
      setCurrentPage(1);
      loadGames(filterTerm.trim(), true);
    }
  };

  // Limpar todo o histórico de busca
  const clearSearchHistory = () => {
    setSearchHistory([]);
  };

  // Remover um termo específico do histórico de busca
  const removeFromHistory = (termToRemove) => {
    setSearchHistory((prevHistory) =>
      prevHistory.filter((term) => term !== termToRemove)
    );
  };

  // Função para carregar jogos da API
  const loadGames = useCallback(
    async (searchTerm, reset = false) => {
      if (!searchTerm || searchTerm.length < 3) return;

      try {
        setIsLoading(true);
        console.log(`Carregando jogos com termo "${searchTerm}"`);

        // Passando um limite alto para garantir que todos os jogos sejam retornados
        const apiLimit = 1000;
        const { result } = await getGamesByProvider(
          0,
          apiLimit,
          0,
          searchTerm,
          null,
          null
        );

        let loadedGames = [];
        if (result && Array.isArray(result)) {
          loadedGames = result.reduce((acc, provider) => {
            if (provider.games && Array.isArray(provider.games)) {
              return [...acc, ...provider.games];
            }
            return acc;
          }, []);
        }

        console.log(`Jogos retornados pela API: ${loadedGames.length}`);

        const updatedGames = loadedGames.map((game) => ({
          ...game,
          isFavorited: favoriteGamesRef.current.some(
            (fav) => fav.game_id === game.id
          )
        }));

        setGames(updatedGames);

        if (reset) {
          setCurrentPage(1); // Resetar para a primeira página ao iniciar uma nova busca
        }
      } catch (error) {
        console.error("Erro ao carregar jogos:", error);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  // Carregar jogos favoritos e iniciar a busca quando o modal for aberto
  useEffect(() => {
    const loadFavoriteGames = async () => {
      try {
        const response = await getFavoriteGames();
        if (response.status) {
          setFavoriteGames(response.data);
        }
      } catch (error) {
        console.error("Erro ao carregar favoritos:", error);
      }
    };

    const initializeData = async () => {
      await loadFavoriteGames();
      if (filterTerm.trim() !== "") {
        loadGames(filterTerm.trim(), true);
      }
    };

    if (isModalOpen) {
      initializeData();
    }
  }, [isModalOpen, filterTerm, loadGames]);

  // Atualizar o estado de jogos para refletir os favoritos
  useEffect(() => {
    setGames((prevGames) =>
      prevGames.map((game) => ({
        ...game,
        isFavorited: favoriteGames.some((fav) => fav.game_id === game.id)
      }))
    );
  }, [favoriteGames]);

  // Manipular a ação de favoritar/desfavoritar um jogo
  const handleFavorite = async (gameId, isFavorited) => {
    try {
      if (isFavorited) {
        await removeGameFromFavorites(gameId);
      } else {
        await addGameToFavorites(gameId);
      }

      setFavoriteGames((prevFavorites) =>
        isFavorited
          ? prevFavorites.filter((fav) => fav.game_id !== gameId)
          : [...prevFavorites, { game_id: gameId }]
      );

      setGames((prevGames) =>
        prevGames.map((game) =>
          game.id === gameId ? { ...game, isFavorited: !isFavorited } : game
        )
      );
    } catch (error) {
      console.error("Erro ao atualizar favoritos:", error);
    }
  };

  // Manipular o carregamento de mais jogos (incrementar a página atual com atraso)
  const handleLoadMore = () => {
    if (isLoading) return; // Evita múltiplos cliques enquanto está carregando
    setIsLoading(true); // Ativa o estado de carregamento

    // Simula um atraso de 0.5 segundos antes de carregar mais jogos
    setTimeout(() => {
      setCurrentPage((prevPage) => prevPage + 1); // Incrementa a página atual
      setIsLoading(false); // Desativa o estado de carregamento
    }, 500); // 500ms de atraso
  };

  // Fechar o modal ao clicar fora dele
  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      closeModal();
    }
  };

  // Adicionar/remover o event listener para detectar cliques fora do modal
  useEffect(() => {
    if (isModalOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isModalOpen]);

  // Computar os jogos a serem exibidos com base na página atual
  const visibleGamesToDisplay = games.slice(0, currentPage * pageSize);
  const hasMoreGames = visibleGamesToDisplay.length < games.length;

  return (
    <>
      {/* Campo de busca */}
      <div
        className="flex py-3 px-4 mb-4 bg-gray-800 items-center rounded-lg transition cursor-pointer"
        onClick={openModal}
      >
        <FaSearch size={16} className="text-gray-600 mr-2" />
        <span className="text-gray-600 text-sm">Nome do jogo ou provedor</span>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
          <div
            ref={modalRef}
            className="bg-[#121212] rounded-lg text-white shadow-lg flex flex-col w-full h-full lg:w-[60vw] lg:h-[80vh] overflow-hidden"
          >
            {/* Cabeçalho do Modal */}
            <div className="relative flex items-center border-b border-gray-700 px-4 py-3">
              <FaSearch size={16} className="text-gray-400 absolute left-6" />
              <input
                type="text"
                placeholder="Nome do jogo ou provedor"
                value={filterTerm}
                onChange={handleFilterChange}
                onKeyDown={handleKeyDown}
                className="w-full pl-10 pr-20 py-2 bg-black text-white text-sm border-none focus:outline-none"
              />
              <button
                onClick={closeModal}
                className="absolute right-6 text-blue-500 font-bold hover:text-blue-400"
              >
                Cancelar
              </button>
            </div>

            {/* Histórico de Busca */}
            {visibleGamesToDisplay.length === 0 && !isLoading && searchHistory.length > 0 && (
              <div className="px-4 py-3 flex justify-between items-center text-gray-400">
                <span className="text-sm">Histórico de busca</span>
                <FaTrash
                  className="cursor-pointer hover:text-gray-200"
                  onClick={clearSearchHistory}
                />
              </div>
            )}

            {visibleGamesToDisplay.length === 0 && !isLoading && searchHistory.length > 0 && (
              <div className="px-4 pb-2 flex-1 overflow-y-auto">
                <div className="flex flex-wrap gap-2">
                  {searchHistory.map((term, index) => (
                    <div key={index} className="flex items-center space-x-2 mb-2">
                      <button
                        onClick={() => {
                          setFilterTerm(term);
                          setCurrentPage(1); // Resetar a página
                          loadGames(term, true);
                        }}
                        className="bg-gray-700 text-sm text-gray-300 py-1 px-4 rounded-lg flex items-center space-x-2"
                      >
                        <span>{term}</span>
                        <FaTimes
                          size={12}
                          className="text-gray-400 hover:text-gray-200 cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeFromHistory(term);
                          }}
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Indicador de Carregamento */}
            {isLoading && visibleGamesToDisplay.length === 0 ? (
              <div className="flex-1 flex justify-center items-center">
                <p className="text-sm flex items-center">
                  <FaSpinner className="animate-spin mr-2" size={16} />
                  Carregando...
                </p>
              </div>
            ) : visibleGamesToDisplay.length === 0 ? (
              <div className="flex-1 flex justify-center items-center">
                <p className="text-sm">Nenhum jogo encontrado</p>
              </div>
            ) : (
              /* Grade de Jogos */
              <div
                ref={gameListRef}
                className="game-grid grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 p-4 overflow-y-auto"
              >
                {visibleGamesToDisplay.map((game, index) => (
                  <div
                    key={game.id}
                    className="game-item px-2 fade-in" // Adiciona a classe 'fade-in' para animação
                  >
                    <div className="game-card group bg-gray-800 rounded-lg overflow-hidden shadow-lg relative">
                      <img
                        src={game.img}
                        alt={game.en_name}
                        className="game-image w-full h-40 object-cover transition-all duration-200"
                      />
                      <div
                        className="game-overlay"
                        onClick={() => onGameSelect(game.game_id)}
                      >
                        <div className="circle-container">
                          <FaPlay className="play-icon" />
                        </div>
                      </div>

                      <div
                        className="favorite-icon"
                        onClick={() => handleFavorite(game.id, game.isFavorited)}
                      >
                        <FontAwesomeIcon
                          icon={thinStar}
                          className={`empty-star ${
                            !game.isFavorited ? "active" : ""
                          }`}
                        />
                        <FontAwesomeIcon
                          icon={solidStar}
                          className={`filled-star ${
                            game.isFavorited ? "active" : ""
                          }`}
                        />
                      </div>
                    </div>
                    <p className="game-name mt-2 text-center text-sm text-gray-300">
                      {game.name}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Botão "Ver Mais" */}
            {hasMoreGames && (
              <div className="flex justify-center mt-6 mb-4">
                <button
                  onClick={handleLoadMore}
                  className="bg-green-500 text-white font-bold hover:bg-green-400 py-2 px-4 rounded-lg text-sm flex items-center justify-center"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <FaSpinner className="animate-spin text-white mr-2" size={16} />
                      Carregando...
                    </>
                  ) : (
                    "Ver Mais"
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default GameProviderFilter;
