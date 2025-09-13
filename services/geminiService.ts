
import { GoogleGenAI, Type } from "@google/genai";
import { Recipe } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const recipeSchema = {
    type: Type.OBJECT,
    properties: {
        recipeName: { type: Type.STRING, description: "The name of the recipe." },
        description: { type: Type.STRING, description: "A short, enticing description of the dish." },
        servings: { type: Type.STRING, description: "The number of servings the recipe makes." },
        prepTime: { type: Type.STRING, description: "Preparation time, e.g., '15 minutes'." },
        cookTime: { type: Type.STRING, description: "Cooking time, e.g., '30 minutes'." },
        totalTime: { type: Type.STRING, description: "Total time to make the dish, e.g., '45 minutes'." },
        ingredients: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "A list of all ingredients with quantities."
        },
        instructions: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "Step-by-step instructions for preparing the dish."
        },
    },
    required: ["recipeName", "description", "servings", "prepTime", "cookTime", "totalTime", "ingredients", "instructions"]
};

export const generateRecipe = async (
    ingredients: string,
    mealType: string,
    cuisine: string,
    diet: string
): Promise<Recipe> => {
    
    let prompt = `You are a world-class chef. Your task is to create a delicious recipe based on the ingredients provided.

Ingredients available: ${ingredients}.

Please generate one creative and tasty recipe.
`;

    if (mealType !== 'Any') {
        prompt += `The meal should be for ${mealType}. `;
    }
    if (cuisine !== 'Any') {
        prompt += `It should be a ${cuisine}-style dish. `;
    }
    if (diet !== 'None') {
        prompt += `The recipe must be ${diet}. `;
    }

    prompt += `
If the provided ingredients are insufficient for a complete recipe, you can add a few common pantry staples (like oil, salt, pepper, flour, sugar, etc.) to make the recipe work. List all ingredients used, including the ones you add.

Return the recipe in the specified JSON format. Do not include any markdown formatting or introductory text outside of the JSON object.
`;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: recipeSchema,
                temperature: 0.8,
            },
        });

        const jsonString = response.text;
        const recipeData = JSON.parse(jsonString);

        return recipeData;

    } catch (error) {
        console.error("Error generating recipe with Gemini:", error);
        throw new Error("Failed to generate recipe. The model may be unable to create a recipe with the provided ingredients and constraints.");
    }
};
