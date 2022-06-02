import React from "react";
import { Link } from "react-router-dom";
const RecipeIndexItem = (props) => {
    return (
        <Link to={`/recipes/${props.recipe._id}`}>
            <li className="recipe-index-item">
                <div className="photo-box">
                    <img src={props.recipe.imgUrl} 
                    alt={props.recipe.name}
                    />
                </div>
                <div className="photo-title">{props.recipe.name}</div>
                {/* <p>{props.recipe.created_at}</p> */}
                {/* {props.recipe.ingredients.map(ingredient_id=>(
                    <span>{props.ingredients[ingredient_id].name}</span>
                ))} */}
            </li>
        </Link>
    )
}
export default RecipeIndexItem;