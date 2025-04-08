import { Badge, Box, Flex, Stack, Text } from "@chakra-ui/react"
import { timeAgo } from "../../utils/timeAgo";

const PostFooter = ({ post }) => {

  const createdAt = new Date(post.createdAt).getTime()

  return <Box my={10} marginTop={"auto"} >
    {
      <Flex w={"full"} mb={2} mt={4} direction={'column'}>
        <Text as='span' fontWeight={400}>
          {post.description}
        </Text>
        <Stack direction='row'>
          <Badge variant='solid' colorScheme='gray'
            my={1}
            borderRadius='full'>
            {post.category}
          </Badge>
        </Stack>

        <Text fontSize='10' color={"gray"}>
          Posted {timeAgo(createdAt)}
        </Text>
      </Flex>
    }
  </Box>
}

export default PostFooter