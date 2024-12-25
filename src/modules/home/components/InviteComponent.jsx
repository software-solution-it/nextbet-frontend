import React from "react";
import { FaCopy } from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Level1 from '../../../../public/images/Site/Level/1701155020290691320_referral-reward-1.png'
import Level2 from '../../../../public/images/Site/Level/1701155040384603896_referral-reward-2.png'
import Level3 from '../../../../public/images/Site/Level/1701155060786024978_referral-reward-3.png'




const InviteComponent = () => {
  const bonusData = [
    {
      title: "Convide 3 amigos",
      progress: "0/3",
      reward: "R$ 10,00",
      image: {Level1},
    },
    {
      title: "Convide 10 amigos",
      progress: "0/10",
      reward: "R$ 30,00",
      image: {Level2},
    },
    {
      title: "Convide 25 amigos",
      progress: "0/25",
      reward: "R$ 60,00",
      image: {Level3},
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 320,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false, // Remova os pontos em telas muito pequenas para evitar quebra
        },
      },
    ],
  };

  return (
    <div className="bg-[#0D121B] text-white font-sans p-4 sm:p-6 md:p-8 rounded-lg shadow-lg max-w-6xl mx-auto">
      {/* Botão Convidar */}
      <div className="flex flex-wrap items-center justify-between mb-6">
        <button className="bg-[#005DFF] text-white px-4 py-2 sm:px-6 sm:py-3 rounded-md font-semibold text-xs sm:text-sm w-full sm:w-auto mb-4 sm:mb-0">
          Convidar
        </button>
      </div>

      {/* Seção de Convite */}
      <div
        className="p-4 sm:p-6 rounded-lg shadow-inner mb-6"
        style={{ background: "linear-gradient(to top, rgb(48, 100, 197), rgb(48, 69, 122))" }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
          {/* Coluna Esquerda */}
          <div className="sm:col-span-4 border-r-0 sm:border-r-2 border-gray-300 px-4 sm:px-6">
            <h2 className="text-xs sm:text-sm font-bold mb-4 sm:mb-6">Convidar Um Parceiro</h2>
            <div className="mb-4">
              <label className="block text-xs sm:text-sm mb-2">URL do convite:</label>
              <div className="flex items-center">
                <input
                  type="text"
                  value="https://07vip.life?referralcode=6..."
                  readOnly
                  className="flex-grow bg-[#1B2B57] text-gray-200 px-2 py-2 sm:px-3 sm:py-3 rounded-l-md text-xs sm:text-sm"
                />
                <button className="bg-[#004AC5] px-3 sm:px-4 py-2 sm:py-3 rounded-r-md hover:bg-[#003A99]">
                  <FaCopy />
                </button>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-xs sm:text-sm mb-2">Copie o código do convite:</label>
              <div className="flex items-center">
                <input
                  type="text"
                  value="675758dd25dea738f9c386e6"
                  readOnly
                  className="flex-grow bg-[#1B2B57] text-gray-200 px-2 py-2 sm:px-3 sm:py-3 rounded-l-md text-xs sm:text-sm"
                />
                <button className="bg-[#004AC5] px-3 sm:px-4 py-2 sm:py-3 rounded-r-md hover:bg-[#003A99]">
                  <FaCopy />
                </button>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-gray-400 mt-4 sm:mt-6">Copie o link e compartilhe com seus amigos</p>
          </div>

          {/* Coluna Direita */}
          <div className="sm:col-span-8">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded text-white" style={{ backgroundColor: "rgb(71, 112, 189)" }}>
              {["Usuários Convidados", "Usuários Depositados", "Bônus Hoje", "Bônus De Ontem"].map(
                (title, index) => (
                  <div key={index} className="flex-1 text-center">
                    <p className="text-xs sm:text-sm mb-1">{title}</p>
                    <p className="text-sm sm:text-lg font-semibold">0</p>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Slider de Bônus */}
      <div className="mt-4">
        <Slider {...settings}>
          {bonusData.map((bonus, index) => (
            <div key={index} className="px-2">
              <div className="p-4 rounded-lg text-center bg-[#1B2B57]">
                <img src={bonus.image} alt={bonus.title} className="mx-auto mb-2 sm:mb-4 h-16 sm:h-24" />
                <h3 className="text-xs sm:text-sm font-bold text-white mb-1 sm:mb-2">{bonus.title}</h3>
                <p className="text-xs text-gray-300 mb-1 sm:mb-2">{bonus.progress}</p>
                <button className="mt-2 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-2 py-1 sm:px-4 sm:py-2 rounded text-xs sm:text-sm">
                  {bonus.reward}
                </button>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default InviteComponent;
