import React, { useEffect, useState } from "react";
import "./Footer.css";
import gsap from "gsap";

const Footer = ({isProgressBar, setIsProgressBar}) => {

  useEffect(() => {
    gsap.to(".footer", {
      bottom: "-46%",
      ease: "power3.inOut",
      delay: 3,
      duration: 2,
    });
  }, []);

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
<footer className="footer" style={{ justifyContent: isProgressBar ? "start" : "center" }}>
<div className="footer-text">
      {isProgressBar ? (
        <div className="progress-container">
        <div className="progress-bar">
        {progress <= 100 && `${progress}%`}
        </div>
      </div>
      ) : (
        <p className="footer-title">“Hamon, Egan” — Ripple, Smile</p>
      )}
      </div>
    </footer>
  );
};

export default Footer;
