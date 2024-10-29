import ConfettiExplosion from 'react-confetti-explosion';

const confettiConfig = {
  force: 0.8,
  duration: 3000,
  particleCount: 250,
  width: 1600,
  zIndex: 60,
  colors: ['#f5d412', '#0388db', '#831f1b', '#9bffff', '#f53f12']
};

export function WinConfetti() {
  return <ConfettiExplosion {...confettiConfig} />;
}