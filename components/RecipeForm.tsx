
import React, { useState } from 'react';
import { MEAL_TYPES, CUISINE_TYPES, DIETARY_RESTRICTIONS } from '../constants';

interface RecipeFormProps {
    onSubmit: (ingredients: string, mealType: string, cuisine: string, diet: string) => void;
    isLoading: boolean;
}

const RecipeForm: React.FC<RecipeFormProps> = ({ onSubmit, isLoading }) => {
    const [ingredients, setIngredients] = useState('');
    const [mealType, setMealType] = useState('Any');
    const [cuisine, setCuisine] = useState('Any');
    const [diet, setDiet] = useState('None');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!ingredients.trim()) {
            alert("Please enter some ingredients.");
            return;
        }
        onSubmit(ingredients, mealType, cuisine, diet);
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-2xl bg-slate-800 p-8 rounded-2xl shadow-lg space-y-6">
            <div>
                <label htmlFor="ingredients" className="block text-lg font-medium text-slate-300 mb-2">Your Ingredients</label>
                <textarea
                    id="ingredients"
                    value={ingredients}
                    onChange={(e) => setIngredients(e.target.value)}
                    placeholder="e.g., chicken breast, broccoli, garlic, olive oil, lemon"
                    rows={4}
                    className="w-full bg-slate-700 text-slate-200 border border-slate-600 rounded-lg p-3 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition duration-200"
                    disabled={isLoading}
                />
                 <p className="text-xs text-slate-500 mt-1">Separate ingredients with commas or new lines.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                    <label htmlFor="mealType" className="block text-sm font-medium text-slate-300 mb-2">Meal Type</label>
                    <select id="mealType" value={mealType} onChange={(e) => setMealType(e.target.value)} className="w-full bg-slate-700 text-slate-200 border border-slate-600 rounded-lg p-3 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition duration-200" disabled={isLoading}>
                        {MEAL_TYPES.map(type => <option key={type} value={type}>{type}</option>)}
                    </select>
                </div>
                <div>
                    <label htmlFor="cuisine" className="block text-sm font-medium text-slate-300 mb-2">Cuisine</label>
                    <select id="cuisine" value={cuisine} onChange={(e) => setCuisine(e.target.value)} className="w-full bg-slate-700 text-slate-200 border border-slate-600 rounded-lg p-3 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition duration-200" disabled={isLoading}>
                        {CUISINE_TYPES.map(type => <option key={type} value={type}>{type}</option>)}
                    </select>
                </div>
                 <div>
                    <label htmlFor="diet" className="block text-sm font-medium text-slate-300 mb-2">Dietary Needs</label>
                    <select id="diet" value={diet} onChange={(e) => setDiet(e.target.value)} className="w-full bg-slate-700 text-slate-200 border border-slate-600 rounded-lg p-3 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition duration-200" disabled={isLoading}>
                        {DIETARY_RESTRICTIONS.map(type => <option key={type} value={type}>{type}</option>)}
                    </select>
                </div>
            </div>

            <button type="submit" disabled={isLoading} className="w-full bg-emerald-500 text-slate-900 font-bold py-3 px-4 rounded-lg hover:bg-emerald-400 transition duration-300 disabled:bg-slate-600 disabled:cursor-not-allowed flex items-center justify-center">
                {isLoading ? (
                    <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Generating...
                    </>
                ) : 'Generate Recipe'}
            </button>
        </form>
    );
};

export default RecipeForm;
