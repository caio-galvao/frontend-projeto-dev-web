import { 
    Button, 
    Flex, 
    GridItem, 
    Image, 
    Modal, 
    ModalBody, 
    ModalCloseButton, 
    ModalContent, 
    ModalOverlay, 
    Text, 
    useDisclosure 
  } from "@chakra-ui/react";
  import axios from "axios";
  import { useState } from "react";
  import { MdDelete } from "react-icons/md";
  import useShowToast from "../../hooks/useShowToast";
  import useAuthStore from "../../store/authStore";
  import usePostStore from "../../store/buildingStore";
  import { BASE_URL } from "../../utils/request";
  
  const ProfilePost = ({ post }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const authUser = useAuthStore((state) => state.user);
    const showToast = useShowToast();
    const [isDeleting, setIsDeleting] = useState(false);
    const deletePost = usePostStore((state) => state.deletePost);
  
    const handleDeletePost = async () => {
      if (!window.confirm("Are you sure you want to delete this building?")) return;
      if (isDeleting) return;
      setIsDeleting(true);
  
      try {
        // Adjust the endpoint to match your building deletion route.
        const response = await axios.delete(
          `${BASE_URL}/building/${post.id}?user_id=${authUser.id}`
        );
        
        // Update the store by removing the building.
        deletePost(post.id);
        showToast("Success", response.data.message, "success");
      } catch (error) {
        showToast("Error", error.message, "error");
      } finally {
        setIsDeleting(false);
      }
    };
  
    // Use a provided image URL or a placeholder built from the building name.
    const imageUrl = post.imageURL || 
      `sentaai\public\img\building_image.jpg`;
  
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
          <Image 
            src={imageUrl} 
            alt="building" 
            w={"100%"} 
            h={"100%"} 
            objectFit={"cover"} 
          />
        </GridItem>
  
        <Modal isOpen={isOpen} onClose={onClose} isCentered size={"2xl"}>
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
                <Image 
                  src={imageUrl} 
                  alt="building" 
                  maxW={"600"} 
                  maxH={"375"} 
                  objectFit="cover" 
                />
              </Flex>
  
              <Flex alignItems={"center"} justifyContent={"space-between"} mt={"15"}>
                <Flex alignItems={"center"} gap={4}>
                  <Text fontWeight={"bold"} fontSize={16}>
                    {post.name}
                  </Text>
                  <Text fontSize={14} color="gray.500">
                    Company ID: {post.company_id}
                  </Text>
                </Flex>
  
                {/* Show the delete button only if the auth user is allowed to delete this building */}
                {authUser?.company_id === post.company_id && (
                  <Button
                    size={"sm"}
                    bg={"transparent"}
                    _hover={{ bg: "whiteAlpha.300", color: "red.600" }}
                    borderRadius={4}
                    p={1}
                    onClick={handleDeletePost}
                    isLoading={isDeleting}
                  >
                    <MdDelete size={20} cursor="pointer" />
                  </Button>
                )}
              </Flex>
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
    );
  };
  
  export default ProfilePost;  