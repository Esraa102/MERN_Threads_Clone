/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Flex, Stack, Text } from "@chakra-ui/react";
import { AuthForm } from "../components";
import { useRecoilState, useSetRecoilState } from "recoil";
import authScreenAtom from "../atoms/authAtom";
import { useNavigate } from "react-router-dom";
import { logInUser } from "../helpers/api-communicators";
import userAtom from "../atoms/userAtom";
import useToastMessage from "../hooks/useToastMessage";

const SignIn = () => {
  const setAuthScreenState = useSetRecoilState(authScreenAtom);
  const navigate = useNavigate();
  const message = useToastMessage();
  const [user, setUser] = useRecoilState(userAtom);
  const [isLoading, setIsLoading] = useState(false);
  const logIn = async (userInfo) => {
    try {
      setIsLoading(true);
      const data = await logInUser(userInfo);
      if (data.status === "OK") {
        navigate("/");
        setUser(data.userData);
        return message(`Welcome back ${data.userData.fullName}`, "success");
      } else {
        console.log(data.message);
        return message(data.message, "error");
      }
    } catch (error) {
      console.log(error);
      return message(error.message, "error");
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    user ? navigate("/") : navigate("/auth");
  }, [user]);
  return (
    <Stack spacing={4}>
      <Text textAlign={"center"} fontWeight={"bold"} fontSize={"xx-large"}>
        Sign In
      </Text>
      <Text fontWeight={600} textAlign={"center"} color={"gray.light"}>
        Welcom back to our website! enter your account details to log in
      </Text>
      <AuthForm isRegister={false} sendData={logIn} isLoading={isLoading} />
      <Flex justifyContent={"center"} gap={1} textAlign={"center"}>
        Don&apos;t have an account??{" "}
        <Text
          onClick={() => setAuthScreenState("sign-up")}
          className="font-semibold cursor-pointer underline hover:text-blue-700 transition"
        >
          Create One!
        </Text>
      </Flex>
    </Stack>
  );
};

export default SignIn;
