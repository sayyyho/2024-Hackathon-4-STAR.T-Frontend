import React, { useState, useEffect } from "react";
import * as S from "./styled";
import { Header } from "../../components/common/Header/Header";
import DiceBackground from "../../assets/DiceBackground.svg";
import star1 from "../../assets/star1.svg";
import GradientBackground from "../../components/GradientBackground/GradientBackground";
import { getRandomRoutine } from "../../apis/random";
import Modal from "../../components/Modal/Modal";
import { CheckUp } from "../../components/CheckUp/CheckUp";
import DateRangeCalendar from "../../components/DateRangeCalendar/DateRangeCalendar";
import { useSetRecoilState, useRecoilState, useRecoilValue } from "recoil";
import {
  routineStart,
  routineEnd,
  CalendarVisible,
  CheckVisible,
  registerID,
} from "../../stores/routineRegister";

// 이미지 배열
const images = [
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTy1Qh1wxZdS3QDFdjpSPK0FysKm0EHjxmsXg&s",
  "https://i.namu.wiki/i/n2LztcrML9hzPww_iKNeMuh34vg48dkmZmGuMEC_e-DSpNoPGwch9nR9FZz9WfVx6nvv5aSDxqlxEG8iA9tcLQ.webp",
  "https://www.dongguk.edu/resources/images/site/contents/img_ethic01.jpg",
  star1,
];

export const RandomDice = () => {
  const [currentImage, setCurrentImage] = useState(DiceBackground);
  const [rolling, setRolling] = useState(false);
  const [data, setData] = useState({});
  const [showContent, setShowContent] = useState(false);
  const setID = useSetRecoilState(registerID);
  const startDay = useRecoilValue(routineStart);
  const endDay = useRecoilValue(routineEnd);
  const [isCheckVisible, setIsCheckVisible] = useRecoilState(CheckVisible);
  const [isCalendarVisible, setIsCalendarVisible] =
    useRecoilState(CalendarVisible);
  const [term, setTerm] = useState(null);
  const [containerStyle, setContainerStyle] = useState({
    justifyContent: "center",
    alignItems: "center",
  });

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

  // 날짜 포맷팅
  const formatDate = (date) => {
    const dateObj = typeof date === "string" ? new Date(date) : date;
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const day = String(dateObj.getDate()).padStart(2, "0");
    return `${year}.${month}.${day}`;
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
  };

  const handleAgainClick = () => {
    setRolling(true);
    setShowContent(false);
  };

  const handleAddCalendar = () => {
    setIsCalendarVisible(true);
    setID(data.id);
  };

  const textColor = !showContent ? "black" : "white";

  return (
    <S.Layout>
      <GradientBackground showContent={showContent} />
      <Header
        $margin={"1rem 0 0 0"}
        $padding={"1rem 1rem 0 1rem"}
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
        <S.Gif style={{ backgroundImage: `url(${currentImage})` }} />
        {!showContent ? (
          <div className="coment">
            <div className="line">당신의 건강한 생활을 도와줄</div>
            <div className="line">루틴을 뽑아보세요!</div>
          </div>
        ) : (
          <div className="content">
            <div className="title">{data.title}</div>
            <div className="description">{data.content}</div>
          </div>
        )}
        {!showContent ? (
          <S.ThrowButton onClick={handleRollClick}>주사위 돌리기</S.ThrowButton>
        ) : (
          <div className="buttons">
            <button className="Add" onClick={handleAddCalendar}>
              내 캘린더에 추가
            </button>
            <button className="Again" onClick={handleAgainClick}>
              다시 돌리기
            </button>
          </div>
        )}
      </S.Container>
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
    </S.Layout>
  );
};
