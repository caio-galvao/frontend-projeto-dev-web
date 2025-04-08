import { Container, Flex, VStack } from "@chakra-ui/react";
import AuthForm from "../../componentes/Form/AuthForm";


const AuthPage = () => {
  return (
    <Flex minH={"100vh"} px={4}>
      <Container maxW={"container.md"} padding={0}>
        <Flex justifyContent={"center"} alignItems={"center"}>
          <VStack spacing={10} align={"stretch"}>
            <AuthForm />  
          </VStack>
        </Flex>
      </Container>
    </Flex>
  )
}

export default AuthPage
