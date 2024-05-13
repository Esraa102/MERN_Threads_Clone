import {
  Flex,
  VStack,
  Image,
  Text,
  Box,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Portal,
  useToast,
} from "@chakra-ui/react";
import { AiFillInstagram } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";

const UserHeader = () => {
  const toast = useToast();
  const copyURL = () => {
    const current = window.location.href;
    navigator.clipboard.writeText(current);
    return toast({
      position: "top-left",
      description: "Porfile link copied",
      status: "success",
      duration: 2000,
    });
  };

  return (
    <VStack spacing={8} align="stretch">
      <Flex
        w={"full"}
        justifyContent={"space-between"}
        gap={"20px"}
        flexWrap={"wrap"}
      >
        <Flex direction={"column"}>
          <Text className="text-4xl font-bold my-3">Mark Zuckerberg</Text>
          <Flex gap={2}>
            <Text>zuckerberg</Text>
            <Text
              borderRadius={"full"}
              paddingX={2}
              paddingY={1}
              fontSize={14}
              color={"gray.light"}
              bg={"gray.dark"}
            >
              threads.net
            </Text>
          </Flex>
        </Flex>
        <Image
          src="/assets/post1.png"
          alt="profile"
          className="w-[130px] h-[130px] rounded-full object-cover"
        />
      </Flex>
      <Text className="text-xl capitalize  font-semibold ">
        Co-founder,CEO of meta platform
      </Text>
      <Flex w={"full"} justifyContent={"space-between"}>
        <Flex
          fontWeight={"600"}
          gap={2}
          fontSize={"medium"}
          alignItems={"center"}
          color={"gray.light"}
        >
          <Text>3.5k Follwers</Text>
          <Box h={"1"} w={"1"} bg={"gray.light"} borderRadius={"full"}></Box>
          <Text>insagram.com</Text>
        </Flex>
        <Flex gap={1}>
          <Box className="p-2 hover:bg-darkColor transition rounded-full">
            <AiFillInstagram cursor={"pointer"} size={28} />
          </Box>
          <Box className="btn">
            <Menu>
              <MenuButton>
                <BsThreeDots cursor={"pointer"} size={28} />
              </MenuButton>
              <Portal>
                <MenuList bg={"gray.dark"}>
                  <MenuItem bg={"gray.dark"} onClick={copyURL}>
                    Copy Link
                  </MenuItem>
                </MenuList>
              </Portal>
            </Menu>
          </Box>
        </Flex>
      </Flex>
      <Flex w={"full"}>
        <Flex
          flex={1}
          borderBottom={"2px solid white"}
          justifyContent={"center"}
          paddingY={"8px"}
          cursor={"pointer"}
          fontSize={"medium"}
        >
          <Text fontWeight={"bold"}>Threads</Text>
        </Flex>
        <Flex flex={1}>
          <Flex
            flex={1}
            justifyContent={"center"}
            borderBottom={"2px solid #616161"}
            paddingY={"8px"}
            cursor={"pointer"}
            fontSize={"medium"}
            color={"gray.light"}
          >
            <Text fontWeight={"bold"}>Replies</Text>
          </Flex>
        </Flex>
      </Flex>
    </VStack>
  );
};

export default UserHeader;
