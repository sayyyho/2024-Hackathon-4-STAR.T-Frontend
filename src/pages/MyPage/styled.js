import styled from "styled-components";

export const Layout = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: space-around;
  gap: 5px;
  margin-bottom: 9rem;
  @media (min-height: 720px) {
    justify-content: flex-start;
    gap: 40px;
    height: 640px;
  }

  .MyStar {
    font-size: 1.4rem;
    font-weight: 600;
    margin: 0.5rem 0;
  }

  .Privacy {
    display: flex;
    width: 100%;
    font-size: 1.2rem;
    border-bottom: 1px solid black;
    padding-bottom: 1rem;
    color: inherit;
    font: inherit;
    cursor: pointer;
    text-decoration: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;

    &:focus {
      outline: none;
    }

    &:active {
      color: inherit; /* 색상 변화 없도록 설정 */
    }

    &:visited {
      color: inherit; /* 방문 후 색상 변화 없도록 설정 */
    }
  }

  .emptytext {
    display: flex;
    font-size: 1.2rem;
    font-weight: 600;
    justify-self: center;
    align-self: center;
  }
`;

export const MypageWrapper = styled.div`
  display: flex;
  width: 100%;
  gap: 20px;
  flex-direction: column;
  align-items: flex-start;
  padding: 0 1.5rem;

  .button {
    background: none;
    border: none;
    color: inherit;
    font: inherit;
    cursor: pointer;
    outline: inherit;

    &:focus {
      outline: none;
    }

    &:active {
      outline: none;
    }
  }
`;
export const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 20px;
`;

export const StarImg = styled.img`
  display: flex;
  width: 65px;
  height: 65px;
  flex-shrink: 0;
  object-fit: cover;
  border-radius: 10px;
`;

export const info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  flex-grow: 2;
  font-size: 1.3rem;
`;
