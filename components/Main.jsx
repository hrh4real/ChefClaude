import React from "react";
import { useState } from "react";

export default function AddIngredients() {

    const [ingredients, setIngredients] = useState([]);

    const ingredientsList = ingredients.map(item => (
        <li key={item}>{item}</li>
    ))

    function addIngredients(formData) {
        const newIngredient = formData.get("ingredient")
        setIngredients(prevIngredients => [
            ...prevIngredients, newIngredient
        ])
    }

    return (
        <main>
            <form
                className="add-ingredient-form"
                action={addIngredients}
            >
                <input
                    type="text"
                    placeholder="e.g. oregano"
                    aria-label="Add ingredient"
                    name="ingredient"
                />
                <button
                    
                >
                    Add Ingredient
                </button>
            </form>
            <ul>
                {ingredientsList}
            </ul>
        </main>
    )
}
