import React from "react";

const Button = ({ children, className }) => {
  return (
    <button className={`px-4 py-2 rounded bg-yellow-500 text-white ${className}`}>
      {children}
    </button>
  );
};

export default Button;
