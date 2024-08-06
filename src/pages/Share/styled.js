import { styled } from "styled-components";
import Back from "../../assets/background.svg";

export const Wrapper = styled.div`
  display: flex;
  width: 100%;
  min-height: 100vh;
  background-size: cover;
  flex-direction: column;
  background-size: cover;
  padding-bottom: 5.5rem;

  .Container {
    min-height: 100%;
    background-image: url(${Back});
  }
`;
export const Header = styled.div`
  position: relative;
  width: 100%;
`;
export const BannerImage = styled.img`
  display: block;
  width: 100%;
  height: 282px;
  object-fit: cover;

  position: relative;
`;

export const BlurImage = styled.img`
  position: absolute;
  z-index: 5;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 90px;
  object-fit: cover;
`;
export const BannerTitle = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;

  bottom: 70px;
  left: 10px;
  z-index: 3;
  font-size: 1.8rem;
  color: white;
  font-weight: 600;
  .profession {
    color: var(--naver-text, #fff);
    font-family: "AppleSDGothicNeoL";
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`;
export const RoutineBoxContainer = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 3rem;
  margin-bottom: 2rem;
`;

export const ClearCantainr = styled.div`
  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;
  gap: 2rem;
`;

export const ClearMain = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  flex: 1;
  justify-content: center;
  align-items: center;
  gap: 20px;
  color: white;

  .imgContainer {
    position: relative;
    display: flex;
    width: 100%;
    margin: 0;
    padding: 0;
    justify-content: center;
    align-items: center;
  }

  .icon2 {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 2;
    transform: translate(-50%, -50%);
  }
  .textOverlay {
    position: absolute;
    top: 47%;
    left: 50%;
    z-index: 5;
    font-weight: bold;
    text-align: center;
    color: white;
    font-size: 2rem;
    transform: translate(-50%, -50%);
  }

  .text {
    color: var(--naver-text, #fff);
    text-align: center;
    font-family: "AppleSDGothicNeoL";
    font-size: 24px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`;
export const shareBtn = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 5px;
  width: 260px;
  height: 40px;
  color: white;
  background-color: #78a1b5;

  border-radius: 19px;

  padding: 6px;

  .ImgSave {
    display: flex;

    font-size: 1rem;
    justify-content: center;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;
    text-align: center;
  }
`;
export const shareContainr = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
  font-size: 1rem;
  margin-bottom: 3rem;
  .backBtn {
    display: flex;
    width: 260px;
    height: 40px;
    padding: 6px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    margin: 0.5rem 0;
    color: black;
    flex-shrink: 0;
    font-size: 1rem;
    text-align: center;
    border-radius: 19px;
    border: 1px solid #c4d9e2;
    background: rgba(196, 217, 226, 0.5);
  }
`;
