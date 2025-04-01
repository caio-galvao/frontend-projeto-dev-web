import { Avatar, Box, Link, Text, Tooltip } from "@chakra-ui/react"
import { Link as RouterLink } from "react-router-dom"
import useAuthStore from "../../store/authStore";

const ProfileLink = () => {

  const authUser = useAuthStore((state) => state.user);

  return (
    <Tooltip
      hasArrow
      label={"Feed"}
      placement="right"
      ml={1}
      openDelay={500}
      display={{ base: 'block', md: 'none' }}
    >
      <Link
        display={"flex"}
        to={`/${authUser?.username}`}
        as={RouterLink}
        alignItems={"center"}
        justifyContent={{ base: "center", md: "flex-start" }}
        gap={4}
        _hover={{ bg: "whiteAlpha.400" }}
        borderRadius={6}
        p={2}
        w={{ base: 10, md: "full" }}
      >
        <Avatar size={"sm"} name={authUser?.fullName || ""} src={authUser?.profilePicURL || ""} />

        <Box display={{ base: "none", md: "block" }}>
          <Text color={'white'}> Profile </Text>
        </Box>
      </Link>
    </Tooltip>
  )
}

export default ProfileLink