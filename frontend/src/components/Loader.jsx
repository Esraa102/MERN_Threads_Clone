import { useColorModeValue } from "@chakra-ui/react";

const Loader = ({ miniLoader }) => {
  return (
    <div
      className={`flex items-center justify-center ${
        miniLoader ? "w-full h-full" : "h-screen w-screen"
      }`}
    >
      <div className={`loader ${useColorModeValue("#000", "#ffff")}`}></div>
    </div>
  );
};

export default Loader;
