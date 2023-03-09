import React from 'react';

const CircleProgressbar = ({ percent }: any) => {
  const circumference = 60 * 2 * Math.PI;

  return (
    <div className='flex items-center justify-center overflow-hidden rounded-full'>
      <svg className='w-40 h-40 transform -rotate-90'>
        <circle
          className='text-gray-300'
          strokeWidth='10'
          stroke='currentColor'
          fill='transparent'
          r='60'
          cx='80'
          cy='80'
        />
        <circle
          className='text-blue-600'
          strokeWidth='10'
          strokeDasharray={circumference}
          strokeDashoffset={circumference - (percent / 100) * circumference}
          strokeLinecap='round'
          stroke='currentColor'
          fill='transparent'
          r='60'
          cx='80'
          cy='80'
        />
      </svg>
      <span className='absolute text-xl text-blue-700'>{percent}%</span>
    </div>
  );
};

export default CircleProgressbar;
