import axios from "axios";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { useState } from "react";
import { storage } from "../firebase/firebase";
import useAuthStore from "../store/authStore";
import { BASE_URL } from "../utils/request";
import useShowToast from "./useShowToast";
import usePostStore from "../store/postStore";


const useCreateNewPost = () => {
	
	const showToast = useShowToast();
	const [isLoading, setIsLoading] = useState(false);
	const authUser = useAuthStore((state) => state.user);
	const createPost = usePostStore((state) => state.deletePost);

	const handleCreatePost = async (selectedFile, category, description) => {

		if (!category || !description) {
			return showToast("Error", "Please fill all the fields", "error");
		}

		if (isLoading) return;
		if (!selectedFile) throw new Error("Please select an image");
		setIsLoading(true);
		const newPostId = Date.now();

		const newPost = {
			postId: newPostId,
			category: category,
			description: description,
			createdBy: authUser.uid,
		};

		try {
			const imageRef = ref(storage, `posts/${newPostId}`);
			await uploadString(imageRef, selectedFile, "data_url");
			const downloadURL = await getDownloadURL(imageRef);

			newPost.imageURL = downloadURL;

			await axios.post(`${BASE_URL}/post`, newPost)
				.then(response => {
					if (response.data) {
						createPost({ ...newPost, id:  response.data.post_id})
						showToast("Success", response.data.message, "success");
					}
				});

		} catch (error) {
			showToast("Error", error.message, "error");
		} finally {
			setIsLoading(false);
		}
	};

	return { isLoading, handleCreatePost };

}

export default useCreateNewPost