import React, { useState } from "react";
import * as S from "./styled";
import IconUnChecked from "../../assets/IconUnChecked.svg";
import IconChecked from "../../assets/IconChecked.svg";
import { useRecoilValue } from "recoil";
import { agree1, agree2 } from "@/stores/signup";

const PrivacyContainer = ({
  index,
  text,
  onArrowClick,
  setFirstCheck,
  setSecondCheck,
}) => {
  const firstCheck = useRecoilValue(agree1);
  const secondCheck = useRecoilValue(agree2);
  const handleCheckClick = () => {
    if (index === 0) {
      setFirstCheck(!firstCheck);
    } else {
      setSecondCheck(!secondCheck);
    }
  };
  const handleArrowClick = () => {
    if (onArrowClick) {
      onArrowClick(text);
    }
  };
  return (
    <S.Wrapper>
      <img
        src={
          (index === 0 && firstCheck) || (index === 1 && secondCheck)
            ? IconUnChecked
            : IconChecked
        }
        alt="Checkbox Icon"
        className="icon"
        onClick={handleCheckClick}
      />
      <label className="label" onClick={() => onArrowClick(text)}>
        <div className="text">{text}</div>
        <svg
          className="arrow"
          xmlns="http://www.w3.org/2000/svg"
          width="19"
          height="21"
          viewBox="0 0 19 21"
          fill="none"
          onClick={handleArrowClick}
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M6.55354 2.21076L13.7965 9.46676C13.8617 9.52906 13.9135 9.60407 13.9486 9.68714C13.9836 9.77021 14.0013 9.85959 14.0005 9.94976C14.0009 10.042 13.9831 10.1333 13.9481 10.2186C13.9131 10.3039 13.8616 10.3814 13.7965 10.4468C11.1765 13.0028 8.65154 15.4698 6.22154 17.8478C6.09654 17.9648 5.59654 18.2558 5.21054 17.8238C4.82454 17.3908 5.05854 17.0138 5.21054 16.8578L12.2785 9.94976L5.53154 3.19076C5.28554 2.85143 5.30554 2.53843 5.59154 2.25176C5.87821 1.9651 6.19887 1.95076 6.55354 2.21076Z"
            fill="white"
          />
        </svg>
      </label>
    </S.Wrapper>
  );
};
export default PrivacyContainer;
