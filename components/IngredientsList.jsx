import React from "react";
import { Loader2 } from "lucide-react";

export default function IngredientsList(props) {
    const ingredientsList = props.ingredients.map(item => (
        <li key={item}>{item}</li>
    ));
    return (
        <section className="get-recipe-section">
                <h3>Ingredients on hand : </h3>
                <ul className="ingredients-list" aria-live="polite">
                    {ingredientsList}
                </ul>
                {
                    ingredientsList.length > 3 ? (
                    <div
                        className="get-recipe-container"
                        ref={props.ref}
                    >
                            <div>
                                <h4>Ready for a recipe</h4>
                                <p>Generate a recipe from your list of ingredients.</p>
                            </div>
                            <div>
                                <button
                                    className="get-recipe-button"
                                    onClick={props.getRecipe}
                                    disabled={props.isLoading}
                                >
                                {props.isLoading ? (
                                    <>
                                        <Loader2 className="animate-spin" />
                                        <span>Preparing recipe...</span>
                                    </>
                                    ) : ('Get a recipe')}
                                </button>
                            </div>
                        </div>
                    ) : null
                }
            </section>
    )
}