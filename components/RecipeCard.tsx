
import React from 'react';
import { Recipe } from '../types';
import { TimeIcon, ServingsIcon } from './icons';

interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  return (
    <div className="bg-slate-800 rounded-2xl shadow-lg w-full max-w-4xl mx-auto overflow-hidden animate-fade-in">
        <div className="p-8">
            <h2 className="text-3xl font-bold text-emerald-400 mb-2">{recipe.recipeName}</h2>
            <p className="text-slate-300 mb-6">{recipe.description}</p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 text-center border-t border-b border-slate-700 py-4">
                <div className="flex flex-col items-center justify-center">
                    <ServingsIcon className="w-6 h-6 mb-1 text-emerald-400" />
                    <span className="text-sm text-slate-400">Servings</span>
                    <span className="font-bold text-slate-200">{recipe.servings}</span>
                </div>
                <div className="flex flex-col items-center justify-center">
                    <TimeIcon className="w-6 h-6 mb-1 text-emerald-400" />
                    <span className="text-sm text-slate-400">Prep Time</span>
                    <span className="font-bold text-slate-200">{recipe.prepTime}</span>
                </div>
                <div className="flex flex-col items-center justify-center">
                    <TimeIcon className="w-6 h-6 mb-1 text-emerald-400" />
                    <span className="text-sm text-slate-400">Cook Time</span>
                    <span className="font-bold text-slate-200">{recipe.cookTime}</span>
                </div>
                <div className="flex flex-col items-center justify-center">
                    <TimeIcon className="w-6 h-6 mb-1 text-emerald-400" />
                    <span className="text-sm text-slate-400">Total Time</span>
                    <span className="font-bold text-slate-200">{recipe.totalTime}</span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <h3 className="text-xl font-semibold text-emerald-400 mb-4">Ingredients</h3>
                    <ul className="space-y-2">
                        {recipe.ingredients.map((ingredient, index) => (
                            <li key={index} className="flex items-start">
                                <span className="text-emerald-400 mr-3 mt-1">&#10003;</span>
                                <span className="text-slate-300">{ingredient}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h3 className="text-xl font-semibold text-emerald-400 mb-4">Instructions</h3>
                    <ol className="space-y-4">
                        {recipe.instructions.map((instruction, index) => (
                            <li key={index} className="flex items-start">
                                <span className="bg-emerald-400 text-slate-900 rounded-full w-6 h-6 text-sm font-bold flex items-center justify-center mr-3 flex-shrink-0">{index + 1}</span>
                                <span className="text-slate-300">{instruction}</span>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        </div>
    </div>
  );
};

export default RecipeCard;
