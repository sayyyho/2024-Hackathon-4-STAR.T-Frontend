import * as S from "./style";
import BACKGROUND from "../../assets/loginBackground.svg";
import { ROUTINE_CATEGORY, TITLE } from "../../constants/Category/data";
import { Box } from "../../components/common/Box/Box";
import { Button } from "../../components/common/Button/Button";
import { getUserStatus } from "../../apis/signup";
import { useEffect } from "react";

export const SelectRoutine = () => {
  const getData = async () => {
    await getUserStatus();
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <S.Layout
      style={{
        backgroundImage: `url(${BACKGROUND})`,
      }}
    >
      <S.TitleView>
        <S.CutomTitle>{TITLE[0]}</S.CutomTitle>
        <S.CustomP color="white">{TITLE[1]}</S.CustomP>
      </S.TitleView>
      <S.CategoryView>
        {ROUTINE_CATEGORY.map((category, index) => (
          <Box onClick={() => console.log("state management part")} key={index}>
            {category}
          </Box>
        ))}
      </S.CategoryView>

      <S.SelectView>
        <Button
          width="50%"
          height="40px"
          $radius="15px"
          $background="#78A1B5"
          onClick={() => {
            console.log("select zone");
          }}
        >
          <S.CustomP color="white">확인</S.CustomP>
        </Button>
        <Button
          width="50%"
          height="40px"
          $radius="15px"
          $background="rgba(196, 217, 226, 0.50)"
          onClick={() => {
            console.log("select zone");
          }}
        >
          <S.CustomP color="black">건너뛰기</S.CustomP>
        </Button>
      </S.SelectView>
    </S.Layout>
  );
};
