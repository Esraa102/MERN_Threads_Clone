const baseURL = "http://localhost:5000/api/v1";

const signUpUser = async (userInfo) => {
  const res = await fetch(`${baseURL}/auth/register`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userInfo),
  });
  const data = await res.json();
  if (data.statu === "Error") {
    console.log(data);
    throw new Error(data.message);
  }
  return data;
};

const logInUser = async (userInfo) => {
  const res = await fetch(`${baseURL}/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userInfo),
  });
  const data = await res.json();
  if (data.status === "Error") {
    console.log(data);
    throw new Error(data.message);
  }
  return data;
};

const logOutUser = async () => {
  const res = await fetch(`${baseURL}/auth/logout`, {
    method: "GET",
    credentials: "include",
  });
  const data = await res.json();
  if (data.statu === "Error") {
    console.log(data);
    throw new Error(data.message);
  }
  return data;
};

const checkAuth = async () => {
  const res = await fetch(`${baseURL}/auth/check-auth`, {
    method: "GET",
    credentials: "include",
  });
  const data = await res.json();
  if (data.statu === "Error") {
    console.log(data);
    throw new Error(data.message);
  }
  return data;
};
export { signUpUser, logInUser, logOutUser, checkAuth };
