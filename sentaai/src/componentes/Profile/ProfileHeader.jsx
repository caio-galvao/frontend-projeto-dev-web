import { Avatar, AvatarGroup, Flex, Text, VStack } from "@chakra-ui/react";
import useUserProfileStore from "../../store/userProfileStore";

const ProfileHeader = () => {

  const {userProfile} = useUserProfileStore();

  return <Flex gap={{ base: 4, sm: 10 }} py={10} direction={"row"}>
    
    <AvatarGroup
      size={"xl"}
      justifySelf={"center"}
      alignSelf={"flex-start"}
      mx={"auto"}
    >
      <Avatar src={userProfile.profilePicURL} alt="profile logo" />
    </AvatarGroup>

    <VStack
      alignItems={"start"}
      gap={2}
      mx={"auto"}
      justifyContent={'center'}
      flex={1}
    >
      <Flex
        gap={4}
        justify={"flex-start"}
        alignItems={"center"}
        w={"full"}
      >
        <Text fontSize={"md"}>
          {userProfile.username}
        </Text>
      </Flex>

      <Flex alignItems={"center"} gap={4}>
        <Text fontSize={"xs"}>{userProfile.fullName}</Text>
      </Flex>

    </VStack>
  </Flex>
}

export default ProfileHeader