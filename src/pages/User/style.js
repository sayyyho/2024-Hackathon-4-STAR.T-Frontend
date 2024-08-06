import styled, { keyframes } from "styled-components";

export const Layout = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  padding-top: 25%;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  z-index: 1;
  background-image: url(${(props) => props.$url});
  background-color: transparent;
  background-repeat: none;
  background-size: cover;
  transition: background-color 1.8s ease;
`;

export const TitleFrame = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 0.5rem;
  z-index: 2;
`;
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;
export const TitleText = styled.p`
  color: var(--naver-text, #fff);
  text-align: center;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  font-family: AppleSDGothicNeoM00;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  z-index: 2;
  opacity: 0;
  animation: ${fadeInUp} 1s forwards;
  &:nth-child(1) {
    animation-delay: 0.5s;
  }
  &:nth-child(2) {
    animation-delay: 1.5s;
  }
`;
export const LogoFrame = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4rem;
`;

const Sizeup = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(2);
  }
`;
export const LogoContainr = styled.div`
  width: 100%;
  height: 40%;
  background-size: cover;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  position: relative;
`;

export const SparkleStar = styled.img`
  position: absolute;
  z-index: 3;
  animation: ${Sizeup} infinite;

  &:nth-child(1) {
    left: 5px;
    top: 100px;
    animation-duration: 2s;
  }
  &:nth-child(2) {
    right: 5px;
    top: 2px;
    animation-duration: 4s;
  }
  &:nth-child(3) {
    right: 13px;
    top: 140px;
    animation-duration: 3s;
  }
`;

export const LoginContainer = styled.div`
  width: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 1rem;
  margin-top: 15%;
  z-index: 2;
`;

export const LoginView = styled.button`
  display: flex;
  justify-content: center;
  z-index: 2;
`;

export const ImageFame = styled.img`
  z-index: 2;
`;

export const CategoryWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CategoryView = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
`;

export const TitleView = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 7.5%;
  gap: 1rem;
`;

export const CutomTitle = styled.p`
  font-family: "AppleSDGothicNeoSB";
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  color: white;
`;

export const CustomP = styled.p`
  font-family: "AppleSDGothicNeoL";
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  color: ${(props) => props.color};
`;

export const SelectView = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 1rem;
  margin-top: 25%;
`;
