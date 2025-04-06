import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Alert, AlertIcon, Button, Input, InputGroup, InputRightElement, Select } from "@chakra-ui/react";
import { useState } from "react";
import useSignUpWithEmailAndPassword from "../../hooks/useSignUpWithEmailAndPassword";
import { formatCPF } from "../../utils/formatter";

const Siginup = () => {

  const [showPassword, setShowPassword] = useState(false);
  const{loading, error, signup} = useSignUpWithEmailAndPassword();

  const [inputs , setInputs] = useState({
    name: "",
    email:"",
    cpf: "",
    password:"",
    type: ""
  });

  // const isValidEmail = (email) => {
  //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   return emailRegex.test(email);
  // };

  // const handleSignup = () => {
  //   if (!isValidEmail(inputs.email)) {
  //     alert("Por favor, insira um e-mail válido.");
  //     return;
  //   }
  //   signup(inputs);
  // };

  return (
    <>
      <Input
        placeholder='Name' _placeholder={{ opacity: 1, color: 'gray.400' }}
        border={"1px solid gray"} borderRadius={4}
        fontSize={14}
        type="text"
        value={inputs.name}
        onChange={(e) => setInputs({...inputs, name: e.target.value})}
      />
      <Input
        placeholder='Email' _placeholder={{ opacity: 1, color: 'gray.400' }}
        border={"1px solid gray"} borderRadius={4}
        fontSize={14}
        type="text"
        value={inputs.email}
        onChange={(e) => setInputs({...inputs, email: e.target.value})}
      />
      <Input
        placeholder='CPF' _placeholder={{ opacity: 1, color: 'gray.400' }}
        border={"1px solid gray"} borderRadius={4}
        fontSize={14}
        type="text"
        value={inputs.cpf}
        onChange={(e) =>
          setInputs({ ...inputs, cpf: formatCPF(e.target.value) })
        }
      />

      <InputGroup>
        <Input
          placeholder='Password' _placeholder={{ opacity: 1, color: 'gray.400' }}
          border={"1px solid gray"} borderRadius={4}
          fontSize={14}
          type={showPassword ? "text" : "password"}
          value={inputs.password}
          onChange={(e) => setInputs({...inputs, password: e.target.value})}
        />

        <InputRightElement h="full">
          <Button variant={"ghost"} size={"sm"} onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <ViewIcon color={'#000'} /> : <ViewOffIcon color={'#000'} />}
          </Button>
        </InputRightElement>
        
      </InputGroup>

      <Select
        border="1px solid gray"
        borderRadius={4}
        fontSize={14}
        value={inputs.type}
        onChange={(e) =>
          setInputs({ ...inputs, type: e.target.value })
        }
      >
        <option value="" disabled style={{ color: "gray.400" }}>
          Type
        </option>
        <option value="comum">Comum</option>
        <option value="admin">Admin</option>
        <option value="master">Master</option>
      </Select>
      
      {error && (
        <Alert status="error" fontSize={13} p={2} borderRadius={4}>
          <AlertIcon fontSize={12} />
          {error.message}
        </Alert>
      )}
      
      <Button w={"full"} textColor='#fff' bg='black' size={"sm"} fontSize={14}
        isLoading={loading} onClick={() => signup(inputs)}>
          Sign Up
      </Button>
    </>
  )
}

export default Siginup
