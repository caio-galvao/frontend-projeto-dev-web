import { create } from "zustand";

const useUserProfileStore = create((set) => ({
  userProfile: null,
  setUserProfile:(userProfile) => set({userProfile}),
  deletePost: (postId) => set((state) => ({
    userProfile: {
      ...state.userProfile,
      posts: state.userProfile.post.empty ? [] : state.userProfile.post.filter((id) => id !== postId),
    }
  }))
}));

export default useUserProfileStore;