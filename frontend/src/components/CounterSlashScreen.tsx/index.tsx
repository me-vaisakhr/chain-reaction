import React, { FC, useCallback, useEffect, useState } from "react";
import "./Splash.css";
interface SplashScreenProps {
  open: boolean;
  onComplete?: () => void;
}
const SplashScreen: FC<SplashScreenProps> = ({ open, onComplete }) => {
  const animatingImages = [`👌`, `🫰`, `👆`, `👍`];
  const [index, setIndex] = useState(-1);
  const [isCompleted, setCompleted] = useState(false);

  useEffect(() => {
    isCompleted && onComplete?.();
  }, [isCompleted]);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((index) => {
        if (animatingImages[index + 1]) {
          return index + 1;
        }
        clearInterval(interval);
        setCompleted(true);
        return -1;
      });
    }, 1000);

    return () => {
      clearInterval(interval);
      setIndex(-1);
      setCompleted(false);
    };
  }, []);

  if (!open) return <></>;
  return (
    <div className="splash-animation-container">
      {index !== -1 && (
        <div key={index} className="container splash-animation-wrappper">
          {animatingImages[index]}
        </div>
      )}
    </div>
  );
};

export default SplashScreen;
