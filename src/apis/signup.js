import { instance } from "./instance";

export const getUserStatus = async () => {
  console.log(instance.get("/api/accounts/user"));
};
