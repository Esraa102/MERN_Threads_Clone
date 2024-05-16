import { Flex, Stack, Text, useToast } from "@chakra-ui/react";
import { AuthForm } from "../components";
import { useSetRecoilState } from "recoil";
import authScreenAtom from "../atoms/authAtom";
import { signUpUser } from "../helpers/api-communicators";
import { useNavigate } from "react-router-dom";
import userAtom from "../atoms/userAtom";
import { useState } from "react";
const SignUp = () => {
  const setAuthScreenState = useSetRecoilState(authScreenAtom);
  const toast = useToast();
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
        toast({
          title: "We've created your account for you.",
          position: "top-left",
          status: "success",
          duration: 3000,
        });
      } else {
        toast({
          title: data.message,
          position: "top-left",
          status: "error",
          duration: 3000,
        });
      }
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
