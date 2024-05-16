import { Button, Flex, Image, useColorMode, Text } from "@chakra-ui/react";
import { NavLink, Link } from "react-router-dom";
import { IoMdHome } from "react-icons/io";
import { IoCreate, IoMoonSharp } from "react-icons/io5";
import { MdLightMode } from "react-icons/md";
import { useRecoilValue, useSetRecoilState } from "recoil";
import userAtom from "../atoms/userAtom";
import authScreenAtom from "../atoms/authAtom";
import { LogOut } from ".";
const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const setAuthScreenState = useSetRecoilState(authScreenAtom);
  const user = useRecoilValue(userAtom);
  return (
    <Flex
      className="w-full backdrop-blur"
      position={"fixed"}
      top={"0px"}
      left={"0px"}
      zIndex={10}
    >
      <Flex
        className="container mx-auto p-4"
        gap={4}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Link to={"/"}>
          <Image
            src={
              colorMode === "dark"
                ? "/assets/light-logo.svg"
                : "/assets/dark-logo.svg"
            }
            alt="logo"
            cursor={"pointer"}
            className="h-[40px] w-[40px]"
          />
        </Link>
        {user ? (
          <Flex alignItems={"center"} gap={4}>
            <NavLink to={"/"}>
              <Button>
                <IoMdHome size={24} />
              </Button>
            </NavLink>
            <NavLink to={"/create-post"}>
              <Button>
                <IoCreate size={24} />
              </Button>
            </NavLink>
            <LogOut />
            <Button onClick={toggleColorMode}>
              {colorMode === "dark" ? (
                <MdLightMode size={24} />
              ) : (
                <IoMoonSharp size={24} />
              )}
            </Button>
          </Flex>
        ) : (
          <Flex alignItems={"center"} gap={4}>
            <Text
              onClick={() => setAuthScreenState("login")}
              className="text-lg cursor-pointer font-semibold"
            >
              Log In
            </Text>
            <Text>
              <Button
                onClick={() => setAuthScreenState("sign-up")}
                fontSize={{ base: "medium", md: "large" }}
              >
                Sign Up
              </Button>
            </Text>
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};

export default Header;
