import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  FaGift,
  FaDollarSign,
  FaTrophy,
  FaRocket,
  FaInstagram,
  FaTelegramPlane,
} from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";

// Se você optar por usar importações
// import BonusVipSide from '../../../../public/images/Site/SideMenu/1709289830570770672_vvip.png'
// import RewardsSide from '../../../../public/images/Site/SideMenu/1711968397041549348_lj.png'
// import RouleteSide from '../../../../public/images/Site/SideMenu/1709716981018198741_zp.png'
// import CashbackSide from '../../../../public/images/Site/SideMenu/1709289980978577821_fl.png'

// Alternativamente, use caminhos absolutos se as imagens estiverem no diretório public
const SideMenu = ({
  isMenuOpen,
  closeMenu,
  setShowBonus,
  setShowVip,
  setShowPromotions,
  onPromotionClick,
  onOpenRoulete,
  isLoggedIn,
  openLoginModal,
}) => {
  const [promoOpen, setPromoOpen] = useState(true);
  const [imagesError, setImagesError] = useState({
    BonusVipImg: false,
    RecompensasImg: false,
    Roleta: false,
    RodaDinheiroDeVoltaImg: false,
  });

  // Função para verificar login e executar ações
  const handleClick = (action) => {
    if (!isLoggedIn) {
      openLoginModal(); // Abre o modal de login
      return;
    }
    action(); // Executa a ação se estiver logado
    closeMenu();
  };

  // Função para lidar com erros de carregamento de imagens
  const handleImageError = (imageKey) => {
    setImagesError((prev) => ({ ...prev, [imageKey]: true }));
  };

  return (
    <aside
      className={`fixed top-0 left-0 h-full bg-gray-900 text-white z-40 pt-16 transition-transform duration-300 ease-in-out transform ${
        isMenuOpen ? "translate-x-0" : "-translate-x-full"
      } w-60 shadow-lg overflow-y-auto`} // Adicionado overflow-y-auto
    >
      <div className="flex flex-col gap-1 px-4">
        <div className="mt-1 flex flex-col gap-1">
          {/* Bônus VIP */}
          {!imagesError.BonusVipImg && (
            <img
              onClick={() => handleClick(() => setShowVip(true))}
              src="/images/Site/SideMenu/1709289830570770672_vvip.png" // Usando caminho absoluto
              alt="Bônus VIP"
              className="w-full cursor-pointer transform rounded-lg transition-transform duration-300 hover:scale-105 hover:shadow-lg"
              onError={() => handleImageError("BonusVipImg")}
            />
          )}
          {/* Recompensas */}
          {!imagesError.RecompensasImg && (
            <img
              onClick={() => handleClick(() => setShowBonus(true))}
              src="/images/Site/SideMenu/1711968397041549348_lj.png" // Usando caminho absoluto
              alt="Centro de Recompensas"
              className="w-full cursor-pointer transform rounded-lg transition-transform duration-300 hover:scale-105 hover:shadow-lg"
              onError={() => handleImageError("RecompensasImg")}
            />
          )}
          {/* Roleta */}
          <div className="flex gap-1">
            {!imagesError.Roleta && (
              <img
                onClick={() => handleClick(onOpenRoulete)}
                src="/images/Site/SideMenu/1709716981018198741_zp.png" // Usando caminho absoluto
                alt="Roda de Dinheiro"
                style={{ height: 65, width: "48%" }}
                className="cursor-pointer transform rounded-lg transition-transform duration-300 hover:scale-105 hover:shadow-lg"
                onError={() => handleImageError("Roleta")}
              />
            )}
            {!imagesError.RodaDinheiroDeVoltaImg && (
              <img
                src="/images/Site/SideMenu/1709289980978577821_fl.png" // Usando caminho absoluto
                alt="Roda de Dinheiro de Volta"
                style={{ height: 65, width: "48%" }}
                className="cursor-pointer transform rounded-lg transition-transform duration-300 hover:scale-105 hover:shadow-lg"
                onError={() => handleImageError("RodaDinheiroDeVoltaImg")}
              />
            )}
          </div>
        </div>

        {/* Promoções */}
        <div className="mt-3 bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-all duration-300 ease-in-out">
          <button
            onClick={() => setPromoOpen(!promoOpen)}
            className="flex items-center justify-between w-full text-left text-gray-200 font-semibold py-2 px-3 rounded-lg hover:bg-gray-700 border border-transparent hover:border-green-500 transition-colors"
            aria-expanded={promoOpen}
            aria-controls="promocoes-dropdown"
          >
            <span className="flex items-center gap-2">
              <FaGift className="text-green-500" style={{ width: "14px", height: "14px" }} />
              <span className="text-[14px]">Promoções</span>
            </span>
            <IoMdArrowDropdown
              className={`transform transition-transform ${
                promoOpen ? "rotate-180" : "rotate-0"
              }`}
              style={{ width: "14px", height: "14px" }}
            />
          </button>
          <div
            id="promocoes-dropdown"
            className={`${
              promoOpen ? "max-h-96 opacity-100 py-4" : "max-h-0 opacity-0 py-0"
            } transition-all duration-300 ease-in-out`}
          >
            <ul className="flex flex-col gap-3 px-3">
              <li
                className="rounded-lg py-2 px-3 flex items-center gap-3 cursor-pointer bg-transparent transition-colors duration-300 hover:bg-gray-700"
                onClick={() => handleClick(() => onPromotionClick(1))}
              >
                <FaDollarSign className="text-yellow-500" style={{ width: "14px", height: "14px" }} />
                <span className="text-[12px]">50% de bônus</span>
              </li>
              <li
                className="rounded-lg px-3 py-2 flex items-center gap-3 cursor-pointer bg-transparent transition-colors duration-300 hover:bg-gray-700"
                onClick={() => handleClick(() => onPromotionClick(2))}
              >
                <FaTrophy className="text-orange-500" style={{ width: "14px", height: "14px" }} />
                <span className="text-[12px]">15% de bônus</span>
              </li>
              <li
                className="rounded-lg py-2 px-3 flex items-center gap-3 cursor-pointer bg-transparent transition-colors duration-300 hover:bg-gray-700"
                onClick={() => handleClick(() => onPromotionClick(3))}
              >
                <FaRocket className="text-blue-500" style={{ width: "14px", height: "14px" }} />
                <span className="text-[12px]">10% de bônus</span>
              </li>
              <li
                className="rounded-lg py-2 px-3 flex items-center gap-3 cursor-pointer bg-transparent transition-colors duration-300 hover:bg-gray-700"
                onClick={() => handleClick(() => onPromotionClick(4))}
              >
                <FaGift className="text-pink-500" style={{ width: "14px", height: "14px" }} />
                <span className="text-[12px]">R$6 de bônus</span>
              </li>
              <li className="rounded-lg px-3 flex items-center justify-center">
                <button
                  onClick={() => handleClick(() => setShowPromotions())}
                  className="bg-green-600 text-white text-[12px] font-semibold px-4 py-1 rounded-lg hover:bg-green-700 transition-colors duration-300 w-full"
                >
                  Saiba Mais
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Outros botões */}
        <button className="flex items-center gap-2 text-[14px] text-gray-200 py-2 px-3 mt-1 rounded-lg bg-gray-800 hover:bg-[#1a1a2d]/80 hover:border-green-500 border border-transparent transition-colors duration-300 cursor-pointer w-full text-left">
          <FaTelegramPlane
            className="text-blue-500"
            style={{ width: "14px", height: "14px" }}
          />
          <span>Telegram</span>
        </button>
        <button className="flex items-center gap-2 text-[14px] text-gray-200 py-2 px-3 rounded-lg bg-gray-800 hover:bg-[#1a1a2d]/80 hover:border-green-500 border border-transparent transition-colors duration-300 cursor-pointer w-full text-left">
          <span>📲</span>
          <span>Baixe O Aplicativo</span>
        </button>
        <button className="flex items-center gap-2 text-[14px] text-gray-200 py-2 px-3 rounded-lg bg-gray-800 hover:bg-[#1a1a2d]/80 hover:border-green-500 border border-transparent transition-colors duration-300 cursor-pointer w-full text-left">
          <span>🎥</span>
          <span>Cassino Ao Vivo</span>
        </button>
        <button className="flex items-center gap-2 text-[14px] text-gray-200 py-2 px-3 rounded-lg bg-gray-800 hover:bg-[#1a1a2d]/80 hover:border-green-500 border border-transparent transition-colors duration-300 cursor-pointer w-full text-left">
          <span>🎫</span>
          <span>Código De Bônus</span>
        </button>
        <button className="flex items-center gap-2 text-[14px] text-gray-200 py-2 px-3 rounded-lg bg-gray-800 hover:bg-[#1a1a2d]/80 hover:border-green-500 border border-transparent transition-colors duration-300 cursor-pointer w-full text-left">
          <FaInstagram
            className="text-pink-500"
            style={{ width: "14px", height: "14px" }}
          />
          <span>Instagram</span>
        </button>
        <button className="mb-20 flex items-center gap-2 text-[14px] text-gray-200 py-2 px-3 rounded-lg bg-gray-800 hover:bg-[#1a1a2d]/80 hover:border-green-500 border border-transparent transition-colors duration-300 cursor-pointer w-full text-left">
          <span>💬</span>
          <span>Suporte Online</span>
        </button>
      </div>
    </aside>
  );
};

SideMenu.propTypes = {
  isMenuOpen: PropTypes.bool.isRequired,
  closeMenu: PropTypes.func.isRequired,
  setShowBonus: PropTypes.func.isRequired,
  setShowVip: PropTypes.func.isRequired,
  setShowPromotions: PropTypes.func.isRequired,
  onPromotionClick: PropTypes.func.isRequired,
  onOpenRoulete: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  openLoginModal: PropTypes.func.isRequired,
};

export default SideMenu;
