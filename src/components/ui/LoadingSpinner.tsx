import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center min-h-[200px]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      <span className="ml-3 text-gray-600">Caricamento...</span>
    </div>
  );
};

export default LoadingSpinner; 