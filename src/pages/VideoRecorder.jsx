import React, { useRef, useState, useEffect } from 'react';

function VideoRecorder() {
  const [recording, setRecording] = useState(false);
  const [videoURL, setVideoURL] = useState('');
  const [cameras, setCameras] = useState([]);
  const [selectedCameraId, setSelectedCameraId] = useState('');
  const [isMirrored, setIsMirrored] = useState(false);
  const videoRef = useRef();
  const mediaRecorderRef = useRef();
  const videoChunks = useRef([]);

  useEffect(() => {
    // Function to get the list of available cameras
    const getCameras = async () => {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = devices.filter(device => device.kind === 'videoinput');
      setCameras(videoDevices);
      if (videoDevices.length > 0) {
        setSelectedCameraId(videoDevices[0].deviceId);
      }
    };

    getCameras();
  }, []);

  useEffect(() => {
    // Restart the video stream when the selected camera changes
    if (selectedCameraId) {
      startRecording();
    }
  }, [selectedCameraId]);

  const startRecording = () => {
    const constraints = {
      video: { deviceId: selectedCameraId ? { exact: selectedCameraId } : undefined }
    };

    navigator.mediaDevices.getUserMedia(constraints)
      .then((stream) => {
        videoRef.current.srcObject = stream;
        if (isMirrored) {
          videoRef.current.style.transform = 'scaleX(-1)';
        } else {
          videoRef.current.style.transform = 'scaleX(1)';
        }
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
        };

        mediaRecorderRef.current.start();
        setRecording(true);
      })
      .catch(console.error);
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      setRecording(false);
    }
  };

  const handleCameraChange = (event) => {
    setSelectedCameraId(event.target.value);
    if (recording) {
      stopRecording();
    }
    // Start recording automatically after changing the camera
    startRecording();
  };

  const toggleMirror = () => {
    setIsMirrored(!isMirrored);
    if (videoRef.current) {
      videoRef.current.style.transform = isMirrored ? 'scaleX(1)' : 'scaleX(-1)';
    }
  };

  return (
    <div>
      <video ref={videoRef} autoPlay playsInline></video>
      <div>
        <select onChange={handleCameraChange} value={selectedCameraId}>
          {cameras.map(camera => (
            <option key={camera.deviceId} value={camera.deviceId}>
              {camera.label || 'Camera ' + camera.deviceId}
            </option>
          ))}
        </select>
        <button onClick={toggleMirror}>
          {isMirrored ? 'Unmirror' : 'Mirror'}
        </button>
        {recording ? (
          <button onClick={stopRecording}>Stop Recording</button>
        ) : (
          <button onClick={startRecording}>Start Recording</button>
        )}
        {videoURL && <button onClick={() => {}}>Download</button>}
      </div>
    </div>
  );
}

export default VideoRecorder;
