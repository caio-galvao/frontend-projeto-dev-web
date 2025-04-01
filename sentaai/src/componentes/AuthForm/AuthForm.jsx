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
        
        {/*
        <Flex alignItems={"center"} justifyContent={"center"} my={4} gap={1} w={"full"}>
          <Box flex={2} h={"1px"} bg={"gray.400"} />
          <Text mx={1}>OR</Text>
          <Box flex={2} h={"1px"} bg={"gray.400"} />
        </Flex>
        */}

      </VStack>
    </Box>

    <Box padding={5}>
      <Flex alignItems={"center"} justify={"center"}>
        <Box mx={2} fontSize={14}>
          {isLogin ? "Ainda não tem uma conta?" : "Já tem uma conta?"}
        </Box>
        <Box onClick={() => setIsLogin(!isLogin)} color={"blue.500"} cursor={"pointer"}>
          {isLogin ? "Criar conta" : "Log in"}
        </Box>
      </Flex>
    </Box>
  </>
}

export default AuthForm