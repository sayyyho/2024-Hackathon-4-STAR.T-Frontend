import React, { useState, useEffect } from "react";
import * as S from "./styled";
import CategoryTitle from "../../components/CategoryTitle/CategoryTitle";
import { useMoveonTheme } from "../../hooks/useTheme";
import MainRoutineBox from "../../components/mainRoutineBox/MainRoutineBox";
import Modal from "../../components/Modal/Modal";
import DateRangeCalendar from "../../components/DateRangeCalendar/DateRangeCalendar";
import { CheckUp } from "../../components/CheckUp/CheckUp";
import { useRecoilState, useSetRecoilState } from "recoil";
import { Loading } from "../Loading/Loading";
import {
  routineStart,
  routineEnd,
  CalendarVisible,
  CheckVisible,
  registerID,
} from "../../stores/routineRegister";
import { format } from "date-fns";
import { addHours } from "date-fns";

const ThemePage = () => {
  const [startDay, setStartDay] = useRecoilState(routineStart);
  const [endDay, setEndDay] = useRecoilState(routineEnd);
  const [isCalendarVisible, setIsCalendarVisible] =
    useRecoilState(CalendarVisible);
  const [isCheckVisible, setIsCheckVisible] = useRecoilState(CheckVisible);
  const setID = useSetRecoilState(registerID);
  const { theme } = useMoveonTheme();

  const themeData = theme && theme.data ? theme.data : null;
  const [term, setTerm] = useState(0);

  const handlePlusButtonClick = (routineId) => {
    setIsCalendarVisible(true);
    setID(routineId);
  };

  const handleCloseModal = () => {
    setIsCalendarVisible(false);
    setIsCheckVisible(false);
  };

  //객체로 term 계산
  useEffect(() => {
    if (startDay && endDay) {
      const startDate = new Date(startDay);
      const endDate = new Date(endDay);
      const differenceInTime = endDate.getTime() - startDate.getTime();
      const differenceInDays = differenceInTime / (1000 * 3600 * 24) + 1;
      setTerm(differenceInDays);
    }
  }, [startDay, endDay]);

  if (!themeData) {
    return <Loading />; // theme이 null인 경우 처리
  }

  const formatDate = (date) => {
    const zonedDate = addHours(new Date(date), 9); // 한국 시간으로 변환
    return format(zonedDate, "yyyy.MM.dd"); // 포맷팅
  };

  return (
    <>
      <S.Header>
        <S.Bannerimage
          src={themeData.theme_image}
          alt={themeData.theme_title}
        />
        <S.BannerTitle>{themeData.theme_title} </S.BannerTitle>
      </S.Header>
      <S.descriptionContainer>
        <CategoryTitle section={themeData.theme_content} fontSize="13px" />
      </S.descriptionContainer>
      <S.RoutineBoxContainer>
        {themeData.routine ? (
          themeData.routine.map((item) => (
            <MainRoutineBox
              src={item.image || item.video_url}
              key={item.id}
              id={item.id}
              title={item.title}
              subtitle={item.sub_title}
              content={item.content}
              onPlusButtonClick={() => handlePlusButtonClick(item.id)}
            />
          ))
        ) : (
          <Loading />
        )}
      </S.RoutineBoxContainer>
      {isCalendarVisible && (
        <Modal onClose={handleCloseModal}>
          <DateRangeCalendar />
        </Modal>
      )}
      {isCheckVisible && (
        <Modal onClose={handleCloseModal}>
          <CheckUp
            startDay={formatDate(startDay)}
            endDay={formatDate(endDay)}
            term={term}
          />
        </Modal>
      )}
    </>
  );
};

export default ThemePage;
