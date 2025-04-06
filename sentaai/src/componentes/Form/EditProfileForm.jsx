import { useEffect, useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Select,
} from "@chakra-ui/react";
import { formatCPF } from "../../utils/formatter";
import useEditProfile from "../../hooks/useEditProfile";
import useShowToast from "../../hooks/useShowToast";
import useAuthStore from "../../store/authStore";

const EditProfileForm = ({ selectedFile, setSelectedFile }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
    cpf: "",
    userType: "",
  });

  const authUser = useAuthStore((state) => state.user);
  const { isUpdating, editProfile } = useEditProfile();
  const showToast = useShowToast();

  useEffect(() => {
    if (authUser) {
      setInputs({
        name: authUser.name || "",
        password: "", 
        cpf: authUser.id || "",
        userType: authUser.type || "",
      });
    }
  }, [authUser]);

  const handleEditProfile = async () => {
    try {
      await editProfile(inputs, selectedFile);
      setSelectedFile(null);
      showToast("Success", "Profile updated successfully", "success"); // Mensagem de sucesso só é exibida aqui
    } catch (error) {
      showToast("Error", error.response?.data?.message || "Error updating profile", "error"); // Mensagem de erro exibida em caso de falha
    }
  };

  return (
    <Flex direction="column" p={4}>
      <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }} mb={6}>
        Edit Profile
      </Heading>

      <FormControl mb={4}>
        <FormLabel fontSize={"sm"}>Name</FormLabel>
        <Input
          placeholder="Enter your name"
          size={"sm"}
          type={"text"}
          value={inputs.name}
          onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
        />
      </FormControl>

      <FormControl mb={4}>
        <FormLabel fontSize={"sm"}>Password</FormLabel>
        <InputGroup>
          <Input
            placeholder="Enter a new password"
            size={"sm"}
            type={showPassword ? "text" : "password"}
            value={inputs.password}
            onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
          />
          <InputRightElement h="full">
            <Button variant={"ghost"} size={"sm"} onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <ViewIcon color={"#000"} /> : <ViewOffIcon color={"#000"} />}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl mb={4}>
        <FormLabel fontSize={"sm"}>CPF</FormLabel>
        <Input
          placeholder="Enter your CPF"
          size={"sm"}
          type={"text"}
          value={inputs.cpf}
          onChange={(e) => setInputs({ ...inputs, cpf: formatCPF(e.target.value) })}
        />
      </FormControl>

      <FormControl mb={4}>
        <FormLabel fontSize={"sm"}>User Type</FormLabel>
        <Select
          size={"sm"}
          value={inputs.userType}
          onChange={(e) => setInputs({ ...inputs, userType: e.target.value })}
        >
          <option value="" disabled style={{ color: "gray.400" }}>
            Select user type
          </option>
          <option value="comum">Comum</option>
          <option value="admin">Admin</option>
          <option value="master">Master</option>
        </Select>
      </FormControl>

      <Flex justify="space-between">
        <Button
          bg={"red.400"}
          color={"white"}
          size="sm"
          _hover={{ bg: "red.500" }}
          onClick={() => window.history.back()}
        >
          Cancel
        </Button>
        <Button
          bg={"blue.400"}
          color={"white"}
          size="sm"
          _hover={{ bg: "blue.500" }}
          onClick={handleEditProfile}
          isLoading={isUpdating}
        >
          Submit
        </Button>
      </Flex>
    </Flex>
  );
};

export default EditProfileForm;
