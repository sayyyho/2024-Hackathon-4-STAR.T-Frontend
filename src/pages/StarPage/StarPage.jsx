import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./styled";
import { useMoveonStarP } from "../../hooks/useStar";
import MainRoutineBox from "../../components/mainRoutineBox/MainRoutineBox";
import DateRangeCalendar from "../../components/DateRangeCalendar/DateRangeCalendar";
import Modal from "../../components/Modal/Modal";
import { CheckUp } from "../../components/CheckUp/CheckUp";
import { StarHeader } from "../../components/StarHeader/StarHeader";
import { useRecoilValue, useRecoilState, useSetRecoilState } from "recoil";
import {
  routineStart,
  routineEnd,
  CalendarVisible,
  CheckVisible,
  registerID,
} from "../../stores/routineRegister";
import { format, addHours } from "date-fns";
import { isLoading } from "@/stores/loading";
import { Loading } from "../Loading/Loading";

const StarPage = () => {
  const { starP } = useMoveonStarP();
  const startDay = useRecoilValue(routineStart);
  const endDay = useRecoilValue(routineEnd);
  const [isCalendarVisible, setIsCalendarVisible] =
    useRecoilState(CalendarVisible);
  const [isCheckVisible, setIsCheckVisible] = useRecoilState(CheckVisible);
  const setID = useSetRecoilState(registerID);
  const starData = starP && starP.data ? starP.data : null;
  const [term, setTerm] = useState(0);
  const loadingStatus = useRecoilValue(isLoading);
  const handlePlusButtonClick = (routineId) => {
    setIsCalendarVisible(true);
    setID(routineId);
  };
  const navigate = useNavigate();

  const handleCloseModal = () => {
    setIsCalendarVisible(false);
    setIsCheckVisible(false);
  };

  useEffect(() => {
    if (startDay && endDay) {
      const startDate = new Date(startDay);
      const endDate = new Date(endDay);
      const differenceInTime = endDate.getTime() - startDate.getTime();
      const differenceInDays = differenceInTime / (1000 * 3600 * 24) + 1;
      setTerm(differenceInDays);
    }
  }, [startDay, endDay]);

  if (!starData || loadingStatus) {
    return <Loading />; // theme이 null인 경우 처리
  }

  const formatDate = (date) => {
    const zonedDate = addHours(new Date(date), 9); // 한국 시간으로 변환
    return format(zonedDate, "yyyy.MM.dd"); // 포맷팅
  };
  const moveonShareP = () => {
    const id = starData.id;
    navigate(`/share/${id}`);
  };
  return (
    <>
      <S.Header>
        <S.BannerImage src={starData.photo} alt={starData.name} />
        <S.BannerTitle>
          <div>{starData.name}</div>
          <div className="profession">{starData.profession}</div>
        </S.BannerTitle>
      </S.Header>
      <StarHeader
        usercount={starData.routines_count.user_count}
        totalcount={starData.routines_count.total_count}
        completecount={starData.routines_added_count}
        onClick={moveonShareP}
      />
      <S.RoutineBoxContainer>
        {starData.routines.length > 0 ? (
          starData.routines.map((item) => (
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
          <p>데이터를 불러오는 중입니다...</p>
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
            onClose={() => setIsCheckVisible(false)}
          />
        </Modal>
      )}
    </>
  );
};

export default StarPage;
