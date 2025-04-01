import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Heading,

  Input,

  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import useEditProfile from "../../hooks/useEditProfile";
import usePreviewImg from "../../hooks/usePreviewImg";
import useShowToast from "../../hooks/useShowToast";
import useAuthStore from "../../store/authStore";

const EditProfile = ({ isOpen, onClose }) => {

  const [showPassword, setShowPassword] = useState(false);

  const [inputs, setInputs] = useState({
    username: '',
    fullName: '',
    email: '',
    password: '',
  })


  const authUser = useAuthStore(state => state.user);
  const fileRef = useRef(null);
  const { handleImageChange, selectedFile, setSelectedFile } = usePreviewImg();
  const { isUpdating, editProfile } = useEditProfile();
  const showToast = useShowToast();

  const handleEditProfile = async () => {
    try {
      await editProfile(inputs, selectedFile);
      onClose();
      setSelectedFile(null);
    } catch (error) {
      showToast("Error", error.message, "error")
    }
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent boxShadow={"xl"} border={"1px solid gray"} mx={3}>
          <ModalHeader />
          <ModalCloseButton />
          <ModalBody>
            <Flex >
              <Stack spacing={4} w={"full"} maxW={"md"} p={6} my={0}>
                <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
                  Edit Profile
                </Heading>
                <FormControl>
                  <Stack direction={["column", "row"]} spacing={6}>
                    <Center>
                      <Avatar
                        size='xl'
                        src={selectedFile || authUser.profilePicURL}
                        border={"2px solid white "}
                      />
                    </Center>
                    <Center w='full'>
                      <Button w='full' onClick={() => fileRef.current.click()}>
                        Change Photo
                      </Button>
                    </Center>
                    <Input type='file' hidden ref={fileRef} onChange={handleImageChange} />
                  </Stack>
                </FormControl>

                <FormControl>
                  <FormLabel fontSize={"sm"}>Username</FormLabel>
                  <Input
                    placeholder={authUser.username}
                    size={"sm"}
                    type={"text"}
                    value={inputs.username}
                    onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel fontSize={"sm"}>Full Name</FormLabel>
                  <Input
                    placeholder={authUser.fullName}
                    size={"sm"}
                    type={"text"}
                    value={inputs.fullName}
                    onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel fontSize={"sm"}>Email</FormLabel>
                  <Input
                    placeholder={authUser.email}
                    size={"sm"}
                    type={"text"}
                    value={inputs.email}
                    onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel fontSize={"sm"}>Password</FormLabel>
                  <InputGroup>
                    <Input
                      placeholder={"Password"}
                      size={"sm"}
                      type={showPassword ? "text" : "password"}
                      value={inputs.password}
                      onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
                    />

                    <InputRightElement h="full">
                      <Button variant={"ghost"} size={"sm"} onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <ViewIcon color={'#000'} /> : <ViewOffIcon color={'#000'} />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>



                <Stack spacing={6} direction={["column", "row"]}>
                  <Button
                    bg={"red.400"}
                    color={"white"}
                    w='full'
                    size='sm'
                    _hover={{ bg: "red.500" }}
                    onClick={onClose}
                  >
                    Cancel
                  </Button>
                  <Button
                    bg={"blue.400"}
                    color={"white"}
                    size='sm'
                    w='full'
                    _hover={{ bg: "blue.500" }}
                    onClick={handleEditProfile}
                    isLoading={isUpdating}
                  >
                    Submit
                  </Button>
                </Stack>
              </Stack>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal >
    </>
  );
};

export default EditProfile;