import axios from "axios";
import { useState } from "react";
import useAuthStore from "../store/authStore";
import useUserProfileStore from "../store/userProfileStore";
import { BASE_URL } from "../utils/request";
import useShowToast from "./useShowToast";

const useEditProfile = () => {
  const [isUpdating, setIsUpdating] = useState(false);

  const authUser = useAuthStore((state) => state.user);
  const setAuthUser = useAuthStore((state) => state.setUser);
  const setUserProfile = useUserProfileStore((state) => state.setUserProfile);
  const showToast = useShowToast();

  const editProfile = async (inputs) => {
    if (isUpdating || !authUser) return;
    setIsUpdating(true);

    try {
      const updatedUser = {
        ...authUser,
        name: inputs.name || authUser.name,
        // email: inputs.email || authUser.email,
        password: inputs.password || authUser.password,
        type: inputs.type || authUser.type,
      };

      const token = localStorage.getItem("auth-token");

      const response = await axios.put(`${BASE_URL}/users/${authUser.id}`, updatedUser, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const updatedData = response.data;

      localStorage.setItem("user-info", JSON.stringify(updatedData));
      setAuthUser(updatedData);
      setUserProfile(updatedData);

      //showToast("Success", "Profile updated successfully", "success");
    //} catch (error) {
    //  showToast("Error", error.response?.data?.message || "Error updating profile", "error");
    } finally {
      setIsUpdating(false);
    }
  };

  return { editProfile, isUpdating };
};

export default useEditProfile;
