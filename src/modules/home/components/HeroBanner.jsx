import PropTypes from "prop-types";
import { useState, useEffect, useRef, useCallback } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const HeroBanner = ({ selectedCategory }) => {
  const [cards, setCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [direction, setDirection] = useState("next");
  const [transitioning, setTransitioning] = useState(false);
  const [shouldAnimateProgress, setShouldAnimateProgress] = useState(true);

  const transitionDuration = 300;
  const progressDuration = 5000;

  const timerRef = useRef(null);
  const startTimeRef = useRef(null);
  const elapsedTimeRef = useRef(0);
  const resetTimeoutRef = useRef(null);
  const handleNextRef = useRef();

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

  // Atualiza os cards quando a categoria selecionada muda
  useEffect(() => {
    const newCards = cardsByCategory[selectedCategory] || [];
    setCards(newCards);
    setCurrentIndex(0);
    closeModal();
    setProgress(0);
    elapsedTimeRef.current = 0;
  }, [selectedCategory]);

  // Função para limpar o temporizador de progresso
  const clearProgress = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  // Função para avançar para o próximo story
  const handleNext = useCallback(() => {
    // Verifica se é o último story
    if (currentIndex >= cards.length - 1) {
      closeModal();
      return;
    }

    setDirection("next");
    setPrevIndex(currentIndex);
    const nextIndex = currentIndex < cards.length - 1 ? currentIndex + 1 : currentIndex;
    setCurrentIndex(nextIndex);
    setTransitioning(true);
    setProgress(0);
    elapsedTimeRef.current = 0;

    clearProgress();

    setShouldAnimateProgress(false);

    if (resetTimeoutRef.current) {
      clearTimeout(resetTimeoutRef.current);
    }

    resetTimeoutRef.current = setTimeout(() => {
      setShouldAnimateProgress(true);
      startProgress();
    }, 0);
  }, [currentIndex, cards.length, clearProgress]);

  // Referência para a função handleNext
  useEffect(() => {
    handleNextRef.current = handleNext;
  }, [handleNext]);

  // Função para voltar ao story anterior
  const handlePrev = useCallback(() => {
    if (transitioning) return;

    setDirection("prev");
    setPrevIndex(currentIndex);
    const prevIndexVal = currentIndex > 0 ? currentIndex - 1 : currentIndex;
    setCurrentIndex(prevIndexVal);
    setTransitioning(true);
    setProgress(0);
    elapsedTimeRef.current = 0;

    clearProgress();
    setShouldAnimateProgress(false);

    if (resetTimeoutRef.current) {
      clearTimeout(resetTimeoutRef.current);
    }

    resetTimeoutRef.current = setTimeout(() => {
      setShouldAnimateProgress(true);
      startProgress();
    }, 0);
  }, [transitioning, currentIndex, clearProgress]);

  // Função para iniciar o progresso do story
  const startProgress = useCallback(() => {
    clearProgress();
    startTimeRef.current = Date.now();

    timerRef.current = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current + elapsedTimeRef.current;
      const newProgress = Math.min((elapsed / progressDuration) * 100, 100);
      setProgress(newProgress);

      if (newProgress >= 100) {
        handleNextRef.current();
      }
    }, 50);
  }, [clearProgress, progressDuration]);

  // Inicia o progresso quando o modal é aberto e visível
  useEffect(() => {
    if (showModal && isVisible && !isPaused) {
      startProgress();
    }

    return () => {
      clearProgress();
    };
  }, [showModal, isVisible, currentIndex, isPaused, startProgress, clearProgress]);

  // Função para abrir o modal
  const openModal = (index) => {
    setCurrentIndex(index);
    setPrevIndex(null);
    setShowModal(true);
    setProgress(0);
    elapsedTimeRef.current = 0;
    setDirection("next");
    setShouldAnimateProgress(true);
    setIsVisible(true);
  };

  // Função para fechar o modal
  const closeModal = useCallback(() => {
    setIsVisible(false);
    clearProgress();
    setDirection("next");
    setTimeout(() => {
      setShowModal(false);
      setIsPaused(false);
      setProgress(0);
      elapsedTimeRef.current = 0;
      setShouldAnimateProgress(true);
    }, transitionDuration);
  }, [clearProgress, transitionDuration]);

  // Função para pausar o progresso quando o usuário interage
  const handleMouseDown = () => {
    setIsPaused(true);
    const elapsed = Date.now() - startTimeRef.current + elapsedTimeRef.current;
    elapsedTimeRef.current = elapsed;
    clearProgress(); // Pausa imediatamente
  };

  // Função para retomar o progresso quando a interação é removida
  const handleMouseUp = () => {
    if (isPaused) {
      setIsPaused(false);
      startProgress(); // Retoma imediatamente
    }
  };

  // Função para retomar o progresso ao sair da interação
  const handleMouseLeave = () => {
    if (isPaused) {
      setIsPaused(false);
      startProgress();
    }
  };

  // Reinicia o progresso quando não está pausado e o modal está visível
  useEffect(() => {
    if (!isPaused && showModal && isVisible) {
      startProgress();
    }
  }, [isPaused, showModal, isVisible, startProgress]);

  // Gerencia o estado de transição
  useEffect(() => {
    if (transitioning) {
      const timer = setTimeout(() => {
        setTransitioning(false);
        setPrevIndex(null);
        setShouldAnimateProgress(true);
      }, transitionDuration);

      return () => clearTimeout(timer);
    }
  }, [transitioning, transitionDuration]);

  // Função para navegar entre os stories
  const navigate = (dir) => {
    if (dir === "next") {
      handleNext();
    } else {
      handlePrev();
    }
  };

  // Limpeza de temporizadores ao desmontar o componente
  useEffect(() => {
    return () => {
      if (resetTimeoutRef.current) {
        clearTimeout(resetTimeoutRef.current);
      }
      clearProgress();
    };
  }, [clearProgress]);

  return (
    <div
      className="py-8 px-4 md:px-20 lg:px-40"
      style={{ position: "relative", overflow: "visible" }}
    >
      <div className="flex items-center gap-4 overflow-x-auto scrollbar-hide">
        {cards.map((card, index) => (
          <div
            key={card.id}
            onClick={() => {
              if (!showModal) openModal(index);
            }}
            className="relative flex-shrink-0 w-32 h-32 cursor-pointer overflow-hidden rounded-lg"
          >
            <div className="group relative w-full h-full transition-transform duration-300 ease-in-out transform hover:scale-105">
              <img
                src={card.image}
                alt={card.title}
                className="w-full h-full object-cover rounded-lg shadow-md"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100 rounded-lg">
                <span className="text-white text-lg font-semibold">Stories</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div
          className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-40 transition-opacity duration-300 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
          onClick={closeModal}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleMouseDown}
          onTouchEnd={handleMouseUp}
        >
          <div
            className={`bg-white rounded-lg overflow-hidden w-4/5 h-4/5 max-w-2xl max-h-screen relative transition-transform duration-300 ${
              isVisible ? "scale-100" : "scale-95"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-50 w-3/4">
              {cards.map((_, index) => (
                <div key={index} className="flex-1 h-1 bg-gray-300">
                  <div
                    className={`h-full bg-green-500 transition-all duration-300 ease-linear ${
                      shouldAnimateProgress ? "transition-width" : ""
                    }`}
                    style={{
                      width:
                        index < currentIndex
                          ? "100%"
                          : index === currentIndex
                          ? `${progress}%`
                          : "0%",
                      transition: shouldAnimateProgress ? "width 0.3s linear" : "none",
                    }}
                  ></div>
                </div>
              ))}
            </div>

            <div className="relative w-full h-full">
              {prevIndex !== null && transitioning && (
                <img
                  src={cards[prevIndex].image}
                  alt={cards[prevIndex].title}
                  className={`absolute top-0 left-0 w-full h-full object-cover rounded-lg transition-transform duration-500 ${
                    direction === "next" ? "slide-out-left" : "slide-out-right"
                  }`}
                />
              )}
              <img
                src={cards[currentIndex].image}
                alt={cards[currentIndex].title}
                className={`absolute top-0 left-0 w-full h-full object-cover rounded-lg transition-transform duration-500 ${
                  transitioning
                    ? direction === "next"
                      ? "slide-in-left"
                      : "slide-in-right"
                    : "translate-x-0"
                }`}
              />
            </div>

            <button
              className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full z-50 hover:bg-opacity-70"
              onClick={() => navigate("prev")}
              disabled={currentIndex === 0 || transitioning}
              aria-label="Anterior"
              style={{ marginLeft: "10px" }}
            >
              <FaArrowLeft />
            </button>
            <button
              className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full z-50 hover:bg-opacity-70"
              onClick={() => navigate("next")}
              disabled={currentIndex === cards.length - 1 || transitioning}
              aria-label="Próximo"
              style={{ marginRight: "10px" }}
            >
              <FaArrowRight />
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .transition-opacity {
          transition-property: opacity;
        }

        .transition-transform {
          transition-property: transform;
        }

        @keyframes slideInLeft {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }

        @keyframes slideOutLeft {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-100%);
          }
        }

        @keyframes slideInRight {
          from {
            transform: translateX(-100%);
          }
          to {
            transform: translateX(0);
          }
        }

        @keyframes slideOutRight {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(100%);
          }
        }

        .slide-in-left {
          animation: slideInLeft ${transitionDuration}ms forwards;
        }

        .slide-out-left {
          animation: slideOutLeft ${transitionDuration}ms forwards;
        }

        .slide-in-right {
          animation: slideInRight ${transitionDuration}ms forwards;
        }

        .slide-out-right {
          animation: slideOutRight ${transitionDuration}ms forwards;
        }

        .navigation-button {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background-color: rgba(0, 0, 0, 0.5);
          color: white;
          padding: 0.5rem;
          border-radius: 50%;
          z-index: 50;
          cursor: pointer;
        }

        .navigation-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .navigation-button:hover:not(:disabled) {
          background-color: rgba(0, 0, 0, 0.7);
        }
      `}</style>
    </div>
  );
};

HeroBanner.propTypes = {
  selectedCategory: PropTypes.string.isRequired,
};

export default HeroBanner;
