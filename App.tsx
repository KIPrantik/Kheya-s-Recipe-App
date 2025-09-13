
import React, { useState } from 'react';
import Header from './components/Header';
import RecipeForm from './components/RecipeForm';
import RecipeCard from './components/RecipeCard';
import Spinner from './components/Spinner';
import { Recipe } from './types';
import { generateRecipe } from './services/geminiService';

const App: React.FC = () => {
    const [recipe, setRecipe] = useState<Recipe | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleGenerateRecipe = async (
        ingredients: string,
        mealType: string,
        cuisine: string,
        diet: string
    ) => {
        setIsLoading(true);
        setError(null);
        setRecipe(null);
        try {
            const newRecipe = await generateRecipe(ingredients, mealType, cuisine, diet);
            setRecipe(newRecipe);
        } catch (err: any) {
            setError(err.message || "An unknown error occurred.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-900 text-white font-sans p-4 sm:p-6 md:p-8">
            <div className="container mx-auto flex flex-col items-center gap-10">
                <Header />
                <RecipeForm onSubmit={handleGenerateRecipe} isLoading={isLoading} />
                
                <div className="w-full max-w-4xl mt-6">
                    {isLoading && <Spinner />}
                    {error && (
                        <div className="bg-red-900/50 border border-red-500 text-red-300 px-4 py-3 rounded-lg text-center" role="alert">
                            <strong className="font-bold">Oh no! </strong>
                            <span className="block sm:inline">{error}</span>
                        </div>
                    )}
                    {recipe && <RecipeCard recipe={recipe} />}
                </div>
            </div>
        </div>
    );
};

export default App;
