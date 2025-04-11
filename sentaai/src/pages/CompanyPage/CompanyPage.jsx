import { Container, Flex, Link, Skeleton, SkeletonCircle, Text, VStack, Box } from "@chakra-ui/react";
import { Link as RouterLink, useParams } from "react-router-dom";
import ProfileHeader from "../../componentes/Profile/ProfileHeader";
import CompaniesList from "../../componentes/Company/CompaniesList";
import FeedPosts from "../../componentes/FeedPosts/FeedPosts"
import Footer from "../../componentes/Footer/Footer"
import useGetUserProfileByUsername from "../../hooks/useGetUserProfileByUsername";

const CompanyPage = () => {
  const { username } = useParams();
  //const { isLoading, userProfile } = useGetUserProfileByUsername(username);
  const { isLoading, userProfile } = 'undefined';

  const userNotFound = !isLoading && !userProfile;
  //if (userNotFound) return <UserNotFound />;

  return (
    <>
      <Container maxW="container.lg" py={5}>
        <Flex
          py={10}
          px={4}
          pl={{ base: 4, sm: 10 }}
          w="full"
          mx="auto"
          flexDirection="column"
        >
          {/*!isLoading && userProfile && <ProfileHeader />*/}
          {<BuildingHeaderSkeleton />}
        </Flex>
        <Flex
          px={{ base: 2, dm: 4 }}
          maxW="full"
          mx="auto"
          borderTop="1px solid"
          borderColor="whiteAlpha.300"
          direction="column"
        >
          <CompaniesList />
        </Flex>
      </Container>
      <Container maxW="container.lg">
        <Flex>
          <Box flex={2} py={10}>
            {/*<FeedPosts />*/}
          </Box>
        </Flex>
      </Container>
      <Footer />
    </>
  );
};

export default CompanyPage;

const BuildingHeaderSkeleton = () => {
  return (
    <Flex
      gap={{ base: 4, sm: 10 }}
      py={10}
      direction={{ base: "column", sm: "row" }}
      justifyContent="center"
      alignItems="center"
    >
      <SkeletonCircle size="24" />
      <VStack alignItems={{ base: "center", sm: "flex-start" }} gap={2} mx="auto" flex={1}>
        <Skeleton height="12px" width="150px" />
        <Skeleton height="12px" width="100px" />
      </VStack>
    </Flex>
  );
};

const UserNotFound = () => {
  return (
    <Flex flexDir="column" textAlign="center" mx="auto">
      <Text fontSize="2x1">User Not Found</Text>
      <Link as={RouterLink} to="/" color="blue.500" w="max-content" mx="auto">
        Go home
      </Link>
    </Flex>
  );
};
