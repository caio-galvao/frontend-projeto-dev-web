import { Button, Container, Flex, Image } from "@chakra-ui/react"
import { Link } from "react-router-dom"

const Navbar = () => {
  return (
    <Container maxW={"container.lg"} my={4}>
      <Flex w={"full"} justifyContent={{base: "center", sm: "space-between"}} alignItems={"center"}>
        <Image src="/img/logo.svg" h={10} display={{ base: "none", sm: "block" }} cursor={"pointer"} />
        <Flex gap={4}>
          <Link to='/auth'>
            <Button colorScheme={"blue"} variant={"solid"} size={"sm"}>
              Login
            </Button>
          </Link>
          <Link to='/auth'>
            <Button colorScheme={"white"} variant={"outline"} size={"sm"}>
              Signup
            </Button>
          </Link>
        </Flex>
      </Flex>
    </Container>
  )
}

export default Navbar