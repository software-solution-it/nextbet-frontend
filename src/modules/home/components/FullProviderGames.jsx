import { useEffect, useState, useMemo } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { FaPlay } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as thinStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";

import GameProviderFilter from "./GameProviderFilter";
import {
  getGamesByProvider,
  getGameProviders,
  getFavoriteGames,
  addGameToFavorites,
  removeGameFromFavorites,
} from "../../services/service";
import "./FullProviderGames.css";

const FullProviderGames = ({onGameSelect }) => {
  const [games, setGames] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [limit, setLimit] = useState(12);
  const [hasMoreGames, setHasMoreGames] = useState(true);
  const [loadMoreLoading, setLoadMoreLoading] = useState(false);
  const [favoriteGames, setFavoriteGames] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);



  const [providers, setProviders] = useState([]);
  const [selectedProvider, setSelectedProvider] = useState("Todos");
  const [sliderRef, setSliderRef] = useState(null);

  // Carregar provedores de jogos
  const loadProviders = async () => {
    try {
      const fetchedProviders = await getGameProviders();
      setProviders([{ distribution: "Todos", games: [] }, ...fetchedProviders]);
    } catch (error) {
      console.error("Erro ao carregar provedores:", error);
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Carregar jogos favoritos
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

  // Carregar jogos
  const loadGames = async (provider, reset = false) => {
    try {
      setIsLoading(true);
      const { result } = await getGamesByProvider(0, Number.MAX_SAFE_INTEGER);
      let loadedGames = [];
      let totalGames = 0;

      if (provider === "Todos") {
        loadedGames = result.flatMap((providerData) => providerData.games);
        totalGames = result.reduce((acc, providerData) => acc + providerData.totalGames, 0);
      } else {
        const providerData = result.find((item) => item.providerName === provider);
        if (providerData) {
          loadedGames = providerData.games;
          totalGames = providerData.totalGames;
        }
      }

      const updatedGames = loadedGames.map((game) => ({
        ...game,
        isFavorited: favoriteGames.some((fav) => fav.game_id === game.id),
      }));

      if (reset) {
        setGames(updatedGames.slice(0, limit));
      } else {
        setGames((prev) => [...prev, ...updatedGames.slice(prev.length, prev.length + limit)]);
      }

      setHasMoreGames(games.length + limit < totalGames);
    } catch (error) {
      console.error("Erro ao carregar jogos:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Adicionar ou remover jogo dos favoritos
  const handleFavorite = async (gameId, isFavorited) => {
    try {
      // Evitar ativar estados de carregamento global
      if (isFavorited) {
        await removeGameFromFavorites(gameId);
      } else {
        await addGameToFavorites(gameId);
      }
  
      // Atualizar favoritos no estado local
      setFavoriteGames((prev) =>
        isFavorited
          ? prev.filter((fav) => fav.game_id !== gameId)
          : [...prev, { game_id: gameId }]
      );
  
      // Atualizar lista de jogos localmente
      setGames((prevGames) =>
        prevGames.map((game) =>
          game.id === gameId ? { ...game, isFavorited: !isFavorited } : game
        )
      );
    } catch (error) {
      console.error("Erro ao atualizar favoritos:", error);
    }
  };

  // Efeitos para carregar provedores, jogos e favoritos
  useEffect(() => {
    loadProviders();
    loadFavoriteGames();
  }, []);

  useEffect(() => {
    if (selectedProvider) {
      loadGames(selectedProvider, true);
    }
  }, [selectedProvider, favoriteGames]);

  // Filtrar jogos com status de favorito atualizado
  const filteredGames = useMemo(
    () =>
      games.map((game) => ({
        ...game,
        isFavorited: favoriteGames.some((fav) => fav.game_id === game.id),
      })),
    [games, favoriteGames]
  );

  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };

  return (
    <div className="bg-dark text-white py-8 px-4 md:px-20 lg:px-40">
      <div className="header-filters mb-6">
      <GameProviderFilter isModalOpen={isModalOpen} closeModal={() => setIsModalOpen(false)} openModal={() => setIsModalOpen(true)} />
      </div>

      <Slider {...sliderSettings} className="providers-slider mb-8" ref={(slider) => setSliderRef(slider)}>
        {providers.map((prov, index) => (
          <div key={prov.distribution || index} className="px-2">
            <button
              className={`w-full px-6 py-2 rounded-lg font-bold text-[14px] ${
                selectedProvider === prov.distribution
                  ? "bg-blue-600 text-white"
                  : "bg-[#1C2433] text-gray-300"
              }`}
              onClick={() => setSelectedProvider(prov.distribution)}
            >
              {prov.distribution}
            </button>
          </div>
        ))}
      </Slider>

      <div className="game-grid grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
  {games.map((game) => (
    <div key={game.id} className="game-item">
      <div className="game-card group bg-gray-800 rounded-lg overflow-hidden shadow-lg relative">
        <img
          src={game.img}
          alt={game.name}
          className="game-image w-full h-40 object-cover transition-all duration-200"
        />
        <div
          className="game-overlay absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer"
          onClick={() => onGameSelect(game.game_id)}
        >
          <div className="circle-container">
            <FaPlay className="play-icon text-white text-2xl" />
          </div>
        </div>
        <div
          className="favorite-icon absolute top-2 right-2 cursor-pointer"
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
      <p className="game-name mt-2 text-center text-sm text-gray-300">{game.name}</p>
    </div>
  ))}
</div>

{hasMoreGames && (
  <div className="flex justify-center mt-8">
    <button
      className="bg-blue-500 text-white py-2 px-6 rounded-full hover:bg-blue-600"
      onClick={() => {
        setLoadMoreLoading(true);
        loadGames(selectedProvider, false).finally(() => setLoadMoreLoading(false));
      }}
      disabled={loadMoreLoading} // Apenas loadMoreLoading controla o botão
    >
      {loadMoreLoading ? "Carregando..." : "Ver mais"}
    </button>
  </div>
)}
    </div>
  );
};

export default FullProviderGames;
