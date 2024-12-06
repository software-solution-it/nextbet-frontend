import PropTypes from "prop-types"; // Importando PropTypes
import { useState, useEffect } from "react";
import "./HeroBanner.css"; // Estilos personalizados

// Mapeamento de categorias para cards
const cardsByCategory = {
  "Cassino": [
    {
      id: 1,
      title: "",
      image:
        "https://pixbet.com.br/cdn-cgi/image/quality=30,format=avif/https://assets.pixbet.com.br/previewDesktop/2024-11-07T16:45:21.730Z.webp",
    },
    {
      id: 2,
      title: "",
      image:
        "https://pixbet.com.br/cdn-cgi/image/quality=30,format=avif/https://assets.pixbet.com.br/previewDesktop/2024-11-07T16:45:21.730Z.webp",
    },
    {
      id: 3,
      title: "",
      image:
        "https://pixbet.com.br/cdn-cgi/image/quality=30,format=avif/https://assets.pixbet.com.br/previewDesktop/2024-11-07T16:45:21.730Z.webp",
    },
  ],
  "Ao Vivo": [
    {
      id: 4,
      title: "Ao Vivo 1",
      image:
        "https://pixbet.com.br/cdn-cgi/image/quality=30,format=avif/https://assets.pixbet.com.br/previewDesktop/2024-11-07T16:45:21.730Z.webp",
    },
    {
      id: 5,
      title: "Ao Vivo 2",
      image:
        "https://pixbet.com.br/cdn-cgi/image/quality=30,format=avif/https://assets.pixbet.com.br/previewDesktop/2024-11-07T16:45:21.730Z.webp",
    },
    {
      id: 6,
      title: "Ao Vivo 3",
      image:
        "https://pixbet.com.br/cdn-cgi/image/quality=30,format=avif/https://assets.pixbet.com.br/previewDesktop/2024-11-07T16:45:21.730Z.webp",
    },
  ],
};

const HeroBanner = ({ selectedCategory }) => {
  const [cards, setCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Atualiza os cards com base na categoria selecionada
  useEffect(() => {
    setIsTransitioning(true); // Inicia a transição de saída

    // Aguarda o tempo da transição para atualizar os cards
    const timeout = setTimeout(() => {
      const newCards = cardsByCategory[selectedCategory] || [];
      setCards(newCards);
      setCurrentIndex(0); // Reseta o índice ao trocar a categoria
      setIsTransitioning(false); // Finaliza a transição de entrada
    }, 500); // 500ms é o tempo da animação de saída

    return () => clearTimeout(timeout); // Limpa o timeout ao desmontar
  }, [selectedCategory]);

  const handleCardClick = (index) => {
    if (index !== currentIndex) {
      setCurrentIndex(index); // Atualiza o índice do card central, apenas se for diferente
    }
  };

  return (
    <div
      className={`hero-banner transition-opacity duration-500 ${
        isTransitioning ? "opacity-0 scale-100" : "opacity-100 scale-100"
      }`}
    >
      {/* Cards */}
      <div className="cards-container">
        {cards.map((card, index) => {
          const isActive = index === currentIndex;
          const isLeft =
            index === (currentIndex - 1 + cards.length) % cards.length;
          const isRight = index === (currentIndex + 1) % cards.length;

          // Calcula o z-index com base na posição
          let zIndex = 1; // valor padrão
          if (isActive) {
            zIndex = 30; // O card ativo tem o maior z-index
          } else if (isLeft || isRight) {
            zIndex = 10; // Os cards laterais têm um z-index intermediário
          }

          let className = "card-wrapper";
          if (isActive) {
            className += " active";
          } else if (isLeft) {
            className += " side left";
          } else if (isRight) {
            className += " side right";
          } else {
            className += " hidden";
          }

          return (
            <div
              onClick={() => handleCardClick(index)} // Clique na área da imagem
              key={card.id}
              className={className}
              style={{ zIndex }} // Aplica o z-index dinamicamente
            >
              <div className="card-content">
                <img
                  src={card.image}
                  alt={card.title}
                  className="card-image"
                />
                <div className="card-title">{card.title}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Adicionando validação de PropTypes
HeroBanner.propTypes = {
  selectedCategory: PropTypes.string.isRequired, // selectedCategory deve ser uma string e é obrigatória
};

export default HeroBanner;
