// PostLoginNav.js
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  FaWallet,
  FaUserCircle,
  FaKey,
  FaGift,
  FaGamepad,
  FaFutbol,
} from "react-icons/fa";
import { getMemberBalance } from "../../services/service";
import SideMenu from "./SideMenu"; // Importar o SideMenu
import WalletModal from "./WalletModal";
import { FiX, FiMenu, FiHome, FiUserPlus, FiMoreHorizontal } from "react-icons/fi";

const Logo = "/assets/logo.png";

const PostLoginNav = ({
  onLogout,
  isMenuOpen,
  setIsMenuOpen,
  setShowBonus,
  setShowInvite,
}) => {
  const [balance, setBalance] = useState(0);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [showJogos, setShowJogos] = useState(true);
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);

  useEffect(() => {
    const uid = sessionStorage.getItem("Uid");
    if (uid) {
      fetchMemberBalance();
    }
  }, []);

  const fetchMemberBalance = async () => {
    try {
      const response = await getMemberBalance();
      if (response.status) {
        setBalance(response.data.data.balance);
      } else {
        console.error("Erro ao obter saldo do membro:", response.data);
      }
    } catch (error) {
      console.error("Erro ao obter saldo do membro:", error);
    }
  };

  const toggleProfileSubMenu = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const openWalletModal = () => {
    setIsWalletModalOpen(true);
    setIsProfileOpen(false);
  };

  const closeWalletModal = () => {
    setIsWalletModalOpen(false);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("Uid");
    onLogout();
  };

  return (
    <>
      {/* Top Navbar */}
      <nav className="fixed top-0 left-0 w-full bg-gray-800 text-white z-50 flex items-center px-4 py-3 md:px-5 shadow-md">
        {/* Botão de toggle lateral */}
        <button
          className="text-white mr-2 focus:outline-none hidden md:block"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
        </button>

        {/* Logo à esquerda */}
        <div className="flex items-center mx-3">
          <img src={Logo} alt="Logo" className="h-8 w-auto" />
        </div>

        {/* Toggle entre Jogos e Esportes */}
        <div className="hidden md:flex items-center gap-2 mr-auto">
          <div className="flex items-center bg-gradient-to-r from-blue-700 to-blue-500 rounded-full p-1">
            <button
              onClick={() => setShowJogos(true)}
              className={`flex items-center gap-1 px-3 py-1 rounded-full transition-colors ${
                showJogos ? "bg-blue-600 text-white" : "text-gray-300"
              }`}
            >
              <FaGamepad className="w-4 h-4" />
              <span className="text-sm">Cassino</span>
            </button>
            <button
              onClick={() => setShowJogos(false)}
              className={`flex items-center gap-1 px-3 py-1 rounded-full transition-colors ${
                !showJogos ? "bg-blue-600 text-white" : "text-gray-300"
              }`}
            >
              <FaFutbol className="w-4 h-4" />
              <span className="text-sm">Esportes</span>
            </button>
          </div>
        </div>

        {/* Ícones de saldo e perfil à direita */}
        <div className="flex items-center gap-4 ml-auto">
          <div
            onClick={openWalletModal}
            className="flex items-center bg-gray-700 text-white py-2 px-3 rounded-full cursor-pointer"
          >
            <FaWallet className="text-lg mr-2" />
            <span className="font-semibold text-sm">
              R$ {balance ? balance.toFixed(2) : "0.00"}
            </span>
          </div>
          <button
            onClick={toggleProfileSubMenu}
            className="flex items-center bg-gray-700 text-white py-2 px-3 rounded-full focus:outline-none hover:bg-gray-600 transition"
          >
            <FaUserCircle className="text-xl" />
          </button>
          {isProfileOpen && (
            <div
              className="absolute top-16 right-4 w-56 bg-white rounded-lg shadow-lg z-50 border-l-4 border-green-500"
              style={{ transform: "translateY(10px)" }}
            >
              <div className="py-2">
                <button className="flex items-center w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 transition">
                  <FaUserCircle className="text-lg mr-3" />
                  Dados da Conta
                </button>
                <button
                  className="flex items-center w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 transition"
                  onClick={openWalletModal}
                >
                  <FaWallet className="text-lg mr-3" />
                  Carteira
                </button>
                <button className="flex items-center w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 transition">
                  <FaKey className="text-lg mr-3" />
                  Alterar Senha
                </button>
                <button className="flex items-center w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 transition">
                  <FaGift className="text-lg mr-3" />
                  Promoções
                </button>
              </div>
              <div className="border-t">
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full px-4 py-2 text-left text-red-600 hover:bg-gray-100 transition"
                >
                  Sair
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Modal de Carteira */}
      <WalletModal isOpen={isWalletModalOpen} onRequestClose={closeWalletModal} />

      {/* Barra Inferior (SÓ NO Mobile) */}
      <nav className="fixed bottom-0 left-0 w-full bg-gray-800 text-white z-50 flex items-center justify-around px-4 py-2 shadow-md md:hidden">
        <button
          className="flex flex-col items-center text-sm focus:outline-none"
          onClick={() => window.location.reload()}
        >
          <FiHome className="text-xl" />
          <span className="text-xs mt-1">Início</span>
        </button>
        <button
          onClick={() => setShowBonus()}
          className="flex flex-col items-center text-sm focus:outline-none"
        >
          <FaGift className="text-xl" />
          <span className="text-xs mt-1">Bônus</span>
        </button>
        <button
          onClick={() => setShowInvite()}
          className="flex flex-col items-center text-sm focus:outline-none"
        >
          <FiUserPlus className="text-xl" />
          <span className="text-xs mt-1">Convidar</span>
        </button>
        <button
          className="flex flex-col items-center text-sm focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <FiMoreHorizontal className="text-xl" />
          <span className="text-xs mt-1">Menu</span>
        </button>
      </nav>
    </>
  );
};

PostLoginNav.propTypes = {
  onLogout: PropTypes.func.isRequired,
  isMenuOpen: PropTypes.bool.isRequired,
  setIsMenuOpen: PropTypes.func.isRequired,
  setShowBonus: PropTypes.func.isRequired,    // Adicionado
  setShowInvite: PropTypes.func.isRequired,   // Adicionado
};

export default PostLoginNav;
