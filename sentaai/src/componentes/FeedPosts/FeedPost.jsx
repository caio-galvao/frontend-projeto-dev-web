import { Box, Image } from "@chakra-ui/react"
import PostFooter from "./PostFooter"
import PostHeader from "./PostHeader"
import useGetUserProfileById from "../../hooks/useGetUserProfileById"

const FeedPost = ({ post }) => {
  
  const { userProfile } = useGetUserProfileById(post.createdBy);
  

  return <>
    <PostHeader post={post} creatorProfile={userProfile}/>

    <Box >
      <Image src={post.imageURL} alt={"Feed post image"} maxW={{ base: 'full', md: 450 }} />
    </Box>
    <PostFooter post={post} />
  </>
}

export default FeedPost