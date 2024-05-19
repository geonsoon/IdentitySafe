import React, { useRef, useState } from 'react';

function VideoRecorder() {
  const [recording, setRecording] = useState(false);
  const [videoURL, setVideoURL] = useState('');
  const videoRef = useRef();
  const mediaRecorderRef = useRef();
  const videoChunks = useRef([]);

  const startRecording = () => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
        mediaRecorderRef.current = new MediaRecorder(stream);
        videoChunks.current = [];

        mediaRecorderRef.current.ondataavailable = (event) => {
          if (event.data.size > 0) {
            videoChunks.current.push(event.data);
          }
        };

        mediaRecorderRef.current.onstop = () => {
          const blob = new Blob(videoChunks.current, { type: 'video/mp4' });
          const url = URL.createObjectURL(blob);
          setVideoURL(url);

          // 여기서 blob을 사용하여 서버로 업로드할 수도 있습니다.
        };

        mediaRecorderRef.current.start();
        setRecording(true);
      })
      .catch(console.error);
  };

  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    videoRef.current.srcObject.getTracks().forEach(track => track.stop());
    setRecording(false);
  };

  const downloadVideo = () => {
    const a = document.createElement('a');
    a.href = videoURL;
    a.download = 'recorded_video.mp4';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div>
      <video ref={videoRef} autoPlay playsInline></video>
      <div>
        {recording ? (
          <button onClick={stopRecording}>녹화 중지</button>
        ) : (
          <button onClick={startRecording}>녹화 시작</button>
        )}
        {videoURL && <button onClick={downloadVideo}>다운로드</button>}
      </div>
    </div>
  );
}

export default VideoRecorder;
