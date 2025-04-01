import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../utils/request";
import useShowToast from "./useShowToast";

const useGetUserProfileById = (userId) => {

	const userDoc = {
		uid: "",
		email: "",
		username: "",
		fullName: "",
		profilePicURL: "",
		createdAt: ""
	}

	const [isLoading, setIsLoading] = useState(true);
	const [userProfile, setUserProfile] = useState(userDoc);

	const showToast = useShowToast();

	useEffect(() => {
		const getUserProfile = async () => {
			setIsLoading(true);
			setUserProfile(null);
			try {
				await axios.get(`${BASE_URL}/users_id/${userId}`)
					.then(resp => {
						setUserProfile(resp.data.user)
					});
			} catch (error) {
				showToast("Error", error.message, "error");
			} finally {
				setIsLoading(false);
			}
		};
		getUserProfile();
	}, [showToast, setUserProfile, userId]);

	return { isLoading, userProfile, setUserProfile };
};

export default useGetUserProfileById;