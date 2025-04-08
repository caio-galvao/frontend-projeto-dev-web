import { Badge, Box, Button, CloseButton, Flex, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, Tooltip, useDisclosure } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { BsFillImageFill } from "react-icons/bs";
import { PiDotsThreeOutlineVerticalThin } from "react-icons/pi";
import useCreateNewPost from "../../hooks/useCreateNewPost";
import usePreviewImg from "../../hooks/usePreviewImg";
import useShowToast from "../../hooks/useShowToast";
import useGetCategories from "../../hooks/useGetCategories";

function NewPostLink() {

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const imageRef = useRef(null);
  const { handleImageChange, selectedFile, setSelectedFile } = usePreviewImg();
  const showToast = useShowToast();
  const { isLoading, handleCreatePost } = useCreateNewPost();
  const { categories } = useGetCategories();
  
  const handleCategoriaClick = (category) => {
    setCategory(category);
  };

  const handlePostCreation = async () => {
    try {
      await handleCreatePost(selectedFile, category, description);
      onClose();
      setCategory("");
      setDescription("");
      setSelectedFile(null);
    } catch (error) {
      showToast("Error", error.message, "error")
    }
  }

  return <>
    <Tooltip
      hasArrow
      label={"Feed"}
      placement="right"
      ml={1}
      openDelay={500}
      display={{ base: 'block', md: 'none' }}
    >
      <Flex
        alignItems={"center"}
        justifyContent={{ base: "center", md: "flex-start" }}
        gap={4}
        _hover={{ bg: "whiteAlpha.400" }}
        borderRadius={6}
        p={2}
        w={{ base: 10, md: "full" }}
        onClick={onOpen}
      >
        <PiDotsThreeOutlineVerticalThin color="white" size={30} />
        <Box display={{ base: "none", md: "block" }}>
          <Text color={'white'}> New Post </Text>
        </Box>
      </Flex>
    </Tooltip>

    <Modal isOpen={isOpen} onClose={onClose} size='xl'>
      <ModalOverlay />

      <ModalContent border={"1px solid gray"}>
        <ModalHeader>New Post</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>


          <Input type='file' hidden ref={imageRef} onChange={handleImageChange} />

          <Flex marginTop="10px"
            alignItems={'center'}
            cursor={"pointer"}
            w={"fit-content"}
            onClick={() => imageRef.current.click()}
          >
            <Text>Add Image</Text>
            <BsFillImageFill
              style={{ marginLeft: "15px" }}
              size={20}
            />
          </Flex>

          {selectedFile && (
            <Flex mt={5} w={"full"} position={"relative"} justifyContent={"center"}>
              <Image src={selectedFile} alt='Selected img' />
              <CloseButton
                position={"absolute"}
                top={2}
                right={2}
                onClick={() => {
                  setSelectedFile(null);
                }}
              />
            </Flex>
          )}

          <Input
            placeholder='Description...'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            marginTop="15px"
            marginBottom="15px"
            maxLength={60}
          />
          <Text color="gray.500" fontSize="sm" mt={1}>
            {60 - description.length} characters remaining 
          </Text>

          {categories.map((tag, idx) => (
            <Badge key={idx} 
              variant={tag === category ? "solid" : "outline"}
              p={1}
              m={1}
              borderRadius='full'
              cursor="pointer"
              onClick={() => handleCategoriaClick(tag)}
            >
              {tag}
            </Badge>
          ))}

        </ModalBody>

        <ModalFooter>
          <Button mr={3} colorScheme={"white"} variant={"outline"}
            onClick={handlePostCreation} isLoading={isLoading}
          >
            Post
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  </>
}

export default NewPostLink;