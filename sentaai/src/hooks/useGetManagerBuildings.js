import axios from "axios";
import { useEffect, useState } from "react";
import usePostStore from "../store/postStore";
import useUserProfileStore from "../store/userProfileStore";
import { BASE_URL } from "../utils/request";
import useShowToast from "./useShowToast";

const useGetManagerBuildigs = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { posts, setPosts } = usePostStore();
  const showToast = useShowToast();
  const userProfile = useUserProfileStore((state) => state.userProfile);

  useEffect(() => {
    const getPosts = async () => {
      if (!userProfile) return;
      setIsLoading(true);
      setPosts([]);

      try {
        await axios.get(`${BASE_URL}/building/manager/${userProfile.uid}`)
          .then(response => setPosts(response.data.posts))
      } catch (error) {
        showToast("Error", error.message, "error");
        setPosts([]);
      } finally {
        setIsLoading(false);
      }
    };

    getPosts();
  }, [setPosts, userProfile, showToast]);

  return { isLoading, posts };
}

export default useGetManagerBuildigs