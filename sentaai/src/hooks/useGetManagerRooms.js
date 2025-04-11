import axios from "axios";
import { useEffect, useState } from "react";
import useAuthStore from "../store/authStore";
import useRoomListStore from "../store/RoomListStore";
import { BASE_URL } from "../utils/request";
import useShowToast from "./useShowToast";

const useGetManagerRooms = () => {
  const [isLoading, setIsLoading] = useState(true);
  const authUser = useAuthStore((state) => state.user);
  const { rooms, setRooms } = useRoomListStore();
  const showToast = useShowToast();

  useEffect(() => {
    const getRooms = async () => {
      if (!authUser) return;
      setIsLoading(true);
      setRooms([]);

      try {
        const token = localStorage.getItem("auth-token");
        
        const response = await axios.get(`${BASE_URL}/room/manager/${authUser.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
    
        setRooms(response.data)
      } catch (error) {
        showToast("Error", error.message, "error");
        setRooms([]);
      } finally {
        setIsLoading(false);
      }
    };

    getRooms();
  }, [setRooms, showToast]);

  return { isLoading, rooms };
}

export default useGetManagerRooms