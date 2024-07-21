import { useContext, useEffect, useState, useCallback } from "react";
import "./Photos.css";
import {
  photosColumn1,
  photosColumn2,
  photosColumn3,
  photosColumn4,
  photosColumn5,
  photosColumn6,
} from "./photosList";
import CustomCursorContext from "../Cursor/constext/CustomCursorContext";
import gsap from "gsap";

function Photos({ activePhoto, setActivePhoto, togglePhotos }) {
  const [activePhotoTitle, setActivePhotoTitle] = useState("");
  const [notActivePhoto, setNotActivePhoto] = useState(false);
  const [itemView, setItemView] = useState(false);
  const [trailPhotos, setTrailPhotos] = useState([]);

  const itemInfo = {
    date: "06.23.2024",
    title: "“Hamon, Egan”  —  Ripple, Smile",
    production: "Interior Design",
    description:
      "Gallagher’s compositions variably map and notate this nebulous and protean in-between space. The distinct, yet interrelated works comprising All of No Man’s Land Is Ours demarcate a site of possibility built up through repeated units of will. Indeed, the unit—the brushstroke.",
    link: "www.toro-museum.co.jp",
  };

  const { setType } = useContext(CustomCursorContext);

  const handleMouseEnter = useCallback((index, title) => {
    setActivePhoto(index);
    setNotActivePhoto(true);
    setActivePhotoTitle(title);
    setType("hamburger");
  }, [setActivePhoto, setType]);

  const handleMouseLeave = useCallback(() => {
    setActivePhoto(null);
    setNotActivePhoto(false);
    setType("default");
  }, [setActivePhoto, setType]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      let container = document.querySelector(".container");
      let photos = document.querySelector(".photos");

      let x = e.clientX - container.getBoundingClientRect().left;
      let y = e.clientY - container.getBoundingClientRect().top - 50;

      photos.style.transform = `translate(-${x * 0.52}px, -${y * 1.7}px)`;
    };

    if (togglePhotos) {
      window.removeEventListener("mousemove", handleMouseMove);
    } else {
      window.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [togglePhotos]);

  useEffect(() => {
    if (togglePhotos) {
      const tl = gsap.timeline({ ease: "expo.inOut" });

      tl.to(".reorder1", {
        top: "40%",
        left: "600%",
        rotation: -3,
        position: "absolute",
        duration: 1,
      })
        .to(
          ".reorder2",
          {
            top: "40%",
            left: "420%",
            rotation: 4,
            position: "absolute",
            duration: 1,
          },
          0
        )
        .to(
          ".reorder3",
          {
            top: "40%",
            left: "200%",
            rotation: -5,
            position: "absolute",
            duration: 1,
          },
          0
        )
        .to(
          ".reorder4",
          {
            top: "0%",
            left: "40%",
            rotation: -6,
            position: "absolute",
            duration: 1,
          },
          0
        )
        .to(
          ".reorder5",
          {
            top: "30%",
            left: "-150%",
            rotation: -5,
            position: "absolute",
            duration: 1,
          },
          0
        )
        .to(
          ".reorder6",
          {
            top: "10%",
            left: "-350%",
            rotation: 6,
            position: "absolute",
            duration: 1,
          },
          0
        )
        .to(".photos", { top: "10%" }, 0);

      let timeout = setTimeout(() => {
        gsap.to(".photos", {
          flexDirection: "column",
          duration: 1,
          delay: 1,
          left: "42%",
          // top: "340%",
          gap: "220px",
          marginLeft: "242px",
        });
        gsap.to(
          ".reorder1, .reorder2, .reorder3, .reorder4, .reorder5, .reorder6",
          {
            top: 0,
            left: 0,
            rotation: 0,
            position: "relative",
            duration: 1,
            delay: 1,
          }
        );
        gsap.to(".container", { overflowY: "scroll" });
        gsap.to(".photos-column", {
          width: "580px",
          duration: 1,
          delay: 2,
        });
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [togglePhotos]);

  useEffect(() => {
    const time = setTimeout(() => {
      if (togglePhotos) {
        setItemView(true);
      }
    }, 5000);
    return () => clearTimeout(time);
  }, [togglePhotos]);

  useEffect(() => {
    if (togglePhotos && activePhoto) {
      const trailEffect = (e) => {
        setTrailPhotos((prevPhotos) => {
          if (prevPhotos.length >= 10) prevPhotos.shift();
          return [
            ...prevPhotos,
            {
              id: Date.now(),
              src: activePhoto,
              style: {
                left: e.pageX + "px",
                top: e.pageY + "px",
              },
            },
          ];
        });
      };

      window.addEventListener("mousemove", trailEffect);

      return () => {
        window.removeEventListener("mousemove", trailEffect);
      };
    }
  }, [togglePhotos, activePhoto]);

  return (
    <>
      <div className="container">
        <div className="photos">
          {[photosColumn1, photosColumn2, photosColumn3, photosColumn4, photosColumn5, photosColumn6].map((photosColumn, columnIndex) => (
            <section className="photos-column" key={columnIndex} style={{ marginTop: columnIndex * 50 + "px" }}>
              {photosColumn.map((item, index) => (
                <div
                  className={`item-container ${itemView ? "itemView" : ""}`}
                  key={index}
                >
                  {itemView && (
                    <div className="top-text">
                      <div className="itemInfo-container">
                        <p>[Date]</p>
                        <p>{itemInfo.date}</p>
                      </div>
                      <div className="itemInfo-container">
                        <p>[Title, JPN / ENG ]</p>
                        <p>{itemInfo.title}</p>
                      </div>
                    </div>
                  )}

                  <div className={itemView ? "photoText-container" : ""}>
                    <div className={itemView ? "photo-container" : ""}>
                      <img
                        className={`photo ${itemView ? "itemView-photo" : ""} ${
                          activePhoto === item.image ? "active" : ""
                        } ${notActivePhoto ? "notActive" : ""} reorder${columnIndex + 1} `}
                        src={item.image}
                        alt=""
                        onMouseEnter={() =>
                          handleMouseEnter(item.image, item.title)
                        }
                        onMouseLeave={handleMouseLeave}
                      />
                    </div>

                    {itemView && (
                      <div>
                        <div className="itemInfo-container">
                          <p>[Production]</p>
                          <p>{itemInfo.production}</p>
                        </div>
                        <div className="itemInfo-container">
                          <p>[Description]</p>
                          <p>{itemInfo.description}</p>
                        </div>

                        <div className="itemInfo-container">
                          <p>[Related link]</p>
                          <p>{itemInfo.link}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </section>
          ))}
        </div>
        {notActivePhoto && !togglePhotos && (
          <h1 className="title">{activePhotoTitle}</h1>
        )}
      </div>
      {trailPhotos.map((trailPhoto) => (
        <img
          key={trailPhoto.id}
          src={trailPhoto.src}
          alt=""
          className="trail-photo"
          style={trailPhoto.style}
        />
      ))}
    </>
  );
}

export default Photos;
