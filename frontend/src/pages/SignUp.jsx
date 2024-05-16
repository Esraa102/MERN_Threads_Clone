import { Flex, Stack, Text } from "@chakra-ui/react";
import { AuthForm } from "../components";
import { useSetRecoilState } from "recoil";
import authScreenAtom from "../atoms/authAtom";
import { signUpUser } from "../helpers/api-communicators";
import { useNavigate } from "react-router-dom";
import userAtom from "../atoms/userAtom";
import { useState } from "react";
import useToastMessage from "../hooks/useToastMessage";
const SignUp = () => {
  const setAuthScreenState = useSetRecoilState(authScreenAtom);
  const message = useToastMessage();
  const setuserAtom = useSetRecoilState(userAtom);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const signUp = async (userInfo) => {
    try {
      setIsLoading(true);
      const data = await signUpUser(userInfo);
      if (data.status === "OK") {
        navigate("/");
        setuserAtom(data.userData);
        return message("We've created your account for you.", "success");
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
    <Stack spacing={4} marginBottom={4}>
      <Text textAlign={"center"} fontWeight={"bold"} fontSize={"xx-large"}>
        Sign Up
      </Text>
      <Text fontWeight={600} textAlign={"center"} color={"gray.light"}>
        Please enter your details to create a new account
      </Text>
      <AuthForm isRegister sendData={signUp} isLoading={isLoading} />
      <Flex justifyContent={"center"} gap={1} textAlign={"center"}>
        Already have an account??{" "}
        <Text
          onClick={() => setAuthScreenState("login")}
          className="font-semibold cursor-pointer underline hover:text-blue-700 transition"
        >
          Sign In
        </Text>
      </Flex>
    </Stack>
  );
};

export default SignUp;
