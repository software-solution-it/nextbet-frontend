import React, { useState } from "react";
import { FaEye, FaEyeSlash, FaIdCard, FaEnvelope, FaPhone, FaLock, FaTimes } from "react-icons/fa";
import { postMemberRegister } from "../../services/service";
import InputMask from "react-input-mask";

interface FormData {
  realname: string;
  cpf: string;
  email: string;
  phone: string;
  password: string;
  promoCode: string;
  termsAccepted: boolean; 
}

const RegistrationForm: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [formData, setFormData] = useState<FormData>({
    realname: "",
    cpf: "",
    email: "",
    phone: "",
    password: "",
    promoCode: "",
    termsAccepted: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [successMessage, setSuccessMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const validateCPF = (cpf: string): boolean => {
    const cleaned = cpf.replace(/\D/g, "");
    return cleaned.length === 11;
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    const cleaned = phone.replace(/\D/g, "");
    return cleaned.length === 11;
  };

  const generateUsername = (realname: string): string => {
    const trimmedName = realname.trim().replace(/\s+/g, "_").toLowerCase();
    const randomSuffix = Math.random().toString(36).substring(2, 8);
    return `${trimmedName}_${randomSuffix}`;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    let fieldError = "";
    if (name === "cpf" && !validateCPF(value)) fieldError = "CPF inválido.";
    if (name === "email" && !validateEmail(value)) fieldError = "E-mail inválido.";
    if (name === "phone" && !validatePhone(value)) fieldError = "Número de telefone inválido.";

    setErrors((prev) => ({
      ...prev,
      [name]: fieldError,
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      termsAccepted: e.target.checked,
    }));

    if (!e.target.checked) {
      setErrors((prev) => ({
        ...prev,
        termsAccepted: "Você deve aceitar os termos e condições.",
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        termsAccepted: "",
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Record<string, string> = {};
    if (!formData.realname) newErrors.realname = "Nome real é obrigatório.";
    if (!validateCPF(formData.cpf)) newErrors.cpf = "CPF inválido.";
    if (!validateEmail(formData.email)) newErrors.email = "E-mail inválido.";
    if (!validatePhone(formData.phone)) newErrors.phone = "Número de telefone inválido.";
    if (!formData.termsAccepted) newErrors.termsAccepted = "Você deve aceitar os termos e condições.";

    if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
    }

    const cleanedCpf = formData.cpf.replace(/\D/g, '');
    const cleanedPhone = formData.phone.replace(/\D/g, '');

    const username = generateUsername(formData.realname);

    try {
        const response = await postMemberRegister({
            ...formData,
            cpf: cleanedCpf,
            phone: cleanedPhone,
            username
        });

        if (response.data.status) {
            const uid = response.headers['id'];
            if (uid) {
                sessionStorage.setItem('Uid', uid);
            }

            setSuccessMessage("Cadastro realizado com sucesso!");
            setIsSuccess(true);
            setTimeout(() => {
                onClose();
                setIsSuccess(false);
            }, 2000);
        } else if (response.data.data === "1062") {
            setErrors({ global: "Nome de usuário ou e-mail já existe." });
        } else {
            setErrors({ global: response.data.data || "Erro no cadastro." });
        }
    } catch (err) {
        setErrors({ global: "Erro ao se conectar com o servidor." });
    }
};

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="bg-gray-600 p-3 rounded-lg max-w-sm mx-auto relative">
      {isSuccess ? (
        <div className="text-center text-green-500 font-bold">Usuário Registrado com Sucesso</div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-2 text-xs">
          {errors.global && <p className="text-red-500">{errors.global}</p>}
          {successMessage && <p className="text-green-500">{successMessage}</p>}

          <div>
            <label className="text-white block mb-1">Nome Real</label>
            <input
              type="text"
              name="realname"
              value={formData.realname}
              onChange={handleInputChange}
              className="w-full px-2 py-1 border border-gray-300 rounded-md text-black"
              placeholder="Nome Real"
            />
          </div>

          <div>
            <label className="text-white block mb-1">CPF</label>
            <div className="relative">
              <FaIdCard className="absolute inset-y-0 left-2 flex items-center text-gray-500 h-full" />
              <InputMask
                mask="999.999.999-99"
                value={formData.cpf}
                onChange={(e) => handleInputChange(e as React.ChangeEvent<HTMLInputElement>)}
              >
                {(inputProps: any) => (
                  <input
                    {...inputProps}
                    type="text"
                    name="cpf"
                    placeholder="000.000.000-00"
                    className={`w-full pl-8 px-2 py-1 border ${errors.cpf ? "border-red-500" : "border-gray-300"} rounded-md text-black`}
                  />
                )}
              </InputMask>
            </div>
            {errors.cpf && <span className="text-red-500 text-xs">{errors.cpf}</span>}
          </div>

          <div>
            <label className="text-white block mb-1">E-mail</label>
            <div className="relative">
              <FaEnvelope className="absolute inset-y-0 left-2 flex items-center text-gray-500 h-full" />
              <input
                type="email"
                name="email"
                placeholder="example@example.com"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full pl-8 px-2 py-1 border ${errors.email ? "border-red-500" : "border-gray-300"} rounded-md text-black`}
              />
            </div>
            {errors.email && <span className="text-red-500 text-xs">{errors.email}</span>}
          </div>

          <div>
            <label className="text-white block mb-1">Telefone</label>
            <div className="relative">
              <FaPhone className="absolute inset-y-0 left-2 flex items-center text-gray-500 h-full" />
              <InputMask
                mask="(99) 99999-9999"
                value={formData.phone}
                onChange={(e) => handleInputChange(e as React.ChangeEvent<HTMLInputElement>)}
              >
                {(inputProps: any) => (
                  <input
                    {...inputProps}
                    type="text"
                    name="phone"
                    placeholder="(00) 00000-0000"
                    className={`w-full pl-8 px-2 py-1 border ${errors.phone ? "border-red-500" : "border-gray-300"} rounded-md text-black`}
                  />
                )}
              </InputMask>
            </div>
            {errors.phone && <span className="text-red-500 text-xs">{errors.phone}</span>}
          </div>

          <div>
            <label className="text-white block mb-1">Senha</label>
            <div className="relative">
              <FaLock className="absolute inset-y-0 left-2 flex items-center text-gray-500 h-full" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Digite sua senha"
                value={formData.password}
                onChange={handleInputChange}
                className={`w-full pl-8 px-2 py-1 border ${errors.password ? "border-red-500" : "border-gray-300"} rounded-md text-black`}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-2 flex items-center text-gray-500"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.password && <span className="text-red-500 text-xs">{errors.password}</span>}
          </div>

          <div className="flex items-center text-xs">
            <input
              type="checkbox"
              name="termsAccepted"
              checked={formData.termsAccepted}
              onChange={handleCheckboxChange}
              className="mr-2"
            />
            <label className="text-white">Eu aceito os termos e condições</label>
          </div>
          {errors.termsAccepted && (
            <span className="text-red-500 text-xs">{errors.termsAccepted}</span>
          )}

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-1 rounded-md font-semibold transition"
          >
            Cadastrar
          </button>
        </form>
      )}
    </div>
  );
};

export default RegistrationForm;
