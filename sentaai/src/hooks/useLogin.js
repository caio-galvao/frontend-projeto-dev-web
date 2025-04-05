import axios from "axios";
import { useNavigate } from "react-router-dom";
// import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
// import { auth } from "../firebase/firebase";
import useAuthStore from "../store/authStore";
import { BASE_URL } from "../utils/request";
import useShowToast from "./useShowToast";


const useLogin = () => {
  const showToast = useShowToast();
  const loginUser = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const login = async (inputs) => {
    if (!inputs.cpf || !inputs.password) {
      return showToast("Erro", "Preencha todos os campos", "error");
    }

    try {
      const response = await axios.post(`${BASE_URL}/auth/login`, {
        cpf: inputs.cpf,
        password: inputs.password,
      });

      const { token } = response.data;
      console.log("Token:", token);
      localStorage.setItem("auth-token", token);

      const userResponse = await axios.get(`${BASE_URL}/users/${inputs.cpf}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      const user = userResponse.data;
      loginUser(user);

      showToast("Sucesso", "Login realizado com sucesso", "success");

      navigate("/profile");
    } catch (error) {
      showToast("Erro", error.response?.data?.message || "Erro ao fazer login", "error");
    }
  };

  return { login };
};

export default useLogin;
