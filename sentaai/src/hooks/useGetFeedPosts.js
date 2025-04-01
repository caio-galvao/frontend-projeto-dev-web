import axios from "axios";
import { useEffect, useState } from "react";
import useAuthStore from "../store/authStore";
import usePostStore from "../store/postStore";
import useUserProfileStore from "../store/userProfileStore";
import { BASE_URL } from "../utils/request";
import useShowToast from "./useShowToast";

function useGetFeedPosts() {

  const [isLoading, setIsLoading] = useState(true);
  const { posts, setPosts } = usePostStore();
  const authUser = useAuthStore((state) => state.user);
  const showToast = useShowToast();
  const { setUserProfile } = useUserProfileStore();

  useEffect(() => {
    const getFeedPosts = async () => {
      setIsLoading(true);
      try {
        await axios.get(`${BASE_URL}/feed/${authUser.uid}`)
          .then(response => {
            setPosts(response.data.feed);
          })

      } catch (error) {
        showToast("Error", error.message, "error");
      } finally {
        setIsLoading(false);
      }
    };

    if (authUser) getFeedPosts();
  }, [authUser, showToast, setPosts, setUserProfile]);

  return { isLoading, posts };
}

export default useGetFeedPosts