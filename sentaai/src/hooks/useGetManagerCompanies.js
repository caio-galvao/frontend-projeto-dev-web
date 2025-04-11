import axios from "axios";
import { useEffect, useState } from "react";
import useAuthStore from "../store/authStore";
import useCompanyStore from "../store/CompanyStore";
import { BASE_URL } from "../utils/request";
import useShowToast from "./useShowToast";

const useGetManagerCompanies = () => {
  const [isLoading, setIsLoading] = useState(true);
  const authUser = useAuthStore((state) => state.user);
  const { companies, setCompanies } = useCompanyStore();
  const showToast = useShowToast();

  useEffect(() => {
    const getCompanies = async () => {
      if (!authUser) return;
      setIsLoading(true);
      setCompanies([]);

      try {
        const token = localStorage.getItem("auth-token");
        
        const response = await axios.get(`${BASE_URL}/company/manager/${authUser.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
    
        setCompanies(response.data)
      } catch (error) {
        showToast("Error", error.message, "error");
        setCompanies([]);
      } finally {
        setIsLoading(false);
      }
    };

    getCompanies();
  }, [setCompanies, showToast]);

  return { isLoading, companies };
}

export default useGetManagerCompanies