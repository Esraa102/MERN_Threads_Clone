import { UserHeader, UserPost } from "../components";

const UserPage = () => {
  return (
    <div>
      <UserHeader />
      <UserPost
        likes={234}
        replies={103}
        postImg={"/assets/post1.png"}
        postTitle={"Let's talk about thread"}
      />
      <UserPost
        likes={1243}
        replies={898}
        postImg={"/assets/post2.png"}
        postTitle={"This is my first post"}
      />
      <UserPost likes={13499} replies={9823} postTitle={"Wow! Cool!"} />
    </div>
  );
};

export default UserPage;
