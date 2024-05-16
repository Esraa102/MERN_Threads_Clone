/* eslint-disable react/prop-types */
import { useState } from "react";
import {
  InputGroup,
  Stack,
  useColorMode,
  InputLeftElement,
  Input,
  Text,
  InputRightElement,
  Button,
  useColorModeValue,
  Spinner,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { FaUserAlt, FaEyeSlash, FaEye } from "react-icons/fa";
import { FaUserCheck } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
const AuthForm = ({ isRegister, sendData, isLoading }) => {
  const { colorMode } = useColorMode();
  const emailPattern =
    /^[a-zA-Z0-9_!#$%&*=+/?^{|}~]+([.-]?[a-zA-Z0-9_!#$%&*=+/?^{|}~]+)*@\w+([.-]?\w+)*(\.\w{2,50})+$/;
  const [isHidden, setisHidden] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    if (isRegister) {
      sendData({
        fullName: data.fullName,
        username: data.username,
        email: data.email,
        password: data.password,
      });
    } else {
      sendData({
        email: data.email,
        password: data.password,
      });
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`shadow-md p-4 rounded-md w-full  mx-auto ${
        colorMode === "dark" ? "bg-[#1e1e1e]" : "bg-white"
      } `}
    >
      <Stack spacing={3} color={useColorModeValue("#333", "#fff")}>
        {isRegister && (
          <Stack spacing={3}>
            <Stack spacing={2}>
              <label htmlFor="fullName" className="text-lg font-semibold">
                Full Name
              </label>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <FaUserAlt color="gray.light" />
                </InputLeftElement>
                <Input
                  isInvalid={errors.fullName ? true : false}
                  errorBorderColor="#ef3535"
                  id="fullName"
                  type="text"
                  placeholder="Esraa Gmm"
                  {...register("fullName", {
                    required: {
                      value: true,
                      message: "Full name is required",
                    },
                    minLength: {
                      value: 2,
                      message: "Full name should be at least 2 characters",
                    },
                    maxLength: {
                      value: 20,
                      message: "Full name can't be greater than 20 characters",
                    },
                  })}
                />
              </InputGroup>
              {errors.fullName && (
                <Text
                  paddingX={2}
                  fontSize={"small"}
                  fontWeight={600}
                  color={"#ef3535"}
                >
                  {errors.fullName.message}
                </Text>
              )}
            </Stack>
            <Stack spacing={2}>
              <label htmlFor="username" className="text-lg font-semibold">
                Username
              </label>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <FaUserCheck size={22} color="gray.light" />
                </InputLeftElement>
                <Input
                  isInvalid={errors.username ? true : false}
                  errorBorderColor="#ef3535"
                  id="username"
                  type="text"
                  placeholder="esraa_123"
                  {...register("username", {
                    required: {
                      value: true,
                      message: "Username is required",
                    },
                    minLength: {
                      value: 2,
                      message: "Username should be at least 2 characters",
                    },
                    maxLength: {
                      value: 20,
                      message: "Username can't be greater than 20 characters",
                    },
                  })}
                />
              </InputGroup>
              {errors.username && (
                <Text
                  paddingX={2}
                  fontSize={"small"}
                  fontWeight={600}
                  color={"#ef3535"}
                >
                  {errors.username.message}
                </Text>
              )}
            </Stack>
          </Stack>
        )}
        <Stack spacing={2}>
          <label htmlFor="email" className="text-lg font-semibold">
            Email
          </label>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <MdEmail size={22} color="gray.light" />
            </InputLeftElement>
            <Input
              isInvalid={errors.email ? true : false}
              errorBorderColor="#ef3535"
              id="email"
              type="text"
              placeholder="esraa1925.gamal@gmail.com"
              {...register("email", {
                required: {
                  value: true,
                  message: "Email is required",
                },
                pattern: {
                  value: emailPattern,
                  message: "Please provide valid email",
                },
              })}
            />
          </InputGroup>
          {errors.email && (
            <Text
              paddingX={2}
              fontSize={"small"}
              fontWeight={600}
              color={"#ef3535"}
            >
              {errors.email.message}
            </Text>
          )}
        </Stack>
        <Stack spacing={2}>
          <label htmlFor="password" className="text-lg font-semibold">
            Password
          </label>
          <InputGroup>
            <Input
              isInvalid={errors.password ? true : false}
              errorBorderColor="#ef3535"
              id="password"
              type={isHidden ? "password" : "text"}
              placeholder="**********"
              {...register("password", {
                required: {
                  value: true,
                  message: "password is required",
                },
                minLength: {
                  value: 8,
                  message: "password should be at least 8 characters",
                },
                maxLength: {
                  value: 30,
                  message: "password can't be greater than 30 characters",
                },
              })}
            />
            <InputRightElement>
              <button
                type="button"
                onClick={() => setisHidden((prev) => !prev)}
              >
                {isHidden ? (
                  <FaEyeSlash size={22} color="gray.light" />
                ) : (
                  <FaEye size={22} color="#ef3535" />
                )}
              </button>
            </InputRightElement>
          </InputGroup>
          {errors.password && (
            <Text
              paddingX={2}
              fontSize={"small"}
              fontWeight={600}
              color={"#ef3535"}
            >
              {errors.password.message}
            </Text>
          )}
        </Stack>
        <Button
          bg={useColorModeValue("gray.600", "gray.700")}
          _hover={{
            bg: useColorModeValue("gray.700", "gray.800"),
          }}
          color={useColorModeValue("#fff", "")}
          type="submit"
          fontSize={"large"}
          marginTop={"6px"}
          disabled={isLoading}
          isLoading={isLoading}
          spinner={
            <Spinner
              size="sm"
              color={`${colorMode === "dark" ? "#fff" : "#000"}`}
            />
          }
        >
          {isRegister && !isLoading && "Create Account"}
          {!isRegister && !isLoading && "Sign In"}
        </Button>
      </Stack>
    </form>
  );
};

export default AuthForm;
