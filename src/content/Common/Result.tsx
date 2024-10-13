import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { UploadVideoResult } from "../../service/uploadVideo";
import { FC, useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import styled from "@emotion/styled";
import Button from "@mui/material/Button";
import { deidentification } from "../../service/deidentification";
import Checkbox from "@mui/material/Checkbox";
import "../../asset/fonts/font.css";

interface Props {
  file: File;
  result: UploadVideoResult;
}

const Video = styled.video`
  width: 100%;
  height: auto;
  object-fit: cover;
`;

const Result: FC<Props> = ({ file, result }) => {
  const { uuid, voices, faces, licensePlates } = result;

  const [selectedFaces, setSelectedFaces] = useState<number[]>([]);
  const [selectedLicensePlates, setSelectedLicensePlates] = useState<number[]>(
    []
  );
  const [selectedVoices, setSelectedVoices] = useState<number[]>([]);

  const handleFaceClick = (index: number) => {
    if (selectedFaces.includes(index)) {
      setSelectedFaces(selectedFaces.filter((i) => i !== index));
    } else {
      setSelectedFaces([...selectedFaces, index]);
    }
  };

  const handleLicensePlateClick = (index: number) => {
    if (selectedLicensePlates.includes(index)) {
      setSelectedLicensePlates(
        selectedLicensePlates.filter((i) => i !== index)
      );
    } else {
      setSelectedLicensePlates([...selectedLicensePlates, index]);
    }
  };

  const handleVoiceClick = (index: number) => {
    if (selectedVoices.includes(index)) {
      setSelectedVoices(selectedVoices.filter((i) => i !== index));
    } else {
      setSelectedVoices([...selectedVoices, index]);
    }
  };

  const [isApplied, setIsApplied] = useState<boolean>(false);
  const [deidentifiedUrl, setDeidentifiedUrl] = useState<string | undefined>(
    undefined
  );
  const [isLoading, setIsLoading] = useState(false);

  const handleDeidentificationClick = async () => {
    try {
      setDeidentifiedUrl(undefined);
      setIsLoading(true);
      setIsApplied(false);
      const url = await deidentification({
        uuid: uuid,
        faces: selectedFaces,
        license_plates: selectedLicensePlates,
        voices: selectedVoices,
      });
      setIsLoading(false);
      setDeidentifiedUrl(url);
    } catch {
      alert("Failed to de-identify video");
      setIsLoading(false);
      setDeidentifiedUrl(undefined);
    }
  };

  const handleApplyClick = () => {
    setIsApplied(true);
  };

  const handleDownloadClick = () => {
    const anchor = document.createElement("a");
    anchor.href = deidentifiedUrl!;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  };

  const handleShareClick = async () => {
    await navigator.clipboard.writeText(deidentifiedUrl!);
    alert("URL has been copied to your clipboard!");
  };

  const currentVideoUrl = isApplied
    ? deidentifiedUrl
    : URL.createObjectURL(file);

  return (
    <Stack
      sx={{
        width: "100%",
        height: "100%",
        p: 2,
        overflow: "scroll",
        alignItems: "center",
      }}
      gap={2}
    >
      <Box flexShrink={0}>
        <Video
          key={currentVideoUrl}
          preload="auto"
          controls
          src={currentVideoUrl}
        />
      </Box>
      <Stack
        gap={2}
        sx={{
          width: "100%",
          p: 2,
          borderRadius: "10px",
          backgroundColor: "#F6F6F6FF",
        }}
      >
        <Typography sx={{ fontFamily: "NotoSerifKR, sans-serif" }}>
          인식된 얼굴
        </Typography>
        <Grid container spacing={1.5}>
          {faces.map(({ index, url }) => (
            <Grid
              sx={{ position: "relative", boxSizing: "borderBox" }}
              key={index + url}
              item
              xs={6}
              onClick={() => handleFaceClick(index)}
            >
              {selectedFaces.includes(index) && (
                <Box
                  sx={{
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    zIndex: 100,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography sx={{ fontFamily: "NotoSerifKR, sans-serif" }}>
                    선택됨
                  </Typography>
                </Box>
              )}
              <img
                src={url}
                alt={`face${index}`}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              {/* 체크박스 추가 */}
              <Checkbox
                checked={selectedFaces.includes(index)}
                onChange={() => handleFaceClick(index)}
                sx={{
                  position: "absolute",
                  bottom: 10,
                  right: 10,
                  zIndex: 200,
                  "&.Mui-checked": {
                    color: "green", // 체크된 색상
                  },
                  "&.MuiCheckbox-root": {
                    padding: 0, // 패딩 제거
                  },
                }}
                size="small" // 체크박스 크기 조정
              />
            </Grid>
          ))}
        </Grid>
      </Stack>
      <Stack
        gap={2}
        sx={{
          width: "100%",
          p: 2,
          borderRadius: "10px",
          backgroundColor: "#F6F6F6FF",
        }}
      >
        <Typography sx={{ fontFamily: "NotoSerifKR, sans-serif" }}>
          인식된 음성
        </Typography>
        <Stack gap={1.5}>
          {voices.map(({ index, url }) => (
            <Stack flexDirection="row" alignItems="center" key={index}>
              <audio src={url} controls />
              <Checkbox
                onClick={() => handleVoiceClick(index)}
                checked={selectedVoices.includes(index)}
              />
            </Stack>
          ))}
        </Stack>
      </Stack>
      <Stack
        gap={2}
        sx={{
          width: "100%",
          p: 2,
          borderRadius: "10px",
          backgroundColor: "#F6F6F6FF",
        }}
      >
        <Typography sx={{ fontFamily: "NotoSerifKR, sans-serif" }}>
          인식된 번호판
        </Typography>
        <Grid container spacing={1}>
          {licensePlates.map(({ index, url }) => (
            <Grid
              key={index + url}
              item
              xs={6}
              onClick={() => handleLicensePlateClick(index)}
              sx={{
                position: "relative",
              }}
            >
              {selectedLicensePlates.includes(index) && (
                <Box
                  sx={{
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    zIndex: 100,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography sx={{ fontFamily: "NotoSerifKR, sans-serif" }}>
                    선택됨
                  </Typography>
                </Box>
              )}
              <img
                src={url}
                alt={`licensePlate${index}`}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              {/* 체크박스 추가 */}
              <Checkbox
                checked={selectedLicensePlates.includes(index)}
                onChange={() => handleLicensePlateClick(index)}
                sx={{
                  position: "absolute",
                  bottom: 10,
                  right: 10,
                  zIndex: 200,
                  "&.Mui-checked": {
                    color: "green", // 체크된 색상
                  },
                  "&.MuiCheckbox-root": {
                    padding: 0, // 패딩 제거
                  },
                }}
                size="small" // 체크박스 크기 조정
              />
            </Grid>
          ))}
        </Grid>
      </Stack>
      <Button
        variant="contained"
        fullWidth
        onClick={handleDeidentificationClick}
        disabled={isLoading}
        sx={{ fontFamily: "NotoSerifKR, sans-serif" }} // 폰트 적용
      >
        비식별화
      </Button>
      {isLoading && (
        <Typography sx={{ fontFamily: "NotoSerifKR, sans-serif" }}>
          비식별화가 진행 중 입니다....
        </Typography>
      )}
      {deidentifiedUrl && (
        <>
          <Button
            variant="contained"
            disabled={isApplied}
            onClick={handleApplyClick}
            fullWidth
            sx={{ fontFamily: "NotoSerifKR, sans-serif" }} // 폰트 적용
          >
            {isApplied ? "비식별화 적용됨" : "비식별화 적용"}
          </Button>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <Button
                variant="contained"
                color="success"
                fullWidth
                onClick={handleDownloadClick}
                sx={{ fontFamily: "NotoSerifKR, sans-serif" }} // 폰트 적용
              >
                저장
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                variant="contained"
                fullWidth
                color="info"
                onClick={handleShareClick}
                sx={{ fontFamily: "NotoSerifKR, sans-serif" }} // 폰트 적용
              >
                공유
              </Button>
            </Grid>
          </Grid>
        </>
      )}
    </Stack>
  );
};

export default Result;
