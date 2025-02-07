import React from "react";
import { useState } from "react";

export default function Main() {

    const [ingredients, setIngredients] = useState([]);

    const ingredientsList = ingredients.map(item => (
        <li key={item}>{item}</li>
    ))

    function handleSubmit(event) {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const newIngredient = formData.get("ingredient")
        setIngredients(prevIngredients => [
            ...prevIngredients, newIngredient
        ])
        event.target.reset()
    }

    return (
        <main>
            <form
                className="add-ingredient-form"
                onSubmit={handleSubmit}
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
