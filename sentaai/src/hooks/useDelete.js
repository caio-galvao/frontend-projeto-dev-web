import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";
import { BASE_URL } from "../utils/request";
import useShowToast from "./useShowToast";

const useDelete = () => {
    const showToast = useShowToast();
    const logoutUser = useAuthStore((state) => state.logout);
    const navigate = useNavigate();

    const deleteAccount = async (userId) => {
        try {
            const token = localStorage.getItem("auth-token");

            await axios.delete(`${BASE_URL}/users/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            localStorage.removeItem("auth-token");
            logoutUser();

            showToast("Sucesso", "Conta deletada com sucesso", "success");

            navigate("/auth");
        } catch (error) {
            showToast("Erro", error.response?.data?.message || "Erro ao deletar conta", "error");
        }
    };

    return { deleteAccount };
};

export default useDelete;
