import React from "react";

const BonusLoginModal = ({ onClose, timeLeft, formatTime }) => {
  const chestImages = [
    "https://betfiery5.com/assets/chest_day_1-99b0c408.png",
    "https://betfiery5.com/assets/chest_day_2-699a60ca.png",
    "https://betfiery5.com/assets/chest_day_2-699a60ca.png",
    "https://betfiery5.com/assets/chest_day_4-56307058.png",
    "https://betfiery5.com/assets/chest_day_5-30095c7d.png",
    "https://betfiery5.com/assets/chest_day_6-6b4a4226.png",
    "https://betfiery5.com/assets/chest_day_7-833c4453.png",
  ];

  return (
    <div
      className="fixed inset-0 bg-gray-800 bg-opacity-90 z-50 flex items-center justify-center backdrop-blur-md"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="rounded-lg shadow-lg p-6 relative flex flex-col items-center"
        style={{
          width: 360, // Ajustei para 360px para melhor acomodar 4 colunas com gaps
          minHeight: 500, // Ajustei para garantir altura suficiente
          backgroundImage:
            'url(https://betfiery5.com/assets/images/login-reward-modal/bgReward.png)',
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        onClick={(e) => e.stopPropagation()} // Previne o fechamento ao clicar dentro do modal
      >
        {/* Imagem no topo */}
        <img
          src="https://betfiery5.com/assets/images/login-reward-modal/vip-bg-title.png"
          alt="VIP Background Title"
          className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        />

        {/* Botão "X" para fechar o modal */}
        <button
          className="absolute top-4 right-4 text-white text-2xl font-bold cursor-pointer"
          onClick={onClose}
          aria-label="Fechar Modal"
        >
          &times;
        </button>

        {/* Cabeçalho com ícone e título */}
        <div className="text-center mt-16"> {/* Ajustei o margin-top para 16 para compensar a imagem absoluta */}
          <h2 className="text-white text-lg font-bold">
            Recompensa por Login Contínuo
          </h2>
        </div>

        {/* Valor máximo */}
        <div className="mt-4 text-yellow-300 text-xl font-bold">
          R$5.5 <span className="text-sm font-normal">Máximo Obtido</span>
        </div>

        {/* Botão "Visualizar meu VIP" com borda e gradiente */}
        <button
          className="mt-4 w-3/6 py-2 px-4 border-2 border-yellow-500 text-white font-bold rounded-lg text-[12px] mb-3 bg-gradient-to-r from-yellow-200 to-orange-500 hover-animate-gradient shadow-md transition duration-100 ease-in-out"
          onClick={() => alert("Visualizando VIP!")}
        >
          Visualizar meu VIP
        </button>

        <div className="grid grid-cols-4 gap-4 mt-6 w-full">
          {chestImages.map((image, index) => (
            <div
              key={index}
              className={`flex flex-col items-center justify-center rounded-lg bg-blue-500 shadow-md relative p-3 ${ // Adicionando padding dentro da caixa
                index === chestImages.length - 1
                  ? "col-span-2" // Última caixa ocupa 2 colunas
                  : ""
              }`}
              style={{
                height: "60px", // Altura fixa para as caixas
              }}
            >
              {/* Texto DAY com fundo verde e borda inferior */}
              <div className="text-center absolute top-[-10px] left-1/2 transform -translate-x-1/2 w-full px-3 text-[10px] text-white font-bold bg-blue-300 rounded-t-lg">
                DAY {index + 1}
              </div>

              {/* Imagem */}
              <img
                src={image}
                alt={`Day ${index + 1}`}
                className="h-14 w-14 object-cover" // Ajuste para garantir que a imagem se ajuste bem
              />
            </div>
          ))}
        </div>

        {/* Botão de ação */}
        <button
          className="mt-6 w-full bg-yellow-500 hover:bg-yellow-400 text-white font-bold py-2 px-4 rounded-full shadow-md"
          style={{
            backgroundImage:
              "url(https://betfiery5.com/assets/images/login-reward-modal/butbg.png)",
            backgroundSize: "cover",
          }}
          onClick={() => alert("Recompensa coletada!")}
        >
          Receba agora
        </button>

        {/* Regras */}
        <div className="mt-4 text-sm text-white text-center px-4">
          <a href="#" className="underline hover:text-yellow-300">
            Regras da Atividade
          </a>
        </div>
      </div>
    </div>
  );
};

export default BonusLoginModal;
