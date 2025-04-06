import { Box, Flex, Grid, Skeleton, Text, VStack } from "@chakra-ui/react";
import ProfilePost from "./BuildingDisplayed";
import useGetManagerBuildigs from "../../hooks/useGetManagerBuildings";

const BuildingsList = () => {

  const {isLoading, buildings }= useGetManagerBuildigs();

  const noBuildingsFound = !isLoading && ((typeof buildings === "undefined") || (buildings.length === 0));
  if(noBuildingsFound) return <NoBuildingsFound />

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
          {buildings.map((building) => (
            <ProfilePost post={building} key={building.id} />
          ))}
        </>
      )}
    </Grid>
  )
}

export default BuildingsList;

const NoBuildingsFound = () => {
  return (
    <Flex flexDir={'column'} textAlign={"center"} mx={"auto"}>
      <Text fontSize={"2x1"}>No Buildings Found </Text>
    </Flex>
  )
}