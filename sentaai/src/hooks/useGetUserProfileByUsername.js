import axios from "axios";
import { useEffect, useState } from "react";
import useUserProfileStore from "../store/userProfileStore";
import { BASE_URL } from "../utils/request";
import useShowToast from "./useShowToast";

const useGetUserProfileByUsername = (username) => {

  const [isLoading, setIsLoading] = useState(true);
  const showToast = useShowToast();
  const { userProfile, setUserProfile } = useUserProfileStore();

  useEffect(() => {

    const getUserProfile = async () => {
      setIsLoading(true)
      try {

        await axios.get(`${BASE_URL}/users/${username}`)
          .then(response => {
            if (!response.data.user) return setUserProfile(null);

            setUserProfile(response.data.user);
          })

      } catch (error) {
        showToast("Error", error.message, "error");
      } finally {
        setIsLoading(false);
      }
    }

    getUserProfile()
  }, [setUserProfile, username, showToast])

  return { isLoading, userProfile };
}

export default useGetUserProfileByUsername