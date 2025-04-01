import { Alert, AlertIcon, Button, Input } from "@chakra-ui/react"
import { useState } from "react";
import useLogin from "../../hooks/useLogin";

const Login = () => {

  const [inputs , setInputs] = useState({
    cpf:"",
    password:"",
  });

  const {loading, error, login} = useLogin()

  return (
    <>
      <Input
        placeholder='CPF' _placeholder={{ opacity: 1, color: 'gray.400' }}
        border={"1px solid gray"} borderRadius={4}
        fontSize={14}
        type="text"
        value={inputs.email}
        onChange={(e) => setInputs({...inputs, email: e.target.value})}
      />
      <Input
        placeholder='Senha' _placeholder={{ opacity: 1, color: 'gray.400' }}
        border={"1px solid gray"} borderRadius={4}
        fontSize={14}
        type="password"
        value={inputs.password}
        onChange={(e) => setInputs({...inputs, password: e.target.value})}
      />

      {error && (
        <Alert status="error" fontSize={13} p={2} borderRadius={4}>
          <AlertIcon fontSize={12} />
          {error.message}
        </Alert>
      )}

      <Button w={"full"} textColor='#fff' bg='black' size={"sm"} fontSize={14}
        isLoading={loading}
        onClick={() => login(inputs)}
      >
        Log in
      </Button>
    </>
  )
}

export default Login