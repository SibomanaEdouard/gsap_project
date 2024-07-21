import { useState } from "react";
import "./App.css";
import Cursor from "./components/Cursor/Cursor";
import CustomCursorManager from "./components/Cursor/constext/manager";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Photos from "./components/Photos/Photos";

function App() {
  const [isProgressBar, setIsProgressBar] = useState(true);
  const [activePhoto, setActivePhoto] = useState(null);
  const [togglePhotos, setTogglePhotos] = useState(false);

  return (
    <CustomCursorManager>
      <div className="main">
        <Header
          isProgressBar={isProgressBar}
          setTogglePhotos={setTogglePhotos}
          togglePhotos={togglePhotos}
        />
        <Cursor activePhoto={activePhoto} />

        <Photos
          activePhoto={activePhoto}
          setActivePhoto={setActivePhoto}
          togglePhotos={togglePhotos}
        />

        <Footer
          isProgressBar={isProgressBar}
          setIsProgressBar={setIsProgressBar}
        />
      </div>
    </CustomCursorManager>
  );
}

export default App;
