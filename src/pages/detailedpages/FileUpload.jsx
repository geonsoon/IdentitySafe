import React, { useState, useEffect } from 'react';
import './FileUpload.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileVideo } from "@fortawesome/free-solid-svg-icons";

function FileUpload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);

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
    }
    else if (selectedFile.type.startsWith('video/')) {
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

    const formData = new FormData();
    formData.append('file', selectedFile);

    fetch('YOUR_API_ENDPOINT', {
      method: 'POST',
      body: formData,
    })
    .then(response => response.json())
    .then(data => {
      console.log('성공:', data);
      alert('파일 업로드 성공!');
    })
    .catch((error) => {
      console.error('실패:', error);
      alert('파일 업로드 실패.');
    });
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
    </div>
  );
}

export default FileUpload;
