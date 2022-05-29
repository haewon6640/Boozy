import React from "react";

const RecipeIndexItem = (props) => {
    return (
        <li>
            <p>{props.recipe.name}</p>
            <p>{props.recipe.created_at}</p>
        </li>
    )
}
export default RecipeIndexItem;