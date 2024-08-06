import React, { useState, useEffect, useRef } from "react";
import * as S from "./styled";
import { Header } from "../../components/common/Header/Header";
import DiceBackground from "@/assets/DiceBackground.svg";
import GradientBackground from "@/components/GradientBackground/GradientBackground";
import { getRandomRoutine } from "@/apis/random";
import Modal from "@/components/Modal/Modal";
import { CheckUp } from "@/components/CheckUp/CheckUp";
import DateRangeCalendar from "@/components/DateRangeCalendar/DateRangeCalendar";
import { ErrorAlert } from "@/components/common/ErorrAlert/ErrorAlert";
import { useSetRecoilState, useRecoilState, useRecoilValue } from "recoil";
import {
  routineStart,
  routineEnd,
  CalendarVisible,
  CheckVisible,
  registerID,
} from "../../stores/routineRegister";
import { format } from "date-fns";
import { addHours } from "date-fns";
import { images } from "@/constants/RandomDice/dummy";
import { modalStatus } from "@/stores/calendar";

export const RandomDice = () => {
  const [currentImage, setCurrentImage] = useState(DiceBackground);
  const showModal = useRecoilValue(modalStatus);
  const [rolling, setRolling] = useState(false);
  const [data, setData] = useState({});
  const [showContent, setShowContent] = useState(false);
  const setID = useSetRecoilState(registerID);
  const [startDay, setStartDay] = useRecoilState(routineStart);
  const [endDay, setEndDay] = useRecoilState(routineEnd);
  const [isCheckVisible, setIsCheckVisible] = useRecoilState(CheckVisible);
  const [isCalendarVisible, setIsCalendarVisible] =
    useRecoilState(CalendarVisible);
  const [term, setTerm] = useState(null);
  const [containerStyle, setContainerStyle] = useState({
    justifyContent: "center",
    alignItems: "center",
  });
  const [clickCalendarButton, setClickCalendarButton] = useState(false);
  const calendarRef = useRef(null);

  // 화면 크기 조정에 따른 스타일 변경
  useEffect(() => {
    const handleResize = () => {
      setContainerStyle({
        justifyContent: window.innerWidth > 768 ? "center" : "flex-start",
        alignItems: "center",
      });
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 루틴 기간 계산
  useEffect(() => {
    if (startDay && endDay) {
      const startDate = new Date(startDay);
      const endDate = new Date(endDay);
      const differenceInTime = endDate.getTime() - startDate.getTime();
      const differenceInDays = differenceInTime / (1000 * 3600 * 24) + 1;
      setTerm(differenceInDays);
    }
  }, [startDay, endDay]);

  // 날짜 포맷팅 (한국 시간으로 변환)
  const formatDate = (date) => {
    const zonedDate = addHours(new Date(date), 9); // 한국 시간으로 변환
    return format(zonedDate, "yyyy.MM.dd"); // 포맷팅
  };

  // 주사위 굴리기 로직
  useEffect(() => {
    let interval;
    if (rolling) {
      interval = setInterval(() => {
        const randomImage = images[Math.floor(Math.random() * images.length)];
        setCurrentImage(randomImage);
      }, 100);

      setTimeout(async () => {
        clearInterval(interval);
        try {
          const res = await getRandomRoutine();
          setCurrentImage(res.image);
          setData(res);
        } catch (err) {
          console.error("Failed to fetch random routine:", err);
        }
        setRolling(false);
        setShowContent(true);
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [rolling]);

  const handleRollClick = () => {
    setRolling(true);
    setShowContent(false);
  };

  const handleCloseModal = () => {
    setIsCalendarVisible(false);
    setIsCheckVisible(false);
    setStartDay(null);
    setEndDay(null);
  };

  const handleAgainClick = () => {
    setRolling(true);
    setShowContent(false);
    setClickCalendarButton(false);
    if (calendarRef.current) {
      calendarRef.current.resetCalendar(); // 캘린더 초기화 함수 호출
    }
  };

  const handleAddCalendar = () => {
    setIsCalendarVisible(true);
    setID(data.id);
  };

  const textColor = !showContent ? "black" : "white";
  const contentArray = (data.content || "").split("-");

  contentArray.shift();
  return (
    <S.Layout>
      <ErrorAlert show={showModal} />
      <GradientBackground showContent={showContent} />
      <Header
        $margin={"1rem 0 0 0"}
        $padding={"1rem 1rem 0 2rem"}
        color={textColor}
      >
        랜덤 루틴
      </Header>
      <S.Container
        style={{
          justifyContent: containerStyle.justifyContent,
          alignItems: containerStyle.alignItems,
        }}
      >
        {showContent && <div className="celebrity">{data.celebrity}</div>}
        <S.Gif style={{ backgroundImage: `url(${currentImage})` }} />
        {!showContent ? (
          <div className="coment">
            <div className="line">당신의 건강한 생활을 도와줄</div>
            <div className="line">루틴을 뽑아보세요!</div>
          </div>
        ) : (
          <div className="content">
            <div className="title">{data.title}</div>

            <div className="routinecontent">
              {contentArray.map((line, index) => (
                <div key={index}>‣ {line.trim()}</div>
              ))}
            </div>
          </div>
        )}
        {!showContent ? (
          <S.ThrowButton onClick={handleRollClick}>주사위 돌리기</S.ThrowButton>
        ) : (
          <div className="buttons">
            {!clickCalendarButton && (
              <button className="Add" onClick={handleAddCalendar}>
                내 캘린더에 추가
              </button>
            )}
            <button className="Again" onClick={handleAgainClick}>
              다시 돌리기
            </button>
          </div>
        )}
      </S.Container>
      {isCalendarVisible && (
        <Modal onClose={handleCloseModal}>
          <DateRangeCalendar ref={calendarRef} />
        </Modal>
      )}
      {isCheckVisible && (
        <Modal onClose={handleCloseModal}>
          <CheckUp
            term={term}
            onClose={() => {
              setClickCalendarButton(true);
            }}
          />
        </Modal>
      )}
    </S.Layout>
  );
};
