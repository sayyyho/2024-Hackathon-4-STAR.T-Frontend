import { instance } from "./instance";

export const getUserStatus = async () => {
  const data = await instance.get("/api/accounts/user");
  console.log(data);
};
