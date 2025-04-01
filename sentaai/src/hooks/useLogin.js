import axios from "axios";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase";
import useAuthStore from "../store/authStore";
import { BASE_URL } from "../utils/request";
import useShowToast from "./useShowToast";


const useLogin = () => {

  const showToast = useShowToast();
  const [signInWithEmailAndPassword, , loading, error] = useSignInWithEmailAndPassword(auth);
  const loginUser = useAuthStore(state => state.login);

  const login = async (inputs) => {

    if (!inputs.cpf || !inputs.password) {
      return showToast("Erro", "Preencha todos os campos", "error");
    }

    try {

      const userCred = await signInWithEmailAndPassword(inputs.cpf, inputs.password);

      if (!userCred || error) {
        return showToast("Erro", "CPF ou senha incorretos", "error")
      }
      if (userCred) {
        await axios.get(`${BASE_URL}/users_id/${userCred.user.uid}`)
          .then(response => {
            localStorage.setItem("user-info", JSON.stringify(response.data.user));
            loginUser(response.data.user)
          });
      }

    } catch (error) {
      showToast("Erro", "error")
    }

  }

  return { loading, error, login }
}

export default useLogin