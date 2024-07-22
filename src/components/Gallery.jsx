// src/components/Gallery.js
import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import './Gallery.css';

const Gallery = () => {
  const galleryRef = useRef(null);
  const imagesRef = useRef([]);

  useEffect(() => {
    const gallery = galleryRef.current;
    let isDown = false;
    let startX;
    let scrollLeft;

    const handleMouseDown = (e) => {
      isDown = true;
      startX = e.pageX - gallery.offsetLeft;
      scrollLeft = gallery.scrollLeft;
    };

    const handleMouseLeave = () => {
      isDown = false;
    };

    const handleMouseUp = () => {
      isDown = false;
    };

    const handleMouseMove = (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - gallery.offsetLeft;
      const walk = (x - startX) * 3;
      gallery.scrollLeft = scrollLeft - walk;
    };

    gallery.addEventListener('mousedown', handleMouseDown);
    gallery.addEventListener('mouseleave', handleMouseLeave);
    gallery.addEventListener('mouseup', handleMouseUp);
    gallery.addEventListener('mousemove', handleMouseMove);

    return () => {
      gallery.removeEventListener('mousedown', handleMouseDown);
      gallery.removeEventListener('mouseleave', handleMouseLeave);
      gallery.removeEventListener('mouseup', handleMouseUp);
      gallery.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleClick = () => {
    gsap.to(imagesRef.current, {
      duration: 1,
      x: window.innerWidth / 2 - 150,
      y: (i) => i * 300,
      stagger: 0.1,
      ease: 'power1.inOut'
    });
  };

  return (
    <div>
      <div className="gallery" ref={galleryRef}>
        {["image1.jpg", "image2.jpg", "image3.jpg", "image4.jpg", "image5.jpg"].map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`Image ${i + 1}`}
            ref={(el) => (imagesRef.current[i] = el)}
          />
        ))}
      </div>
      <button onClick={handleClick}>Rearrange Images</button>
    </div>
  );
};

export default Gallery;
