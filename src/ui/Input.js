import React from 'react';

export const Input = ({ ...props }) => {
  return (
    <input {...props} className={`p-2 border rounded ${props.className || ""}`} />
  );
};
