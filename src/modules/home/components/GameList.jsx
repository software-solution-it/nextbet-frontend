import PropTypes from "prop-types"; // Importando PropTypes
import { useEffect, useState } from "react";
import { getMemberSlotHotGame } from "../../services/service"; // Importando o endpoint de integração
import { FaPlay } from "react-icons/fa"; // Ícone de jogar

const GameList = ({ selectedSubCategory, onGameSelect }) => {
  const [games, setGames] = useState([]);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [titleSubCategory, setTitleSubCategory] = useState(selectedSubCategory || "Subcategoria");

  // Atualiza os jogos e controla a transição
  useEffect(() => {
    setIsTransitioning(true);

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
          newGames = []; // Você pode adicionar lógica para outras subcategorias aqui
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

        {/* Grid de Jogos */}
        {games.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {games.map((game) => (
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
