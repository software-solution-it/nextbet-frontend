import { useState } from "react";
import PropTypes from "prop-types";
import { FaEye, FaEyeSlash, FaTimes } from "react-icons/fa";
const Logo = "/assets/logo.png";
import RegistrationForm from "./RegistrationForm";
import { postMemberLogin } from "../../services/service"; // Importa o serviço de login

const LoginModal = ({ isOpen, onClose, isRegistering, setIsRegistering, onLogin }) => {
  const [isRecoveringPassword, setIsRecoveringPassword] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e) => {
    const value = e.target.value.slice(0, 255);
    setInputValue(value);
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value.slice(0, 255);
    setPassword(value);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleClose = () => {
    setIsRecoveringPassword(false);
    setIsRegistering(false);
    onClose();
  };

  const handleLogin = async () => {
    // Limpa mensagem de erro
    setErrorMessage("");

    try {
      const response = await postMemberLogin({ email: inputValue, password });
      if (response.data.status) {
        const uid = response.headers['id'];
        if (uid) {
          sessionStorage.setItem('Uid', uid);
        }
        // Simula login bem-sucedido
        onLogin();
        onClose();
      } else {
        setErrorMessage("E-mail ou senha inválido.");
      }
    } catch (error) {
      console.error("Erro ao tentar login:", error);
      setErrorMessage("Erro ao tentar login. Por favor, tente novamente.");
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={handleClose}
    >
      <div
        className="bg-gray-800 text-white rounded-lg w-full max-w-md p-6 shadow-lg relative mx-4 sm:mx-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={handleClose} className="absolute top-2 right-2 text-white">
          <FaTimes />
        </button>
        <div className="flex justify-center mb-6">
          <img src={Logo} alt="Logo" className="w-32" />
        </div>

        {isRecoveringPassword ? (
          <div>
            <h2 className="text-2xl font-bold text-center mb-4">Recuperar Senha</h2>
            <p className="text-sm text-center mb-6">
              Insira seu CPF, E-mail ou Telefone para redefinir sua senha.
            </p>
            <form>
              <input
                type="text"
                className="w-full bg-gray-800 border border-gray-700 rounded-md text-white px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="CPF/E-mail/Telefone"
                value={inputValue}
                onChange={handleInputChange}
              />
              <button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md font-semibold transition"
              >
                Enviar Instruções
              </button>
            </form>
            <p
              className="text-sm text-center mt-4 text-gray-300 hover:text-white transition cursor-pointer"
              onClick={() => setIsRecoveringPassword(false)}
            >
              Voltar para Login
            </p>
          </div>
        ) : isRegistering ? (
          <div>
            <h2 className="text-2xl font-bold text-center mb-4">Registrar</h2>
            <p className="text-sm text-center mb-6">
              Crie uma conta preenchendo as informações abaixo.
            </p>
            <RegistrationForm onClose={handleClose} />
            <p
              className="text-sm text-center mt-4 text-gray-300 hover:text-white transition cursor-pointer"
              onClick={() => setIsRegistering(false)}
            >
              Já tem uma conta? Entrar
            </p>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-bold text-center mb-4">Entrar</h2>
            <p className="text-sm text-center mb-6">
              Bem-vindo! Preencha os campos abaixo para acessar sua conta.
            </p>
            {errorMessage && (
              <p className="text-red-500 text-center mb-4">{errorMessage}</p>
            )}
            <form>
              <input
                type="text"
                className="w-full bg-gray-800 border border-gray-700 rounded-md text-white px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="E-mail"
                value={inputValue}
                onChange={handleInputChange}
              />
              <div className="relative mb-4">
                <input
                  type={passwordVisible ? "text" : "password"}
                  className="w-full bg-gray-800 border border-gray-700 rounded-md text-white px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Senha"
                  value={password}
                  onChange={handlePasswordChange}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-white"
                  onClick={togglePasswordVisibility}
                >
                  {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              <button
                type="button"
                className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md font-semibold transition"
                onClick={handleLogin}
              >
                Entrar
              </button>
            </form>
            <div className="flex justify-between mt-4 text-sm">
              <p
                className="text-gray-300 hover:text-white transition cursor-pointer"
                onClick={() => setIsRecoveringPassword(true)}
              >
                Esqueci minha senha
              </p>
              <p
                className="text-gray-300 hover:text-white transition cursor-pointer"
                onClick={() => setIsRegistering(true)}
              >
                Registrar
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

LoginModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  isRegistering: PropTypes.bool.isRequired,
  setIsRegistering: PropTypes.func.isRequired,
  onLogin: PropTypes.func.isRequired,
};

export default LoginModal;
