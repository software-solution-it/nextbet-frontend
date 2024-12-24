import PropTypes from "prop-types";
import { useEffect, useState, useCallback, useMemo } from "react";
import { getGameProviders, getGamesByProvider } from "../../services/service";
import { FaPlay } from "react-icons/fa";
import { addGameToFavorites, removeGameFromFavorites } from "../../services/service";
import { faStar as thinStar } from '@fortawesome/free-regular-svg-icons';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { getFavoriteGames } from "../../services/service";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "./GameList.css";

const GameList = ({ onGameSelect, onViewAll, selectedSubCategory }) => {
  const [providers, setProviders] = useState([]);
  const [providerGames, setProviderGames] = useState({}); // Mantém como objeto
  const [isLoading, setIsLoading] = useState(false);
  const [filterTerm, setFilterTerm] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [favoriteGames, setFavoriteGames] = useState([]);
  const [favoritesLoaded, setFavoritesLoaded] = useState(false);
  const gamesPerPage = isMobile ? 2 : 6;

  // Função para carregar provedores
  useEffect(() => {
    const loadProviders = async () => {
      try {
        setIsLoading(true);
        const response = await getGameProviders();
        setProviders(response);
      } catch (error) {
        console.error("Erro ao carregar provedores:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadProviders();
  }, []);

  useEffect(() => {
    const loadFavoriteGames = async () => {
      try {
        setIsLoading(true);
        const response = await getFavoriteGames();
        if (response.status) {
          setFavoriteGames(response.data);
        } else {
          console.error("Erro ao carregar favoritos:", response.message);
        }
      } catch (error) {
        console.error("Erro ao buscar jogos favoritos:", error);
      } finally {
        setIsLoading(false);
      }
    };
  
    loadFavoriteGames();
  }, []);
  

  // Função para detectar mudanças no tamanho da tela
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const loadGames = useCallback(
    async (page = 0) => {
      try {
        setIsLoading(true);
  
        const ishot = selectedSubCategory === "HOT" ? 1 : null;
        const isnew = selectedSubCategory === "Novos Jogos" ? 1 : null;
        const islive = selectedSubCategory === "Live Cassino" ? 1 : null;
        const rewardsFlag = selectedSubCategory === "Recompensas" ? 1 : null;
  
        const gamesPerPage = isMobile ? 2 : 6;
        const offset = page * gamesPerPage;
  
        const { result } = await getGamesByProvider(
          offset,
          Number.MAX_SAFE_INTEGER,
          ishot,
          null,
          isnew,
          islive,
          rewardsFlag
        );
  
        const groupedGames = result.reduce((acc, { providerName, games, totalGames }) => {
          acc[providerName] = {
            providerName,
            games, // Inicialmente sem `isFavorited`
            totalGames,
            currentPage: page,
          };
          return acc;
        }, {});
  
        setProviderGames(groupedGames); // Atualiza os jogos sem favoritos
      } catch (error) {
        console.error("Erro ao carregar jogos:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [selectedSubCategory, isMobile]
  );
  
  
  

  const handlePreviousPage = (providerName) => {
    setProviderGames((prev) => {
      const provider = prev[providerName];
      if (!provider || provider.currentPage === 0) return prev; // Verifica se já está na primeira página
  
      return {
        ...prev,
        [providerName]: {
          ...provider,
          currentPage: provider.currentPage - 1, // Retrocede uma página
        },
      };
    });
  };
  
  const handleNextPage = (providerName) => {
    setProviderGames((prev) => {
      const provider = prev[providerName];
      const totalPages = Math.ceil(provider.games.length / gamesPerPage);
  
      if (!provider || provider.currentPage + 1 >= totalPages) return prev; // Verifica se já está na última página
  
      return {
        ...prev,
        [providerName]: {
          ...provider,
          currentPage: provider.currentPage + 1, // Avança uma página
        },
      };
    });
  };
  
  

  const handleFavorite = async (gameId, isFavorited) => {
    try {
      if (isFavorited) {
        // Remove o jogo dos favoritos
        await removeGameFromFavorites(gameId);
      } else {
        // Adiciona o jogo aos favoritos
        await addGameToFavorites(gameId);
      }
  
      // Atualiza a lista de favoritos localmente
      setFavoriteGames((prevFavorites) =>
        isFavorited
          ? prevFavorites.filter((fav) => fav.game_id !== gameId) // Remove dos favoritos
          : [...prevFavorites, { game_id: gameId }] // Adiciona aos favoritos
      );
  
      // Atualiza diretamente o estado de providerGames
      setProviderGames((prev) => {
        const updatedProviderGames = { ...prev };
        Object.keys(updatedProviderGames).forEach((providerName) => {
          updatedProviderGames[providerName].games = updatedProviderGames[providerName].games.map((game) =>
            game.id === gameId ? { ...game, isFavorited: !isFavorited } : game
          );
        });
        return updatedProviderGames;
      });
    } catch (error) {
      console.error("Erro ao atualizar favoritos:", error);
    }
  };
  
  const updateFavoriteStatus = () => {
    setProviderGames((prev) => {
      const updatedProviderGames = { ...prev };
      Object.keys(updatedProviderGames).forEach((providerName) => {
        updatedProviderGames[providerName].games = updatedProviderGames[providerName].games.map((game) => {
          const isFavorited = favoriteGames.some((fav) => fav.game_id === game.id);
          return { ...game, isFavorited }; // Atualiza apenas o campo isFavorited
        });
      });
      return updatedProviderGames;
    });
  };
  

  useEffect(() => {
    const initialize = async () => {
      setProviderGames({}); // Limpa os jogos ao mudar de subcategoria
      loadGames(0); // Carrega os jogos
      await loadFavoriteGames(); // Carrega os favoritos depois
    };
    initialize();
  }, [selectedSubCategory, loadGames]);
  
  
  useEffect(() => {
    if (favoriteGames.length > 0) {
      updateFavoriteStatus(); // Atualiza os favoritos nos jogos
    }
  }, [favoriteGames]);
  
  

  const loadFavoriteGames = async () => {
    try {
      const response = await getFavoriteGames();
      if (response.status) {
        setFavoriteGames(response.data);
      } else {
        console.error("Erro ao carregar favoritos:", response.message);
      }
    } catch (error) {
      console.error("Erro ao buscar jogos favoritos:", error);
    }
  };
  


  const filteredProviderGames = useMemo(() => {
    return Object.values(providerGames).map(({ providerName, games, totalGames, currentPage }) => {
      const filteredGames = Array.isArray(games)
        ? games.filter((game) =>
            game.name.toLowerCase().includes(filterTerm.toLowerCase())
          )
        : [];
  
      // Garante que o estado `isFavorited` esteja sincronizado com `favoriteGames`
      const updatedGames = filteredGames.map((game) => ({
        ...game,
        isFavorited: favoriteGames.some((fav) => fav.game_id === game.id),
      }));
  
      return { providerName, games: updatedGames, totalGames, currentPage };
    });
  }, [providerGames, favoriteGames, filterTerm]);
  

  return (
    <div className="game-list py-8 px-4 md:px-20 lg:px-40 min-h-[400px]">
    {filteredProviderGames.map(({ providerName, games, totalGames, currentPage }) => {
  if (totalGames === 0) return null; // Oculta provedores sem jogos

  const isPrevDisabled = currentPage === 0; // Desativa se estiver na primeira página
  const isNextDisabled = (currentPage + 1) * gamesPerPage >= totalGames; // Desativa se estiver na última página

  return (
    <div key={providerName} className="provider-section my-4">
      <div className="provider-header flex items-center justify-between mb-4">
      <div className="flex items-center space-x-2">
                <div className="icon-container text-blue-500 text-xl">
                  <i className="fa fa-gamepad"></i>
                </div>
                <h2 className="provider-title text-lg font-bold text-white">
                  {providerName}
                </h2>
                <span className="online-count hidden lg:flex items-center text-sm bg-gray-800 text-blue-500 px-2 py-1 rounded-lg">
                  <span className="online-dot w-2 h-2 rounded-full bg-blue-500 mr-1"></span>
                  {Math.floor(Math.random() * 100000 + 100000)}+ Online
                </span>
              </div>

              <div className="pagination-controls flex items-center space-x-2">
                <button
                  className={`prev-page bg-gray-700 text-white px-3 py-1 rounded hover:bg-gray-600 transition ${
                    isPrevDisabled ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  onClick={() => handlePreviousPage(providerName)}
                  disabled={isPrevDisabled}
                >
                  <i className="fa fa-chevron-left"></i>
                </button>

                <button
                  className={`next-page bg-gray-700 text-white px-3 py-1 rounded hover:bg-gray-600 transition ${
                    isNextDisabled ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  onClick={() => handleNextPage(providerName)}
                  disabled={isNextDisabled}
                >
                  <i className="fa fa-chevron-right"></i>
                </button>

                <button
                  className="provider-button bg-blue-500 text-white px-4 py-1 text-sm rounded hover:bg-blue-700 transition"
                  onClick={() => onViewAll(providerName)}
                >
                  Ver Todos
                </button>
              </div>
      </div>

      <div className="game-grid grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-6 gap-6">
        {games.length > 0 ? (
          games
            .slice(currentPage * gamesPerPage, (currentPage + 1) * gamesPerPage)
            .map((game) => (
              <div key={game.id} className="game-item">
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
                      className={`empty-star ${!game.isFavorited ? "active" : ""}`}
                    />
                    <FontAwesomeIcon
                      icon={solidStar}
                      className={`filled-star ${game.isFavorited ? "active" : ""}`}
                    />
                  </div>
                </div>
                <p className="game-name mt-2 text-center text-sm text-gray-300">
                  {game.name}
                </p>
              </div>
            ))
        ) : (
          <p className="text-center text-gray-400 col-span-full">Nenhum jogo encontrado.</p>
        )}
      </div>
    </div>
  );
})}

    </div>
  );
  
};

GameList.propTypes = {
  onGameSelect: PropTypes.func,
  onViewAll: PropTypes.func.isRequired,
  selectedSubCategory: PropTypes.string.isRequired,
};

export default GameList;
