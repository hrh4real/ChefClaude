import React from "react";
import ReactMarkdown from 'react-markdown';

export default function Recipe(props) {
    return (
        <section className="recipe-result-section">
            <ReactMarkdown
            >
                {props.recipe}
            </ReactMarkdown>
        </section>
    )
}