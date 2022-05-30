import React from "react";

const RecipeIndexItem = (props) => {
    return (
        <li className="recipe-index-item">
			<div className="photo-box">
				<img src="https://www.yummymummykitchen.com/wp-content/uploads/2019/06/greyhound-drink-cocktail-10-720x720.jpg" 
				alt={props.recipe.name}
				/>
			</div>
            <div className="photo-title">{props.recipe.name}</div>
            {/* <p>{props.recipe.created_at}</p> */}
            {/* {props.recipe.ingredients.map(ingredient_id=>(
                <span>{props.ingredients[ingredient_id].name}</span>
            ))} */}
        </li>
    )
}
export default RecipeIndexItem;