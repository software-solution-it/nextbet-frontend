import React, { useState, useEffect, useRef } from "react";

const Roulette = ({ onClose }) => {
  const squareSize = 60;
  const containerSize = 320;
  const gap = 16;

  const items = [
    { image: "https://static.betfiery5.com/1734332617719625564_cash.png", text: "R$ 5,00K" },
    { image: "https://static.betfiery5.com/1734332706568783332_coin3.png", text: "R$ 20,00" },
    { image: "https://static.betfiery5.com/1734332777653433513_iphone.png", text: "Iphone 16" },
    { image: "https://static.betfiery5.com/1734332826839253202_coin4.png", text: "R$ 1,00K" },
    { image: "https://static.betfiery5.com/1734332872127183549_coin3.png", text: "R$ 50,00" },
    { image: "https://static.betfiery5.com/1734332999373398267_coin1.png", text: "R$ 2,00" },
    { image: "https://static.betfiery5.com/1734333127897548121_cash.png", text: "10000 BRL" },
    { image: "https://static.betfiery5.com/1734333154857471490_coin2.png", text: "R$ 10,00" },
    { image: "https://static.betfiery5.com/1734333220496634248_coin1.png", text: "R$ 5,00" },
    { image: "https://static.betfiery5.com/1734333271938219654_cash.png", text: "3000 BRL" },
    { image: "https://static.betfiery5.com/1734333374504918899_coin.png", text: "R$ 100,00" },
    { image: "https://static.betfiery5.com/1734333360165094010_1111.png", text: "R$ 1,00" },
  ];

  const positions = [
    { left: `${gap}px`, top: `${gap}px` },
    { left: `${gap * 2 + squareSize}px`, top: `${gap}px` },
    { left: `${gap * 3 + squareSize * 2}px`, top: `${gap}px` },
    { left: `${gap * 4 + squareSize * 3}px`, top: `${gap}px` },
    { right: `${gap}px`, top: `${gap * 2 + squareSize}px` },
    { right: `${gap}px`, top: `${gap * 3 + squareSize * 2}px` },
    { right: `${gap}px`, top: `${gap * 4 + squareSize * 3}px` },
    { left: `${gap * 3 + squareSize * 2}px`, bottom: `${gap}px` },
    { left: `${gap * 2 + squareSize}px`, bottom: `${gap}px` },
    { left: `${gap}px`, bottom: `${gap}px` },
    { left: `${gap}px`, bottom: `${gap * 2 + squareSize}px` },
    { left: `${gap}px`, top: `${gap * 2 + squareSize}px` },
  ];

  const gradients = [
    "linear-gradient(135deg, #FF9A8B, #FF6A88)",
    "linear-gradient(135deg, #8BC6EC, #9599E2)",
    "linear-gradient(135deg, #FFB199, #FF0844)",
    "linear-gradient(135deg, #84fab0, #8fd3f4)",
    "linear-gradient(135deg, #F5576C, #F093FB)",
    "linear-gradient(135deg, #4facfe, #00f2fe)",
    "linear-gradient(135deg, #667EEA, #764BA2)",
    "linear-gradient(135deg, #6A11CB, #2575FC)",
    "linear-gradient(135deg, #30E8BF, #FF8235)",
    "linear-gradient(135deg, #FEAC5E, #C779D0)",
    "linear-gradient(135deg, #FCCF31, #F55555)",
    "linear-gradient(135deg, #1D976C, #93F9B9)",
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [spinSpeed, setSpinSpeed] = useState(1000); // tempo do intervalo do spin (ms)
  const [resultItem, setResultItem] = useState(null);
  const [giftHidden, setGiftHidden] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const intervalRef = useRef(null);

  useEffect(() => {
    if (isSpinning) {
      // Limpa qualquer intervalo anterior
      clearInterval(intervalRef.current);
      // Cria um novo intervalo com a velocidade atual
      intervalRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % items.length);
      }, spinSpeed);
    }

    return () => clearInterval(intervalRef.current);
  }, [isSpinning, spinSpeed, items.length]);

  const handlePlay = () => {
    if (isSpinning) return; // Se já está girando, não faz nada
    setShowResult(false); // Esconde o resultado
    setResultItem(null);  // Reseta o prêmio anterior
    setGiftHidden(false); // Exibe o presente novamente
  
    // Ao clicar em jogar:
    // - Muda estilo do botão (podemos usar estado para isso)
    // - Roda mais rápido (por exemplo, 100ms)
    setSpinSpeed(100); 
    setIsSpinning(true);
  
    // Reinicia a animação do presente
    setTimeout(() => {
      setGiftHidden(true); // Esconde o presente após a rotação
    }, 100); // Leve atraso para garantir que o presente apareça corretamente
  
    // Tempo aleatório entre 7 e 14 segundos para parar
    const randomTime = (Math.floor(Math.random() * 8) + 7) * 1000;
    setTimeout(() => {
      // Para rotação
      setIsSpinning(false);
      // Seleciona o item final
      setResultItem(items[activeIndex]);
      // Animar o sumiço do presente
      setGiftHidden(true);
  
      // Depois de animar o presente, mostrar o resultado
      setTimeout(() => {
        setShowResult(true);
      }, 1500); // tempo para a animação do presente sumir
    }, randomTime);
  };
  

  return (
    <div
      className="fixed inset-0 bg-gray-800 bg-opacity-90 z-50 flex flex-col items-center justify-center backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        style={{
          position: "absolute",
          top: "10px",
          right: "20px",
          cursor: "pointer",
          color: "white",
          fontSize: "24px",
          fontWeight: "bold",
          zIndex: 9999
        }}
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
      >
        X
      </div>

      <h1
        className="absolute top-[-5%]"
        style={{
          fontFamily: "inherit",
          position: "relative",
          cursor: "default",
          lineHeight: "1.33",
          backgroundImage: "linear-gradient(rgb(255, 255, 255) 27.88%, rgb(253, 243, 95) 65.11%)",
          color: "transparent",
          backgroundClip: "text",
          fontWeight: "900",
          fontSize: "36px",
          textAlign: "center",
          filter: "drop-shadow(rgb(234, 224, 64) 0px 0px 1px) drop-shadow(rgb(236, 79, 162) 0px 0px 1px) drop-shadow(rgb(236, 79, 162) 0px 0px 1px) drop-shadow(rgb(234, 224, 64) 0px 0px 1px)",
          marginBottom: "var(--chakra-space-2-5)",
        }}
      >
        Sorteio de Natal
      </h1>

      <div
        className="relative mb-40"
        style={{
          width: `${containerSize}px`,
          height: `${containerSize}px`,
          backgroundImage: 'url(https://betfiery5.com/assets/sodoku-box-bg-1f06f498.png)',
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src="https://betfiery5.com/assets/bg-4b8533ab.png"
          alt="Background Effect"
          className="absolute"
          style={{
            width: "100%",
            height: "100%",
            top: "-13%",
            left: "0",
            zIndex: -1,
            objectFit: "cover",
          }}
        />

        {items.map((item, index) => (
          <div
            key={index}
            className={`absolute flex flex-col items-center justify-center text-white rounded-lg shadow-md transition-all ${
              index === activeIndex ? "outline outline-4 outline-white" : "outline-none"
            }`}
            style={{
              width: `${squareSize}px`,
              height: `${squareSize}px`,
              background: gradients[index],
              boxSizing: "border-box",
              transition: "border 0.2s ease",
              ...positions[index],
            }}
          >
            <img
              src={item.image}
              alt={item.text}
              style={{
                width: "80%",
                height: "60%",
                objectFit: "contain",
                marginBottom: "2px",
              }}
            />
            <span style={{ fontSize: "10px", textAlign: "center" }}>{item.text}</span>
          </div>
        ))}

        <img
          src="https://betfiery5.com/assets/sudoku-star-c038b56d.png"
          alt="Star Effect"
          className="absolute"
          style={{
            width: "120px",
            height: "120px",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 5,
          }}
        />

        {/* Botão "Jogue" */}
        <div
          className="absolute left-1/2 transform -translate-x-1/2"
          style={{
            width: "160px",
            height: "60px",
            bottom: "-90px",
            zIndex: 5,
            cursor: "pointer", // cursor pointer aqui
            filter: isSpinning ? "grayscale(100%)" : "none", // muda estilo se está girando
            opacity: isSpinning ? 0.6 : 1, // muda estilo se está girando
            transition: "all 0.3s ease"
          }}
          onClick={handlePlay}
        >
          <img
            src="https://betfiery5.com/assets/play-btn-bg-94106e67.png"
            alt="Play Button"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
          />
          <span
            style={{
              position: "absolute",
              top: "35%",
              left: "50%",
              transform: "translate(-50%, -50%) perspective(1rem) rotateX(5deg)",
              color: "rgb(155, 76, 18)",
              fontSize: "30px",
              lineHeight: "40px",
              fontWeight: "800",
              textAlign: "center"
            }}
          >
            Jogue
          </span>
        </div>

        <div
          className="absolute left-1/2 transform -translate-x-1/2 w-full"
          style={{
            bottom: "-220px",
          }}
        >
          <h2
            className="flex"
            style={{
              textAlign: "center",
              fontSize: "20px",
              fontWeight: "bold",
              color: "white",
            }}
          >
            Bilhete de Loteria : <span className="mx-1 text-yellow-400">0</span>
          </h2>

          <div
            style={{
              fontSize: "14px",
              color: "#666",
              marginBottom: "10px",
            }}
          >
          </div>

          <div className="flex bg-gray-500 p-3 justify-between items-center rounded-lg">
            <div style={{ width: "100%" }}>
              <p className="text-[13px] mb-3">
                Depósito <span className="text-yellow-400">+1</span> draw
              </p>
              <div
                className="relative w-full bg-gray-800 rounded-full"
                style={{
                  height: 20,
                  marginTop: "5px",
                }}
              >
                <div
                  className="bg-blue-500 h-full rounded-full"
                  style={{ width: "0%" }}
                ></div>
                <span
                  className="absolute inset-0 flex items-center justify-center text-xs text-white"
                  style={{
                    lineHeight: "1rem",
                  }}
                >
                  0/100
                </span>
              </div>
            </div>
            <div className="mx-5 text-[12px] bg-blue-700 rounded-lg">
              <button
                style={{
                  padding: "8px 16px",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
                onClick={() => alert("Depositar")}
              >
                Depositar
              </button>
            </div>
          </div>
        </div>

        {/* Presente com animação para sumir */}
        <img
  src="https://betfiery5.com/assets/sudoku-gift-box-0183ef19.png"
  alt="Gift Box"
  className="absolute transition-all"
  style={{
    width: "120px",
    height: "120px",
    top: "50%",
    left: "50%",
    transform: giftHidden
      ? "translate(-50%, -50%) scale(0.1) translateY(-50px)" // Encolhe e move o presente para fora
      : "translate(-50%, -50%) scale(1)", // Retorna ao tamanho original
    opacity: giftHidden ? 0 : 1, // Torna o presente invisível
    zIndex: 4,
    transition: "transform 1s ease, opacity 1s ease" // Transições de transformação e opacidade
  }}
/>


{showResult && resultItem && (
  <div
    style={{
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      color: "white",
      textAlign: "center",
      zIndex: 9999,
      opacity: showResult ? 1 : 0, // Controla a opacidade para efeito de transição
      transition: "opacity 1s ease" // Transição suave da opacidade
    }}
  >
    <h2 style={{ fontSize: "10px", fontWeight: "bold", marginBottom: "10px" }}>
      Parabéns, você ganhou!
    </h2>
    <img
      src={resultItem.image}
      alt={resultItem.text}
      style={{ width: "40px", margin: "0 auto 10px" }}
    />
    <p style={{ fontSize: "14px", fontWeight: "bold" }}>{resultItem.text}</p>
  </div>
)}

      </div>

      {/* Resultado */}

    </div>
  );
};

export default Roulette;
