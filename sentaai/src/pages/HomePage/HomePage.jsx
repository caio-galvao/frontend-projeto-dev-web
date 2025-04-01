import { Box, Container, Flex } from "@chakra-ui/react"
import FeedPosts from "../../componentes/FeedPosts/FeedPosts"

const HomePage = () => {
  return <Container maxW={"container.lg"}>
  <Flex>
    <Box flex={2} py={10}>
      <FeedPosts />
    </Box>
  </Flex>

</Container>
}

export default HomePage