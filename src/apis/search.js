import { instance } from "./instance";

export const getSearchContent = async (data) => {
  try {
    const res = await instance.get(`/api/search?data=${data}`);
    return res;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
