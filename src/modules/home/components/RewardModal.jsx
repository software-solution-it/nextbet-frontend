// RewardModal.js
import React from "react";
import RewardTitle from '../../../../public/images/Site/RewardModal/1709106918833425031_55.png'
import Dazzing from '../../../../public/images/Site/RewardModal/dazzing.png'
import BgTitle from '../../../../public/images/Site/RewardModal/recharge-package-discount-bg-76ac4e9e.png'
import BgCountDown from '../../../../public/images/Site/RewardModal/recharge-package-countdown-bg-401a7092.png'
import BgBox from '../../../../public/images/Site/RewardModal/recharge-package-box-bg-0a268858.png'
import ButtonFooter from '../../../../public/images/Site/RewardModal/recharge-package-btn-bg-851e56e4.png'
import PixImage from '../../../../public/images/Site/RewardModal/1700218482328189002_20231117-185256.png'

const RewardModal = ({ onClose, timeLeft, formatTime, onDepositClick }) => {
  return (
    <div
      className="fixed inset-0 bg-gray-800 bg-opacity-90 z-50 flex items-center justify-center backdrop-blur-md cursor-pointer"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="bg-transparent p-0 relative z-50 flex justify-center items-center"
        onClick={(e) => e.stopPropagation()} // Previne o fechamento ao clicar dentro do modal
      >
        {/* Botão "X" para fechar o modal */}
        <button
          className="absolute top-2 right-2 text-white text-2xl font-bold cursor-pointer"
          onClick={onClose}
          aria-label="Fechar Modal"
        >
          &times;
        </button>

        {/* Nova imagem acima da segunda */}
        <img
          src={RewardTitle}
          alt="Nova imagem acima da segunda"
          className="absolute top-[-30%] w-3/6 max-w-xl object-contain"
        />

        {/* Imagem que vai rodar atrás */}
        <img
          src={Dazzing}
          alt="Imagem de fundo girando"
          className="absolute top-[-15%] w-full max-w-xl object-contain animate-spin-slow z-0"
        />

        {/* Terceira imagem acima da segunda */}
        <img
          style={{ zIndex: 99 }}
          src={BgTitle}
          alt="Imagem de desconto"
          className="absolute top-[-12%] w-4/6 max-w-xl object-contain"
        />

        {/* Segunda imagem no topo */}
        <img
          style={{ zIndex: 100 }}
          src={BgCountDown}
          alt="Imagem de contagem regressiva"
          className="absolute top-[5%] w-2/6 max-w-xl object-contain"
        />

        {/* Adicionando o temporizador com texto */}
        <div
          style={{ zIndex: 101 }}
          className="absolute top-[6%] text-center text-white font-bold text-xs sm:text-sm md:text-base"
        >
          <p>Disponível em:</p>
          <p>{formatTime(timeLeft)}</p>
        </div>

        {/* Texto "Super valor 999%" na terceira imagem */}
        <div
          style={{ zIndex: 102 }}
          className="absolute w-full top-[0%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 text-center text-yellow-300 font-bold text-sm sm:text-base md:text-lg"
        >
          <p>Super valor 999%</p>
        </div>

        {/* Texto de preço especial abaixo da primeira imagem */}
        <div
          style={{ zIndex: 103 }}
          className="absolute bottom-[6%] w-full text-center text-yellow-900 font-bold text-sm sm:text-base md:text-lg cursor-pointer sm:hover:text-yellow-700 transition-colors"
          onClick={onDepositClick}
        >
          <p>Preço especial: R$ 100,00</p>
          <p className="text-xs sm:text-sm line-through text-yellow-800">
            Preço original: R$ 150,00
          </p>
        </div>

        {/* Primeira imagem */}
        <img
          src={BgBox}
          alt="Imagem Modal"
          className="w-5/6 z-50 max-w-xl object-contain"
        />

        {/* Quarta imagem abaixo da primeira */}
        <img
          style={{ zIndex: 67 }}
          src={ButtonFooter}
          alt="Botão de imagem"
          className="absolute bottom-0 w-4/6 max-w-xl object-contain"
        />

        {/* Seção de escolha do método de depósito */}
        <div
          className="absolute bottom-[-23%] z-0 py-2 h-32 w-3/4 text-center bg-black rounded-lg bg-opacity-20 text-white font-bold text-xs sm:text-sm md:text-base cursor-pointer sm:hover:bg-opacity-30 transition-colors"
          onClick={onClose}
        >
          {/* Linha com texto centralizado */}
          <div className="flex items-center mt-7 justify-center w-full">
            <div className="flex-grow h-[1px] bg-gradient-to-r from-transparent via-green-500 to-transparent"></div> {/* Linha esquerda com gradiente */}
            <p className="mx-4 flex-shrink-0 text-xs sm:text-sm md:text-base">
              Escolha o método de pagamento
            </p> {/* Texto centralizado */}
            <div className="flex-grow h-[1px] bg-gradient-to-r from-transparent via-green-500 to-transparent"></div> {/* Linha direita com gradiente */}
          </div>

          {/* PIX no canto inferior esquerdo com borda verde */}
          <div
            className="absolute bottom-2 left-2 p-2 border-2 border-green-500 rounded-lg flex items-center cursor-pointer sm:hover:border-green-700 transition-colors"
            onClick={onDepositClick}
          >
            <img
              src={PixImage} // Usando a imagem do PIX fornecida
              alt="PIX"
              className="w-16"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RewardModal;
