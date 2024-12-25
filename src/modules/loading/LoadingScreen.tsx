import React from "react";

const Logo = "/assets/logo.png";

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gray-900 z-50">
      <div className="animate-pulse flex items-center justify-center">
        <img
          src={Logo}
          alt="Logo"
          className="mb-6 w-3/5 max-w-xs md:max-w-sm lg:max-w-md"
        />
      </div>
      <div className="text-center text-white px-4">
        <p className="text-sm font-semibold mb-2 animate-bounce">
          Entre em nosso grupo do Telegram
        </p>
        <a
          href="https://t.me/black_box_igaming"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 underline animate-pulse hover:text-blue-300 transition"
        >
          Clique aqui para acessar nossa rede
        </a>
      </div>
    </div>
  );
};

export default LoadingScreen;
