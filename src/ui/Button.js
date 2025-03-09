import React from 'react';

export const Button = ({ children, onClick, className }) => {
  return (
    <button onClick={onClick} className={`px-4 py-2 ${className}`}>
      {children}
    </button>
  );
};
