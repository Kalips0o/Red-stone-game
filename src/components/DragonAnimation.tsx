import { useState, useEffect } from 'react';
import dragonGif from '../assets/dragon.gif'; 

export const DragonAnimation = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 70000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className="fixed top-[21%] left-0 w-[100px] h-[100px] animate-dragon-flight z-2 opacity-90"
      style={{
        backgroundImage: `url(${dragonGif})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
      }}
    />
  );
};
