import React from "react";
import { useState, useRef, useEffect } from "react";
import Recipe from "./Recipe";
import IngredientsList from "./IngredientsList";
import { getRecipeFromMistral } from "./ai";

export default function AddIngredients() {

    const [ingredients, setIngredients] = useState(["all major spices", "major dairy products", "butter", "pepper"]);

    const [recipe, setRecipe] = useState("");
    const recipeSection = useRef(null)

    const [error, setError] = useState("");

    const [isLoading, setIsLoading] = useState(false);
    
    function addIngredients(formData) {
        const newIngredient = formData.get("ingredient")

        if (!newIngredient.trim()) {
            setError("Please enter an ingredient");
            return;
        }

        const isDuplicate = ingredients.some(ingredient =>
            ingredient.toLowerCase() === newIngredient.trim().toLowerCase()
        )

        if (isDuplicate) {
            setError(`${newIngredient} is already in the list`);
            return;
        }

        setError("");
        setIngredients(prevIngredients => [
            ...prevIngredients, newIngredient
        ]);
    }

    const ingredientsList = ingredients.map(item => (
        <li key={item}>{item}</li>
    ))

    async function getRecipe() {
        setIsLoading(true);
        try {
            const recipeMarkdown = await getRecipeFromMistral(ingredients);
            setRecipe(recipeMarkdown);
        } catch (err) {
            setError("Failed to generate recipe. Please try again.");
        } finally {
            setIsLoading(false); 
        }
    }

    useEffect(() => {
        if (recipe !== "" && recipeSection.current !== null) {
            recipeSection.current.scrollIntoView({behavior: "smooth"})
        }
    }, [recipe])

    return (
        <main>
            <form
                className="add-ingredient-form"
                action={addIngredients}
            >
                <div className="input-container">
                    <input
                        type="text"
                        placeholder="e.g. oregano"
                        aria-label="Add ingredient"
                        name="ingredient"
                        className={error ? 'error-input' : ''}
                        aria-invalid={error ? 'true' : 'false'}
                    />
                    {error && <span className="error-message" role="alert">{error}</span>}
                </div>
                <button
                    className="add-ingredient-button"
                >
                    Add Ingredient
                </button>
            </form>
            {ingredientsList.length ? (
                <IngredientsList
                    ingredients={ingredients}
                    getRecipe={getRecipe}
                    isLoading={isLoading}
                    ref={recipeSection}
                />
            ) : null}
            {recipe && (
                <Recipe
                    recipe={recipe}
                />
            )}
        </main>
    );
}
