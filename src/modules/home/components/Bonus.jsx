import React, { useState, useEffect } from "react";
import { FaChevronRight } from "react-icons/fa";
import RewardModal from "./RewardModal"; // Importe o componente RewardModal
import PropTypes from 'prop-types'; // Importar PropTypes para validação de props
import BonusLoginModal from "./BonusLoginModal";
import Roulete from "./Rolete";
import Reward from '../../../../public/images/Site/recharge-package-reward-center-icon-6aabbb44.png';
import Coin from '../../../../public/images/Site/vip_daily-3248919c.png';
import Troph from '../../../../public/images/Site/vip_upgrade-8e611e0d.png';
import VipMonthly from '../../../../public/images/Site/vip_monthly-92898e53.png';
import HandCoin from '../../../../public/images/Site/course2-2f21a672.png';
import DrawActivity from '../../../../public/images/Site/draw-activity-icon-556bd2fa.png';

const rewards = [
  {
    title: "Pacote de Presente de Depósito",
    description: "Disponível em:",
    timer: "00:06:10",
    button: "Vai",
    icon: Reward,
    hasModal: true, // Adicionado para indicar que este item abre o modal
  },
  {
    title: "Bônus de login VIP",
    description: "Receba uma vez por dia",
    hasModalVip: true,
    button: "Vai",
    icon: Coin,
  },
  /*{
    title: "Cashback",
    description: "Bônus disponíveis: R$ 0,00",
    icon: "https://betfiery5.com/assets/cashback-7c159a98.png",
  },
  */
  {
    title: "Presente Mensal VIP",
    
    description: "Contagem regressiva: 305:34:25",
    icon: Troph,
    hasVipCallback: true, // Adicionado para indicar que este item chama o callback VIP
  },
  {
    title: "Presente De Atualização VIP",
    description: "Depósito: 0% Aposta: 0%",
    
    hasVipCallback: true, // Adicionado para indicar que este item chama o callback VIP
    icon: VipMonthly,
  },
  {
    title: "Convidar as recompensas",
    description: "Compartilhe convites e ganhe recompensas!",
    
    icon: HandCoin,
    hasInviteCallback: true, // Adiciona uma propriedade indicando que chama o InviteComponent
  },
  {
    title: "Giro da Sorte",
    
    hasRouleteCallBack: true,
    description: "Ganhe iPhone & bonificações!",
    icon: DrawActivity,
  },
];

const Bonus = ({ onOpenVip, onOpenInvite, onOpenRoulete }) => { // Recebe a função de callback via props
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalVipOpen, setIsModalVipOpen] = useState(false);
  const [isModalRouleteOpen, setIsModalRouleteOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState(370); // Inicialmente 6 minutos e 10 segundos (370 segundos)

  // Função para atualizar o temporizador
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timer); // Limpa o intervalo quando o componente for desmontado
    }
  }, [timeLeft]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openModalVip = () => {
    setIsModalVipOpen(true);
  };

  const closeModalVip = () => {
    setIsModalVipOpen(false);
  };


  const openModalRoulete = () => {
    setIsModalRouleteOpen(true);
  };

  const closeModalRoulete = () => {
    setIsModalRouleteOpen(false);
  };

  

  // Função para formatar o tempo no formato HH:MM:SS
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
  };

  const handleRewardClick = (reward) => {
    if (reward.hasModal) {
      openModal();
    }
    if (reward.hasVipCallback && onOpenVip) {
      onOpenVip();
    }
    if (reward.hasInviteCallback && onOpenInvite) {
      onOpenInvite();
    }

    if (reward.hasModalVip) {
      openModalVip();
    }
    if (reward.hasRouleteCallBack && onOpenRoulete) {
      openModalRoulete();
    }
  };

  return (
    <div className="text-white min-h-screen p-6 px-4 md:px-20 lg:px-40">
      <h1 className="text-2xl font-semibold mb-6 text-green-600">Recompensas</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {rewards.map((reward, index) => (
          <div
            key={index}
            className={`bg-gray-800 rounded-lg shadow-md p-4 flex items-center relative cursor-pointer`}
            onClick={() => handleRewardClick(reward)} // Chama a função de clique com o reward atual
          >
            <div className="mr-4 flex-shrink-0">
              <img src={reward.icon} alt={reward.title} className="w-10 h-10 sm:w-12 sm:h-12 object-contain" />
            </div>
            <div className="flex-grow">
              <h2 className="text-sm sm:text-[14px] font-semibold text-green-500">{reward.title}</h2>
              <div className="flex flex-col sm:flex-row">
                <p className="text-xs sm:text-[12px] text-gray-400 mb-2 sm:mb-0 mr-0 sm:mr-2">{reward.description}</p>
                {reward.timer && <p className="text-sm text-yellow-500 font-bold">{reward.timer}</p>}
              </div>
            </div>
            <button className="ml-4 text-gray-400 hover:text-white">
              <FaChevronRight className="text-[12px]" />
            </button>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <RewardModal onClose={closeModal} timeLeft={timeLeft} formatTime={formatTime} />
      )}

      {isModalVipOpen && (
        <BonusLoginModal onClose={closeModalVip} timeLeft={timeLeft} formatTime={formatTime} />
      )}

      {isModalRouleteOpen && (
        <Roulete onClose={closeModalRoulete} timeLeft={timeLeft} formatTime={formatTime} />
      )}
    </div>
  );
};

// Definição das PropTypes para validação
Bonus.propTypes = {
  onOpenVip: PropTypes.func, // Função opcional de callback
  onOpenInvite: PropTypes.func, // Adicionando outras props para validação
  onOpenRoulete: PropTypes.func,
};

export default Bonus;
