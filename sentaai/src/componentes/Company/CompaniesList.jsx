import { Box, Flex, Grid, Skeleton, Text, VStack } from "@chakra-ui/react";
import CompanyDisplayed from "./CompanyDisplayed";
import useGetManagerCompanies from "../../hooks/useGetManagerCompanies";

const CompaniesList = () => {

  const {isLoading, companies }= useGetManagerCompanies();

  const noCompaniesFound = !isLoading && ((typeof companies === "undefined") || (companies.length === 0));
  if(noCompaniesFound) return <NoCompaniesFound />

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
          {companies.map((company) => (
            <CompanyDisplayed company={company} key={company.id} />
          ))}
        </>
      )}
    </Grid>
  )
}

export default CompaniesList;

const NoCompaniesFound = () => {
  return (
    <Flex flexDir={'column'} textAlign={"center"} mx={"auto"}>
      <Text fontSize={"2x1"}>No Companies Found </Text>
    </Flex>
  )
}