import PropTypes from "prop-types";
import React,{useState} from "react";
import GameProviderFilter from "./GameProviderFilter";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import FirstDeposit from "../../../../public/images/Site/1716294916711879793_h5activity50.jpg"
import SecondDeposit from "../../../../public/images/Site/1716294929449882479_h5activity15.jpg"
import ThrdDeposit from "../../../../public/images/Site/1716294940312358399_h5activity10.jpg"
import FourDeposit from "../../../../public/images/Site/1716294951553438926_h5activity6.jpg"
import Bonus15 from "../../../../public/images/Site/1709287516716366641_15.png"
import HeroBannerImage from "../../../../public/images/Site/hero-image-1.png"



/* Importa o arquivo CSS com as classes .banner-desktop e .banner-mobile */
import "./HeroBanner.css";

const HeroBanner = ({ selectedCategory }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

  const mobileHeroImages = [
    FirstDeposit,
    SecondDeposit,
    ThrdDeposit,
    FourDeposit,
  ];

  // Carrossel de Destaques (exemplo com 10 imagens)
  const highlightImages = Array.from({ length: 10 }).map((_, i) => ({
    src: Bonus15,
    alt: `Card ${i + 1}`,
  }));


  const openModal = () => {
    setIsModalOpen(true); // Abre o modal
  };

  const closeModal = () => {
    setIsModalOpen(false); // Fecha o modal
  };



  return (
    <div
      className="pb-8 px-4 md:px-20 lg:px-40"
      style={{ position: "relative", overflow: "visible" }}
    >
      {/* Se for usar um filtro de Provedores */}
      <GameProviderFilter 
  isModalOpen={isModalOpen} 
  closeModal={closeModal} 
  openModal={openModal} // Passa openModal para o filtro
/>

      {/*
        =========================================
        BANNER FIXO (>= md -> 768px)
        Substitua "hidden md:block" por "banner-desktop"
        =========================================
      */}
      <div className="banner-desktop">
        <div className="relative mt-4">
          <img
            src={HeroBannerImage}
            alt="Banner Promocional"
            className="w-full h-auto rounded-lg shadow-md"
          />
          <div className="absolute inset-0 flex flex-col items-start justify-center text-white space-y-3 px-4">
            <h2 className="text-base font-semibold text-right">
              Registre-se e deposite para receber benefícios
            </h2>
            <div className="flex flex-col items-start">
              <p className="text-7xl font-extrabold text-yellow-200">50%</p>
              <p className="text-base font-medium text-yellow-200 mb-3">
                de bônus adicional
              </p>
            </div>
            <div className="flex space-x-4">
              <button className="bg-green-500 text-white text-sm font-bold py-3 px-6 rounded-lg hover:bg-pink-600 transition-colors">
                Criar conta
              </button>
              <button className="bg-blue-500 text-white text-sm font-bold py-3 px-6 rounded-lg hover:bg-blue-600 transition-colors">
                Saber mais
              </button>
            </div>
          </div>
        </div>
      </div>

      {/*
        =========================================
        CARROSSEL HERO (MOBILE)
        Substitua "block md:hidden" por "banner-mobile"
        =========================================
      */}
      <div className="banner-mobile">
        <div className="relative mt-4">
          <Swiper
            spaceBetween={10}
            slidesPerView={1}
            loop={true}
            modules={[Autoplay]}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
          >
            {mobileHeroImages.map((image, index) => (
              <SwiperSlide key={index}>
                <div className="rounded-lg overflow-hidden shadow-md h-[180px] sm:h-[220px]">
                  <img
                    src={image}
                    alt={`Mobile Hero ${index + 1}`}
                    className="object-cover w-full h-full transition-transform duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/*
        =========================================
        CARROSSEL DE DESTAQUES (TODAS AS TELAS)
        - Ajustado para 2 slides no mobile,
          3 no tablet, 4 no desktop
        =========================================
      */}
      <div className="relative mt-8">
        <Swiper
          spaceBetween={20}
          loop={true}
          modules={[Autoplay]}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            320: {
              slidesPerView: 2,
            },
            640: {
              slidesPerView: 3,
            },
            1024: {
              slidesPerView: 4,
            },
          }}
        >
          {highlightImages.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="rounded-lg overflow-hidden shadow-md h-[140px]">
                <img
                  src={item.src}
                  alt={item.alt}
                  className="object-cover w-full h-full transition-transform duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

HeroBanner.propTypes = {
  selectedCategory: PropTypes.string.isRequired,
};

export default HeroBanner;
