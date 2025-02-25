import React from "react";
import ReactMarkdown from 'react-markdown';

export default function Recipe(props) {
    return (
        <section
            className="recipe-result-section"
        >
            <h1>Hugging Face Recommends : </h1>
            <ReactMarkdown>
                {props.recipe}
            </ReactMarkdown>
        </section>
    )
}