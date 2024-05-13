import { Link } from "react-router-dom";
import { Flex, Image, Box, Text, Grid } from "@chakra-ui/react";
import { FaRegHeart, FaRegComment } from "react-icons/fa";
import { LuSend } from "react-icons/lu";
import { TiArrowForwardOutline } from "react-icons/ti";
const UserPost = () => {
  return (
    <Flex gap={4} className="my-8">
      <Flex direction={"column"} alignItems={"center"} gap={1}>
        <Link to={`/:username`}>
          <Image
            src="/assets/post1.png"
            alt="profile"
            className="w-[55px] h-[55px] rounded-full object-cover"
          />
        </Link>
        <Box w={"1px"} h={"full"} flex={1} bg={"gray.light"}></Box>
        <Grid
          gap={1}
          w={"full"}
          justifyContent={"center"}
          templateColumns="repeat(2,1fr)"
        >
          <Link to={`/:username`}>
            <Image
              src="/assets/post1.png"
              alt="profile"
              className="w-[30px] h-[30px] rounded-full object-cover"
            />
          </Link>
          <Link to={`/:username`}>
            <Image
              src="/assets/post1.png"
              alt="profile"
              className="w-[30px] h-[30px] rounded-full object-cover"
            />
          </Link>
          <Link to={`/:username`}>
            <Image
              src="/assets/post1.png"
              alt="profile"
              className="w-[30px] h-[30px] rounded-full object-cover"
            />
          </Link>
        </Grid>
      </Flex>
      <Flex flex={1} direction={"column"} gap={3}>
        <Box>
          <Flex gap={2}>
            <Text fontWeight={"bold"}>MarkZuckerberg</Text>
            <Image
              src="/assets/verified.png"
              alt="verified-user"
              className="w-[30px] h-[30px]"
            />
          </Flex>
          <Text my={4} fontSize={"large"}>
            Let&apos;s talk about threads
          </Text>
        </Box>
        <Link to={`/:username/post/:id`}>
          <Image
            className="rounded-md  w-full h-[300px] object-cover"
            src="/assets/post1.png"
            alt="post-image"
           
          />
        </Link>
        <Flex alignItems={"center"} className="mt-1" gap={2} flexWrap={"wrap"}>
          <Box className="btn">
            <FaRegHeart size={24} />
          </Box>
          <Box className="btn">
            <FaRegComment size={24} />
          </Box>
          <Box className="btn">
            <TiArrowForwardOutline size={28} />
          </Box>
          <Box className="btn">
            <LuSend size={24} />
          </Box>
        </Flex>
        <Flex
          gap={2}
          fontSize={"medium"}
          alignItems={"center"}
          color={"gray.light"}
        >
          <Text>938 replies</Text>
          <Box h={"1"} w={"1"} bg={"gray.light"} borderRadius={"full"}></Box>
          <Text>801 replies</Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default UserPost;
