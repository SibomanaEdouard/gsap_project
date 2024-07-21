import React, { useEffect } from "react";
import "./Header.css";
import gsap from "gsap";

const Header = ({ isProgressBar, setTogglePhotos, togglePhotos }) => {
  useEffect(() => {
    gsap.to(".header", {
      top: "-47%",
      ease: "power3.inOut",
      delay: 3,
      duration: 2,
    });
  }, []);

  return (
    <header className="header">
      <div className="header-text">
      <div>
        <p className="header-title">Hiromi Tomiyasu</p>
      </div>
      {!isProgressBar && (
        <nav>
          <ul className="menu">
            <li>
              Gallery
              <img
                style={{ marginLeft: "9px" }}
                src="/public/Gallery.svg"
                alt="Gallery item"
              />
            </li>
            <li
              onClick={() =>
                togglePhotos ? setTogglePhotos(false) : setTogglePhotos(true)
              }
            >
              Index
              <img
                style={{ marginLeft: "9px" }}
                src="/public/Index.svg"
                alt="Index item"
              />
            </li>
            <li>Contact</li>
          </ul>
        </nav>
      )}
      </div>
    </header>
  );
};

export default Header;
