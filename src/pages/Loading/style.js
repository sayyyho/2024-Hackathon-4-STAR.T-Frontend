import styled from "styled-components";
import Back from "../../assets/background.svg";

export const Layout = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;

  flex-direction: column;
  background-image: url(${Back});

  background-color: transparent;
  background-repeat: none;
  background-size: cover;
`;
export const LogoContainr = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 4rem;
`;
export const formWrapper = styled.form`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 2rem;
  margin-top: 2rem;
  align-items: center;
  width: 80%;

  .Inputform {
    display: flex;
    width: 300px;
    height: 50px;
    padding: 14px 21px;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;
    border-radius: 15px;
    border: 1px solid #78a1b5;
    background: rgba(255, 255, 255, 0.7);
  }

  .userPrivacy {
    color: #fff;
    font-family: "AppleSDGothicNeoM";
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    display: flex;
    align-self: flex-start;
    padding: 1rem;
  }

  .confirmBtn {
    display: flex;
    width: 160px;
    height: 32px;
    padding: 6px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;
    border-radius: 15px;
    background-color: #78a1b5;
    color: white;
  }
  .containr {
    width: 100%;
  }
`;
export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  margin-top: 1rem;
  width: 80%;

  .backBtn {
    display: flex;
    width: 160px;
    height: 32px;
    padding: 6px;
    color: white;
    justify-content: center;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;
    border-radius: 15px;
    background-color: #78a1b5;
  }

  .title {
    color: #fff;
    align-self: flex-start;
    padding: 1rem;
    font-family: "AppleSDGothicNeoM";
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`;
