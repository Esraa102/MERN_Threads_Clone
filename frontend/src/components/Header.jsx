import {
  Button,
  Flex,
  Image,
  useColorMode,
  useToast,
  Text,
} from "@chakra-ui/react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { IoMdHome, IoMdLogOut } from "react-icons/io";
import { IoCreate, IoMoonSharp } from "react-icons/io5";
import { MdLightMode } from "react-icons/md";
import { logOutUser } from "../helpers/api-communicators";
import { useRecoilState, useSetRecoilState } from "recoil";
import userAtom from "../atoms/userAtom";
import authScreenAtom from "../atoms/authAtom";
const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const setAuthScreenState = useSetRecoilState(authScreenAtom);
  const toast = useToast();
  const navigate = useNavigate();
  const [user, setUser] = useRecoilState(userAtom);
  const logOut = async () => {
    try {
      const data = await logOutUser();
      if (data.status === "OK") {
        setUser(null);
        navigate("/auth");
      }
      toast({
        title: data.message,
        position: "top-left",
        status: data.status === "OK" ? "success" : "error",
        duration: 3000,
      });
    } catch (error) {
      console.log(error);
      toast({
        title: error.message,
        position: "top-left",
        status: "error",
        duration: 3000,
      });
    }
  };
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
            <Button onClick={() => logOut()}>
              <IoMdLogOut size={24} />
            </Button>
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
