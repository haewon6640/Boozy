import React from "react";
import { Link } from "react-router-dom";
const RecipeIndexItem = (props) => {
    return (
        <li className="recipe-index-item">
            <Link to={`/recipes/${props.recipe._id}`}>
                <div className="photo-box">
                    <img 
                    className="recipe-index-show"
                    src={props.recipe.imgUrl} 
                    alt={props.recipe.name}
                    />
                </div>
                <div className="photo-title">{props.recipe.name}</div>
                {/* <p>{props.recipe.created_at}</p> */}
                {/* {props.recipe.ingredients.map(ingredient_id=>(
                    <span>{props.ingredients[ingredient_id].name}</span>
                ))} */}
            </Link> 
        </li>
    )
}
export default RecipeIndexItem;