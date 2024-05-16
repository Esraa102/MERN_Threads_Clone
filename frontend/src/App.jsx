/* eslint-disable react-hooks/exhaustive-deps */
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { AuthPage, Home, PostPage, SignIn, SignUp, UserPage } from "./pages";
import { Container } from "@chakra-ui/react";
import { Header, Loader } from "./components";
import { useEffect, useState } from "react";
import { checkAuth } from "./helpers/api-communicators";
import { useRecoilState } from "recoil";
import userAtom from "./atoms/userAtom";
import useToastMessage from "./hooks/useToastMessage";

function App() {
  const navigate = useNavigate();
  const [user, setUser] = useRecoilState(userAtom);
  const [isLoading, setIsLoading] = useState(false);
  const message = useToastMessage();
  useEffect(() => {
    const checkStatus = async () => {
      try {
        setIsLoading(true);
        const data = await checkAuth();
        if (data.status === "OK") {
          setUser(data.userData);
          navigate("/");
        } else {
          setUser(null);
          return message(data.message, "error");
        }
      } catch (error) {
        console.log(error);
        return message(error.message, "error");
      } finally {
        setIsLoading(false);
      }
    };
    checkStatus();
  }, []);
  return isLoading ? (
    <Loader miniLoader={false} />
  ) : (
    <>
      <Header />
      <Container marginTop={"110px"} paddingX={"16px"} maxWidth={"620px"}>
        <Routes>
          <Route
            path="/"
            element={user ? <Home /> : <Navigate to={"/auth"} />}
          />
          <Route path="/auth" element={<AuthPage />}>
            <Route element={<SignUp />} />
            <Route element={<SignIn />} />
          </Route>
          <Route
            path="/:username"
            element={user ? <UserPage /> : <Navigate to={"/auth"} />}
          />
          <Route
            path="/:username/posts/:id"
            element={user ? <PostPage /> : <Navigate to={"/auth"} />}
          />
        </Routes>
      </Container>
    </>
  );
}

export default App;
