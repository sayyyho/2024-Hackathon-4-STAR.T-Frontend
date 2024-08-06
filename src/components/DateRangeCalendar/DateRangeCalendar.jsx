import React, { useState, forwardRef } from "react";
import * as S from "./styled";
import {
  routineStart,
  routineEnd,
  CalendarVisible,
  CheckVisible,
  registerID,
} from "../../stores/routineRegister";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { postRoutineRegister } from "../../apis/register";
import { format } from "date-fns";
import { addHours } from "date-fns";
import { modalStatus } from "@/stores/calendar";
const setShowModal = useSetRecoilState(modalStatus);

const DateRangeCalendar = forwardRef((ref) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedStartDate, setSelectedStartDate] =
    useRecoilState(routineStart);
  const [selectedEndDate, setSelectedEndDate] = useRecoilState(routineEnd);
  const [, setIsCalendarVisible] = useRecoilState(CalendarVisible);
  const [, setIsCheckVisible] = useRecoilState(CheckVisible);
  const id = useRecoilValue(registerID);
  const timeZone = "Asia/Seoul";
  const getZonedDate = (date) => addHours(new Date(date), 9);

  const handleDateClick = (date) => {
    const zonedDate = getZonedDate(date);
    if (!selectedStartDate || (selectedStartDate && selectedEndDate)) {
      setSelectedStartDate(zonedDate);
      setSelectedEndDate(null);
    } else if (
      selectedStartDate &&
      !selectedEndDate &&
      zonedDate > selectedStartDate
    ) {
      setSelectedEndDate(zonedDate);
    } else {
      setSelectedStartDate(zonedDate);
      setSelectedEndDate(null);
    }
  };

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
      const zonedDate = getZonedDate(date);
      const isSelectedStart =
        selectedStartDate &&
        zonedDate.toDateString() === selectedStartDate.toDateString();
      const isSelectedEnd =
        selectedEndDate &&
        zonedDate.toDateString() === selectedEndDate.toDateString();
      const isInRange =
        selectedStartDate &&
        selectedEndDate &&
        zonedDate > selectedStartDate &&
        zonedDate < selectedEndDate;

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

  const handleMonthChange = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const handleConfirm = async () => {
    if (selectedStartDate && selectedEndDate) {
      const formattedStartDate = format(selectedStartDate, "yyyy-MM-dd", {
        timeZone,
      });
      const formattedEndDate = format(selectedEndDate, "yyyy-MM-dd", {
        timeZone,
      });
      console.log("formatted날짜까지 들어옴");
      try {
        const response = await postRoutineRegister(
          formattedStartDate,
          formattedEndDate,
          id
        );
        if (response.status === 200 || response.status === 201) {
          setSelectedStartDate(selectedStartDate);
          setSelectedEndDate(selectedEndDate);
          setIsCalendarVisible(false);
          setIsCheckVisible(true);
          setTimeout(() => {
            if (window.location.href.includes("theme")) {
              window.location.reload();
            }
          }, 2000); //
        } else {
          setShowModal(true);
        }
      } catch (error) {
        setShowModal(true);
      }
    } else {
      setShowModal(true);
    }
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
            {currentDate.toLocaleString("default", { month: "long" })}
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
});

export default DateRangeCalendar;
