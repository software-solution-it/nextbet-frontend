import PropTypes from "prop-types";
import { useEffect, useState, useCallback } from "react";
import { getGameProviders, getGamesByProvider } from "../../services/service";
import { FaPlay, FaSearch } from "react-icons/fa";
import "./GameList.css";

const GameList = ({ onGameSelect }) => {
  const [providers, setProviders] = useState([]);
  const [providerGames, setProviderGames] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentProviderIndex, setCurrentProviderIndex] = useState(0);
  const [filterTerm, setFilterTerm] = useState("");

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

  const loadMoreGames = useCallback(async () => {
    if (currentProviderIndex >= providers.length) return;
  
    try {
      const currentProvider = providers[currentProviderIndex];
      const response = await getGamesByProvider(currentProvider.distribution);
  
      setProviderGames((prev) => [
        ...prev,
        {
          providerName: currentProvider.distribution,
          games: response.slice(0, 12), // Apenas os primeiros 12 jogos
          totalGames: response.length, // Total de jogos disponíveis
        },
      ]);
  
      setCurrentProviderIndex((prev) => prev + 1);
    } catch (error) {
      console.error("Erro ao carregar jogos do provedor:", error);
    }
  }, [currentProviderIndex, providers]);

  useEffect(() => {
    loadMoreGames();
  }, [loadMoreGames]);

  const handleScroll = useCallback(() => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 50 && !isLoading) {
      loadMoreGames();
    }
  }, [loadMoreGames, isLoading]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const handlePlayClick = (game) => {
    if (onGameSelect) {
      onGameSelect(game.game_id);
    }
  };

  const filteredProviderGames = providerGames.map(({ providerName, games }) => ({
    providerName,
    games: games.filter((game) =>
      game.name.toLowerCase().includes(filterTerm.toLowerCase())
    ),
  }));

  return (
    
    <div className="game-list py-8 px-4 md:px-20 lg:px-40">
      {/* Campo de filtro */}
      <div className="filter-bar">
        <div className="search-input-container">
          <input
            type="text"
            placeholder="Procurar jogos"
            value={filterTerm}
            onChange={(e) => setFilterTerm(e.target.value)}
            className="search-input"
          />
          <span className="search-icon">
            <FaSearch size={20} />
          </span>
        </div>
      </div>

      {filteredProviderGames.map(({ providerName, games }, index) => {
        if (games.length === 0) return null;

        const totalGames = providerGames.find(
          (provider) => provider.providerName === providerName
        )?.totalGames || 0;

        return (
          <div key={index} className="provider-section my-12">
            <div className="provider-header">
              <h2 className="provider-title">{providerName}</h2>
              <button
  className="provider-button"
  onClick={() => console.log(`Exibindo jogos do provedor: ${providerName}`)}
>
  Listar todos
</button>
            </div>

            <div className="game-grid">
              {games.map((game) => (
                <div key={game.id} className="game-item">
<div className="game-card group" onClick={() => handlePlayClick(game)}>
  <img src={game.image || game.img} alt={game.en_name} className="game-image" />
  <div className="game-overlay">
    <div className="relative flex items-center justify-center w-14 h-14">
      <div className="absolute inset-0 w-full h-full rounded-full border-4 border-white border-t-transparent animate-spin-slow"></div>
      <FaPlay className="play-icon" />
    </div>
  </div>
</div>

                  <p className="game-name">{game.name}</p>
                </div>
              ))}
            </div>
          </div>
        );
      })}

      {isLoading && (
        <div className="loading">
          <p>Carregando...</p>
        </div>
      )}
    </div>
  );
};

GameList.propTypes = {
  onGameSelect: PropTypes.func,
};

export default GameList;
