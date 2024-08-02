import React, { useState } from "react";
import * as S from "./styled";
import {
  routineStart,
  routineEnd,
  CalendarVisible,
  CheckVisible,
  registerID,
} from "../../stores/routineRegister";
import { useRecoilState, useRecoilValue } from "recoil";
import { postRoutineRegister } from "../../apis/register";

const DateRangeCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedStartDate, setSelectedStartDate] =
    useRecoilState(routineStart);
  const [selectedEndDate, setSelectedEndDate] = useRecoilState(routineEnd);
  const [, setIsCalendarVisible] = useRecoilState(CalendarVisible);
  const [, setIsCheckVisible] = useRecoilState(CheckVisible);
  const id = useRecoilValue(registerID);
  //루틴 목표날짜 startdate,enddate에 넣기
  const handleDateClick = (date) => {
    if (!selectedStartDate || (selectedStartDate && selectedEndDate)) {
      setSelectedStartDate(date);
      setSelectedEndDate(null);
    } else if (
      selectedStartDate &&
      !selectedEndDate &&
      date > selectedStartDate
    ) {
      setSelectedEndDate(date);
    } else {
      setSelectedStartDate(date);
      setSelectedEndDate(null);
    }
  };

  //루틴 목표날짜 지정
  const renderDays = () => {
    const days = [];
    const startOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );
    const endOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    );

    for (let i = 0; i < startOfMonth.getDay(); i++) {
      days.push(<S.EmptyDay key={`empty-${i}`} />);
    }

    for (let day = 1; day <= endOfMonth.getDate(); day++) {
      const date = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        day
      );
      const isSelectedStart =
        selectedStartDate &&
        date.toDateString() === selectedStartDate.toDateString();
      const isSelectedEnd =
        selectedEndDate &&
        date.toDateString() === selectedEndDate.toDateString();
      const isInRange =
        selectedStartDate &&
        selectedEndDate &&
        date > selectedStartDate &&
        date < selectedEndDate;

      days.push(
        <S.Day
          key={day}
          className={`${isSelectedStart ? "selected-start" : ""} ${
            isSelectedEnd ? "selected-end" : ""
          } ${isInRange ? "in-range" : ""}`}
          onClick={() => handleDateClick(date)}
        >
          {day}
        </S.Day>
      );
    }

    return days;
  };

  //월 이동
  const handleMonthChange = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const handleConfirm = async () => {
    if (selectedStartDate && selectedEndDate) {
      const formattedStartDate = selectedStartDate.toISOString().split("T")[0];
      const formattedEndDate = selectedEndDate.toISOString().split("T")[0];
      try {
        const response = await postRoutineRegister(
          formattedStartDate,
          formattedEndDate,
          id
          // 안되면 전역상태로 id관리 하기
        );

        console.log(response);
        if (response.status == 200 || response.status == 201) {
          // 예시: 서버 응답이 성공적인 경우
          setSelectedStartDate(formattedStartDate);
          setSelectedEndDate(formattedEndDate);
          setIsCalendarVisible(false);
          setIsCheckVisible(true);
        } else {
          console.error("Failed to register routine:", response.message);
        }
      } catch (error) {
        console.error(error);
      }
    } else if (selectedStartDate) {
      const formattedStartDate = selectedStartDate.toISOString().split("T")[0];
      console.log(`${formattedStartDate}~`);
    } else {
      console.log("No date selected");
    }

    setSelectedStartDate(formattedStartDate);
    setSelectedEndDate(formattedEndDate);
    setIsCalendarVisible(false);
    setIsCheckVisible(true);
  };
  return (
    <S.CalendarContainer>
      <S.CalendarHeader>
        <S.Headertitle>목표기간설정</S.Headertitle>
        <S.HeaderContainer>
          <S.CalendarHeaderButton onClick={() => handleMonthChange(-1)}>
            &lt;
          </S.CalendarHeaderButton>
          <S.CalendarHeaderTitle>
            {currentDate.toLocaleString("default", { month: "long" })}{" "}
          </S.CalendarHeaderTitle>
          <S.CalendarHeaderButton onClick={() => handleMonthChange(1)}>
            &gt;
          </S.CalendarHeaderButton>
        </S.HeaderContainer>
      </S.CalendarHeader>

      <S.CalendarBody>
        <S.DayName style={{ color: "#F00" }}>일</S.DayName>
        <S.DayName>월</S.DayName>
        <S.DayName>화</S.DayName>
        <S.DayName>수</S.DayName>
        <S.DayName>목</S.DayName>
        <S.DayName>금</S.DayName>
        <S.DayName style={{ color: "#78A1B5" }}>토</S.DayName>
        {renderDays()}
      </S.CalendarBody>
      <S.ConfirmButton onClick={handleConfirm}>확인</S.ConfirmButton>
    </S.CalendarContainer>
  );
};

export default DateRangeCalendar;
