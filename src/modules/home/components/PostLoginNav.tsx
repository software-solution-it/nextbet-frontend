import React, { useState, useEffect } from "react";
import { FaWallet, FaUserCircle, FaKey, FaGift } from "react-icons/fa";
const Logo = "/assets/logo.png";
import ReactModal from "react-modal";
import WalletModal from "./WalletModal";
import { getMemberBalance } from "../../services/service"; // Importando o serviço para obter o saldo do usuário

const PostLoginNav = ({ categories, selectedCategory, setSelectedCategory, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [balance, setBalance] = useState(0); // Inicializando o saldo como 0
  const [isProfileOpen, setIsProfileOpen] = useState(false);
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

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setIsOpen(false);
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
      <nav className="bg-gray-900 px-6 py-4 shadow-md fixed top-0 left-0 w-full z-50">
        <div className="flex items-center justify-between w-full">
          <div className="md:hidden flex items-center">
            <button className="text-white hover:text-gray-300" onClick={toggleMenu}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
          <div className="flex-shrink-0 flex-1 flex justify-center md:absolute">
            <img src={Logo} alt="Logo" className="h-10 w-auto" />
          </div>
          <div className="flex items-center gap-4 md:hidden">
            <div className="flex items-center bg-gray-800 text-white py-2 px-4 rounded-full">
              <FaWallet className="text-lg mr-2" />
              <span className="font-semibold">R$ {balance.toFixed(2)}</span>
            </div>
          </div>
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2">
            <ul className="flex gap-6">
              {categories.map((category) => (
                <li
                  key={category}
                  className={`cursor-pointer text-white hover:text-gray-300 ${
                    selectedCategory === category ? "text-green-600" : ""
                  }`}
                  onClick={() => handleCategoryClick(category)}
                >
                  {category}
                </li>
              ))}
            </ul>
          </div>
          <div className="hidden md:flex items-center gap-4 ml-auto">
            <div onClick={openWalletModal} className="flex items-center bg-gray-800 text-white py-2 px-4 rounded-full cursor-pointer">
              <FaWallet className="text-lg mr-2" />
              <span className="font-semibold">R$ {balance.toFixed(2)}</span>
            </div>
            <button
              onClick={toggleProfileSubMenu}
              className="flex items-center bg-gray-800 text-white py-2 px-4 rounded-full focus:outline-none hover:bg-gray-700 transition"
            >
              <FaUserCircle className="text-2xl mr-2" />
              <span className="font-semibold">Perfil</span>
            </button>
            {isProfileOpen && (
              <div className="absolute top-16 right-4 w-56 bg-white rounded-lg shadow-lg z-50 border-l-4 border-green-500" style={{ transform: "translateY(10px)" }}>
                <div className="py-2">
                  <button className="flex items-center w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 transition">
                    <FaUserCircle className="text-lg mr-3" />
                    Dados da Conta
                  </button>
                  <button className="flex items-center w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 transition" onClick={openWalletModal}>
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
                  <button onClick={handleLogout} className="flex items-center w-full px-4 py-2 text-left text-red-600 hover:bg-gray-100 transition">
                    Sair
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
      <WalletModal isOpen={isWalletModalOpen} onRequestClose={closeWalletModal} />
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-800 z-40 shadow-lg transform transition-transform duration-300 ease-in-out mt-10 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:hidden`}
      >
        <div className="mt-12 px-6">
          <button className="text-white absolute top-4 right-4" onClick={() => setIsOpen(false)}>
            &times;
          </button>
          <ul className="space-y-6">
            <li>
              <button className="text-white py-2 px-4 w-full text-left rounded hover:bg-gray-700" onClick={toggleMenu}>
                Categorias
              </button>
              <ul className="pl-4 mt-2 space-y-2 border-l-4 border-green-500">
                {categories.map((category) => (
                  <li
                    key={category}
                    className={`flex items-center w-full px-4 py-2 text-left text-gray-200 hover:bg-green-700 transition ${
                      selectedCategory === category ? "bg-green-700" : ""
                    }`}
                    onClick={() => handleCategoryClick(category)}
                  >
                    {category}
                  </li>
                ))}
              </ul>
            </li>
            <li>
              <button className="text-white py-2 px-4 w-full text-left rounded hover:bg-gray-700" onClick={toggleProfileSubMenu}>
                Minha Conta
              </button>
              {isProfileOpen && (
                <ul className="pl-4 mt-2 space-y-2 border-l-4 border-green-500">
                  <li>
                    <button className="flex items-center w-full px-4 py-2 text-left text-gray-200 hover:bg-green-700 transition">
                      <FaUserCircle className="text-lg mr-3" />
                      Dados da Conta
                    </button>
                  </li>
                  <li>
                    <button onClick={openWalletModal} className="flex items-center w-full px-4 py-2 text-left text-gray-200 hover:bg-green-700 transition">
                      <FaWallet className="text-lg mr-3" />
                      Carteira
                    </button>
                  </li>
                  <li>
                    <button className="flex items-center w-full px-4 py-2 text-left text-gray-200 hover:bg-green-700 transition">
                      <FaKey className="text-lg mr-3" />
                      Alterar Senha
                    </button>
                  </li>
                  <li>
                    <button className="flex items-center w-full px-4 py-2 text-left text-gray-200 hover:bg-green-700 transition">
                      <FaGift className="text-lg mr-3" />
                      Promoções
                    </button>
                  </li>
                </ul>
              )}
            </li>
            <li>
              <button className="text-red-600 py-2 px-4 w-full text-left rounded hover:bg-gray-700" onClick={handleLogout}>
                Sair
              </button>
            </li>
          </ul>
        </div>
      </div>
      {isOpen && <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-30 md:hidden" onClick={() => setIsOpen(false)} />}
    </>
  );
};

export default PostLoginNav;