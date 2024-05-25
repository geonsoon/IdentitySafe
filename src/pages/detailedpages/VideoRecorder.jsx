import React, { useRef, useState, useEffect } from 'react';
import './VideoRecorder.css';

function VideoRecorder() {
  const [recording, setRecording] = useState(false);
  const [videoURL, setVideoURL] = useState('');
  const [cameras, setCameras] = useState([]);
  const [selectedCameraId, setSelectedCameraId] = useState('');
  const [isMirrored, setIsMirrored] = useState(false);
  const videoRef = useRef();
  const mediaRecorderRef = useRef();
  const videoChunks = useRef([]);
  const downloadRef = useRef();

  useEffect(() => {
    const getCameras = async () => {
      try {
        await navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
          stream.getTracks().forEach(track => track.stop());
        });
  
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter(device => device.kind === 'videoinput');
        setCameras(videoDevices);
        if (videoDevices.length > 0) {
          setSelectedCameraId(videoDevices[0].deviceId);
        }
      } catch (error) {
        console.error('카메라 접근 권한 문제:', error);
      }
    };
  
    getCameras();
  }, []);

  const startRecording = () => {
    const constraints = {
      video: { 
        deviceId: selectedCameraId ? { exact: selectedCameraId } : undefined,
        facingMode: 'user' 
      }
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
          if (downloadRef.current) {
            downloadRef.current.href = url;
            downloadRef.current.download = 'recorded_video.mp4';
          }
        };

        mediaRecorderRef.current.start();
        setRecording(true);
      })
      .catch(error => {
        console.error('카메라 접근 실패:', error);
      });
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
  };

  const toggleMirror = () => {
    setIsMirrored(!isMirrored);
    if (videoRef.current) {
      videoRef.current.style.transform = isMirrored ? 'scaleX(1)' : 'scaleX(-1)';
    }
  };

return (
  <div className="video-recorder">
    <video ref={videoRef} autoPlay playsInline className="video-feed"></video>
    <div className="controls">
      <select onChange={handleCameraChange} value={selectedCameraId} className="camera-select">
        {cameras.map(camera => (
          <option key={camera.deviceId} value={camera.deviceId}>
            {camera.label || 'Camera ' + camera.deviceId}
          </option>
        ))}
      </select>
      <div className="control-row">
        {recording ? (
          <button onClick={stopRecording} className="control-button">Stop Recording</button>
        ) : (
          <button onClick={startRecording} className="control-button">Start Recording</button>
        )}
        <button onClick={toggleMirror} className="control-button">
          {isMirrored ? 'Unmirror' : 'Mirror'}
        </button>
      </div>
      {videoURL && (
        <a ref={downloadRef} href={videoURL} className="control-button" download>
          Download
        </a>
      )}
    </div>
  </div>
);

}

export default VideoRecorder;
