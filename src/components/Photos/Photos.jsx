import { useContext, useEffect, useState } from "react";
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
import Flip from "gsap/Flip";
gsap.registerPlugin(Flip);

function Photos({ activePhoto, setActivePhoto, togglePhotos }) {
  const [activePhotoTitle, setActivePhotoTitle] = useState("");
  const [notActivePhoto, setNotActivePhoto] = useState(false);
  const [itemView, setItemView] = useState(false);
  const [trailPhotos, setTrailPhotos] = useState([]);
  const [trailPhoto, setTrailPhoto] = useState("");

  const itemInfo = {
    date: "06.23.2024",
    title: "“Hamon, Egan”  —  Ripple, Smile",
    production: "Interior Design",
    description:
      "Gallagher’s compositions variably map and notate this nebulous and protean in-between space. The distinct, yet interrelated works comprising All of No Man’s Land Is Ours demarcate a site of possibility built up through repeated units of will. Indeed, the unit—the brushstroke.",
    link: "www.toro-museum.co.jp",
  };

  const { setType } = useContext(CustomCursorContext);

  function handleMouseEnter(index, title) {
    setActivePhoto(index);
    setNotActivePhoto(true);
    setActivePhotoTitle(title);
    setType("hamburger");
  }

  function handleMouseLeave() {
    setActivePhoto(null);
    setNotActivePhoto(false);
    setType("default");
  }

  useEffect(() => {
    const handleMouseMove = (e) => {
      let container = document.querySelector(".container");
      let photos = document.querySelector(".photos");

      let x = e.clientX - container.getBoundingClientRect().left;
      let y = e.clientY - container.getBoundingClientRect().top - 50;

      photos.style.transform = `translate(-${x * 0.5}px, -${y * 1.7}px)`;
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
      gsap.to(".container", {
        overflowY: "scroll",
        top: "50%",
        left: "50%",
        ease: "expo.inOut",
      });

      gsap.to(".photos-column", {
        top: "0",
        left: "0",
        ease: "expo.inOut",
      });

      gsap.to(".reorder1", {
        top: "25%",
        left: "600%",
        rotation: -3,
        position: "absolute",
        duration: 1,
        ease: "expo.inOut",
      });
      gsap.to(".reorder2", {
        top: "25%",
        left: "410%",
        rotation: 4,
        position: "absolute",
        duration: 1,
        ease: "expo.inOut",
      });
      gsap.to(".reorder3", {
        top: "10%",
        left: "180%",
        rotation: -5,
        position: "absolute",
        duration: 1,
        ease: "expo.inOut",
      });
      gsap.to(".reorder4", {
        top: "-5%",
        left: "25%",
        rotation: -6,
        position: "absolute",
        duration: 1,
        ease: "expo.inOut",
      });
      gsap.to(".reorder5", {
        top: "20%",
        left: "-140%",
        rotation: -5,
        position: "absolute",
        duration: 1,
        ease: "expo.inOut",
      });
      gsap.to(".reorder6", {
        top: "5%",
        left: "-350%",
        rotation: 6,
        position: "absolute",
        duration: 1,
        ease: "expo.inOut",
      });

      gsap.to(".photos", {
        flexDirection: "column",
        duration: 1,
        delay: 2,
        marginTop: "160px",
        marginLeft: "214px",
        width: "100%",
        gap: "0px",
      });

      gsap.to(".photos-column", {
        width: "100%",
        gap: 0,
        duration: 1,
        top: 0,
        left: "40%",
        delay: 4,
        ease: "expo.inOut",
      });

      gsap.to(".itemView", {
        width: "100%",
        top: 0,
        left: 0,
        rotation: 0,
        position: "relative",
        duration: 2,
        delay: 1,
        ease: "expo.inOut",
      });

      gsap.to(
        ".reorder1, .reorder2, .reorder3, .reorder4, .reorder5, .reorder6",
        {
          top: 0,
          left: "0%",
          rotation: 0,
          position: "relative",
          ease: "expo.inOut",
          duration: 1,
          opacity: 1,
          delay: 2,
          backgroundColor: "#fff",
        }
      );
    
    }
  }, [togglePhotos]);

  

  useEffect(() => {
    const time = setTimeout(() => {
      if (togglePhotos) {
        setItemView(true);
      }
    }, 4500);
    return () => clearTimeout(time);
  }, [togglePhotos]);

  useEffect(() => {
    if (togglePhotos && activePhoto) {
      let lastMove = Date.now();
      const trailEffect = (e) => {
        if (Date.now() - lastMove > 40) {
          lastMove = Date.now();
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
        }
      };

      window.addEventListener("mousemove", trailEffect);

      return () => {
        window.removeEventListener("mousemove", trailEffect);
        setTrailPhotos([]);
      };
    }
  }, [togglePhotos, activePhoto]);

  console.log(trailPhotos);

  useEffect(() => {
    if (trailPhotos.length) {
      setTrailPhoto(trailPhotos[0].src);
      return;
    }
    setTrailPhoto("");
  }, [trailPhotos]);
  return (
    <>
      <div className="container">
        <div className="photos">
          <section className="photos-column" style={{ marginTop: "100px" }}>
            {photosColumn1.map((item, index) => (
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
                      style={{ opacity: trailPhoto == item.image ? "0" : "" }}
                      className={`photo ${itemView ? "itemView-photo" : ""} ${
                        activePhoto === item.image ? "active" : ""
                      } ${notActivePhoto ? "notActive" : ""} reorder1`}
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
          <section className="photos-column" style={{ marginTop: "100px" }}>
            {photosColumn2.map((item, index) => (
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
                      style={{ opacity: trailPhoto == item.image ? "0" : "" }}
                      className={`photo ${itemView ? "itemView-photo" : ""} ${
                        activePhoto === item.image ? "active" : ""
                      } ${notActivePhoto ? "notActive" : ""} reorder2 `}
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
          <section className="photos-column" style={{ marginTop: "250px" }}>
            {photosColumn3.map((item, index) => (
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
                      style={{ opacity: trailPhoto == item.image ? "0" : "" }}
                      className={`photo ${itemView ? "itemView-photo" : ""} ${
                        activePhoto === item.image ? "active" : ""
                      } ${notActivePhoto ? "notActive" : ""} reorder3 `}
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
          <section className="photos-column" style={{ marginTop: "450px" }}>
            {photosColumn4.map((item, index) => (
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
                      style={{ opacity: trailPhoto == item.image ? "0" : "" }}
                      className={`photo ${itemView ? "itemView-photo" : ""} ${
                        activePhoto === item.image ? "active" : ""
                      } ${notActivePhoto ? "notActive" : ""} reorder4 `}
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
          <section className="photos-column" style={{ marginTop: "220px" }}>
            {photosColumn5.map((item, index) => (
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
                      style={{ opacity: trailPhoto == item.image ? "0" : "" }}
                      className={`photo ${itemView ? "itemView-photo" : ""} ${
                        activePhoto === item.image ? "active" : ""
                      } ${notActivePhoto ? "notActive" : ""} reorder5 `}
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
          <section className="photos-column" style={{ marginTop: "350px" }}>
            {photosColumn6.map((item, index) => (
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
                      style={{ opacity: trailPhoto == item.image ? "0" : "" }}
                      className={`photo ${itemView ? "itemView-photo" : ""} ${
                        activePhoto === item.image ? "active" : ""
                      } ${notActivePhoto ? "notActive" : ""} reorder6 `}
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
        </div>
        {notActivePhoto && !togglePhotos && (
          <h1 className="title">{activePhotoTitle}</h1>
        )}
      </div>
      {trailPhotos.map((trailPhoto, index) => {
        const style = {
          ...trailPhoto.style,
          opacity: 0.2 + index * 0.1,
          transform: `scale(${1 + index * 0.3})`,
        };
        return (
          <img
            key={trailPhoto.id}
            src={trailPhoto.src}
            alt=""
            className="trail-photo"
            style={style}
          />
        );
      })}
    </>
  );
}

export default Photos;
