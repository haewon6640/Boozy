import React from "react";

const RecipeIndexItem = (props) => {
    return (
        <li>
            <p>{props.recipe.name}</p>
            <p>{props.recipe.created_at}</p>
            {props.recipe.ingredients.map(ingredient_id=>(
                <span>{props.ingredients[ingredient_id].name}</span>
            ))}
        </li>
    )
}
export default RecipeIndexItem;