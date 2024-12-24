// src/components/Navbar.js
import React, { useState, forwardRef, useImperativeHandle } from "react";
import PropTypes from "prop-types";
import { FiMenu, FiX } from "react-icons/fi";
import { FaGamepad, FaFutbol } from "react-icons/fa";
import { FiHome, FiGift, FiUserPlus, FiMoreHorizontal } from "react-icons/fi";
import LoginModal from "./LoginModal";

const Logo = "/assets/logo.png";

const Navbar = forwardRef(
  ({ onLogin, isMenuOpen, setIsMenuOpen, setShowBonus, setShowInvite }, ref) => {
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isRegistering, setIsRegistering] = useState(false);
    const [showJogos, setShowJogos] = useState(true);

    useImperativeHandle(ref, () => ({
      openLoginModal(registering = false) {
        setIsRegistering(registering);
        setIsLoginModalOpen(true);
      },
    }));

    return (
      <>
        {/*
          =========================================================
          =   NAV SUPERIOR (mantemos o design original no desktop)  =
          =========================================================
        */}
        <nav className="fixed top-0 left-0 w-full bg-gray-800 text-white z-50 flex items-center px-4 py-3 md:px-5 shadow-md">
          
          {/*
            Botão de toggle lateral:
            - No original, sempre aparecia.
            - Agora, vamos EXIBIR só em telas médias ou maiores (>= md).
            - Em mobile, queremos ocultar (hidden).
          */}
          <button
            className="text-white mr-2 focus:outline-none hidden md:block"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
          </button>

          {/* Logo (sempre aparece) */}
          <div className="flex items-center mx-3">
            <img src={Logo} alt="Logo" className="h-8 w-auto" />
          </div>

          {/*
            Toggle entre Jogos e Sport:
            - No original, aparecia sempre.
            - Agora, vamos EXIBIR só no desktop (>= md) e ocultar no mobile (hidden).
            - Mantém a posição "mr-auto" para empurrar botões à direita no desktop.
          */}
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

          {/*
            Em telas pequenas, esse "mr-auto" deixa um espaço entre logo e botões Entrar/Criar conta,
            mas não tem problema: a "mr-auto" não entra em ação pois o toggle está hidden no mobile.
          */}

          {/* Botões Entrar / Criar conta (sempre visíveis em qualquer tela) */}
          <div className="flex items-center gap-3 ml-auto">
            <button
              className="text-white text-sm border border-transparent px-3 py-1 rounded hover:bg-gray-800 transition-colors"
              onClick={() => {
                setIsLoginModalOpen(true);
                setIsRegistering(false);
              }}
            >
              Entrar
            </button>
            <button
              className="text-sm border border-green-500 bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition-colors"
              onClick={() => {
                setIsLoginModalOpen(true);
                setIsRegistering(true);
              }}
            >
              Criar conta
            </button>
          </div>
        </nav>

        {/*
          =========================================================
          = BARRA INFERIOR (SÓ NO MOBILE) =
          =========================================================
          Usamos "md:hidden" para mostrar em telas pequenas e esconder em >= md.
        */}
        <nav className="fixed bottom-0 left-0 w-full bg-gray-800 text-white z-50 flex items-center justify-around px-4 py-2 shadow-md md:hidden">
          <button className="flex flex-col items-center text-sm focus:outline-none">
            <FiHome className="text-xl" />
            <span onClick={() => window.location.reload()} className="text-xs mt-1">Início</span>
          </button>
          <button onClick={() => setShowBonus()} className="flex flex-col items-center text-sm focus:outline-none">
            <FiGift className="text-xl" />
            <span className="text-xs mt-1">Bônus</span>
          </button>
          <button onClick={() => setShowInvite()} className="flex flex-col items-center text-sm focus:outline-none">
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

        {/* Modal de Login/Cadastro */}
        {isLoginModalOpen && (
          <div
            className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center"
            onClick={() => setIsLoginModalOpen(false)}
          >
            <LoginModal
              isOpen={isLoginModalOpen}
              onClose={() => setIsLoginModalOpen(false)}
              isRegistering={isRegistering}
              setIsRegistering={setIsRegistering}
              onLogin={onLogin}
            />
          </div>
        )}
      </>
    );
  }
);

Navbar.propTypes = {
  onLogin: PropTypes.func.isRequired,
  isMenuOpen: PropTypes.bool.isRequired,
  setShowBonus:PropTypes.func.isRequired,
  setIsMenuOpen: PropTypes.func.isRequired,
  setShowInvite: PropTypes.func.isRequired,
};

export default Navbar;
