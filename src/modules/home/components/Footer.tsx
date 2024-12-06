import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
const logo = "/assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-gray-700 text-white py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
          <div>
            <h3 className="font-bold mb-2">Apostas Esportivas</h3>
            <ul className="space-y-1">
              <li className="hover:text-gray-300 cursor-pointer">Apostas ao vivo</li>
              <li className="hover:text-gray-300 cursor-pointer">Pré-jogo</li>
              <li className="hover:text-gray-300 cursor-pointer">Futebol</li>
              <li className="hover:text-gray-300 cursor-pointer">Basquete</li>
              <li className="hover:text-gray-300 cursor-pointer">Tênis</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-2">iLottery</h3>
            <ul className="space-y-1">
              <li className="hover:text-gray-300 cursor-pointer">iLottery ao Vivo</li>
              <li className="hover:text-gray-300 cursor-pointer">Betsolutions</li>
              <li className="hover:text-gray-300 cursor-pointer">PGSoft</li>
              <li className="hover:text-gray-300 cursor-pointer">Popular</li>
              <li className="hover:text-gray-300 cursor-pointer">Jetx</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-2">Políticas de Jogo</h3>
            <ul className="space-y-1">
              <li className="hover:text-gray-300 cursor-pointer">Termos e Condições</li>
              <li className="hover:text-gray-300 cursor-pointer">Políticas KYC</li>
              <li className="hover:text-gray-300 cursor-pointer">Jogo Responsável</li>
              <li className="hover:text-gray-300 cursor-pointer">Proteção de Menores</li>
              <li className="hover:text-gray-300 cursor-pointer">Regras de apostas</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-2">Sobre nós</h3>
            <ul className="space-y-1">
              <li className="hover:text-gray-300 cursor-pointer">Quem Somos</li>
              <li className="hover:text-gray-300 cursor-pointer">Fale Conosco</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-2">Integridade</h3>
            <ul className="space-y-1">
              <li className="hover:text-gray-300 cursor-pointer">Código de Conduta</li>
              <li className="hover:text-gray-300 cursor-pointer">Canal de Denúncias</li>
              <li className="hover:text-gray-300 cursor-pointer">Política anti-corrupção</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-2">Privacidade</h3>
            <ul className="space-y-1">
              <li className="hover:text-gray-300 cursor-pointer">Política de Privacidade</li>
              <li className="hover:text-gray-300 cursor-pointer">Atendimento aos Titulares de Dados Pessoais</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-600 pt-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <img
                src={logo}
                alt="Logo"
                className="h-10 hover:scale-105 transform transition duration-300 cursor-pointer"
              />
            </div>
            <div className="flex space-x-4 text-2xl">
              <FaFacebookF className="hover:text-gray-300 cursor-pointer transition duration-300" />
              <FaInstagram className="hover:text-gray-300 cursor-pointer transition duration-300" />
              <FaTwitter className="hover:text-gray-300 cursor-pointer transition duration-300" />
            </div>
          </div>
          <div className="mt-4 text-center text-xs">
            Direitos autorais 2024. Todos os direitos reservados.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
