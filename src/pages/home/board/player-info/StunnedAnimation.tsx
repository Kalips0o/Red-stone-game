import React from 'react';
import './Player.scss';

interface StunnedAnimationProps {
  isPlayer: boolean;
}

const StunnedAnimation: React.FC<StunnedAnimationProps> = ({ isPlayer }) => {
  const numStars = 10;

  return (
    <div className={`stunned-animation ${isPlayer ? 'player' : 'opponent'}`}>
      {[...Array(numStars)].map((_, index) => {
        const delay = `${Math.random() * 3}s`; 
        const top = `${5 + Math.random() * 40}%`; 
        const left = `${10 + Math.random() * 70}%`;

        return (
          <div
            key={index}
            className="star"
            style={{
              top,
              left,
              animationDelay: delay,
            }}
          />
        );
      })}
    </div>
  );
};

export default StunnedAnimation;
