import React, { useRef, useState } from 'react';

function VideoRecorder() {
  const [recording, setRecording] = useState(false);
  const [videoURL, setVideoURL] = useState('');
  const [cameraFacing, setCameraFacing] = useState('user'); // 'user' for front-facing, 'environment' for rear-facing
  const videoRef = useRef();
  const mediaRecorderRef = useRef();
  const videoChunks = useRef([]);

  const startRecording = () => {
    const constraints = {
      video: { facingMode: cameraFacing }
    };

    navigator.mediaDevices.getUserMedia(constraints)
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

          // Here, you can use the blob to upload it to a server.
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

  const switchCamera = () => {
    if (recording) {
      stopRecording();
    }
    setCameraFacing(prevFacing => (prevFacing === 'user' ? 'environment' : 'user'));
    startRecording();
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
        <button onClick={switchCamera}>
          카메라 전환
        </button>
        {recording ? (
          <button onClick={stopRecording}>녹화 종료</button>
        ) : (
          <button onClick={startRecording}>녹화 시작</button>
        )}
        {videoURL && <button onClick={downloadVideo}>다운로드</button>}
      </div>
    </div>
  );
}

export default VideoRecorder;
