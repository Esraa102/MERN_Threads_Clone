import { useToast } from "@chakra-ui/react";

const useToastMessage = () => {
  const toast = useToast();
  const showToast = (message, status) => {
    return toast({
      title: message,
      position: "top-left",
      status,
      duration: 3000,
    });
  };
  return showToast;
};

export default useToastMessage;
