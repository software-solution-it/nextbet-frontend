import axios from 'axios';

const API_BASE_URL = 'https://api.nextbet.games';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    if (
      config.url.includes('/member/login') ||
      config.url.includes('/member/reg')
    ) {
      return config;
    }


    const uid = sessionStorage.getItem('Uid');
    
    if (uid) {
      const [key, value] = uid.split(':');
      
      if (key && value) {
        config.headers['t'] = JSON.stringify({ [key]: value });
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Evento: Informações de progresso do bônus de bloqueio de carteira
export const getMemberEventWalletLockBonusProgressInfo = async () => {
  return await api.get('/event/member/wallet/lock/bonus/progress/info');
};

export const launchGame = async (gameId) => {
  try {
    const response = await api.post('/games/launch', {
      gameId: gameId, 
    });
    return response.data; 
  } catch (error) {
    console.error('Erro ao lançar o jogo:', error.response?.data || error.message);
    throw error; 
  }
};

export const getGameProviders = async () => {
  try {
    // Faz a chamada para obter os provedores
    const response = await api.post('/games/providers');
    const providers = response.data?.data || [];
    return providers; // Retorna a lista de provedores
  } catch (error) {
    console.error('Erro ao buscar provedores:', error.response?.data || error.message);
    throw error;
  }
};

export const getGamesByProvider = async (
  offset = 0,
  limit = 6,
  isHot = null,
  searchTerm = null,
  isNew = null,
  isLive = null,
  rewardsFlag = null
) => {
  try {
    const buildParams = (options) => {
      const params = new URLSearchParams({
        offset: options.offset || 0,
        limit: options.limit || 6,
      });

      if (options.isHot !== null) params.append("is_hot", options.isHot);
      if (options.isNew !== null) params.append("is_new", options.isNew);
      if (options.isLive !== null) params.append("is_live", options.isLive);
      if (options.rewardsFlag !== null)
        params.append("rewards_flag", options.rewardsFlag);
      if (options.searchTerm && options.searchTerm.trim() !== "") {
        params.append("search", options.searchTerm.trim());
      }

      return params;
    };

    // Monta os parâmetros para a chamada de jogos
    const params = buildParams({
      offset,
      limit,
      isHot,
      isNew,
      isLive,
      rewardsFlag,
      searchTerm,
    });

    // Faz a chamada para obter os jogos agrupados por provedores
    const response = await api.post(`/games/list?${params.toString()}`);
    const groupedGames = response.data?.result || {};

    // Processa o resultado para calcular o total de jogos e retornar os dados no formato esperado
    const result = Object.entries(groupedGames).map(([providerName, data]) => ({
      providerName: data.providerName,
      games: data.games,
      totalGames: data.totalGames,
    }));

    // Retorna os jogos agrupados por provedores
    return { result };
  } catch (error) {
    console.error(
      "Erro ao buscar jogos agrupados por provedores:",
      error.response?.data || error.message
    );
    return { result: [] }; // Retorna um array vazio em caso de erro
  }
};




export const addGameToFavorites = async (gameId) => {
  try {
    const response = await api.post('/member/favourite', {
      gameId,
      action: 'add',
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao adicionar jogo aos favoritos:', error.response?.data || error.message);
    throw error;
  }
};

export const getFavoriteGames = async () => {
  try {
    const response = await api.get('/member/favourite/list');
    return response.data;
  } catch (error) {
    console.error('Erro ao listar jogos favoritos:', error.response?.data || error.message);
    throw error;
  }
};


export const removeGameFromFavorites = async (gameId) => {
  try {
    const response = await api.post('/member/favourite', {
      gameId,
      action: 'remove',
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao remover jogo dos favoritos:', error.response?.data || error.message);
    throw error;
  }
};



export const getGameProvider = async () => {
  try {
    const response = await api.post('/games/providers');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar o provedor de jogo:', error.response?.data || error.message);
    throw error;
  }
};

// Evento: Informações do bônus de bloqueio de carteira
export const getMemberEventWalletLockBonusInfo = async () => {
  return await api.get('/event/member/wallet/lock/bonus/info');
};

// Tema padrão
export const getThemeDefault = async () => {
  return await api.get('/theme/default');
};

// Avisos do membro
export const getMemberNotices = async () => {
  return await api.get('/member/notices');
};

// Lista de mensagens do membro
export const getMemberMessageList = async () => {
  return await api.get('/member/message/list');
};

// Salvar histórico do membro
export const postMemberHistorySave = async (data) => {
  return await api.post('/member/history/save', data);
};

// Detalhes dos favoritos do membro
export const getMemberFavoritesDetail = async () => {
  return await api.get('/member/favorites/detail');
};

// APIs relacionadas ao saldo de ouro
export const postGoldApiUserBalance = async (data) => {
  return await api.post('/gold_api/user_balance', data);
};

export const postGoldApiMoneyCallback = async (data) => {
  return await api.post('/gold_api/money_callback', data);
};

export const postGoldApiGameCallback = async (data) => {
  return await api.post('/gold_api/game_callback', data);
};

// APIs PG16
export const postPg16GoldApiUserBalance = async (data) => {
  return await api.post('/pg16/gold_api/user_balance', data);
};

export const postPg16GoldApiMoneyCallback = async (data) => {
  return await api.post('/pg16/gold_api/money_callback', data);
};

export const postPg16GoldApiGameCallback = async (data) => {
  return await api.post('/pg16/gold_api/game_callback', data);
};

export const postPg16GoldApiTransactions = async (data) => {
  return await api.post('/pg16/gold_api/trasactions', data);
};

// Callback para transações
export const postCallbackTransaction2 = async (data) => {
  return await api.post('/callback', data);
};

// Webhook Playfiver
export const postPlayfiverWebhook = async (data) => {
  return await api.post('/playfiver/webhook', data);
};

// Salvar favoritos do membro
export const postMemberFavoritesSave = async (data) => {
  return await api.post('/member/favorites/save', data);
};

// Detalhes do histórico do membro
export const getMemberHistoryDetail = async () => {
  return await api.get('/member/history/detail');
};

// Lista de slots do membro
export const getMemberSlotList = async () => {
  return await api.get('/member/slot/list');
};

// Jogos populares de slots do membro
export const getMemberSlotHotGame = async () => {
  return await api.get('/member/slot/hotgame');
};

// Sub-membro do agente
export const postMemberAgentSubMember = async (data) => {
  return await api.post('/member/agent/sub/member', data);
};

// Relatório de agência de reembolso do membro
export const postMemberRebateAgencyReport = async (data) => {
  return await api.post('/member/rebate/agency/report', data);
};

// Registro de agência de reembolso do membro
export const getMemberRebateAgencyRecord = async () => {
  return await api.get('/member/rebate/agency/record');
};

// Resumo de agência de reembolso do membro
export const postMemberRebateAgencyBrief = async (data) => {
  return await api.post('/member/rebate/agency/brief', data);
};

// Aposta direta de agência do membro
export const postMemberDirectAgencyBet = async (data) => {
  return await api.post('/member/direct/agency/bet', data);
};

// Registro de jogo do membro
export const getMemberRecordGame = async () => {
  return await api.get('/member/record/game');
};

// Lançar jogo na plataforma (com ID variável)
export const getPlataformLaunchGame = async (id) => {
  return await api.get(`/plat/launch/${id}`);
};

// Detalhes da transação de registro do membro
export const getMemberRecordTradeDetail = async () => {
  return await api.get('/member/record/trade/detail');
};

// Retirada financeira
export const postFinanceWithdraw = async (data) => {
  return await api.post('/finance/withdraw', data);
};

// Inserir cartão bancário do membro
export const postMemberBankcardInsert = async (data) => {
  return await api.post('/member/bankcard/insert', data);
};

// Verificar senha de retirada do membro
export const postMemberWithdrawPasswordCheck = async (data) => {
  return await api.post('/member/wpw/check', data);
};

// Lista de cartões bancários do membro
export const getMemberBankcardList = async () => {
  return await api.get('/member/bankcard/list');
};

// Processamento de retirada financeira
export const getFinanceWithdrawProcessing = async () => {
  return await api.get('/finance/withdraw/processing');
};

// Lista de tipos PIX do cartão bancário do membro
export const getMemberBankCardPixtypeList = async () => {
  return await api.get('/member/bankcard/pixtypelist');
};

// Atualizar senha do membro
export const postMemberPasswordUpdate = async (data) => {
  return await api.post('/member/password/update', data);
};

// Verificar pagamento SuitPay
export const postVerifyPaymentSuitPay = async (data) => {
  return await api.post('/v1/verify/pay', data);
};

// Verificar pagamento DigitoPay
export const postVerifyPaymentDigitoPay = async (data) => {
  return await api.post('/digito/verify/pay', data);
};

// Informações curtas do membro
export const getMemberShortInfo = async () => {
  return await api.get('/member/short/info');
};

// Depósito financeiro de terceiros
export const postFinanceThirdDeposit = async (data) => {
  return await api.post('/finance/third/deposit', data);
};

// Pagamento Suit
export const postGenerationPaymentSuit = async (data) => {
  return await api.post('/generation/payment/suit', data);
};

// Lista de canais financeiros
export const getFinanceChannelList = async () => {
  return await api.get('/finance/channel/list');
};

// Tipo de canal financeiro
export const getFinanceChannelType = async () => {
  return await api.get('/finance/channel/type');
};

// Detalhes da promoção
export const getPromotionDetails = async () => {
  return await api.get('/promo/detail');
};

// Registro de transação do membro
export const getMemberRecordTrade = async () => {
  return await api.get('/member/record/trade');
};

// Detalhes do registro de convite da promoção
export const postPromotionInviteRecordDetail = async (data) => {
  return await api.post('/promo/invite/record/detail', data);
};

// Abrir convite de promoção
export const postPromotionInviteOpen = async (data) => {
  return await api.post('/promo/invite/open', data);
};

// Lista de convites de promoção
export const postPromotionInviteList = async (data) => {
  return await api.post('/promo/invite/list', data);
};

// Pesquisa de slot do membro
export const postMemberSlotSearch = async (data) => {
  return await api.post('/member/slot/search', data);
};

// Login do membro
export const postMemberLogin = async (data) => {
  return await api.post('/member/login', data);
};

// Rechamada de saldo do membro
export const postMemberRecallBalance = async (data) => {
  return await api.post('/member/recall/balance', data);
};

// Lista de promoções ordenadas
export const getPromotionListSort = async () => {
  return await api.get('/promo/list/sort');
};

// Estatísticas de pontos de depósito do membro
export const getMemberPointStatisticsDeposit = async () => {
  return await api.get('/member/point/statistics/deposit');
};

// Saldo do membro
export const getMemberBalance = async () => {
  return await api.get('/member/balance');
};

// Lista de links do membro
export const getMemberLinkList = async () => {
  return await api.get('/member/link/list');
};

// Verificar senha do membro
export const getMemberPasswordCheck = async () => {
  return await api.get('/member/password/check');
};

// Número de mensagens do membro
export const getMemberMessageNum = async () => {
  return await api.get('/member/message/num');
};

// Lista de promoções
export const getPromotionList = async () => {
  return await api.get('/promo/list');
};

// Registro de bem-estar da promoção
export const getPromotionWelfareRecord = async () => {
  return await api.get('/promo/welfare/record');
};

// Informações do membro
export const getMemberInfo = async () => {
  return await api.get('/member/info');
};

// Registro do membro
export const postMemberRegister = async (data) => {
  return await api.post('/member/reg', data);
};

// Estatísticas de pontos do membro
export const getMemberPointStatistics = async () => {
  return await api.get('/member/point/statistics');
};

// Navegação do membro
export const getMemberNav = async () => {
  return await api.get('/member/nav');
};

// Lista de configurações do site
export const getMemberWebsetList = async () => {
  return await api.get('/member/webset/list');
};

// Atualização do aplicativo do membro
export const getMemberAppUpgrade = async () => {
  return await api.get('/member/app/upgrade');
};

// Banner do membro
export const getMemberBanner = async () => {
  return await api.get('/member/banner');
};

// Prêmios do membro
export const getMemberAward = async () => {
  return await api.get('/member/award');
};

// Lista de players do membro
export const getMemberPlayerList = async () => {
  return await api.get('/member/player/list');
};

// Obter configuração de bem-estar da promoção
export const getPromotionWelfareGetConf = async () => {
  return await api.get('/promo/welfare/getconf');
};

// Lista de clientes do membro
export const getMemberCustomerList = async () => {
  return await api.get('/member/customer/list');
};

// Marquee do membro
export const getMemberMarquee = async () => {
  return await api.get('/member/marquee');
};

// Configuração de bem-estar da promoção
export const getPromotionWelfareConfig = async () => {
  return await api.get('/promo/welfare/config');
};

export const postGenerationPaymentDigitopay = async (data) => {
  return await api.post('/generation/payment/digitopay', data);
};

// Realizar retirada financeira DigitoPay
export const postFinanceWithdrawDigitopay = async (data) => {
  return await api.post('/finance/withdraw/digitopay', data);
};

// Configuração de reembolso do membro
export const getMemberRebateConfig = async () => {
  return await api.get('/member/rebate/config');
};

// Configuração VIP do membro
export const getMemberVipConfig = async () => {
  return await api.get('/member/vip/config');
};

// Taxa de retirada financeira
export const getFinanceWithdrawFee = async () => {
  return await api.get('/finance/withdraw/fee');
};

export default {
  getMemberEventWalletLockBonusProgressInfo,
  getMemberEventWalletLockBonusInfo,
  getThemeDefault,
  postGenerationPaymentDigitopay,
  postFinanceWithdrawDigitopay,
  getMemberNotices,
  getMemberMessageList,
  postMemberHistorySave,
  getMemberFavoritesDetail,
  postGoldApiUserBalance,
  postGoldApiMoneyCallback,
  postGoldApiGameCallback,
  postPg16GoldApiUserBalance,
  postPg16GoldApiMoneyCallback,
  postPg16GoldApiGameCallback,
  postPg16GoldApiTransactions,
  postCallbackTransaction2,
  postPlayfiverWebhook,
  postMemberFavoritesSave,
  getMemberHistoryDetail,
  getMemberSlotList,
  getMemberSlotHotGame,
  postMemberAgentSubMember,
  postMemberRebateAgencyReport,
  getMemberRebateAgencyRecord,
  postMemberRebateAgencyBrief,
  postMemberDirectAgencyBet,
  getMemberRecordGame,
  getPlataformLaunchGame,
  getMemberRecordTradeDetail,
  postFinanceWithdraw,
  postMemberBankcardInsert,
  postMemberWithdrawPasswordCheck,
  getMemberBankcardList,
  getFinanceWithdrawProcessing,
  getMemberBankCardPixtypeList,
  postMemberPasswordUpdate,
  postVerifyPaymentSuitPay,
  postVerifyPaymentDigitoPay,
  getMemberShortInfo,
  postFinanceThirdDeposit,
  postGenerationPaymentSuit,
  getFinanceChannelList,
  getFinanceChannelType,
  getPromotionDetails,
  getMemberRecordTrade,
  postPromotionInviteRecordDetail,
  postPromotionInviteOpen,
  postPromotionInviteList,
  postMemberSlotSearch,
  postMemberLogin,
  postMemberRecallBalance,
  getPromotionListSort,
  getMemberPointStatisticsDeposit,
  getMemberBalance,
  getMemberLinkList,
  getMemberPasswordCheck,
  getMemberMessageNum,
  getPromotionList,
  getPromotionWelfareRecord,
  getMemberInfo,
  postMemberRegister,
  getMemberPointStatistics,
  getMemberNav,
  getMemberWebsetList,
  getMemberAppUpgrade,
  getMemberBanner,
  getMemberAward,
  getMemberPlayerList,
  getPromotionWelfareGetConf,
  getMemberCustomerList,
  getMemberMarquee,
  getPromotionWelfareConfig,
  getMemberRebateConfig,
  getMemberVipConfig,
  getFinanceWithdrawFee,
};
