import React, { useState, useEffect, useRef, useCallback } from "react";
import Navbar from "./components/Navbar";
import PostLoginNav from "./components/PostLoginNav";
import SideMenu from "./components/SideMenu";
import HeroBanner from "./components/HeroBanner";
import GameCategories from "./components/GameCategories";
import GameList from "./components/GameList";
import LoadingScreen from "../loading/LoadingScreen";
import Footer from "./components/Footer";
import { launchGame } from "../services/service";
import FullProviderGames from "./components/FullProviderGames";
import Bonus from "./components/Bonus";
import VipComponent from "./components/VipComponent";
import RewardModal from "./components/RewardModal";
import InviteComponent from "./components/InviteComponent";
import Roulete from "./components/Rolete";
import PromotionPage from "./components/PromotionPage";
import DiscountPage from "./components/DiscountPage";
import BonusLoginModal from "./components/BonusLoginModal";
import LoginModal from "./components/LoginModal";

const categories = ["Cassino", "Ao Vivo", "Esportes"];
const subcategories = ["HOT", "Novos Jogos", "Recompensas", "Live Cassino"];

const HomePage = () => {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [selectedSubCategory, setSelectedSubCategory] = useState(subcategories[0]);
  const [gameId, setGameId] = useState(null);
  const [gameUrl, setGameUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showRewardModal, setShowRewardModal] = useState(false);
  const [showBonusModal, setShowBonusModal] = useState(false);
  const [isGameLoading, setIsGameLoading] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showFullList, setShowFullList] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [isMinimized, setIsMinimized] = useState(false);
  const [showPromotion, setShowPromotions] = useState(false);
  const [showBonus, setShowBonus] = useState(false);
  const [showRoulete, setShowRoulete] = useState(false);
  const [showVip, setShowVip] = useState(false);
  const [showInvite, setShowInvite] = useState(false);
  const [selectedPromotion, setSelectedPromotion] = useState(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false); // Estado para o modal de login
  
  
  const promotions = [
    {
      id: 1,
      details: "Primeiro depósito + 50% bônus",
      details_info:
        "A fim de agradecer a sua confiança e apoio no BetFiery, seu primeiro valor de depósito bem-sucedido de mais de R$100, o NextBet lhe dará um bônus grátis de 50% do valor do depósito, sinceramente, desejo você ganhar mais! Uma vez feito seu depósito, o bônus será automaticamente creditado em sua conta. Verifique no sistema as mensagens enviadas a você.",
      date: "Começou às 2024-04-15",
      status: "Em curso",
      image: "https://static.betfiery5.com/1716294916711879793_h5activity50.jpg",
      badge: "HOT",
      requisitos: [
        { requisito: "50 ≤ Quantia < 100", bonus: "10% De Bônus" },
        { requisito: "100 ≤ Quantia ≤ 20000", bonus: "50% De Bônus" },
      ],
      regras: [
        "Só o primeiro pedido com um valor de depósito de R$50 ou superior pode participar neste evento, e este evento só pode participar uma vez.",
        "O bônus máximo para esta campanha é 800BRL. Não é possível participar ao mesmo tempo em outras promoções.",
        "Condições de retirada: o valor da aposta efetiva é igual ou superior a 20 vezes ou mais da soma do valor do depósito e do valor do bônus. Apostas de cassino ao vivo não contam para as condições de retirada.",
        "Depois de concluir o depósito, enviar a inscrição no centro pessoal da promoção, você vai receber bônus da sorte do NextBet e os bônus poderão ser jogados e retirados!",
        "Certifique-se de que o seu nome, detalhes de contato e CPF são exatos e únicos. Se o mesmo jogador utilizar diferentes IPs de rede para registrar múltiplas contas para reclamar o prêmio, isto será considerado batota e sua conta será permanentemente congelada.",
      ],
    },
    {
      id: 2,
      details: "Depósito APP + 15% bônus",
      details_info:
        "Ofereça aos usuários do aplicativo descontos de recarga super altos para ajudá-lo a iniciar sua jornada para a riqueza com o Betfiery!",
      date: "Começou às 2024-04-15",
      status: "Em curso",
      image: "https://static.betfiery5.com/1716294929449882479_h5activity15.jpg",
      badge: "exclusive",
      requisitos: [
        { requisito: "50 ≤ Quantia ＜ 100", bonus: "4% De Bônus" },
        { requisito: "100 ≤ Quantia ≤ 20000", bonus: "15% De Bônus" },
      ],
      regras: [
        "Somente pedidos com valor de depósito igual ou superior a R$ 50 poderão participar deste evento, e este evento só poderá ser participado uma vez por dia.",
        "O prêmio máximo para este evento é de R$ 800. Somente usuários do aplicativo podem participar e não podem participar de outras promoções ao mesmo tempo.",
        "Condições de retirada: o valor da aposta efetiva é igual ou superior a 10 vezes ou mais da soma do valor do depósito e do valor do bonus.",
        "Depois de concluir o depósito, enviar a inscrição no centro pessoal da promoção, você vai receber bônus da sorte do NextBet e os bônus poderão ser jogados e retirado！",
        "Certifique-se de que o seu nome, detalhes de contacto e CPF são exactos e únicos. Se o mesmo jogador utilizar diferentes IPs de rede para registar múltiplas contas para reclamar o prémio, isto será considerado batota e a sua conta será permanentemente congelada.",
      ],
    },
    {
      id: 3,
      details: "Depósito diário + 10% bônus",
      details_info:
        "NextBet vai valorizar e esperar todos os dias com você! A partir de agora, você tem 3 chances de obter mais bônus todos os dias.Contanto que o valor do depósito seja maior ou igual a R$200, você vai receber um adicional de 10% do valor do depósito grátis NextBet gratuitamente como bonus! Sinceramente, desejo voce ganhar mais!",
      requisitos: [
        { requisito: "50 ≤ Quantia < 100", bonus: "5% De Bônus" },
        { requisito: "100 ≤ Quantia ≤ 20000", bonus: "10% De Bônus" },
      ],
      regras: [
        "Apenas os primeiros 3 pedidos com um depósito maior ou igual a R$200 podem participar do evento",
        "Condições de retirada: o valor da aposta efetiva é igual ou superior a 10 vezes ou mais da soma do valor do depósito e do valor do bonus. Apostas de cassino ao vivo não conta para as condições de retirada",
        "Certifique-se de que o seu nome, detalhes de contacto e CPF são exactos e únicos. Se o mesmo jogador utilizar diferentes IPs de rede para registar múltiplas contas para reclamar o prémio, isto será considerado batota e a sua conta será permanentemente congelada.",
      ],
      date: "Começou às 2024-04-15",
      status: "Em curso",
      image: "https://static.betfiery5.com/1716294940312358399_h5activity10.jpg",
    },
    {
      id: 4,
      details: "Primeiro depósito +6 bônus",
      details_info:
        "NextBet lhe dará um bônus gratuito de 6 Após completar seu depósito, o bônus será automaticamente creditado no saldo de sua conta e uma mensagem [Bonus Arrival] será enviada a você.",
      requisitos: [{ requisito: "50 ≤ Quantia < 20000", bonus: "R$ 6" }],
      regras: [
        "Este evento é limitado a uma participação. ",
        "NextBet lhe dará um bônus gratuito de 6 Após completar seu depósito, o bônus será automaticamente creditado no saldo de sua conta e uma mensagem [Bonus Arrival] será enviada a você.",
        "Após completar o depósito, envie o registro no centro de promoção pessoal, e você receberá o bônus lucky Betfiery, que pode ser jogado e retirado. ",
        "Certifique-se de que seu nome, informações de contato e CPF sejam precisos e exclusivos. Se o mesmo jogador usar diferentes IPs de rede para registrar várias contas e receber prêmios, isso será considerado trapaça e suas contas serão permanentemente congeladas. Não é possível participar ao mesmo tempo em outras promoções.",
      ],
      date: "Começou às 2024-04-15",
      status: "Em curso",
      image: "https://static.betfiery5.com/1716294951553438926_h5activity6.jpg",
    },
  ];

  const navbarRef = useRef(null);
  const [timeLeft, setTimeLeft] = useState(1800);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const uid = sessionStorage.getItem("Uid");
    if (uid) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleOpenInvite = () => {
    if (!isLoggedIn) {
      openLoginModal();
      return;
    }

    setShowInvite(true);
    setShowFullList(false);
    setShowPromotions(false);
    setShowVip(false);
    setShowBonus(false);
  };

  const handleOpenRoulete = () => {
    if (!isLoggedIn) {
      openLoginModal();
      return;
    }

    setShowRoulete(true);
  };

  const handleCloseRoulete = () => {
    setShowRoulete(false);
  };

  const openLoginModal = () => {
    setIsLoginModalOpen(true); // Abre o modal de login
    setIsMenuOpen(false)
  };
  
  const closeLoginModal = () => {
    setIsLoginModalOpen(false); // Fecha o modal de login
  };
  const handleLogin = () => {
    const uid = sessionStorage.getItem("Uid");
    if (uid) {
      setIsLoggedIn(true);
    }
  };

  const closeDiscountPage = () => {
    setSelectedPromotion(null);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    sessionStorage.removeItem("Uid");
  };

  const handleGameSelect = useCallback(async (id) => {
    if (!isLoggedIn) {
      openLoginModal();
      return;
    }
    try {
      setIsGameLoading(true);
      setGameId(id);
      setShowModal(true);
      setGameUrl(null);
      const response = await launchGame(id);
      if (response.status) {
        setGameUrl(response.gameUrl);
      }
    } catch (error) {
      console.error("Erro ao lançar o jogo:", error);
    } finally {
      setIsGameLoading(false);
    }
  }, [isLoggedIn]);
  
  

  const toggleMinimize = () => {
    setIsMinimized((prev) => !prev);
  };

  const closeGameModal = () => {
    setShowModal(false);
    setGameUrl(null);
    setGameId(null);
  };

  const openBonusModal = () => {
    if (!isLoggedIn) {
      openLoginModal();
      return;
    }

    setShowBonusModal(true);
  };

  const closeBonusModal = () => {
    setShowBonusModal(false);
  };

  const openRewardModal = () => {
    if (!isLoggedIn) {
      openLoginModal();
      return;
    }

    setShowRewardModal(true);
  };

  const closeRewardModal = () => {
    setShowRewardModal(false);
  };

  const handleViewAll = useCallback((providerName) => {
    if (!isLoggedIn) {
      openLoginModal();
      return;
    }
    setSelectedProvider(providerName);
    setShowFullList(true);
    setShowPromotions(false);
    setShowInvite(false);
    setShowVip(false);
    setShowBonus(false);
  }, [isLoggedIn]);
  

  const handleBack = () => {
    setShowFullList(false);
    setSelectedProvider(null);
  };

  const handleBonusClick = () => {
    if (!isLoggedIn) {
      openLoginModal();
      return;
    }

    setShowBonus(true);
    setShowInvite(false);
    setShowVip(false);
    setShowPromotions(false);
    setShowFullList(false);
  };

  const handleVipClick = () => {
    if (!isLoggedIn) {
      openLoginModal();
      return;
    }

    setShowVip(true);
    setShowInvite(false);
    setShowBonus(false);
    setShowPromotions(false);
    setShowFullList(false);
  };

  const handlePromotionClick = (promotionId) => {
    if (!isLoggedIn) {
      openLoginModal();
      return;
    }

    const foundPromo = promotions.find((promo) => promo.id === promotionId);
    setSelectedPromotion(foundPromo);
    setShowPromotions(true);
    setShowInvite(false);
    setShowBonus(false);
    setShowInvite(false);
    setShowVip(false);
    setShowFullList(false);
  };

  const handleOpenVip = () => {
    if (!isLoggedIn) {
      openLoginModal();
      return;
    }


    setShowVip(true);
    setShowInvite(false);
    setShowBonus(false);
    setShowPromotions(false);
    setShowFullList(false);
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    const mm = m < 10 ? `0${m}` : m;
    const ss = s < 10 ? `0${s}` : s;
    return `${mm}:${ss}`;
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className={`bg-[#0D121B] text-white font-sans relative h-screen overflow-auto ${isMenuOpen ? "md:ml-60" : "ml-0"} transition-all duration-300`}>
      <SideMenu
        isMenuOpen={isMenuOpen}
        isLoggedIn={isLoggedIn}
        closeMenu={() => setIsMenuOpen(false)}
        balance={isLoggedIn ? 1000.0 : 0}
        onLogout={handleLogout}
        setShowVip={handleVipClick}
        setShowBonus={handleBonusClick}
        setShowPromotions={handlePromotionClick}
        onPromotionClick={handlePromotionClick}
        onOpenRoulete={handleOpenRoulete}
        openLoginModal={openLoginModal}
      />
      <div className="fixed top-0 left-0 right-0 z-50">
      {isLoggedIn ? (
        <PostLoginNav
          setSelectedCategory={setSelectedCategory}
          selectedCategory={selectedCategory}
          onLogout={handleLogout}
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
          setShowBonus={handleBonusClick}    // Adicionado
          setShowInvite={handleOpenInvite}   // Adicionado
        />
      ) : (
        <Navbar
          ref={navbarRef}
          setShowBonus={handleBonusClick}
          setShowInvite={handleOpenInvite}
          setSelectedCategory={setSelectedCategory}
          selectedCategory={selectedCategory}
          onLogin={handleLogin}
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
        />
      )}
      </div>
      <div
  className={`pt-20 transition-all duration-300 ${
    isMenuOpen ? "blur-sm md:blur-none" : ""
  }`}
>
        <div className="w-full px-4 max-w-none sm:max-w-[640px] md:max-w-[1024px] lg:max-w-[1380px] mx-auto">
          {!showFullList && !showBonus && !showVip && !showInvite && !showPromotion && (
            <>
              <HeroBanner selectedCategory={selectedCategory} />
              <GameCategories
                selectedSubCategory={selectedSubCategory}
                setSelectedSubCategory={setSelectedSubCategory}
                subcategories={subcategories}
              />
              <GameList
                selectedSubCategory={selectedSubCategory}
                onGameSelect={handleGameSelect}
                onViewAll={handleViewAll}
              />
            </>
          )}

{isLoginModalOpen && (
  <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
    <LoginModal
      isOpen={isLoginModalOpen}
      onClose={closeLoginModal}
      onLogin={handleLogin} // Função para lidar com o login bem-sucedido
    />
  </div>
)}

          {showInvite && <InviteComponent />}
          {showFullList && <FullProviderGames onGameSelect={handleGameSelect} />}
          {showBonus && !showFullList && (
            <Bonus onOpenVip={handleOpenVip} onOpenInvite={handleOpenInvite} onOpenRoulete={handleOpenRoulete} />
          )}
          {showVip && !showFullList && <VipComponent />}
          {showRoulete && !showFullList && <Roulete onClose={handleCloseRoulete} />}
          {showPromotion && !showFullList && (
            !selectedPromotion ? (
              <PromotionPage onPromotionClick={handlePromotionClick} />
            ) : (
              <DiscountPage promo={selectedPromotion} onClose={closeDiscountPage} />
            )
          )}
        </div>
        <Footer />
      </div>
      <div style={{zIndex:999}} className="fixed bottom-20  right-4 flex flex-col space-y-4 items-center">
        <div
          className="flex flex-col items-center transition-transform duration-200 ease-in-out hover:scale-105 hover:cursor-pointer"
          onClick={openRewardModal}
        >
          <img
            src="https://static.betfiery5.com/1715256813754816861_12345678.webp"
            alt="Imagem 1"
            className="rounded-lg w-16 h-16 object-cover"
          />
          <span className="text-white text-sm bg-red-700 px-2 py-1 rounded-lg transition-transform duration-200 ease-in-out hover:scale-105 hover:cursor-pointer">
            {formatTime(timeLeft)}
          </span>
        </div>
        <div
          className="flex flex-col items-center transition-transform duration-200 ease-in-out hover:scale-105 hover:cursor-pointer"
          onClick={openBonusModal}
        >
        <img
          src="https://static.betfiery5.com/1698048604148113906_20230915-205926.png"
          alt="Imagem 2"
          className="rounded-lg w-16 h-16 object-cover transition-transform duration-200 ease-in-out hover:scale-105 hover:cursor-pointer"
        />
        </div>
        {/* 
        <img
          src="https://static.betfiery5.com/1698048629837497883_1695196341298196866_688.png"
          alt="Imagem 3"
          className="rounded-lg w-20 h-20 object-cover transition-transform duration-200 ease-in-out hover:scale-105 hover:cursor-pointer"
        />
        */}
      </div>
      {showRewardModal && (
        <RewardModal
          onClose={closeRewardModal}
          timeLeft={timeLeft}
          formatTime={formatTime}
        />
      )}

      {showBonusModal && (
        <BonusLoginModal
          onClose={closeBonusModal}
          timeLeft={timeLeft}
          formatTime={formatTime}
        />
      )}
      {(showModal || isGameLoading) && (
        <div
          className={`fixed top-0 right-0 w-full h-full bg-gray-900 z-50 transform transition-transform duration-500 ${
            showModal || isGameLoading ? "translate-x-0" : "translate-x-full"
          } flex items-center justify-center`}
        >
          <div className="relative w-full h-full overflow-hidden">
            <div
              className={`transition-transform duration-300 w-full h-full flex items-center justify-center relative z-0 ${
                isMinimized ? "scale-75" : "scale-100"
              }`}
            >
              {isGameLoading && !gameUrl ? (
                <div className="flex items-center justify-center w-full h-full">
                  <div className="w-16 h-16 border-4 border-green-500 border-solid border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : (
                gameUrl && (
                  <iframe
                    src={gameUrl}
                    className="w-full h-full relative z-0"
                    title="Game Iframe"
                  />
                )
              )}
            </div>
            <button
              onClick={closeGameModal}
              className="absolute top-4 left-4 text-white bg-gray-700 hover:bg-gray-600 rounded-full p-2 focus:outline-none z-50"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <button
              onClick={toggleMinimize}
              className="absolute top-4 right-4 text-white bg-gray-700 hover:bg-gray-600 rounded-full p-2 focus:outline-none z-50"
            >
              {isMinimized ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 4h16v16H4z" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H4V8h4m12 8h-4V8h4M8 8h8m-8 8h8" />
                </svg>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
