import { Alert, AlertIcon, Button, Input } from "@chakra-ui/react"
import { useState } from "react";
import useLogin from "../../hooks/useLogin";

const Login = () => {
  const [inputs, setInputs] = useState({ cpf: "", password: "" });
  const { login } = useLogin();

  return (
    <>
      <Input
        placeholder="CPF"
        value={inputs.cpf}
        onChange={(e) => setInputs({ ...inputs, cpf: e.target.value })}
      />
      <Input
        placeholder="Senha"
        type="password"
        value={inputs.password}
        onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
      />
      <Button onClick={() => login(inputs)}>Log in</Button>
    </>
  );
}

export default Login
