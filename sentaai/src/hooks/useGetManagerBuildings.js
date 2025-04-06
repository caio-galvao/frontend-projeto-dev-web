import axios from "axios";
import { useEffect, useState } from "react";
import useAuthStore from "../store/authStore";
import useBuildingStore from "../store/buildingStore";
import { BASE_URL } from "../utils/request";
import useShowToast from "./useShowToast";

const useGetManagerBuildigs = () => {
  const [isLoading, setIsLoading] = useState(true);
  const authUser = useAuthStore((state) => state.user);
  const { buildings, setBuildings } = useBuildingStore();
  const showToast = useShowToast();

  useEffect(() => {
    const getBuildings = async () => {
      if (!authUser) return;
      setIsLoading(true);
      setBuildings([]);

      try {
        const token = localStorage.getItem("auth-token");
        
        const response = await axios.get(`${BASE_URL}/building/manager/${authUser.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
    
        setBuildings(response.data)
      } catch (error) {
        showToast("Error", error.message, "error");
        setBuildings([]);
      } finally {
        setIsLoading(false);
      }
    };

    getBuildings();
  }, [setBuildings, showToast]);

  return { isLoading, buildings };
}

export default useGetManagerBuildigs