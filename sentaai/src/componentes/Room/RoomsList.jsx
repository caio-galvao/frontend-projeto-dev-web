import { Box, Flex, Grid, Skeleton, Text, VStack } from "@chakra-ui/react";
import RoomDisplayed from "./RoomDisplayed";
import useGetManagerRooms from "../../hooks/useGetManagerRooms";
import useGetManagerBuildigs from "../../hooks/useGetManagerBuildings";

const RoomsList = () => {

  const {isLoading, rooms }= useGetManagerRooms();

  const noRoomsFound = !isLoading && ((typeof rooms === "undefined") || (rooms.length === 0));
  if(noRoomsFound) return <NoRoomsFound />

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
          {rooms.map((room) => (
            <RoomDisplayed room={room} key={room.id} />
          ))}
        </>
      )}
    </Grid>
  )
}

export default RoomsList;

const NoRoomsFound = () => {
  return (
    <Flex flexDir={'column'} textAlign={"center"} mx={"auto"}>
      <Text fontSize={"2x1"}>No Rooms Found </Text>
    </Flex>
  )
}