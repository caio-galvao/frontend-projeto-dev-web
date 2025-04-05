import { Box, Flex, Grid, Skeleton, Text, VStack } from "@chakra-ui/react";
import ProfilePost from "../Profile/ProfilePost";
import useGetManagerBuildigs from "../../hooks/useGetManagerBuildings";

const BuildingsList = () => {

  const {isLoading, posts }= useGetManagerBuildigs();

  const noPostFound = !isLoading && posts.length === 0;
  if(noPostFound) return <NoPostsFound />

  return (
    <Grid
      templateColumns={{sm:"repeat(1, 1fr)", md:"repeat(3, 1fr)"}}
      gap={1}
      columnGap={1}
    >

      {isLoading && [0, 1, 2, 3, 4, 5].map((_, idx) => (
        <VStack key={idx}>
          <Skeleton w={"full"} alignItems={"flex-start"} gap={4}>
            <Box h="300px">
              contenst wrapped
            </Box>
          </Skeleton>
        </VStack>
      ))}

      {!isLoading && (
        <>
          {posts.map((post) => (
            <ProfilePost post={post} key={post.id} />
          ))}
        </>
      )}
    </Grid>
  )
}

export default BuildingsList;

const NoPostsFound = () => {
  return (
    <Flex flexDir={'column'} textAlign={"center"} mx={"auto"}>
      <Text fontSize={"2x1"}>No Posts Found </Text>
    </Flex>
  )
}