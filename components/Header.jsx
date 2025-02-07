import React from "react";
import roboChef from "./images/robo-chef.png";
import logoChef from "./images/chef-logo.png";

export default function Header() {
    return (
        <>
            <header className="header-container">
                <img
                    src={roboChef}
                    className="chef-img"
                />
                <h1>Chef Claude</h1>
            </header>
        </>
    );
}