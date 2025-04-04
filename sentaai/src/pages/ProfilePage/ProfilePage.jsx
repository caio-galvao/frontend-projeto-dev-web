import { Box, Container, Flex } from "@chakra-ui/react"
import FeedPosts from "../../componentes/FeedPosts/FeedPosts"
import Footer from "../../componentes/Footer/Footer"

// const HomePage = () => {
//   return (
//     <>
//       <Container maxW={"container.lg"}>
//         <Flex>
//           <Box flex={2} py={10}>
//             <FeedPosts />
//           </Box>
//         </Flex>
//       </Container>
//       <Footer />
//     </>
//   );
// }

// export default HomePage

const HomePage = () => {
  return (
    <>
      <Container maxW={"container.lg"}>
        <Flex>
          <Box flex={2} py={10}>
            <FeedPosts />
          </Box>
        </Flex>
      </Container>
      <Footer />
    </>
  );
}

export default HomePage
