import React from 'react';

const SmallScreenWarning: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white p-4 small-screen-warning">
      <h1 className="text-[1.8rem] font-bold mb-4 text-gray-700 text-center">
      Screen too small
      </h1>
      <p className="text-[1rem] w-[80%] text-gray-600 text-center mb-6">
      For the best gaming experience, please use a device with a larger screen.
      </p>
      <img src="/assets/small-screen.png" alt="small screen dragonable=false" className="w-[22rem]"/>
    </div>
  );
};

export default SmallScreenWarning;
