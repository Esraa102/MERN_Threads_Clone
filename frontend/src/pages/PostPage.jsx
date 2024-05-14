import { VStack, Flex, Image, Text, Box, Button } from "@chakra-ui/react";
import { BsThreeDots } from "react-icons/bs";
import { Actions, Comment } from "../components";

const PostPage = () => {
  return (
    <VStack spacing={3} align="stretch" className="my-10">
      <Flex
        w={"full"}
        gap={4}
        flexWrap={"wrap"}
        justifyContent={"space-between"}
      >
        <Flex alignItems={"center"} gap={3}>
          <Image
            className="w-[60px] h-[60px] rounded-full object-cover"
            src="/assets/post1.png"
            alt="profile-img"
          />
          <Flex gap={2} alignItems={"center"}>
            <Text fontWeight={"bold"} fontSize={"large"}>
              Mark Zuckerberg
            </Text>
            <Image
              src="/assets/verified.png"
              alt="verified-user"
              className="w-[25px] h-[25px]"
            />
          </Flex>
        </Flex>
        <Flex alignItems={"center"} gap={2}>
          <Text color={"gray.light"}>1d</Text>
          <Box className="btn">
            <BsThreeDots size={20} />
          </Box>
        </Flex>
      </Flex>
      <Text textAlign={"start"} fontSize={"large"} fontWeight={600}>
        Lets talk about threads
      </Text>
      <Image
        className="w-full h-[400px] rounded-md object-cover"
        src="/assets/post1.png"
        alt="post-image"
      />
      <Actions size={24} />
      <Flex
        gap={2}
        fontSize={"medium"}
        alignItems={"center"}
        color={"gray.light"}
      >
        <Text>234 likes</Text>
        <Box h={"1"} w={"1"} bg={"gray.light"} borderRadius={"full"}></Box>
        <Text>1900 replies</Text>
      </Flex>
      <Flex
        alignItems={"center"}
        justifyContent={"space-between"}
        gap={4}
        marginY={3}
        paddingY={3}
        borderTop={"2px solid #1e1e1e"}
        borderBottom={"2px solid #1e1e1e"}
        flexWrap={"wrap"}
      >
        <Text color={"gray.light"} fontSize={"large"}>
          👋 Get the app to like,reply and post
        </Text>
        <Button>Get</Button>
      </Flex>
      <Comment />
      <Comment />
      <Comment />
      <Comment />
    </VStack>
  );
};

export default PostPage;
