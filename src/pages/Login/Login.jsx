import * as S from "./style";

import LOGO_BACKGROUND from "../../assets/logoContainer.svg";
import KAKAO from "../../assets/images/kakaoLogin.svg";
import { TITLE_TEXT } from "../../constants/Text/title";
import Star from "../../assets/images/loginStar.svg";
import GradientBackground from "../../components/GradientBackground/GradientBackground";
export const Login = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const showContent = true;
  return (
    <S.Layout>
      <GradientBackground showContent={showContent} />
      <S.ShootingStar />
      <S.ShootingStar />
      <S.ShootingStar />
      <S.LogoFrame>
        <S.TitleFrame>
          <S.TitleText>{TITLE_TEXT[0]}</S.TitleText>
          <S.TitleText>{TITLE_TEXT[1]}</S.TitleText>
        </S.TitleFrame>

        <S.LogoContainr>
          <S.SparkleStar src={Star} />
          <S.SparkleStar src={Star} />
          <S.SparkleStar src={Star} />
          <S.ImageFame src={LOGO_BACKGROUND} />
        </S.LogoContainr>
      </S.LogoFrame>
      <S.LoginContainer>
        <form method="POST" action={`${BASE_URL}/accounts/kakao/login/`}>
          <S.LoginView>
            <S.ImageFame src={KAKAO} />
          </S.LoginView>
        </form>
      </S.LoginContainer>
    </S.Layout>
  );
};

// 루틴 닉네임까지 설정된 유저인지 검증하는 로직 필요
// 설정됐으면 -> 메인, 아니면 -> 세팅
