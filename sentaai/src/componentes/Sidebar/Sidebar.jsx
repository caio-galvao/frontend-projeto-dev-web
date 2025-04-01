import { Box, Button, Flex, Image, Link, Text, Tooltip, useDisclosure } from "@chakra-ui/react";
import { BiLogOut } from "react-icons/bi";
import { BsWrenchAdjustableCircle } from "react-icons/bs";
import { Link as RouterLink } from "react-router-dom";
import useLogout from "../../hooks/useLogout";
import EditProfile from "../Profile/EditProfile";
import SidebarItems from "./SidebarItems";

const Sidebar = () => {

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { handleLogout, isLogginOut } = useLogout();

  return <Box
    height={"100vh"}
    borderRight={"1px solid"}
    borderColor={"whiteAlpha.300"}
    py={8}
    position={"sticky"}
    top={0}
    left={0}
    px={{ base: 2, md: 4 }}
    backgroundColor={'#2e2e2e'}
  >
    <Flex direction={"column"} gap={10} w="full" height={"full"} >
      <Link to={"/"} as={RouterLink} pl={6} display={{ base: "none", md: "block" }} cursor="point">
        <Image src="/img/logo-objectify-white.png" cursor={"pointer"} alt="Logo objectify" />
      </Link>
      
      <Link to={"/"} as={RouterLink} pl={2} display={{ base: "block", md: "none" }}
        borderRadius={6}
        _hover={{ bg: "whiteAlpha.200" }}
        w={10}
        cursor="point"
      >

        <Image src="/img/logo-objectify-white.png" cursor={"pointer"} alt="Logo objectify" />
      </Link>

      {/* Sidebar items */}
      <Flex direction={"column"} gap={5} cursor={"pointer"}>
        <SidebarItems />

      </Flex>

      {/* Setting */}
      <Tooltip
        hasArrow
        label={"Settings"}
        placement="right"
        ml={1}
        openDelay={500}
        display={{ base: 'block', md: 'none' }}
      >
        <Link
          display={"flex"}
          onClick={onOpen}
          alignItems={"center"}
          justifyContent={{ base: "center", md: "flex-start" }}
          gap={4}
          _hover={{ bg: "whiteAlpha.400" }}
          borderRadius={6}
          p={2}
          w={{ base: 10, md: "full" }}
          mt={"auto"}
        >
          <BsWrenchAdjustableCircle size={25} color={'white'} />
          <Box display={{ base: "none", md: "block" }}>
            <Text color={'white'}>
              Settings
            </Text>
          </Box>
        </Link>
      </Tooltip>
      {isOpen && <EditProfile isOpen={isOpen} onClose={onClose} />}
      
      {/* Logout */}
      <Tooltip
        hasArrow
        label={"Logout"}
        placement="right"
        ml={1}
        openDelay={500}
        display={{ base: 'block', md: 'none' }}
      >
        <Flex
          onClick={handleLogout}
          alignItems={"center"}
          justifyContent={{ base: "center", md: "flex-start" }}
          gap={4}
          _hover={{ bg: "whiteAlpha.400" }}
          borderRadius={6}
          p={2}
          w={{ base: 10, md: "full" }}
        >
          <BiLogOut size={25} color={'white'} />
          <Button display={{ base: "none", md: "block" }}
            variant={"ghost"}
            _hover={{ bg: "transparent" }}
            isLoading={isLogginOut}
          >
            <Text color={'white'}>
              Logout
            </Text>
          </Button>
        </Flex>
      </Tooltip>
      
    </Flex>
  </Box>
}

export default Sidebar