import { Button, Flex, Image, useColorMode } from "@chakra-ui/react";
import { NavLink, Link } from "react-router-dom";
import { IoMdHome, IoMdLogOut } from "react-icons/io";
import { IoCreate, IoMoonSharp } from "react-icons/io5";
import { MdLightMode } from "react-icons/md";
const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
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
          <Button>
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
      </Flex>
    </Flex>
  );
};

export default Header;
