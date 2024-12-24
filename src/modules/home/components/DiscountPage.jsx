import React from 'react';

const DiscountPage = ({ promo, onClose }) => {
  return (
    <div className="text-white min-h-screen p-4 sm:p-6 md:p-8 lg:p-30 xl:p-30">
      {/* Banner Section */}
      <div className="w-full mb-5 relative">
        <div className="w-full h-64 sm:h-80 md:h-[350px] relative rounded-none overflow-hidden shadow-lg">
          {/* Imagem de fundo com ajuste de posição */}
          <img
            src={promo.image}
            alt="Banner Promoção"
            className="w-full h-full object-contain sm:object-cover object-top transition-all duration-300"
          />
          {/* Gradiente escuro nas laterais */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0D121B]/50 via-transparent to-[#0D121B]/50"></div>
        </div>
      </div>

      {/* Header Section */}
      <div className="max-w-full w-full flex flex-col items-center">
        <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 sm:py-3 px-8 sm:px-16 rounded-lg shadow-md text-base sm:text-lg transition-all duration-300">
          Deposite agora
        </button>
      </div>

      {/* Description Section */}
      <div className="max-w-full w-full mt-6 sm:mt-8 text-sm sm:text-base">
        <p className="text-orange-400 font-medium">{promo.details_info}</p>
      </div>

      {/* Requirements Section */}
      {promo.requisitos && (
        <div className="max-w-full w-full mt-8 sm:mt-10 bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="bg-gray-700 text-md sm:text-lg font-semibold text-center py-2 sm:py-3 text-white">
            Requisitos e bônus
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm sm:text-base">
              <thead>
                <tr className="bg-gray-700 text-gray-300">
                  <th className="px-4 py-2">Requisitos De Depósito</th>
                  <th className="px-4 py-2">Bônus</th>
                </tr>
              </thead>
              <tbody>
                {promo.requisitos.map((item, index) => (
                  <tr key={index} className="border-t border-gray-600">
                    <td className="px-4 py-2">{item.requisito}</td>
                    <td className="px-4 py-2">{item.bonus}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Rules Section */}
      {promo.regras && (
        <div className="max-w-full w-full mt-8 sm:mt-10 bg-gray-800 rounded-lg shadow-lg p-4 sm:p-6">
          <h2 className="text-white text-lg sm:text-xl font-bold text-center mb-3 sm:mb-4">Regras</h2>
          <ol className="text-xs sm:text-sm list-decimal list-inside text-gray-300 space-y-1 sm:space-y-2">
            {promo.regras.map((rule, index) => (
              <li key={index}>{rule}</li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
};

export default DiscountPage;
