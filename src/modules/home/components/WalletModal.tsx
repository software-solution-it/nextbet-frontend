import React, { useState, useEffect } from "react";
import ReactModal from "react-modal";
import { getMemberBalance, postGenerationPaymentDigitopay } from "../../services/service"; // Importar os serviços necessários
import InputMask from "react-input-mask";

const WalletModal = ({ isOpen, onRequestClose }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  // Estados para o conteúdo do depósito
  const [timeLeft, setTimeLeft] = useState(600);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [depositValue, setDepositValue] = useState("");


  const [pixKeyType, setPixKeyType] = useState(""); // Tipo de chave PIX
  const [userName, setUserName] = useState(""); // Nome do usuário

  const [pixCopiaECola, setPixCopiaECola] = useState("");
  const [withdrawPixKey, setWithdrawPixKey] = useState(""); // Estado para a chave PIX
  const [withdrawValue, setWithdrawValue] = useState("");   // Estado para o valor do saque
  const [qrCodeBase64, setQrCodeBase64] = useState("");
  const [websocket, setWebsocket] = useState<WebSocket | null>(null);
  const [balanceData, setBalanceData] = useState({
    balance: 0,
    lock_amount: 0,
    bonus: 0,
    rollover: {
      bet_amount: 0,
      required_amount: 0,
      rounds_played: 0,
      total_rounds_required: 0,
    },
  });
  const minimumDeposit = 0;
  const [showCopiedMessage, setShowCopiedMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const getPixMask = (type) => {
    switch (type) {
      case "CPF":
        return "999.999.999-99"; // Máscara de CPF
      case "PHONE":
        return "(99) 99999-9999"; // Máscara de telefone
      default:
        return ""; // Sem máscara para e-mail ou qualquer outro
    }
  };


  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setTimeout(() => setIsAnimating(true), 10);
    } else {
      setIsAnimating(false);
      setTimeout(() => setIsVisible(false), 300);
    }
  }, [isOpen]);

  const handleWithdrawValueChange = (value) => {
    setWithdrawValue(value.replace(",", ".")); // Substitui vírgulas por pontos, se necessário
  };

  const handlePixKeyTypeChange = (type) => {
    setPixKeyType(type); // Atualiza o tipo da chave PIX
    setWithdrawPixKey(""); // Limpa o valor da chave ao mudar o tipo
  };

function handleWithdraw() {
  const withdrawData = {
    paymentOptions: ["PIX"],
    person: {
      pixKeyTypes: pixKeyType,
      pixKey: withdrawPixKey,
      name: userName, // Certifique-se de que a variável userName está definida
    },
    value: parseFloat(withdrawValue),
  };

  console.log("Dados do saque:", withdrawData);

  // Lógica para enviar os dados para o backend
}



  useEffect(() => {
    if (isOpen) {
      const sessionId = sessionStorage.getItem("Uid");
      const ws = new WebSocket(`wss://api.nextbet.games?sessionId=${sessionId}`);
  
      ws.onopen = () => {
        console.log('WebSocket Connected');
        setWebsocket(ws);
      };
  
      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log('Data received from WebSocket:', data);
      };
  
      ws.onclose = () => {
        console.log('WebSocket Disconnected');
      };
  
      ws.onerror = (error) => {
        console.error('WebSocket Error:', error);
      };
  
      setWebsocket(ws);
  
      return () => {
        ws.close(); // Fechar a conexão WebSocket quando o componente desmontar
      };
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setTimeout(() => setIsAnimating(true), 10);
    } else {
      setIsAnimating(false);
      setTimeout(() => setIsVisible(false), 300);
    }
  }, [isOpen]);

  useEffect(() => {
    const fetchMemberBalance = async () => {
      try {
        const response = await getMemberBalance();
        if (response.status) {
          setBalanceData(response.data.data);
        } else {
          console.error("Erro ao obter saldo do membro:", response.data);
        }
      } catch (error) {
        console.error("Erro ao obter saldo do membro:", error);
      }
    };

    fetchMemberBalance();
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(pixCopiaECola);
    setShowCopiedMessage(true);
    setTimeout(() => setShowCopiedMessage(false), 3000);
  };

  useEffect(() => {
    if (currentStep === 2 || currentStep === 3) {
      if (timeLeft > 0) {
        const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
        return () => clearTimeout(timer);
      } else {
        onRequestClose();
      }
    }
  }, [timeLeft, currentStep, onRequestClose]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };

  const handleDepositValueChange = (value) => {
    const numericValue = parseFloat(value);
    if (!isNaN(numericValue) && numericValue >= minimumDeposit) {
      setDepositValue(value);
      setErrorMessage("");
    } else if (value === "") {
      setDepositValue("");
      setErrorMessage("");
    } else {
      setDepositValue(value);
      setErrorMessage(
        "Não pode depositar um valor menor que o depósito mínimo."
      );
    }
  };

  const handleGeneratePayment = async () => {
    const payload = {
      dueDate: new Date(new Date().getTime() + 15 * 60 * 1000).toISOString(), // Data de vencimento em 15 minutos
      paymentOptions: ["PIX"],
      person: {
        cpf: "12345678909", // Substitua pelo CPF do usuário
        name: "João da Silva", // Substitua pelo nome do usuário
      },
      value: parseFloat(depositValue),
      callbackUrl: "https://meu-callback-url.com", // URL de callback válida
      splitConfiguration: null,
    };

    try {
      const response = await postGenerationPaymentDigitopay(payload);
      if (response.status) {
        const { pixCopiaECola, qrCodeBase64 } = response.data.data;
        setPixCopiaECola(pixCopiaECola);
        setQrCodeBase64(qrCodeBase64);
        setCurrentStep(3);
      } else {
        console.error("Erro ao gerar pagamento:", response.data);
        alert("Erro ao gerar pagamento. Tente novamente.");
      }
    } catch (error) {
      console.error("Erro ao chamar API de geração de pagamento:", error);
      alert("Erro ao processar a solicitação. Verifique os dados e tente novamente.");
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    isVisible && (
      <ReactModal
        isOpen={isVisible}
        onRequestClose={onRequestClose}
        contentLabel="Carteira"
        ariaHideApp={false}
        className={`bg-gray-900 text-white rounded-lg shadow-xl w-[90%] max-w-3xl mx-auto p-10 fixed top-1/2 left-1/2 transform transition-all duration-300 ${
          isAnimating ? "opacity-100 scale-100" : "opacity-0 scale-95"
        } -translate-x-1/2 -translate-y-1/2`}
        overlayClassName={`fixed z-[1040] inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ${
          isAnimating ? "opacity-100" : "opacity-0"
        }`}
      >
        <button
          onClick={onRequestClose}
          className="absolute top-4 right-4 text-green-600 hover:text-gray-300 text-2xl font-bold transition"
          aria-label="Fechar"
        >
          &times;
        </button>

        {currentStep === 1 && (
  <div className="space-y-8">
    <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
      <div className="flex flex-col sm:flex-row justify-between items-center border-b border-gray-700 pb-4 mb-4">
        <div className="text-center sm:text-left">
          <p className="text-xs sm:text-sm text-gray-400">BRL</p>
          <p className="text-3xl sm:text-4xl font-bold my-3">
            R$ {balanceData.balance.toFixed(2)}
          </p>
        </div>
        <div className="flex sm:flex-row gap-4">
          <button
            onClick={() => setCurrentStep(2)}
            className="bg-green-600 py-2 px-6 rounded text-white font-semibold hover:bg-green-500 transition w-full sm:w-auto"
          >
            Depositar
          </button>
          <button
            onClick={() => setCurrentStep(4)}
            className="bg-gray-500 py-2 px-6 rounded text-gray-300 font-semibold hover:bg-gray-400 transition w-full sm:w-auto"
          >
            Sacar
          </button>
        </div>
      </div>
    </div>

    <div className="bg-gray-800 rounded-lg p-6 shadow-lg flex flex-col sm:flex-row gap-6">
      <div className="flex-1">
        <div className="flex justify-between items-center mb-2">
          <p className="text-xs sm:text-sm text-gray-400">BÔNUS</p>
          <span className="bg-green-500 text-white py-1 px-3 rounded-full text-xs sm:text-sm">
            Informação
          </span>
        </div>
        <p className="text-3xl sm:text-4xl font-bold">
          B$ {balanceData.bonus.toFixed(2)}
        </p>
        <p className="text-xs sm:text-sm text-gray-400 mt-2">
          Rollover cassino ou esportes ainda não definido.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <button className="bg-green-600 py-2 px-6 rounded text-white font-semibold hover:bg-green-500 transition">
            Acessar Jogos
          </button>
          <button className="bg-gray-500 py-2 px-6 rounded text-gray-300 font-semibold hover:bg-gray-400 transition">
            Sacar Bônus
          </button>
        </div>
      </div>

      <div className="hidden sm:block w-[3px] bg-gray-500"></div>

      <div className="w-full sm:w-[40%] bg-gray-700 rounded-lg p-4 h-full flex flex-col justify-between">
        <p className="text-yellow-500 font-semibold text-xs sm:text-sm">
          Rollover
        </p>
        <div className="text-xs sm:text-sm text-gray-400 mb-4">
          <p className="flex justify-between">
            <span>Valor apostado</span>
            <span>
              R$ {balanceData.rollover.bet_amount.toFixed(2)} / R${" "}
              {balanceData.rollover.required_amount.toFixed(2)}
            </span>
          </p>
          <div className="bg-gray-600 h-2 rounded-full overflow-hidden">
            <div
              className="bg-yellow-500 h-2"
              style={{
                width: `${
                  (balanceData.rollover.bet_amount /
                    balanceData.rollover.required_amount) *
                  100
                }%`,
              }}
            ></div>
          </div>
        </div>
        <div className="text-xs sm:text-sm text-gray-400">
          <p className="flex justify-between">
            <span>Rodadas jogadas</span>
            <span>
              {balanceData.rollover.rounds_played} /{" "}
              {balanceData.rollover.total_rounds_required}
            </span>
          </p>
          <div className="bg-gray-600 h-2 rounded-full overflow-hidden">
            <div
              className="bg-yellow-500 h-2"
              style={{
                width: `${
                  (balanceData.rollover.rounds_played /
                    balanceData.rollover.total_rounds_required) *
                  100
                }%`,
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
)}


{currentStep === 2 && (
  <div className="space-y-6 px-6 sm:px-12">
    <button
      onClick={handleBack}
      className="text-green-600 hover:text-gray-300 text-lg sm:text-xl font-bold transition"
    >
      &larr; Voltar
    </button>

    <h2 className="text-2xl sm:text-3xl font-bold">Depositar</h2>
    <p className="text-gray-400 text-sm sm:text-base">Adicione saldo à sua conta</p>

    <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
      {["Digitopay"].map((method) => (
        <button
          key={method}
          onClick={() => setSelectedPaymentMethod(method)}
          className={`py-2 px-6 rounded text-white font-semibold transition w-full sm:w-auto ${
            selectedPaymentMethod === method
              ? "bg-green-500"
              : "bg-green-600 hover:bg-green-500"
          }`}
        >
          {method}
        </button>
      ))}
    </div>

    <div className="bg-green-800 p-4 rounded-lg">
      <p className="text-green-400 text-sm sm:text-base">
        Realize seu primeiro depósito e se divirta com até 80 Giros no Tigrinho!
      </p>
      <p className="text-green-400 text-lg sm:text-xl font-bold mt-2">
        {formatTime(timeLeft)}
      </p>
    </div>

    {/* Ajuste para Depósito Mínimo e Método de Pagamento */}
    <div className="flex flex-col sm:grid sm:grid-cols-2 gap-6">
  <div>
    <p className="text-gray-400 text-sm sm:text-base">Método de Pagamento</p>
    <div className="bg-gray-700 py-3 px-6 rounded text-sm sm:text-base">
      {selectedPaymentMethod || "Selecione um método"}
    </div>
  </div>

  <div className="flex flex-col">
    <p className="text-gray-400 text-sm sm:text-base">Depósito Mínimo</p>
    <div className="bg-gray-700 py-3 px-6 rounded text-sm sm:text-base">
      R$ {minimumDeposit}
    </div>
  </div>
</div>


    {/* Input para valor do depósito */}
    <div>
      <p className="text-gray-400 text-sm sm:text-base">Valor a ser depositado:</p>
      <input
        type="text"
        value={depositValue}
        onChange={(e) => handleDepositValueChange(e.target.value)}
        placeholder={`Valor mínimo: R$ ${minimumDeposit}`}
        className="bg-gray-800 text-white py-3 px-6 w-full rounded text-sm sm:text-base"
      />
      {errorMessage && (
        <p className="text-red-500 text-sm sm:text-base mt-2">{errorMessage}</p>
      )}
    </div>

    {/* Lista de valores apenas visível no desktop */}
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 hidden sm:block">
  {[
    "R$ 20",
    "R$ 50",
    "R$ 100",
    "R$ 250",
    "R$ 500",
    "R$ 1.000",
  ].map((value) => {
    return (
      <button
        key={value}
        onClick={() =>
          handleDepositValueChange(value.replace("R$ ", ""))
        }
        className="bg-gray-800 mx-2 my-2 text-white py-3 px-6 rounded hover:bg-green-600 transition relative"
      >
        {value}
        <span className="absolute top-0 right-0 bg-yellow-500 text-black text-xs font-bold px-1 py-0.5 rounded">
          HOT
        </span>
      </button>
    );
  })}
</div>


    <button
      onClick={handleGeneratePayment}
      className="bg-green-600 py-3 px-6 rounded w-full text-white font-semibold hover:bg-green-500 transition disabled:bg-gray-500 disabled:cursor-not-allowed"
      disabled={
        !selectedPaymentMethod || parseFloat(depositValue) < minimumDeposit
      }
    >
      DEPOSITAR
    </button>
  </div>
)}


{currentStep === 3 && (
  <>
    <div className="flex justify-between items-center mb-6">
      <button
        onClick={handleBack}
        className="text-green-600 hover:text-gray-300 text-xl font-bold transition"
      >
        &larr; Voltar
      </button>
    </div>
    <div className="space-y-6 text-center">
      <p className="text-gray-300 text-lg sm:text-base">
        Escaneie a imagem para realizar o pagamento
      </p>

      {/* QR Code - visível apenas em tablets/desktops */}
      <div className="flex justify-center">
        <div className="bg-white p-4 rounded-lg shadow-md hidden sm:block">
          {qrCodeBase64 && (
            <img
              src={`data:image/png;base64,${qrCodeBase64}`}
              alt="QR Code"
              className="w-32 h-32 sm:w-48 sm:h-48"  // Ajuste para mobile
            />
          )}
        </div>
      </div>

      {/* No mobile, escondendo esta informação */}
      <p className="text-yellow-500 text-sm mt-4 hidden sm:block">
        Depósitos são aceitos apenas de contas bancárias com o mesmo CPF
        do titular da conta.
      </p>

      <div className="bg-gray-800 p-6 rounded-lg">
        <p className="text-3xl sm:text-2xl font-bold text-green-500 mb-4">
          R$ {depositValue}
        </p>
        <input
          className="bg-gray-700 text-white text-center w-full py-3 px-4 rounded text-lg sm:text-base"
          value={pixCopiaECola}
          readOnly
        />
        <button
          className="bg-green-600 text-white text-lg sm:text-base px-5 py-3 rounded mt-3 hover:bg-green-500 transition"
          onClick={copyToClipboard}
        >
          Copiar Código "copia e cola"
        </button>
        {showCopiedMessage && (
          <p className="text-green-500 text-sm mt-2">
            Código copiado com sucesso!
          </p>
        )}
      </div>

      <div>
        <p className="text-gray-300 text-lg sm:text-base">
          O tempo para você pagar acaba em:
        </p>
        <p className="text-3xl sm:text-2xl text-green-500 font-bold">
          {formatTime(timeLeft)}
        </p>
        <div className="bg-gray-700 h-2 rounded-full overflow-hidden mt-2">
          <div
            className="bg-green-500 h-2"
            style={{ width: `${(timeLeft / 600) * 100}%` }}
          ></div>
        </div>
      </div>
      <button className="bg-green-600 py-3 px-6 rounded w-full text-lg sm:text-base text-white font-bold hover:bg-green-500 transition">
        Já paguei o pix
      </button>
    </div>
  </>
)}

{currentStep === 4 && (
  <div className="space-y-6">
    <button
      onClick={() => setCurrentStep(1)} // Voltar ao passo 1
      className="text-green-600 hover:text-gray-300 text-xl font-bold transition"
    >
      &larr; Voltar
    </button>

    <h2 className="text-2xl font-bold">Saque</h2>
    <p className="text-gray-400">Informe os dados para saque</p>
    
    {/* Seleção do tipo de chave PIX */}
    <div>
      <p className="text-gray-400 mb-2">Tipo da Chave PIX:</p>
      <select
        value={pixKeyType}
        onChange={(e) => handlePixKeyTypeChange(e.target.value)}
        className="bg-gray-800 text-white py-2 px-4 w-full rounded"
      >
        <option value="">Selecione</option>
        <option value="CPF">CPF</option>
        <option value="EMAIL">E-mail</option>
        <option value="PHONE">Telefone</option>
      </select>
    </div>

    {/* Input da chave PIX com máscara */}
    <div>
            <p className="text-gray-400 mb-2">Chave PIX:</p>
            {pixKeyType === "EMAIL" ? (
              // Input sem máscara para e-mail
              <input
                type="email"
                value={withdrawPixKey}
                onChange={(e) => setWithdrawPixKey(e.target.value)}
                placeholder="Informe seu e-mail"
                className="bg-gray-800 text-white py-2 px-4 w-full rounded"
              />
            ) : (
              // Input com máscara para CPF e Telefone
              <InputMask
                mask={getPixMask(pixKeyType)}
                value={withdrawPixKey}
                onChange={(e) => setWithdrawPixKey(e.target.value)}
                placeholder={
                  pixKeyType === "CPF"
                    ? "000.000.000-00"
                    : pixKeyType === "PHONE"
                    ? "(00) 00000-0000"
                    : "Informe sua chave PIX"
                }
                className="bg-gray-800 text-white py-2 px-4 w-full rounded"
              />
            )}
          </div>

    {/* Valor a ser sacado */}
    <div>
      <p className="text-gray-400 mb-2">Valor a ser sacado:</p>
      <input
        type="text"
        value={withdrawValue}
        onChange={(e) => handleWithdrawValueChange(e.target.value)}
        placeholder={`Saldo disponível: R$ ${balanceData.balance.toFixed(2)}`}
        className="bg-gray-800 text-white py-2 px-4 w-full rounded"
      />
      {errorMessage && <p className="text-red-500 text-sm mt-2">{errorMessage}</p>}
    </div>

    {/* Botão para sacar */}
    <button
      onClick={handleWithdraw} // Lógica de saque
      className="bg-green-600 py-3 px-6 rounded w-full text-white font-semibold hover:bg-green-500 transition disabled:bg-gray-500 disabled:cursor-not-allowed"
      disabled={
        !pixKeyType ||
        !withdrawPixKey ||
        !withdrawValue ||
        parseFloat(withdrawValue) > balanceData.balance
      }
    >
      SACAR
    </button>
  </div>
)}

      </ReactModal>
    )
  );
};

export default WalletModal;
