import axios from "axios";
// import { updateEmail, updatePassword } from "firebase/auth";
// import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { useState } from "react";
// import { auth, storage } from '../firebase/firebase';
import useAuthStore from "../store/authStore";
import useUserProfileStore from "../store/userProfileStore";
import { BASE_URL } from "../utils/request";
import useShowToast from "./useShowToast";

const useEditProfile = () => {
  const [isUpdating, setIsUpdating] = useState(false);

  const authUser = useAuthStore(state => state.user)
  const setAuthUser = useAuthStore(state => state.setUser)
  const setUserProfile = useUserProfileStore(state => state.setUserProfile)
  const showToast = useShowToast()

  const editProfile = async (inputs, selectedFile) => {
    if (isUpdating || !authUser) return
    setIsUpdating(true)

    const storageRef = ref(storage, `profilePics/${authUser.uid}`);

    let URL = ""
    let ERROR = false;
    try {
      if (selectedFile) {
        await uploadString(storageRef, selectedFile, "data_url")
        URL = await getDownloadURL(ref(storage, `profilePics/${authUser.uid}`))
      }

      const updatedUser = {
        ...authUser,
        username: inputs.username || authUser.username,
        fullName: inputs.fullName || authUser.fullName,
        profilePicURL: URL || authUser.profilePicURL,
      }

      if (inputs.email) {
        await updateEmail(auth.currentUser, inputs.email)
          .then(() => updatedUser.email = inputs.email)
          .catch((error) => {
            ERROR = true;
            showToast('Error', error.message, "error")
          });
      }

      if (inputs.password) {
        await updatePassword(auth.currentUser, inputs.password)
          .then(() => showToast('Success', "Password updated successfully", "success"))
          .catch((error) => {
            ERROR = true;
            showToast('Error', error.message, "error")
          });

      }

      if (!ERROR) {
        await axios.put(`${BASE_URL}/users/${authUser.uid}`, updatedUser)
          .then(() => {
            localStorage.setItem("user-info", JSON.stringify(updatedUser));
            setAuthUser(updatedUser);
            setUserProfile(updatedUser);
            showToast("Success", "Profile updated successfully", "success");
          });
      }


      setIsUpdating(false);
    } catch (error) {
      return showToast('Error', error.message, "error")
    }
  }


  return { editProfile, isUpdating }

}

export default useEditProfile 
