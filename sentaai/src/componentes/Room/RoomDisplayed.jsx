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
  import useRoomListStore from "../../store/RoomListStore";
  import { BASE_URL } from "../../utils/request";
  
const RoomDisplayed = ({ room }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const authUser = useAuthStore((state) => state.user);
  const showToast = useShowToast();
  const [isDeleting, setIsDeleting] = useState(false);
  const deleteRoom = useRoomListStore((state) => state.deleteRoom);
  
  const handleDeleteRoom = async () => {
    if (!window.confirm("Tem certeza que quer remover a sala?")) return;
    if (isDeleting) return;
    setIsDeleting(true);

    try {
      const token = localStorage.getItem("auth-token");

      const response = await axios.delete(
        `${BASE_URL}/room/${room.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      deleteRoom(room.id);
      showToast("Success", response.data.message, "success");
    } catch (error) {
      showToast("Error", error.message, "error");
    } finally {
      setIsDeleting(false);
    }
  };
  
  const imageUrl = room.imageURL || `../../../img/room_image.jpg`;


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
            alt="room" 
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
                  alt="room" 
                  maxW={"600"} 
                  maxH={"375"} 
                  objectFit="cover" 
                />
              </Flex>
  
              <Flex alignItems={"center"} justifyContent={"space-between"} mt={"15"}>
                <Flex alignItems={"center"} gap={4}>
                  <Text fontWeight={"bold"} fontSize={16}>
                    {room.name}
                  </Text>
                  <Text fontSize={14} color="gray.500">
                    Building ID: {building_id.company_id}
                  </Text>
                </Flex>
  
                {/* Show the delete button only if the auth user is allowed to delete this building */}
                {(
                  <Button
                    size={"sm"}
                    bg={"transparent"}
                    _hover={{ bg: "whiteAlpha.300", color: "red.600" }}
                    borderRadius={4}
                    p={1}
                    onClick={handleDeleteRoom}
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
  
  export default RoomDisplayed;  