import React from 'react';
import './CircularLoading.css';

const CircularLoading = ({ waitTime }) => {
  return (
    <div className="circular-loading-container">
      <div className="spinner"></div>
      <div className="wait-time">{waitTime}s</div>
    </div>
  );
};

export default CircularLoading;