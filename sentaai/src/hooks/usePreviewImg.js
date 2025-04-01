import { useState } from "react";
import useShowToast from "./useShowToast";

const usePreviewImg = () => {

  const [selectedFile, setSelectedFile] = useState(null);
  const showToast = useShowToast();
  const maxFIleSizeInBytes = 6 * 1014 * 1024 // 6MB

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file && file.type.startsWith("image/")) {

      if (file.size > maxFIleSizeInBytes) {
        showToast("Error", "File size must be less than 6MB", "error")
        setSelectedFile(null)
        return
      }

      const reader = new FileReader();

      reader.onload = () => {
        setSelectedFile(reader.result)
      }

      reader.readAsDataURL(file)

    } else {
      showToast("Error", "Please select and image file", "error")
      setSelectedFile(null)
    }
  }

  return { selectedFile, handleImageChange, setSelectedFile }
}

export default usePreviewImg