import React from "react";
import "@/styles/LoadingSpinner.css";

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center py-20 lg:py-32">
      <span className="loader"></span>
    </div>
  );
};

export default LoadingSpinner;
