import { useRecoilValue } from "recoil";
import authScreenAtom from "../atoms/authAtom";
import { SignUp, SignIn } from ".";

const AuthPage = () => {
  const authScreenState = useRecoilValue(authScreenAtom);

  return <>{authScreenState === "login" ? <SignIn /> : <SignUp />}</>;
};

export default AuthPage;
