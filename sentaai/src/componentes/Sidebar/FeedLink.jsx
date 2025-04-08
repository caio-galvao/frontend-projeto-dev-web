import { Box, Link, Text, Tooltip } from '@chakra-ui/react'
import { PiDotsThreeOutlineVerticalFill } from 'react-icons/pi'
import { Link as RouterLink } from 'react-router-dom'

const FeedLink = () => {
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
        to={"/"}
        as={RouterLink}
        alignItems={"center"}
        justifyContent={{ base: "center", md: "flex-start" }}
        gap={4}
        _hover={{ bg: "whiteAlpha.400" }}
        borderRadius={6}
        p={2}
        w={{ base: 10, md: "full" }}
      >
        <PiDotsThreeOutlineVerticalFill color="white" size={30} />
        <Box display={{ base: "none", md: "block" }}>
          <Text color={'white'}> Feed </Text>
        </Box>
      </Link>
    </Tooltip>
  )
}

export default FeedLink;