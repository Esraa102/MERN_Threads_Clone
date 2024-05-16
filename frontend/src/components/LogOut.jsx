import { useState } from "react";
import { Button, Spinner, useColorMode } from "@chakra-ui/react";
import { IoMdLogOut } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { logOutUser } from "../helpers/api-communicators";
import { useSetRecoilState } from "recoil";
import userAtom from "../atoms/userAtom";
import useToastMessage from "../hooks/useToastMessage";
const LogOut = () => {
  const { colorMode } = useColorMode();
  const message = useToastMessage();
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
        return message(data.message, "success");
      } else {
        return message(data.message, "error");
      }
    } catch (error) {
      console.log(error);
      return message(error.message, "error");
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
