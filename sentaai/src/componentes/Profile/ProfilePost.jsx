import { Avatar, Button, Flex, GridItem, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, Text, useDisclosure } from "@chakra-ui/react";
import axios from "axios";
import { deleteObject, ref } from "firebase/storage";
import { useState } from "react";
import { MdDelete } from "react-icons/md";
import { storage } from "../../firebase/firebase";
import useShowToast from "../../hooks/useShowToast";
import useAuthStore from "../../store/authStore";
import usePostStore from "../../store/postStore";
import useUserProfileStore from "../../store/userProfileStore";
import { BASE_URL } from "../../utils/request";
import PostFooter from "../FeedPosts/PostFooter";

const ProfilePost = ({ post }) => {

  const { isOpen, onOpen, onClose } = useDisclosure();
  const userProfile = useUserProfileStore((state) => state.userProfile);
  const authUser = useAuthStore((state) => state.user);
  const showToast = useShowToast();
  const [isDeleting, setIsDeleting] = useState(false);
  const deletePost = usePostStore((state) => state.deletePost);
  const deletePostFromProfile = useUserProfileStore(state => state.deletePost);

  const handleDeletePost = async () => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    if (isDeleting) return;

    try {
      const imageRef = ref(storage, `posts/${post.id}`);
      await deleteObject(imageRef);

      await axios.delete(`${BASE_URL}/post/${post.id}?user_id=${authUser.uid}`)
        .then(response => {
          deletePost(post.id);
          userProfile.post = []
          deletePostFromProfile(post.id);
          
          showToast("Success", response.data.message, "success");
        })
    } catch (error) {
      showToast("Error", error.message, "error");
    } finally {
      setIsDeleting(false);
    }
  };


  return (
    <>
      <GridItem
        borderRadius={4}
        overflow={"hidden"}
        border={"1px solid"}
        borderColor={"whiteAlpha.300"}
        position={"relative"}
        aspectRatio={1 / 1}
        onClick={onOpen}
      >
        <Image src={post.imageURL} alt="profile post" w={"100%"} h={"100%"} objectFit={"cover"} />
      </GridItem>


      <Modal isOpen={isOpen} onClose={onClose}
        isCentered={true}
        size={"2xl"}>
        <ModalOverlay />
        <ModalContent boxShadow={"xl"} border={"1px solid gray"} mx={3}>
          <ModalCloseButton />
          <ModalBody>
            <Flex
              borderRadius={4}
              overflow={"hidden"}
              border={"1px solid"}
              borderColor={"whiteAlpha.300"}
              flex={1.5}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Image src={post.imageURL} alt='profile post' maxW={"600"} maxH={"375"} />
            </Flex>

            <Flex alignItems={"center"} justifyContent={"space-between"} mt={"15"}>

              <Flex alignItems={"center"} gap={4}>
                <Avatar src={userProfile.profilePicURL} size={"sm"} name={userProfile.username} />
                <Text fontWeight={"bold"} fontSize={12}>
                  {userProfile.username}
                </Text>
              </Flex>

              {authUser?.uid === userProfile.uid && (
                <Button
                  size={"sm"}
                  bg={"transparent"}
                  _hover={{ bg: "whiteAlpha.300", color: "red.600" }}
                  borderRadius={4}
                  p={1}
                  onClick={handleDeletePost}
                  isLoading={isDeleting}
                >
                  <MdDelete size={20} cursor='pointer' />
                </Button>
              )}

            </Flex>

            <PostFooter post={post} />
          </ModalBody>
        </ModalContent>
      </Modal>


    </>
  )
}

export default ProfilePost