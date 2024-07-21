import React, { useState, useEffect } from 'react';
import './ProgressBar.css'; 

const ProgressBar = ({ setIsProgressBar }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (progress < 100) {
        setProgress(prevProgress => prevProgress + 1);
      } else {
        clearInterval(interval);
        setIsProgressBar(false)

      }
    }, 20);

    return () => clearInterval(interval);

  }, [progress]);

  return (
    <div className="progress-container">
      <div className="progress-bar">
      {progress <= 100 && `${progress}%`}
      </div>
    </div>
  );
};

export default ProgressBar;
