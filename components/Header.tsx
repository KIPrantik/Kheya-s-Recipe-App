
import React from 'react';
import { ChefHatIcon } from './icons';

const Header: React.FC = () => {
    return (
        <header className="text-center mb-8">
            <div className="inline-block bg-slate-800 p-4 rounded-full mb-4">
                <ChefHatIcon className="h-10 w-10 text-emerald-400" />
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-sky-400">
                Gemini Recipe Generator
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-400">
                Turn your pantry staples into a culinary masterpiece. Just list your ingredients and let our AI chef do the rest!
            </p>
        </header>
    );
};

export default Header;
