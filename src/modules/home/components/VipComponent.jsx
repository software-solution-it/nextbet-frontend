import React, { useState, useRef } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import "./VipComponent.css"

// Componentes de seta personalizados
const SamplePrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <button
            className={`${className} hidden sm:flex absolute left-[-30px] top-1/2 transform -translate-y-1/2 bg-green-700 p-2 rounded-full hover:bg-green-600 transition z-10`}
            style={{ ...style }}
            onClick={onClick}
            aria-label="Previous Slide"
        >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
        </button>
    );
}

const SampleNextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <button
            className={`${className} hidden sm:flex absolute right-[-30px] top-1/2 transform -translate-y-1/2 bg-green-700 p-2 rounded-full hover:bg-green-600 transition z-10`}
            style={{ ...style }}
            onClick={onClick}
            aria-label="Next Slide"
        >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
        </button>
    );
}

const VipComponent = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const sliderRef = useRef(null);

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: true, 
        centerPadding: '15%',
        beforeChange: (oldIndex, newIndex) => setCurrentSlide(newIndex),
        arrows: false, 
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        swipe: true, 
        responsive: [
            {
                breakpoint: 768, 
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerMode: false, 
                },
            },
        ],
    };
    

    // Mapeamento de cores para classes do Tailwind
    const colorClasses = {
        blue: {
            bg: 'bg-blue-500',
            text: 'text-blue-500',
            bg300: 'bg-blue-300',
            text600: 'text-blue-600',
        },
        red: {
            bg: 'bg-red-500',
            text: 'text-red-500',
            bg300: 'bg-red-300',
            text600: 'text-red-600',
        },
        purple: {
            bg: 'bg-purple-500',
            text: 'text-purple-500',
            bg300: 'bg-purple-300',
            text600: 'text-purple-600',
        },
        green: {
            bg: 'bg-green-500',
            text: 'text-green-500',
            bg300: 'bg-green-300',
            text600: 'text-green-600',
        },
        yellow: {
            bg: 'bg-yellow-500',
            text: 'text-yellow-500',
            bg300: 'bg-yellow-300',
            text600: 'text-yellow-600',
        },
    };

    // Dados dos slides para os cards abaixo
    const slideData = [
        {
            premios: [
                {
                    titulo: 'DIÁRIO PRESENTE',
                    img: 'https://betfiery5.com/assets/images/about-icon/new-vip/bonus-daily.png',
                    cor: 'blue',
                },
                {
                    titulo: 'POR MÊS PRESENTE',
                    img: 'https://betfiery5.com/assets/bonus-monthly-835d0d42.png',
                    cor: 'red',
                },
                {
                    titulo: 'ATUALIZAR PRESENTE',
                    img: 'https://betfiery5.com/assets/bonus-upgrade-d4b50168.png',
                    cor: 'purple',
                },
            ],
            cashback: [
                {
                    titulo: 'Jogos',
                    porcentagem: '0.20%',
                    cor: 'blue',
                    img: 'https://betfiery5.com/assets/cashback-original-dcf57903.png',
                },
                {
                    titulo: 'Slot',
                    porcentagem: '0.20%',
                    cor: 'red',
                    img: 'https://betfiery5.com/assets/cashback-slot-de0190ce.png',
                },
                {
                    titulo: 'Sports',
                    porcentagem: '0.00%',
                    cor: 'green',
                    img: 'https://betfiery5.com/assets/cashback-sports-0bb54663.png',
                },
                {
                    titulo: 'Live Casino',
                    porcentagem: '0.20%',
                    cor: 'yellow',
                    img: 'https://betfiery5.com/assets/cashback-livecasino-b328d784.png',
                },
            ],
            avaliacao: {
                icon: 'https://betfiery5.com/assets/safe-674e44e1.webp',
                descricao: 'Ainda não há avaliação',
                perguntas: [
                    {
                        pergunta: 'Por que o nível VIP é reprovado na avaliação e rebaixado?',
                        resposta: 'O sistema VIP é um sistema de fidelidade e diferentes níveis VIP têm diferentes padrões de avaliação ativa todos os meses. Durante o período de avaliação de nível, o sistema avaliará automaticamente todos os jogadores. Quando um jogador não continua a recarregar e a jogar e não consegue passar na avaliação ativa do nível VIP atual, o nível VIP do jogador será reduzido em 1 nível.',
                    },
                    {
                        pergunta: 'Como restaurar o nível anterior após ser rebaixado?',
                        resposta: 'Quando um jogador é infelizmente rebaixado, ele precisa completar as condições para atualizar para o próximo nível de acordo com os requisitos de atualização do nível VIP para atualizar seu nível.',
                    },
                ],
            },
            beneficios: {
                descricao: 'Descrição De Todos Os Benefícios',
                condicoesAtualizacao: {
                    totalDepositos: 'R$ 0,00',
                    totalApostas: 'R$ 0,00',
                },
                pacoteBonus: {
                    presenteAtualizacao: 'R$ 0,00',
                    presenteMensal: 'R$ 0,00',
                },
                condicoesNivelGarantido: {
                    totalApostas: 'R$ 0,00',
                },
                beneficiosRetirada: {
                    limiteSaque: 'R$ 0,00',
                    taxaRetirada: '0.00%',
                },
                bonusReembolso: [
                    {
                        titulo: 'Jogos',
                        porcentagem: '0.20%',
                    },
                    {
                        titulo: 'Sports',
                        porcentagem: '0.00%',
                    },
                    {
                        titulo: 'EVOPLAY',
                        porcentagem: '0.20%',
                    },
                    {
                        titulo: 'Live Casino',
                        porcentagem: '0.20%',
                    },
                ],
            },
        },
        // Adicione mais objetos aqui para mais slides
        {
            premios: [
                {
                    titulo: 'DIÁRIO PRESENTE',
                    img: 'https://betfiery5.com/assets/images/about-icon/new-vip/bonus-daily.png',
                    cor: 'blue',
                },
                {
                    titulo: 'POR MÊS PRESENTE',
                    img: 'https://betfiery5.com/assets/bonus-monthly-835d0d42.png',
                    cor: 'red',
                },
                {
                    titulo: 'ATUALIZAR PRESENTE',
                    img: 'https://betfiery5.com/assets/bonus-upgrade-d4b50168.png',
                    cor: 'purple',
                },
            ],
            cashback: [
                {
                    titulo: 'Jogos',
                    porcentagem: '0.25%',
                    cor: 'blue',
                    img: 'https://betfiery5.com/assets/cashback-original-dcf57903.png',
                },
                {
                    titulo: 'Slot',
                    porcentagem: '0.25%',
                    cor: 'red',
                    img: 'https://betfiery5.com/assets/cashback-slot-de0190ce.png',
                },
                {
                    titulo: 'Sports',
                    porcentagem: '0.05%',
                    cor: 'green',
                    img: 'https://betfiery5.com/assets/cashback-sports-0bb54663.png',
                },
                {
                    titulo: 'Live Casino',
                    porcentagem: '0.25%',
                    cor: 'yellow',
                    img: 'https://betfiery5.com/assets/cashback-livecasino-b328d784.png',
                },
            ],
            avaliacao: {
                icon: 'https://betfiery5.com/assets/safe-674e44e1.webp',
                descricao: 'Ainda não há avaliação',
                perguntas: [
                    {
                        pergunta: 'Por que o nível VIP é reprovado na avaliação e rebaixado?',
                        resposta: 'O sistema VIP é um sistema de fidelidade e diferentes níveis VIP têm diferentes padrões de avaliação ativa todos os meses. Durante o período de avaliação de nível, o sistema avaliará automaticamente todos os jogadores. Quando um jogador não continua a recarregar e a jogar e não consegue passar na avaliação ativa do nível VIP atual, o nível VIP do jogador será reduzido em 1 nível.',
                    },
                    {
                        pergunta: 'Como restaurar o nível anterior após ser rebaixado?',
                        resposta: 'Quando um jogador é infelizmente rebaixado, ele precisa completar as condições para atualizar para o próximo nível de acordo com os requisitos de atualização do nível VIP para atualizar seu nível.',
                    },
                ],
            },
            beneficios: {
                descricao: 'Descrição De Todos Os Benefícios',
                condicoesAtualizacao: {
                    totalDepositos: 'R$ 0,00',
                    totalApostas: 'R$ 0,00',
                },
                pacoteBonus: {
                    presenteAtualizacao: 'R$ 0,00',
                    presenteMensal: 'R$ 0,00',
                },
                condicoesNivelGarantido: {
                    totalApostas: 'R$ 0,00',
                },
                beneficiosRetirada: {
                    limiteSaque: 'R$ 0,00',
                    taxaRetirada: '0.00%',
                },
                bonusReembolso: [
                    {
                        titulo: 'Jogos',
                        porcentagem: '0.25%',
                    },
                    {
                        titulo: 'Sports',
                        porcentagem: '0.05%',
                    },
                    {
                        titulo: 'EVOPLAY',
                        porcentagem: '0.25%',
                    },
                    {
                        titulo: 'Live Casino',
                        porcentagem: '0.25%',
                    },
                ],
            },
        },
        // Você pode adicionar mais slides conforme necessário
    ];

    // Função para renderizar o conteúdo do Card VIP 0
    const renderVipCard = () => {
        const slide = slideData[currentSlide];
        return (
            <div className="bg-gray-900 text-white sm:p-4 md:p-6 rounded-lg shadow-inner w-full relative">
                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                    <span className="absolute top-0 left-0 bg-pink-600 text-[9px] font-bold text-white py-1 px-3 rounded-tl-full rounded-br-full uppercase">
                        My VIP
                    </span>

                    <img
                        src="https://betfiery5.com/assets/vip-0-baf66274.png"
                        alt="VIP 0 Icon"
                        className="w-16 h-16 absolute right-5 top-5"
                    />
                </div>

                {/* VIP Information */}
                <div className="flex flex-col sm:flex-row justify-between items-start mb-4">
                    <div>
                        <h2 className="text-2xl font-bold">VIP {currentSlide}</h2>
                        <p className="text-xs mb-2">
                            A atualização para <span className="text-yellow-400">VIP {currentSlide}</span> requer:
                        </p>
                        <p className="text-xs font-bold">
                            Depósito (R$ {currentSlide * 10},00 / <span className="text-yellow-400">R$ {20 + currentSlide * 10},00</span>)
                        </p>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="relative mt-2">
                    <div className="w-full bg-gray-800 rounded-full h-2 mb-1">
                        <div className="bg-yellow-500 h-2 rounded-full" style={{ width: `${currentSlide * 20}%` }}></div>
                    </div>
                    <p className="text-xs text-right">{currentSlide * 20}%</p>
                </div>
            </div>
        );
    };

    return (
<div className="text-white rounded-lg shadow-lg max-w-7xl w-full mx-auto relative p-4 sm:p-6">

            {/* VIP 0 Card */}
            <div className="relative rounded-lg bg-gray-900 p-2">
                {renderVipCard()}
            </div>

            {/* Slider Principal - Envolve todas as seções que devem deslizar */}
            <div className="w-full relative rounded-lg mt-6">
                <Slider ref={sliderRef} {...settings}>
                    {slideData.map((slide, index) => (
                        <div key={index} >
                            {/* Prêmios Disponíveis Para VIP */}
                            <div className="bg-gray-900 text-white p-4 rounded-lg shadow-inner w-full">
                                <h3 className="text-xl sm:text-2xl font-bold mb-2">Prêmios Disponíveis Para VIP</h3>
                                <p className="text-xs sm:text-sm mb-4 text-gray-600">
                                    As recompensas VIP são calculadas das 00:00 às 10:00 do dia 1º de cada mês. Se não conseguir resgatar, tente novamente após às 10:00.
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {/* Diário Presente */}
                                    <div className={`${colorClasses[slide.premios[0].cor].bg} text-white rounded-lg flex flex-col items-center relative p-4 sm:p-6`}>
                                        <h4 className="opacity-60 text-lg sm:text-xl font-bold mb-2 text-center">
                                            {slide.premios[0].titulo}
                                        </h4>
                                        <img
                                            src={slide.premios[0].img}
                                            alt={slide.premios[0].titulo}
                                            className="w-36 mb-4"
                                        />
                                        <button className={`bg-white ${colorClasses[slide.premios[0].cor].text} font-bold py-1 px-4 rounded-lg mt-auto`}>
                                            Atualizar
                                        </button>
                                    </div>

                                    {/* Por Mês Presente */}
                                    <div className={`${colorClasses[slide.premios[1].cor].bg} text-white rounded-lg flex flex-col items-center relative p-4 sm:p-6`}>
                                        <h4 className="opacity-60 text-lg sm:text-xl font-bold mb-2 text-center">
                                            {slide.premios[1].titulo}
                                        </h4>
                                        <img
                                            src={slide.premios[1].img}
                                            alt={slide.premios[1].titulo}
                                            className="w-36 mb-4"
                                        />
                                        <button className={`bg-white ${colorClasses[slide.premios[1].cor].text} font-bold py-1 px-4 rounded-lg mt-auto`}>
                                            Atualizar
                                        </button>
                                    </div>

                                    {/* Atualizar Presente */}
                                    <div className={`${colorClasses[slide.premios[2].cor].bg} text-white rounded-lg flex flex-col items-center relative p-4 sm:p-6`}>
                                        <h4 className="opacity-60 text-lg sm:text-xl font-bold mb-2 text-center">
                                            {slide.premios[2].titulo}
                                        </h4>
                                        <img
                                            src={slide.premios[2].img}
                                            alt={slide.premios[2].titulo}
                                            className="w-36 mb-4"
                                        />
                                        <button className={`bg-white ${colorClasses[slide.premios[2].cor].text} font-bold py-1 px-4 rounded-lg mt-auto`}>
                                            Atualizar
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Avaliação */}
                            <div className="mt-6 w-full bg-gray-900 p-4 rounded-lg">
                                <div className="bg-gray-900 text-white p-4 rounded-lg shadow-inner w-full">
                                    <h3 className="text-xl sm:text-2xl font-bold mb-4">Avaliação</h3>
                                    <div className="flex flex-col sm:flex-row items-center mb-6">
                                        <div className="w-20 h-20 sm:w-24 sm:h-24 border-2 border-green-500 rounded-full flex items-center justify-center relative">
                                            <img
                                                src={slide.avaliacao.icon}
                                                alt="Avaliação Icon"
                                                className="w-12 h-12 sm:w-16 sm:h-16"
                                            />
                                        </div>
                                        <p className="text-center sm:text-left text-xs sm:text-sm mt-2 sm:mt-0 sm:ml-4 text-gray-300">
                                            {slide.avaliacao.descricao}
                                        </p>
                                    </div>
                                    {slide.avaliacao.perguntas.map((item, idx) => (
                                        <div key={idx} className="mb-4">
                                            <p className="text-xs sm:text-sm text-gray-600 font-semibold">
                                                {idx + 1}. {item.pergunta}
                                            </p>
                                            <p className="text-xs sm:text-sm text-gray-600">
                                                {item.resposta}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Cashback Card */}
                            <div className="mt-6 w-full bg-gray-900 rounded-lg p-4 sm:p-6">
                                <div className="bg-gray-900 text-white p-6 rounded-lg shadow-inner">
                                    <h3 className="text-xl sm:text-2xl font-bold text-blue-400 mb-4">VIP {index} Cashback</h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                        {/* Primeiro item */}
                                        <div
                                            className={`${colorClasses[slide.cashback[0].cor].bg300} ${colorClasses[slide.cashback[0].cor].text600} p-4 rounded-lg flex flex-col justify-between bg-no-repeat bg-right-bottom`}
                                            style={{
                                                backgroundImage: `url(${slide.cashback[0].img})`,
                                                backgroundSize: '50%',
                                            }}
                                        >
                                            <div>
                                                <h4 className="text-lg sm:text-xl font-bold">{slide.cashback[0].titulo}</h4>
                                                <p className="text-xl sm:text-2xl">{slide.cashback[0].porcentagem}</p>
                                                <p className="text-sm">Porcentagem</p>
                                            </div>
                                        </div>

                                        {/* Segundo item */}
                                        <div
                                            className={`${colorClasses[slide.cashback[1].cor].bg300} ${colorClasses[slide.cashback[1].cor].text600} p-4 rounded-lg flex flex-col justify-between bg-no-repeat bg-right-bottom`}
                                            style={{
                                                backgroundImage: `url(${slide.cashback[1].img})`,
                                                backgroundSize: '50%',
                                            }}
                                        >
                                            <div>
                                                <h4 className="text-lg sm:text-xl font-bold">{slide.cashback[1].titulo}</h4>
                                                <p className="text-xl sm:text-2xl">{slide.cashback[1].porcentagem}</p>
                                                <p className="text-sm">Porcentagem</p>
                                            </div>
                                        </div>

                                        {/* Terceiro item */}
                                        <div
                                            className={`${colorClasses[slide.cashback[2].cor].bg300} ${colorClasses[slide.cashback[2].cor].text600} p-4 rounded-lg flex flex-col justify-between bg-no-repeat bg-right-bottom`}
                                            style={{
                                                backgroundImage: `url(${slide.cashback[2].img})`,
                                                backgroundSize: '50%',
                                            }}
                                        >
                                            <div>
                                                <h4 className="text-lg sm:text-xl font-bold">{slide.cashback[2].titulo}</h4>
                                                <p className="text-xl sm:text-2xl">{slide.cashback[2].porcentagem}</p>
                                                <p className="text-sm">Porcentagem</p>
                                            </div>
                                        </div>

                                        {/* Quarto item */}
                                        <div
                                            className={`${colorClasses[slide.cashback[3].cor].bg300} ${colorClasses[slide.cashback[3].cor].text600} p-4 rounded-lg flex flex-col justify-between bg-no-repeat bg-right-bottom`}
                                            style={{
                                                backgroundImage: `url(${slide.cashback[3].img})`,
                                                backgroundSize: '50%',
                                            }}
                                        >
                                            <div>
                                                <h4 className="text-lg sm:text-xl font-bold">{slide.cashback[3].titulo}</h4>
                                                <p className="text-xl sm:text-2xl">{slide.cashback[3].porcentagem}</p>
                                                <p className="text-sm">Porcentagem</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Bônus Section */}
                                    <div className="mt-6 p-4 rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
                                        {/* Bônus A Ser Reivindicado */}
                                        <div>
                                            <p className="text-gray-400 text-sm mb-1">Bônus A Ser Reivindicado</p>
                                            <p className="text-yellow-400 text-2xl font-bold">R$ 0,00</p>
                                        </div>

                                        {/* O Bônus De Hoje */}
                                        <div>
                                            <p className="text-gray-400 text-sm mb-1">O Bônus De Hoje</p>
                                            <p className="text-yellow-400 text-2xl font-bold">R$ 0,00</p>
                                        </div>

                                        {/* Botão Reembolso */}
                                        <button className="bg-blue-500 text-white px-6 py-3 rounded-lg font-bold">
                                            Receber o Reembolso
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Descrição de Todos os Benefícios */}
                            <div className="mt-6 bg-gray-900 p-4 rounded-lg mb-4">
                                <div className="bg-gray-900 text-white p-4 rounded-lg shadow-inner w-full">
                                    <h3 className="text-lg sm:text-xl font-bold text-blue-400 mb-4">{slide.beneficios.descricao}</h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        {/* Condições de Atualização */}
                                        <div>
                                            <h4 className="text-md sm:text-lg font-bold text-gray-300 mb-2">Condições De Atualização</h4>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                {/* Total De Depósitos */}
                                                <div>
                                                    <p className="text-gray-400 text-sm mb-1">Total De Depósitos</p>
                                                    <p className="text-yellow-400 text-base sm:text-lg font-bold">{slide.beneficios.condicoesAtualizacao.totalDepositos}</p>
                                                </div>
                                                {/* Total De Apostas */}
                                                <div>
                                                    <p className="text-gray-400 text-sm mb-1">Total De Apostas</p>
                                                    <p className="text-yellow-400 text-base sm:text-lg font-bold">{slide.beneficios.condicoesAtualizacao.totalApostas}</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Pacote De Bônus Nível VIP */}
                                        <div>
                                            <h4 className="text-md sm:text-lg font-bold text-gray-300 mb-2">Pacote De Bônus Nível VIP</h4>
                                            <p className="text-gray-400 text-sm mb-1">Presente De Atualização VIP</p>
                                            <p className="text-yellow-400 text-base sm:text-lg font-bold">{slide.beneficios.pacoteBonus.presenteAtualizacao}</p>
                                            <p className="text-gray-400 text-sm mb-1 mt-4">Presente Mensal VIP</p>
                                            <p className="text-yellow-400 text-base sm:text-lg font-bold">{slide.beneficios.pacoteBonus.presenteMensal}</p>
                                        </div>

                                        {/* Condições de Nível Garantido */}
                                        <div>
                                            <h4 className="text-md sm:text-lg font-bold text-gray-300 mb-2">Condições de Nível Garantido</h4>
                                            <p className="text-gray-400 text-sm mb-1">Total De Apostas</p>
                                            <p className="text-yellow-400 text-base sm:text-lg font-bold">{slide.beneficios.condicoesNivelGarantido.totalApostas}</p>
                                        </div>

                                        {/* Meu Benefícios De Retirada */}
                                        <div>
                                            <h4 className="text-md sm:text-lg font-bold text-gray-300 mb-2">Meu Benefícios De Retirada</h4>
                                            <p className="text-gray-400 text-sm mb-1">Limite De Saque Grátis</p>
                                            <p className="text-yellow-400 text-base sm:text-lg font-bold">{slide.beneficios.beneficiosRetirada.limiteSaque}</p>
                                            <p className="text-gray-400 text-sm mb-1 mt-4">Taxa De Retirada</p>
                                            <p className="text-yellow-400 text-base sm:text-lg font-bold">{slide.beneficios.beneficiosRetirada.taxaRetirada}</p>
                                        </div>

                                        {/* Bônus De Reembolso VIP */}
                                        <div className="col-span-1 sm:col-span-2">
                                            <h4 className="text-md sm:text-lg font-bold text-gray-300 mb-2">Bônus De Reembolso VIP</h4>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                {slide.beneficios.bonusReembolso.map((item, idx) => (
                                                    <div key={idx} className="flex justify-between">
                                                        <p className="text-gray-400 text-sm">{item.titulo}</p>
                                                        <p className="text-yellow-400 text-base sm:text-lg font-bold">{item.porcentagem}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
};

export default VipComponent;
