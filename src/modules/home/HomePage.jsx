import { useState, useEffect } from "react"; 
import Navbar from "./components/Navbar";
import PostLoginNav from "./components/PostLoginNav";
import HeroBanner from "./components/HeroBanner";
import GameCategories from "./components/GameCategories";
import GameList from "./components/GameList";
import LoadingScreen from "../loading/LoadingScreen";
import Footer from "./components/Footer";
import { launchGame } from "../services/service";

const categories = ["Cassino", "Ao Vivo", "Esportes"];

const subcategoriesByCategory = {
  Cassino: ["Hot", "Pg Soft", "Pragmatic"],
  "Ao Vivo": ["Pg Soft", "Pragmatic"],
};

const HomePage = () => {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [selectedSubCategory, setSelectedSubCategory] = useState(
    subcategoriesByCategory[categories[0]][0]
  );
  const [gameId, setGameId] = useState(null);
  const [gameUrl, setGameUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isGameLoading, setIsGameLoading] = useState(false); 
  const [showModal, setShowModal] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  useEffect(() => {
    setSelectedSubCategory(subcategoriesByCategory[selectedCategory][0]);
  }, [selectedCategory]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const uid = sessionStorage.getItem("Uid");
    if (uid) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    const uid = sessionStorage.getItem("Uid");
    if (uid) {
      setIsLoggedIn(true);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    sessionStorage.removeItem("Uid");
  };

  const handleGameSelect = async (id) => {
    try {
      setGameId(id);
      setIsGameLoading(true); 
      setGameUrl(null);
      const response = await launchGame(id);
      if (response.status) {
        setGameUrl(response.gameUrl);
        setShowModal(true);
        setIsMinimized(false);
      } else {
        console.error("Erro ao lançar o jogo: Status falso.");
      }
    } catch (error) {
      console.error("Erro ao lançar o jogo:", error.message);
    } finally {
      setIsGameLoading(false); 
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setGameUrl(null);
    setGameId(null);
  };

  const toggleMinimize = () => {
    setIsMinimized((prev) => !prev);
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="bg-gray-800 text-white font-sans relative h-screen overflow-hidden">
      <div className="fixed top-0 left-0 right-0 z-50">
        {isLoggedIn ? (
          <PostLoginNav
            categories={categories}
            setSelectedCategory={setSelectedCategory}
            selectedCategory={selectedCategory}
            onLogout={handleLogout}
          />
        ) : (
          <Navbar
            categories={categories}
            setSelectedCategory={setSelectedCategory}
            selectedCategory={selectedCategory}
            onLogin={handleLogin}
          />
        )}
      </div>

      <div className="pt-20 h-full overflow-auto">
        <HeroBanner selectedCategory={selectedCategory} />
        <GameCategories
          selectedCategory={selectedCategory}
          selectedSubCategory={selectedSubCategory}
          setSelectedSubCategory={setSelectedSubCategory}
          subcategoriesByCategory={subcategoriesByCategory}
        />
        <GameList selectedSubCategory={selectedSubCategory} onGameSelect={handleGameSelect} />
        <Footer />
      </div>

      {(showModal || isGameLoading) && (
        <div
          className={`fixed top-0 right-0 w-full h-full bg-gray-900 z-50 transform transition-transform duration-500 ${
            showModal || isGameLoading ? "translate-x-0" : "translate-x-full"
          } flex items-center justify-center`}
        >
          <div className="relative w-full h-full overflow-hidden">
            
            {/* Container do iframe com scale */}
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

            {/* Botão Fechar */}
            <button
              onClick={closeModal}
              className="absolute top-4 left-4 text-white bg-gray-700 hover:bg-gray-600 rounded-full p-2 focus:outline-none z-50"
              title="Fechar"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>

            {/* Botão Minimizar/Maximizar */}
            <button
              onClick={toggleMinimize}
              className="absolute top-4 right-4 text-white bg-gray-700 hover:bg-gray-600 rounded-full p-2 focus:outline-none z-50"
              title={isMinimized ? "Maximizar" : "Minimizar"}
            >
              {isMinimized ? (
                // Ícone Maximizar
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
                // Ícone Minimizar
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
