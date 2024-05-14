/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { Flex, Image, Box, Text } from "@chakra-ui/react";
import { BsThreeDots } from "react-icons/bs";
import Actions from "./Actions";
import { useState } from "react";
const UserPost = ({ likes, replies, postImg, postTitle }) => {
  const [isLiked, setIsLiked] = useState(false);
  return (
    <Flex gap={2} className="my-10">
      <Flex
        w={{ base: "16%", md: "13%" }}
        direction={"column"}
        alignItems={"center"}
        gap={1}
      >
        <Link to={`/:username`}>
          <Image
            src="/assets/post1.png"
            alt="profile"
            className="w-[55px] h-[55px] rounded-full object-cover"
          />
        </Link>
        <Box w={"1px"} h={"full"} flex={1} bg={"gray.light"}></Box>
        <Flex gap={1} w={"full"} justifyContent={"center"} flexWrap={"wrap"}>
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
        </Flex>
      </Flex>
      <Flex flex={1} direction={"column"} gap={3}>
        <Flex
          gap={6}
          alignItems={"flex-start"}
          justifyContent={"space-between"}
          flexWrap={"wrap"}
        >
          <Box>
            <Flex gap={2}>
              <Text fontWeight={"bold"}>MarkZuckerberg</Text>
              <Image
                src="/assets/verified.png"
                alt="verified-user"
                className="w-[30px] h-[30px]"
              />
            </Flex>
            <Link to={`/:username/post/:id`}>
              <Text my={4} fontSize={"large"}>
                {postTitle}
              </Text>
            </Link>
          </Box>

          <Flex alignItems={"center"} gap={2}>
            <Text color={"gray.light"}>1d</Text>
            <Box className="btn">
              <BsThreeDots size={20} />
            </Box>
          </Flex>
        </Flex>
        {postImg && (
          <Link to={`/:username/post/:id`}>
            <Image
              className="rounded-md  w-full h-[300px] object-cover"
              src={postImg}
              alt="post-image"
            />
          </Link>
        )}
        <Actions size={24} isLiked={isLiked} setIsLiked={setIsLiked} />
        <Flex
          gap={2}
          fontSize={"medium"}
          alignItems={"center"}
          color={"gray.light"}
        >
          <Text>{likes + (isLiked ? 1 : 0)} likes</Text>
          <Box h={"1"} w={"1"} bg={"gray.light"} borderRadius={"full"}></Box>
          <Text>{replies} replies</Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default UserPost;
