import { instance } from "./instance";

export const postRoutineRegister = async (start_date, end_date, id) => {
  try {
    const res = await instance.post(`/api/add_routine/${id}/`, {
      start_date,
      end_date,
      id,
    });
    return res;
  } catch (err) {
    console.log(err);
    return false;
  }
};
