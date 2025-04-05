import { Box, Flex, Image, Text, VStack } from "@chakra-ui/react"
import { useState } from "react";
import Login from "./Login";
import Siginup from "./Siginup";

const AuthForm = () => {

  const [isLogin, setIsLogin] = useState(true)

  return <>
    <Image src="/img/sentaai_logo4.png"
          style={{ width: "300px", height: "auto", cursor: "pointer" }} 
          alt="Logo objectify" />
    <Box >

      <VStack spacing={5} marginTop={5}>

        {isLogin ? <Login /> : <Siginup />}

      </VStack>
    </Box>

    <Box padding={5}>
      <Flex alignItems={"center"} justify={"center"}>
        <Box mx={2} fontSize={14}>
          {isLogin ? "Ainda não tem uma conta?" : "Alredy register?"}
        </Box>
        <Box onClick={() => setIsLogin(!isLogin)} color={"blue.500"} cursor={"pointer"}>
          {isLogin ? "Criar conta" : "Log in"}
        </Box>
      </Flex>
    </Box>
  </>
}

export default AuthForm
