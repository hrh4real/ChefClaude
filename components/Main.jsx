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
                    className="add-ingredient-button"
                >
                    Add Ingredient
                </button>
            </form>
            {ingredientsList.length ? (
                <section className="get-recipe-section">
                <h3>Ingredients on hand : </h3>
                <ul className="ingredients-list" aria-live="polite">
                    {ingredientsList}
                </ul>
                {
                    ingredientsList.length > 3 ? (
                        <div className="get-recipe-container">
                            <div>
                                <h4>Ready for a recipe</h4>
                                <p>Generate a recipe from your list of ingredients.</p>
                            </div>
                            <div>
                            <button
                                className="get-recipe-button"
                            >
                                Get a recipe
                            </button>
                            </div>
                        </div>
                    ) : null
                }
            </section>
            ) : null}

        </main>
    )
}
