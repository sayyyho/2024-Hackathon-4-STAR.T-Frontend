export const captureScreenshot = async (canvas) => {
  const shareButton = document.getElementById("share-button");

  // Hide the share button during capture
  if (shareButton) shareButton.style.display = "none";

  try {
    // Capture the canvas image
    const dataUrl = canvas.toDataURL("image/png");
    const blob = await fetch(dataUrl).then((res) => res.blob());

    // Use Web Share API if available
    if (navigator.share) {
      await navigator.share({
        files: [new File([blob], "start.png", { type: "image/png" })],
        title: "STAR.T",
        text: "likelion-start.site",
      });
      console.log("Share was successful.");
    } else {
      alert("Web Share API가 지원되지 않는 환경입니다.");
    }
  } catch (error) {
    console.log("Sharing failed", error);
    alert("현재 MDN에서 제공하는 Web Share API는 애플 기기 미지원 상태입니다.");
  } finally {
    // Show the share button again after sharing
    if (shareButton) shareButton.style.display = "block";
  }
};
