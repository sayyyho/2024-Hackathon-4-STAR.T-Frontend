import * as S from "./styled";
import { Header } from "../../components/common/Header/Header";
import { CustomCalendar } from "../../components/CustomCalendar/CustomCalendar";
import { getMonthCalenar } from "../../apis/calendar";
import { useEffect } from "react";

export const Calendar = () => {
    const fetchData = async () => {
    const res = await getMonthCalenar();
    console.log(res);
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <S.Layout>
      <Header $margin={"1rem 0 0 0"} $padding={"1rem 1rem 0 1rem"}>
        캘린더
      </Header>
      <CustomCalendar />
    </S.Layout>
  );
};
