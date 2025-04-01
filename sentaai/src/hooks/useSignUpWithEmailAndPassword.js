import axios from 'axios';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from "../firebase/firebase";
import useAuthStore from '../store/authStore';
import { BASE_URL } from "../utils/request";
import useShowToast from './useShowToast';

const useSignUpWithEmailAndPassword = () => {

  const [
    createUserWithEmailAndPassword, , loading, error] = useCreateUserWithEmailAndPassword(auth);

  const showToast = useShowToast();
  const loginUser = useAuthStore(state => state.login);

  const signup = async (inputs) => {
    if (!inputs.email || !inputs.password || !inputs.username || !inputs.fullName) {
      showToast("Error", "Please fill all the fields", "error");
      return;
    }

    try {
      const newUser = await createUserWithEmailAndPassword(inputs.email, inputs.password)

      if (!newUser && error) {
        return showToast("Error", error.message, "error")
      }

      if (newUser) {
        const userDoc = {
          uid: newUser.user.uid,
          email: inputs.email,
          username: inputs.username,
          fullName: inputs.fullName,
          profilePicURL: ""
        }
        
        await axios.post(`${BASE_URL}/users`, userDoc)
          .then(response => {
            if (response.status === 201 && response.data.userId) {
              localStorage.setItem("user-info", JSON.stringify(userDoc))
              loginUser(userDoc)
            }
          })
      }
    } catch (error) {
      showToast("Error", error.message, "error")

    }
  }

  return { loading, error, signup }
}

export default useSignUpWithEmailAndPassword