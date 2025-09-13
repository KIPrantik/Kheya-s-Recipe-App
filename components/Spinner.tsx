
import React from 'react';

const Spinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-t-2 border-emerald-400"></div>
        <p className="mt-4 text-slate-300 font-semibold">Generating your recipe...</p>
        <p className="mt-2 text-sm text-slate-400">Our AI chef is working its magic!</p>
    </div>
  );
};

export default Spinner;
