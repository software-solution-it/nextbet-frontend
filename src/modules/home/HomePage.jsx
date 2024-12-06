import { useState, useEffect, useRef } from "react";
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
  const [isMinimized, setIsMinimized] = useState(false);

  const navbarRef = useRef(null); // Referência para o Navbar

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
    if (!isLoggedIn) {
      // Chama a função de abrir modal no Navbar
      if (navbarRef.current) {
        navbarRef.current.openLoginModal(false); // False indica "login"
      }
      return;
    }

    try {
      setGameId(id);
      setIsGameLoading(true);
      setGameUrl(null);
      const response = await launchGame(id);
      if (response.status) {
        setGameUrl(response.gameUrl);
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
            ref={navbarRef} // Passa a referência do Navbar
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
        <GameList
          selectedSubCategory={selectedSubCategory}
          onGameSelect={handleGameSelect}
        />
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;
