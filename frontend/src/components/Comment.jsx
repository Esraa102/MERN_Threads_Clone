/* eslint-disable react/prop-types */
import { Flex, Image, Text, Box } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { BsThreeDots } from "react-icons/bs";
import Actions from "./Actions";
import { useState } from "react";

const Comment = ({ comment, createdAt, avatar, username, likes }) => {
  const [isLiked, setIsLiked] = useState(false);
  return (
    <Flex
      w={"full"}
      gap={3}
      paddingBottom={3}
      borderBottom={"2px solid #1e1e1e"}
    >
      <Link to={`/${username}`}>
        <Image
          src={avatar}
          alt="profile-image"
          className="w-[35px] h-[35px] rounded-full object-cover"
        />
      </Link>
      <Flex gap={2} flex={1} direction={"column"}>
        <Flex alignItems={"center"} justifyContent={"space-between"}>
          <Text fontSize={"large"} fontWeight={600}>
            {username}
          </Text>
          <Flex alignItems={"center"} gap={2}>
            <Text color={"gray.light"}>{createdAt}</Text>
            <Box className="btn">
              <BsThreeDots size={20} />
            </Box>
          </Flex>
        </Flex>
        <Text>{comment}</Text>
        <Actions size={20} isLiked={isLiked} setIsLiked={setIsLiked} />
        <Text color={"gray.light"}>{likes + (isLiked ? 1 : 0)} likes</Text>
      </Flex>
    </Flex>
  );
};

export default Comment;
