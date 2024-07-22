// import { useState } from "react";
// import "./App.css";
// import Cursor from "./components/Cursor/Cursor";
// import CustomCursorManager from "./components/Cursor/constext/manager";
// import Footer from "./components/Footer/Footer";
// import Header from "./components/Header/Header";
// import Photos from "./components/Photos/Photos";
// import Loading from "./components/loading/Loading";
// import CustomCursor from "./components/CustomCursor/CustomCursor";
// import Gallery from "./components/Gallery";
// import TextAnimation from "./components/TextAnimation";

// function App() {
//   const [isProgressBar, setIsProgressBar] = useState(true);
//   const [activePhoto, setActivePhoto] = useState(null);
//   const [togglePhotos, setTogglePhotos] = useState(false);

//   return (
//     <CustomCursorManager>
//       <div className="main">
//         <Header
//           isProgressBar={isProgressBar}
//           setTogglePhotos={setTogglePhotos}
//           togglePhotos={togglePhotos}
//         />
//         <Cursor activePhoto={activePhoto} />

//         <Photos
//           activePhoto={activePhoto}
//           setActivePhoto={setActivePhoto}
//           togglePhotos={togglePhotos}
//         />

//       <Loading />
//       <CustomCursor />
//       <Gallery />
//       <TextAnimation />

//         <Footer
//           isProgressBar={isProgressBar}
//           setIsProgressBar={setIsProgressBar}
//         />
//       </div>
//     </CustomCursorManager>
//   );
// }

// export default App;



import { useState, useEffect } from "react";
import "./App.css";
import Cursor from "./components/Cursor/Cursor";
import CustomCursorManager from "./components/Cursor/constext/manager";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Photos from "./components/Photos/Photos";
import Loading from "./components/loading/Loading";
import CustomCursor from "./components/CustomCursor/CustomCursor";
import Gallery from "./components/Gallery";
import TextAnimation from "./components/TextAnimation";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isProgressBar, setIsProgressBar] = useState(true);
  const [activePhoto, setActivePhoto] = useState(null);
  const [togglePhotos, setTogglePhotos] = useState(false);
  const [showIndex, setShowIndex] = useState(false);

  useEffect(() => {
    // Simulate loading time
    setTimeout(() => setIsLoading(false), 3000);
  }, []);

  return (
    <CustomCursorManager>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="main">
          <Header
            isProgressBar={isProgressBar}
            setTogglePhotos={setTogglePhotos}
            togglePhotos={togglePhotos}
          />
          <Cursor activePhoto={activePhoto} />
          <CustomCursor />
          {showIndex ? (
            <>
              <Gallery />
              <TextAnimation />
            </>
          ) : (
            <Photos
              activePhoto={activePhoto}
              setActivePhoto={setActivePhoto}
              togglePhotos={togglePhotos}
              onIndexClick={() => setShowIndex(true)}
            />
          )}

          <Footer
            isProgressBar={isProgressBar}
            setIsProgressBar={setIsProgressBar}
          />
        </div>
      )}
    </CustomCursorManager>
  );
}

export default App;