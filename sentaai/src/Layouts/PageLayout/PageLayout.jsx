import { Box, Flex, Spinner } from "@chakra-ui/react";
// import { useAuthState } from "react-firebase-hooks/auth";
import { useLocation } from "react-router-dom";
import Sidebar from "../../componentes/Sidebar/Sidebar";
// import { auth } from "../../firebase/firebase";

const PageLayout = ({ children }) => {
  const { pathname } = useLocation();
  // const [user, loading] = useAuthState(auth);
  const user = null;
  const loading = false;
  const canRenderSidebar = pathname !== "/auth" && user;

  const checkingUserISAuth = !user && loading;
  if (checkingUserISAuth) return <PageLayoutSpinner />;

  return (
    <Flex flexDir="row">
      {canRenderSidebar ? (
        <Box w={{ base: "70px", md: "240px" }}>
          <Sidebar />
        </Box>
      ) : null}

      <Box flex={1} w={{ base: "calc(100% - 70px)", md: "calc(100% - 240px)" }}>
        {children}
      </Box>
    </Flex>
  );
};

export default PageLayout;

const PageLayoutSpinner = () => {
  return (
    <Flex flexDir="column" h="100vh" alignItems="center" justifyContent="center">
      <Spinner size="xl" />
    </Flex>
  );
};
