// import React, { useEffect, useRef } from 'react';
// import gsap from 'gsap';
// import './TextAnimation.css';

// function TextAnimation() {
//   const textRef = useRef(null);

//   useEffect(() => {
//     const text = textRef.current;
//     const words = text.innerText.split(' ');
//     text.innerHTML = '';

//     words.forEach((word, i) => {
//       const span = document.createElement('span');
//       span.innerHTML = word + ' ';
//       text.appendChild(span);

//       gsap.from(span, {
//         opacity: 0,
//         y: 50,
//         duration: 0.5,
//         delay: i * 0.1,
//         ease: 'power2.out'
//       });
//     });
//   }, []);

//   return (
//     <div className="text-animation">
//       <p ref={textRef}>
//         Welcome to the Ikebana Gallery. Explore the beauty of Japanese flower arrangement.
//       </p>
//     </div>
//   );
// }

// export default TextAnimation;




import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function TextAnimation() {
  const textRef = useRef(null);

  useEffect(() => {
    const text = textRef.current;
    const words = text.innerText.split(' ');
    text.innerHTML = '';

    words.forEach((word, i) => {
      const span = document.createElement('span');
      span.innerHTML = word + ' ';
      text.appendChild(span);

      gsap.from(span, {
        opacity: 0,
        y: 50,
        duration: 0.5,
        scrollTrigger: {
          trigger: span,
          start: 'top bottom',
          end: 'bottom top',
          toggleActions: 'play none none reverse'
        }
      });
    });
  }, []);

  return (
    <div className="text-animation">
      <p ref={textRef}>
        Welcome to the Ikebana Gallery. Explore the beauty of Japanese flower arrangement.
      </p>
    </div>
  );
}

export default TextAnimation;