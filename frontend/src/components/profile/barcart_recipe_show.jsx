import React from "react";
import { GiOrangeSlice, GiTrophiesShelf } from 'react-icons/gi';
class BarCartRecipeShow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            recipe: this.props.recipe,
            ingredients: this.props.ingredients,
            missing: this.props.missing
        }
    }
    render() {
		// let recipe = {
		// 	name:"dinkypoo",
		//  	ingredients:["vodhah", "arange"],
		// 	reviews:"this will be review summary",
			// instructions:"take the vodkah \n drink it \n eat the orage  \n be done"
		// }
        const recipe = this.props.recipe;
        console.log(recipe);
        if (Object.values(recipe).length === 0) {
            return null;
        }
        console.log(recipe);
		return (
		<div className="barcart-recipe-show">
			<div className="two-col">
				<div className="recipe-left">
					<div className="show-photo">
						<img src="https://www.liquor.com/thmb/yOze-jG9Dr7UjvNyQ3mKLELJh08=/720x720/filters:fill(auto,1)/__opt__aboutcom__coeus__resources__content_migration__liquor__2019__04__24153243__revolver-720x720-recipe-1-f662b26f4c3e49588c629a4533c8830b.jpg" alt="" />
					</div>
                    <h1 className="recipe-title">{recipe.name}</h1>
                    <div className="recipe-bottom-left">
                       <p className="recipe-description">{recipe.description ? recipe.description : "A classical drink with hint of sweet and bitterness."}</p>
                        {/* <div className="review-show">
                            <div>{this.state.recipe.name}'s Flavor Profile</div>
                            <ReviewGraphic/>
                        </div> */}
                    </div>	
				</div>
				<div className="recipe-right">
                    <div className="recipe-ingredients">
                        <h2>Ingredients</h2>
                        <ul>
                            {this.props.ingredients.map((ingredient)=>(
                                <li key={ingredient._id}>
                                    <GiOrangeSlice className="orange"/> 
                                    <p>{ingredient.name}</p>
                                </li>
                            ))}
                            <p className="missing-title">Missing Ingredients</p>
                            {this.props.missing.map((ingredient)=>(
                                <li className="missing-ingredient" key={ingredient._id}>
                                    <GiOrangeSlice className="orange"/> 
                                    <p>{ingredient.name}</p>
                                </li>
                            ))}
                        </ul>
					</div>
                    <div className="recipe-steps">
						<h2>Steps</h2>
                        <ol>
                            {this.props.recipe.instructions.split("\n").map((step,idx)=> (<li key={idx}>{step}</li>))}
                        </ol>
                    </div>
				</div>
			</div>
            <div className="map-container">
                <img
                    src="https://mikesrpgcenter.com/zelda3/maps/lightworld_large.gif"
                    alt=""
                />
            </div>
		</div>
	)}
}

export default BarCartRecipeShow;