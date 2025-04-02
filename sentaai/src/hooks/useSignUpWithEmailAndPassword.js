import axios from 'axios';
// import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
// import { auth } from "../firebase/firebase";
import useAuthStore from '../store/authStore';
import { BASE_URL } from "../utils/request";
import useShowToast from './useShowToast';

const useSignUpWithEmailAndPassword = () => {
  const showToast = useShowToast();

  const signup = async (inputs) => {
    if (!inputs.email || !inputs.password || !inputs.cpf || !inputs.name || !inputs.type) {
      showToast("Erro", "Preencha todos os campos", "error");
      return;
    }

    try {
      // Faz a requisição para a API de cadastro
      await axios.post(`${BASE_URL}/users/`, {
        // email: inputs.email,
        password: inputs.password,
        id: inputs.cpf,
        name: inputs.name,
        type: inputs.type,
      });

      showToast("Sucesso", "Cadastro realizado com sucesso", "success");
    } catch (error) {
      showToast("Erro", error.response?.data?.message || "Erro ao fazer cadastro", "error");
    }
  };

  return { signup };
}

export default useSignUpWithEmailAndPassword
