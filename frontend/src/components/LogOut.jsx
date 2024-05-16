import { useState } from "react";
import { useToast, Button, Spinner, useColorMode } from "@chakra-ui/react";
import { IoMdLogOut } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { logOutUser } from "../helpers/api-communicators";
import { useSetRecoilState } from "recoil";
import userAtom from "../atoms/userAtom";
const LogOut = () => {
  const { colorMode } = useColorMode();
  const toast = useToast();
  const navigate = useNavigate();
  const setUser = useSetRecoilState(userAtom);
  const [isLoading, setIsLoading] = useState(false);
  const logOut = async () => {
    try {
      setIsLoading(true);
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
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Button
      disabled={isLoading}
      isLoading={isLoading}
      spinner={
        <Spinner
          size="sm"
          color={`${colorMode === "dark" ? "#fff" : "#000"}`}
        />
      }
      onClick={() => logOut()}
    >
      <IoMdLogOut size={24} />
    </Button>
  );
};

export default LogOut;
