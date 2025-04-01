import axios from "axios";
import { useEffect, useState } from "react";

import useShowToast from "./useShowToast";
import { BASE_URL } from "../utils/request";


const useGetCategories = () => {
  const [categories, setCategories] = useState([]);

  const showToast = useShowToast();

  useEffect(() => {
    const getCategories = async () => {

      try {
        await axios.get(`${BASE_URL}/category`)
          .then(response => setCategories(response.data.categories))
      } catch (error) {
        showToast("Error", error.message, "error");
      }
    };
    getCategories();
  }, [showToast, setCategories])


  return { categories }
}

export default useGetCategories