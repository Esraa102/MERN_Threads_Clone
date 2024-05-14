import { Flex, Image, Text, Box } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { BsThreeDots } from "react-icons/bs";
import Actions from "./Actions";

const Comment = () => {
  return (
    <Flex
      w={"full"}
      gap={3}
      paddingBottom={3}
      borderBottom={"2px solid #1e1e1e"}
    >
      <Link to={"/:username"}>
        <Image
          src="/assets/post1.png"
          alt="profile-image"
          className="w-[35px] h-[35px] rounded-full object-cover"
        />
      </Link>
      <Flex gap={2} flex={1} direction={"column"}>
        <Flex alignItems={"center"} justifyContent={"space-between"}>
          <Text fontSize={"large"} fontWeight={600}>
            jhondoe
          </Text>
          <Flex alignItems={"center"} gap={2}>
            <Text color={"gray.light"}>1d</Text>
            <Box className="btn">
              <BsThreeDots size={20} />
            </Box>
          </Flex>
        </Flex>
        <Text>This is an amazing post</Text>
        <Actions size={20} />
        <Text color={"gray.light"}>301 likes</Text>
      </Flex>
    </Flex>
  );
};

export default Comment;
