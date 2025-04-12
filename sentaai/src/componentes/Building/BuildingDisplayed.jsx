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
import { Link } from "react-router-dom"; // new import for navigation
import axios from "axios";
import { useState } from "react";
import { MdDelete } from "react-icons/md";
import useShowToast from "../../hooks/useShowToast";
import useAuthStore from "../../store/authStore";
import useBuildingStore from "../../store/buildingStore";
import { BASE_URL } from "../../utils/request";
  
const BuildingDisplayed = ({ building }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const authUser = useAuthStore((state) => state.user);
  const showToast = useShowToast();
  const [isDeleting, setIsDeleting] = useState(false);
  const deleteBuilding = useBuildingStore((state) => state.deleteBuilding);
  
  const handleDeleteBuilding = async () => {
    if (!window.confirm("Tem certeza que quer remover o prédio?")) return;
    if (isDeleting) return;
    setIsDeleting(true);

    try {
      const token = localStorage.getItem("auth-token");

      const response = await axios.delete(
        `${BASE_URL}/building/${building.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      deleteBuilding(building.id);
      showToast("Success", response.data.message, "success");
    } catch (error) {
      showToast("Error", error.message, "error");
    } finally {
      setIsDeleting(false);
    }
  };
  
  const imageUrl = building.imageURL || `../../../img/building_image.jpg`;

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
                  {building.name}
                </Text>
                <Text fontSize={14} color="gray.500">
                  Company ID: {building.company_id}
                </Text>
              </Flex>
  
              <Flex alignItems={"center"} gap={2}>
                <Button
                  as={Link}
                  to="/rooms"
                  size={"sm"}
                  colorScheme="blue"
                >
                  View Rooms
                </Button>
                <Button
                  size={"sm"}
                  bg={"transparent"}
                  _hover={{ bg: "whiteAlpha.300", color: "red.600" }}
                  borderRadius={4}
                  p={1}
                  onClick={handleDeleteBuilding}
                  isLoading={isDeleting}
                >
                  <MdDelete size={20} cursor="pointer" />
                </Button>
              </Flex>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
  
export default BuildingDisplayed;
