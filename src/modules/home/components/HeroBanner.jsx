import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import "./HeroBanner.css"; // Certifique-se de que os estilos atualizados estão neste arquivo

const HeroBanner = ({ selectedCategory }) => {
  const [cards, setCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const cardsByCategory = {
    Cassino: [
      {
        id: 1,
        title: "",
        image:
          "https://pixbet.com.br/cdn-cgi/image/quality=30,format=avif/https://assets.pixbet.com.br/previewMobile/2024-11-07T17:10:23.543Z.webp",
      },
      {
        id: 2,
        title: "",
        image:
          "https://pixbet.com.br/cdn-cgi/image/quality=30,format=avif/https://assets.pixbet.com.br/previewMobile/2024-11-07T17:10:13.369Z.webp",
      },
      {
        id: 3,
        title: "",
        image:
          "https://pixbet.com.br/cdn-cgi/image/quality=30,format=avif/https://assets.pixbet.com.br/previewMobile/2024-11-07T17:10:24.860Z.webp",
      },
    ],
    "Ao Vivo": [
           {
        id: 4,
        title: "",
        image:
          "https://pixbet.com.br/cdn-cgi/image/quality=30,format=avif/https://assets.pixbet.com.br/previewMobile/2024-11-07T17:10:23.543Z.webp",
      },
      {
        id: 5,
        title: "",
        image:
          "https://pixbet.com.br/cdn-cgi/image/quality=30,format=avif/https://assets.pixbet.com.br/previewMobile/2024-11-07T17:10:13.369Z.webp",
      },
      {
        id: 6,
        title: "",
        image:
          "https://pixbet.com.br/cdn-cgi/image/quality=30,format=avif/https://assets.pixbet.com.br/previewMobile/2024-11-07T17:10:24.860Z.webp",
      },
    ],
  };

  useEffect(() => {
    setIsTransitioning(true);

    const timeout = setTimeout(() => {
      const newCards = cardsByCategory[selectedCategory] || [];
      setCards(newCards);
      setCurrentIndex(0);
      setIsTransitioning(false);
    }, 500);

    return () => clearTimeout(timeout);
  }, [selectedCategory]);

  useEffect(() => {
    if (cards.length > 1 && !isTransitioning) {
      const transitionTimeout = setTimeout(() => {
        setIsTransitioning(true);
        setTimeout(() => {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
          setIsTransitioning(false);
        }, 500); // Tempo de transição
      }, 2000); // Intervalo entre as transições

      return () => clearTimeout(transitionTimeout);
    }
  }, [currentIndex, cards.length, isTransitioning]);

  const handleCardClick = (index) => {
    if (index !== currentIndex) {
      setCurrentIndex(index);
    }
  };

  const handleDotClick = (index) => {
    if (index !== currentIndex) {
      setCurrentIndex(index);
    }
  };

  return (
    <div className="hero-banner">
      <div
        className={`cards-container ${isTransitioning ? "transitioning" : ""}`}
      >
        {cards.map((card, index) => {
          const isActive = index === currentIndex;
          const isLeft =
            index === (currentIndex - 1 + cards.length) % cards.length;
          const isRight = index === (currentIndex + 1) % cards.length;

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
              onClick={() => handleCardClick(index)}
              key={card.id}
              className={className}
            >
              <div className="card-content">
                <img
                  src={card.image}
                  alt={card.title}
                  className="card-image"
                />
                {card.title && <div className="card-title">{card.title}</div>}
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Bolinhas de navegação para mobile */}
      {cards.length > 1 && (
        <div className="navigation-dots">
          {cards.map((_, index) => (
            <span
              key={index}
              className={`dot ${index === currentIndex ? "active" : ""}`}
              onClick={() => handleDotClick(index)}
            ></span>
          ))}
        </div>
      )}
    </div>
  );
};

HeroBanner.propTypes = {
  selectedCategory: PropTypes.string.isRequired,
};

export default HeroBanner;
