import { Routes, Route } from "react-router-dom";
import { Home, PostPage, SignIn, SignUp, UserPage } from "./pages";
import { Container } from "@chakra-ui/react";
import { Header } from "./components";

function App() {
  return (
    <>
      <Header />
      <Container marginTop={"110px"} maxWidth={"620px"}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/:username" element={<UserPage />} />
          <Route path="/:username/posts/:id" element={<PostPage />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
