import React, { useState, useEffect } from "react";
import { FaWallet, FaUserCircle, FaKey, FaGift } from "react-icons/fa";
const Logo = "/assets/logo.png";
import WalletModal from "./WalletModal";
import { getMemberBalance } from "../../services/service";

const MobileFooterMenu = () => {
  const menuItems = [
    { icon: <FaWallet />, label: "Cassino" },
    { icon: <FaGift />, label: "Cassino ao Vivo" },
    { icon: <FaKey />, label: "Crash Games" },
  ];

  return (
    <div className="fixed bottom-0 left-0 w-full bg-gray-800 text-white flex justify-around py-3 md:hidden z-50 shadow-md">
      {menuItems.map((item, index) => (
        <button
          key={index}
          className="flex flex-col items-center focus:outline-none hover:text-green-500 transition"
        >
          {item.icon}
          <span className="text-sm mt-1">{item.label}</span>
        </button>
      ))}
    </div>
  );
};

const PostLoginNav = ({ categories, selectedCategory, setSelectedCategory, onLogout }) => {
  const [balance, setBalance] = useState(0);
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
<nav className="bg-gray-900 mb-40 px-6 py-4 shadow-md fixed top-0 left-0 w-full z-50">
  <div className="flex items-center justify-between w-full">
    {/* Logo à esquerda */}
    <div className="flex-shrink-0">
      <img src={Logo} alt="Logo" className="h-8 w-auto md:h-10" />
    </div>

    {/* Menu centralizado no desktop */}
    <div className="hidden md:flex justify-center items-center flex-grow">
      <ul className="flex gap-8">
        {categories.map((category) => (
          <li
            key={category}
            className={`cursor-pointer text-white hover:text-gray-300 ${
              selectedCategory === category ? "text-green-600" : ""
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>

    {/* Ícones de saldo e perfil à direita */}
    <div className="flex items-center gap-4">
      <div
        onClick={openWalletModal}
        className="flex items-center bg-gray-800 text-white py-2 px-3 rounded-full cursor-pointer"
      >
        <FaWallet className="text-lg mr-2" />
        <span className="font-semibold text-sm">R$ {balance ? balance.toFixed(2) : "0.00"}</span>
      </div>
      <button
        onClick={toggleProfileSubMenu}
        className="flex items-center bg-gray-800 text-white py-2 px-3 rounded-full focus:outline-none hover:bg-gray-700 transition"
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
  </div>
</nav>

      <WalletModal isOpen={isWalletModalOpen} onRequestClose={closeWalletModal} />

      {/* Menu fixo no rodapé para dispositivos móveis */}
      <MobileFooterMenu />
    </>
  );
};

export default PostLoginNav;
