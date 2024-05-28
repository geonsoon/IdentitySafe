import React, { useState, useEffect } from 'react';
import './FileUpload.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileVideo } from "@fortawesome/free-solid-svg-icons";
import CircularLoading from './CircularLoading';

function FileUpload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [waitTime, setWaitTime] = useState(3);

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }

    if (selectedFile.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(<img src={reader.result} alt="Preview" className="preview-image" />);
      };
      reader.readAsDataURL(selectedFile);
    } else if (selectedFile.type.startsWith('video/')) {
      setPreview(<FontAwesomeIcon icon={faFileVideo} size="xl" className="preview-icon" />);
    } else {
      setPreview(undefined);
    }
  }, [selectedFile]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) {
      return;
    }

    setSelectedFile(file);
  };

  const handleUpload = () => {
    if (!selectedFile) {
      alert('파일을 선택해주세요.');
      return;
    }

    setIsLoading(true);
    setWaitTime(3); // 대기 시간 초기화

    const formData = new FormData();
    formData.append('file', selectedFile);

    fetch('YOUR_API_ENDPOINT', {
      method: 'POST',
      body: formData,
    })
    .then(response => response.json())
    .then(data => {
      console.log('성공:', data);
      setIsLoading(false); // 실제 업로드 성공 시 로딩 상태 해제
      alert('파일 업로드 성공!');
    })
    .catch((error) => {
      console.error('실패:', error);
      setIsLoading(false); // 실제 업로드 실패 시 로딩 상태 해제
      alert('파일 업로드 실패.');
    });

    const countdown = setInterval(() => {
      setWaitTime((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(countdown);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
  };

  return (
    <div className="container">
      {preview && (
        <div className="preview-container">
          {preview}
        </div>
      )}
      <input type="file" className="file-input" onChange={handleFileChange} />
      <button className="upload-button" onClick={handleUpload}>Upload</button>
      {isLoading && <CircularLoading waitTime={waitTime} />}
    </div>
  );
}

export default FileUpload;
