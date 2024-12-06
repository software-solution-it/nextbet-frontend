import { useState } from "react";
import PropTypes from "prop-types";
const Logo = "/assets/Logo.png";
import LoginModal from "./LoginModal";

const Navbar = ({ categories, setSelectedCategory, selectedCategory, onLogin }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setIsMenuOpen(false); // Fecha o menu ao clicar em uma categoria no mobile
  };

  return (
    <>
      {/* Navbar principal */}
      <nav className="bg-gray-900 py-4 px-6 flex items-center fixed top-0 left-0 w-full z-50">
        {/* Botão de menu sanduíche no tablet/mobile */}
        <div className="md:hidden">
          <button
            className="text-white hover:text-gray-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Logo centralizada para todas as telas */}
        <div className="flex-shrink-0 flex-1 flex justify-center md:justify-start">
          <img src={Logo} alt="Logo" className="h-10 w-auto" />
        </div>

        {/* Menu centralizado para desktop */}
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

        {/* Botões de login e registro no lado direito */}
        <div className="hidden md:flex md:flex-shrink-0 gap-4 ml-auto">
          <button
            className="bg-green-500 text-white py-2 px-10 rounded hover:bg-green-600"
            onClick={() => {
              setIsLoginModalOpen(true);
              setIsRegistering(false); // Exibe o login
            }}
          >
            Entrar
          </button>
          <button
            className="text-green-500 border border-green-500 text-black py-2 px-10 rounded bg-white hover:bg-green-500 hover:text-white"
            onClick={() => {
              setIsLoginModalOpen(true);
              setIsRegistering(true); // Exibe o registro
            }}
          >
            Registrar
          </button>
        </div>
      </nav>

      {/* Menu lateral (Drawer) para tablet/mobile */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-800 z-40 shadow-lg transition-transform duration-500 ease-in-out transform ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } md:hidden`}
      >
        <div className="mt-24 px-6">
          <button
            className="text-white absolute top-4 right-4"
            onClick={() => setIsMenuOpen(false)}
          >
            &times; {/* Ícone de fechar */}
          </button>
          <ul className="space-y-6">
            {categories.map((category) => (
              <li
                key={category}
                className={`cursor-pointer text-white py-2 px-4 rounded hover:bg-gray-700 ${
                  selectedCategory === category ? "bg-gray-700" : ""
                }`}
                onClick={() => handleCategoryClick(category)}
              >
                {category}
              </li>
            ))}
            <li>
              <button
                className="mt-4 w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
                onClick={() => {
                  setIsLoginModalOpen(true);
                  setIsRegistering(false); // Exibe o login
                }}
              >
                Entrar
              </button>
            </li>
            <li>
              <button
                className="mt-4 w-full border border-green-500 text-green-500 bg-white py-2 rounded hover:bg-green-500 hover:text-white"
                onClick={() => {
                  setIsLoginModalOpen(true);
                  setIsRegistering(true); // Exibe o registro
                }}
              >
                Registrar
              </button>
            </li>
          </ul>
        </div>
      </div>

      <div
        className={`fixed inset-0 z-50 bg-black bg-opacity-50 transition-opacity duration-300 ${
          isLoginModalOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsLoginModalOpen(false)}
      >
        <LoginModal
          isOpen={isLoginModalOpen}
          onClose={() => setIsLoginModalOpen(false)}
          isRegistering={isRegistering}
          setIsRegistering={setIsRegistering}
          onLogin={onLogin} // Passar função para o modal
        />
      </div>

      {isMenuOpen && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-30 md:hidden transition-opacity duration-300"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </>
  );
};

Navbar.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  setSelectedCategory: PropTypes.func.isRequired,
  selectedCategory: PropTypes.string,
  onLogin: PropTypes.func.isRequired,
};

export default Navbar;
