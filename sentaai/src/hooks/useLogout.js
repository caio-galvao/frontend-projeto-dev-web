// import { auth } from "../firebase/firebase";
// import { useSignOut } from 'react-firebase-hooks/auth';
import useShowToast from "./useShowToast";
import useAuthStore from "../store/authStore";

const useLogout = () => {
  const showToast = useShowToast();
  const logoutUser = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    try {
      // Remove o token do localStorage
      localStorage.removeItem("auth-token");
      logoutUser();
      showToast("Sucesso", "Logout realizado com sucesso", "success");
    } catch (error) {
      showToast("Erro", "Erro ao fazer logout", "error");
    }
  };

  return { handleLogout };
}

export default useLogout
