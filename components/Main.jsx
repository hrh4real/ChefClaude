import React from "react";
import { useState } from "react";

export default function AddIngredients() {

    const [ingredients, setIngredients] = useState([]);

    const [recipeShown, setRecipeShown] = useState(false);

    const [error, setError] = useState("");
    
    function addIngredients(formData) {
        const newIngredient = formData.get("ingredient")

        if (!newIngredient.trim()) {
            setError("Please enter an ingredient");
            return;
        }

        // if duplicate input
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

    function handleClickRecipe() {
        setRecipeShown(prevState => 
            !prevState
        )
    }

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
                                    onClick={handleClickRecipe}
                                >
                                    Get a recipe
                                </button>
                            </div>
                        </div>
                    ) : null
                }
            </section>
            ) : null}
            {recipeShown && (
                <section className="recipe-result-section">
                    <h2>Chef Claude Recommends:</h2>
                    <article className="suggested-recipe-container" aria-live="polite">
                        <p>Based on the ingredients you have available, I would recommend making a simple a delicious <strong>Beef Bolognese Pasta</strong>. Here is the recipe:</p>
                        <h3>Beef Bolognese Pasta</h3>
                        <strong>Ingredients:</strong>
                        <ul>
                            <li>1 lb. ground beef</li>
                            <li>1 onion, diced</li>
                            <li>3 cloves garlic, minced</li>
                            <li>2 tablespoons tomato paste</li>
                            <li>1 (28 oz) can crushed tomatoes</li>
                            <li>1 cup beef broth</li>
                            <li>1 teaspoon dried oregano</li>
                            <li>1 teaspoon dried basil</li>
                            <li>Salt and pepper to taste</li>
                            <li>8 oz pasta of your choice (e.g., spaghetti, penne, or linguine)</li>
                        </ul>
                        <strong>Instructions:</strong>
                        <ol>
                            <li>Bring a large pot of salted water to a boil for the pasta.</li>
                            <li>In a large skillet or Dutch oven, cook the ground beef over medium-high heat, breaking it up with a wooden spoon, until browned and cooked through, about 5-7 minutes.</li>
                            <li>Add the diced onion and minced garlic to the skillet and cook for 2-3 minutes, until the onion is translucent.</li>
                            <li>Stir in the tomato paste and cook for 1 minute.</li>
                            <li>Add the crushed tomatoes, beef broth, oregano, and basil. Season with salt and pepper to taste.</li>
                            <li>Reduce the heat to low and let the sauce simmer for 15-20 minutes, stirring occasionally, to allow the flavors to meld.</li>
                            <li>While the sauce is simmering, cook the pasta according to the package instructions. Drain the pasta and return it to the pot.</li>
                            <li>Add the Bolognese sauce to the cooked pasta and toss to combine.</li>
                            <li>Serve hot, garnished with additional fresh basil or grated Parmesan cheese if desired.</li>
                        </ol>
                    </article>
                </section>
            )}
        </main>
    )
}
