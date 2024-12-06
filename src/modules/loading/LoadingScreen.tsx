import React from "react";
const Logo = "/assets/logo.png";

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gray-900 z-50">
      {/* Logo com efeito de pulso */}
      <div className="animate-pulse">
        <img src={Logo} alt="Logo" style={{width:300,height:'auto'}} className=" mb-6" />
      </div>

      {/* Mensagem de texto com animação */}
      <div className="text-center text-white">
        <p className="text-lg font-semibold mb-2 animate-bounce">
          Entre em nosso grupo do telegram
        </p>
        <a
          href="https://t.me/seu_telegram_link" // Substitua pelo link correto
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 underline animate-pulse hover:text-blue-300 transition"
        >
          t.me/seu_telegram_link
        </a>
      </div>
    </div>
  );
};

export default LoadingScreen;
