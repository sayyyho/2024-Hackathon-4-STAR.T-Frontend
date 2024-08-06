import React, { useRef, useState, useEffect } from "react";
import html2canvas from "html2canvas";
import { captureScreenshot } from "@/utils/share";
import { getStarContent } from "@/apis/starP";
import * as S from "./styled";
import shareIcon from "@/assets/shareIcon.svg";
import ClearStarPIcon1 from "@/assets/starclearPicon1.svg";
import ClearStarPIcon2 from "@/assets/starclearPicon2.svg";
import blur from "@/assets/blur.svg";
import { useParams } from "react-router-dom";
import { Loading } from "../Loading/Loading";

const SharePage = ({ onBack }) => {
  const captureRef = useRef();
  const [isButtonVisible, setIsButtonVisible] = useState(true);
  const [starP, setStarP] = useState(null);
  const { starid } = useParams();
  console.log(starid);

  const fetchStarData = async () => {
    console.log(starid);
    try {
      const res = await getStarContent(starid);
      console.log(res);
      setStarP(res);
    } catch (error) {
      console.log("..");
    }
  };

  useEffect(() => {
    fetchStarData();
  }, []);

  const handleCapture = async () => {
    setIsButtonVisible(false);
    setTimeout(async () => {
      const canvas = await html2canvas(captureRef.current, { useCORS: true });
      await captureScreenshot(canvas);

    } catch (error) {
    } finally {

      setIsButtonVisible(true);
    }, 100);
  };

  const starData = starP && starP.data ? starP.data : null;
  if (!starData) {
    return <Loading />;
  }
  return (
    <div
      style={{
        width: "100%",
      }}
    >
      <div
        style={{
          width: "100%",
          minHeight: "100%",
        }}
        ref={captureRef}
      >
        {/* 캡처할 내용 */}
        <S.Wrapper>
          <S.Header>
            <S.BannerImage src={starData.photo} alt={starData.name} />
            <S.BannerTitle>
              <div>{starData.name}</div>
              <div className="profession">{starData.profession}</div>
            </S.BannerTitle>
            <S.BlurImage className="blur" src={blur} />
          </S.Header>
          <div className="Container">
            <S.ClearCantainr>
              <S.ClearMain>
                <div className="text">축하합니다!</div>
                <div className="imgContainer">
                  <img src={ClearStarPIcon1} />
                  <img className="icon2" src={ClearStarPIcon2} />
                  <div className="textOverlay">
                    {starData.routines_added_count}회
                  </div>
                </div>
                <div className="text">루틴 완료 달성!</div>
              </S.ClearMain>
            </S.ClearCantainr>
            {
              <div
                id="share-button"
                style={{
                  visibility: isButtonVisible ? "visible" : "hidden",
                  width: "100%",
                  height: "100%",
                }}
              >
                <S.shareContainr>
                  <S.shareBtn onClick={handleCapture}>
                    <div className="ImgSave">
                      이미지 저장하고 공유하기
                      <img src={shareIcon} />
                    </div>
                  </S.shareBtn>
                  <button className="backBtn" onClick={onBack}>
                    뒤로가기
                  </button>
                </S.shareContainr>
              </div>
            }
          </div>
        </S.Wrapper>
      </div>
    </div>
  );
};

export default SharePage;
