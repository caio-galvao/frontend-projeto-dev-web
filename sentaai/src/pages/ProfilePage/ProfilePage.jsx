import { Avatar, Button, Flex, Input } from "@chakra-ui/react";
import { useRef } from "react";
import usePreviewImg from "../../hooks/usePreviewImg";
import EditProfileForm from "../../componentes/Form/EditProfileForm";
import Footer from "../../componentes/Footer/Footer";
import useDelete from "../../hooks/useDelete";
import useAuthStore from "../../store/authStore";

const ProfilePage = () => {
  const fileRef = useRef(null);
  const { handleImageChange, selectedFile, setSelectedFile } = usePreviewImg();
  const { deleteAccount } = useDelete();
  const authUser = useAuthStore((state) => state.user);

  return (
    <Flex direction="column" minH="100vh" bg="gray.50">
      <Flex direction="column" flex="1" p={6} mb={12}>
        <Flex
          justify="space-between"
          align="flex-start"
          flex="1"
          direction={{ base: "column", md: "row" }}
        >
          <Flex
            direction="column"
            align="center"
            justify="center"
            flex="1"
            p={4}
          >
            <Avatar
              size="2xl"
              src={selectedFile}
              border={"2px solid white"}
              mb={4}
            />
            <Button w="full" onClick={() => fileRef.current.click()}>
              Change Photo
            </Button>
            <Input type="file" hidden ref={fileRef} onChange={handleImageChange} />
          </Flex>

          <Flex
            flex="1"
            justify="center"
            p={4}
            mt={{ base: 6, md: 0 }}
          >
            <EditProfileForm
              selectedFile={selectedFile}
              setSelectedFile={setSelectedFile}
            />
          </Flex>
        </Flex>

        <Flex justify="center" mt={6}>
          <Button
            colorScheme="red"
            size="md"
            onClick={() => deleteAccount(authUser?.id)}
          >
            Delete account
          </Button>
        </Flex>
      </Flex>

      <Footer />
    </Flex>
  );
};

export default ProfilePage;
