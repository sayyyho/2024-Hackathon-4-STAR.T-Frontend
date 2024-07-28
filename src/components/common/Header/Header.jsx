import * as S from "./style";

export const Header = (props) => {
  return (
    <S.Header>
      <S.Title>{props.children}</S.Title>
    </S.Header>
  );
};