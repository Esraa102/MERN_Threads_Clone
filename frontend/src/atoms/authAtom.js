import { atom } from "recoil";

const authScreenAtom = atom({
  key: "auth",
  default: "login",
});

export default authScreenAtom;
