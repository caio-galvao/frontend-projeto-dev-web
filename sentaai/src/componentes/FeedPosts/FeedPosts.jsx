import { Box, Container, Flex, Icon, Skeleton, SkeletonCircle, Text, VStack } from "@chakra-ui/react";
import useGetFeedPosts from "../../hooks/useGetFeedPosts";
import FeedPost from "./FeedPost";
import { ArrowBackIcon } from "@chakra-ui/icons";

const FeedPosts = () => {

  const { isLoading, posts } = useGetFeedPosts();

  return (
    <Container maxW={"container.sm"} py={10} px={2}>
      {isLoading && [0, 1, 2].map((_, idx) => (
        <VStack key={idx} gap={4} alignItems={"flex-start"} mb={10}>
          <Flex gap="2">
            <SkeletonCircle size="10" />
            <VStack gap={2} alignItems={"flex-start"}>
              <Skeleton height='10px' w={"200px"} />
              <Skeleton height='10px' w={"200px"} />
            </VStack>
          </Flex>
          <Skeleton w={"full"}>
            <Box h={"500px"}>contents wrapped</Box>
          </Skeleton>
        </VStack>
      ))}
      {!isLoading && posts.length > 0 && posts.map((post) =>
        <FeedPost key={post.id} post={post} />
      )}

      {!isLoading && posts.length === 0 &&
        <Container mt={24}> 
          <Text fontSize={"md"} color={"red.400"}>
            <Icon as={ArrowBackIcon} boxSize={6} color='red.500'/> Click here to post
          </Text>
        </Container>
      }

    </Container>
  )
}

export default FeedPosts