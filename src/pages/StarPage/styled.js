import { styled } from "styled-components";

export const Header = styled.div`
  position: relative;
  width: 100%;
`;
export const BannerImage = styled.img`
  display: block;
  width: 100%;
  height: 282px;
  object-fit: cover;
  mask-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 1) 60%,
    rgba(0, 0, 0, 0) 100%
  );
  position: relative;
`;
export const BannerTitle = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;

  bottom: 70px;
  left: 10px;
  z-index: 2;
  font-size: 1.8rem;
  color: white;
  font-weight: 600;
`;
export const RoutineBoxContainer = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 3rem;
  margin-bottom: 10rem;
`;
export const ScoreContainer = styled.div`
  display: flex;
  width: 98%;
  align-items: center;
  justify-content: space-between;
  margin-top: 1.5rem;
`;
export const Ranking = styled.div`
  display: flex;

  .Percentage {
    margin: 0 0.3rem;
  }
`;
