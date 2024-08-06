import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { CSSTransition } from "react-transition-group";

const slideDown = keyframes`
  0% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(0);
  }
`;

const slideUp = keyframes`
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-100%);
  }
`;

const ModalLayout = styled.div`
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  display: flex;
  justify-content: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  width: fit-content;
  background: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  padding: 8px 16px;
  border-radius: 10px;
  border: 1px #78a1b5;

  animation: ${(props) => (props.state === "entering" ? slideDown : slideUp)}
    0.5s forwards;

  &.modal-enter {
    animation: ${slideDown} 0.5s forwards;
  }

  &.modal-exit {
    animation: ${slideUp} 0.5s forwards;
  }
`;

export const ErrorAlert = ({ show }) => (
  <CSSTransition in={show} timeout={500} classNames="modal" unmountOnExit>
    <ModalLayout>
      <ModalContainer state={show ? "entering" : "exiting"}>
        <p>과거 날짜는 등록할 수 없습니다.</p>
      </ModalContainer>
    </ModalLayout>
  </CSSTransition>
);
