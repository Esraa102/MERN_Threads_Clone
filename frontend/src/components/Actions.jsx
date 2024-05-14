/* eslint-disable react/prop-types */
import { useState } from "react";
import { Flex, Box } from "@chakra-ui/react";
import { FaRegHeart, FaRegComment, FaHeart } from "react-icons/fa";
import { TiArrowForwardOutline } from "react-icons/ti";
import { LuSend } from "react-icons/lu";
const Actions = ({ size }) => {
  const [isLiked, setIsLiked] = useState(false);
  return (
    <Flex alignItems={"center"} className="mt-1" gap={2} flexWrap={"wrap"}>
      <Box className="btn" onClick={() => setIsLiked((prev) => !prev)}>
        {isLiked ? (
          <FaHeart size={size} color="#f00" />
        ) : (
          <FaRegHeart size={size} />
        )}
      </Box>
      <Box className="btn">
        <FaRegComment size={size} />
      </Box>
      <Box className="btn">
        <TiArrowForwardOutline size={size} />
      </Box>
      <Box className="btn">
        <LuSend size={size} />
      </Box>
    </Flex>
  );
};

export default Actions;
