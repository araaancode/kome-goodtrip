import React from 'react';
import './Spinner.css'; // We'll create this file next

const Spinner = () => {
  return (
    <div className='flex space-x-2 justify-center items-center bg-white h-screen dark:invert'>
      <span className='sr-only'>در حال بارگزاری...</span>
      <div className='h-5 w-5 bg-blue-800 rounded-full animate-bounce [animation-delay:-0.3s]'></div>
      <div className='h-5 w-5 bg-blue-800 rounded-full animate-bounce [animation-delay:-0.15s]'></div>
      <div className='h-5 w-5 bg-blue-800 rounded-full animate-bounce'></div>
    </div>
  );
}

export default Spinner;
