import React from "react";
import { GiOrangeSlice } from 'react-icons/gi';
class RecipeShow extends React.Component {

    componentDidMount() {
        // this.props.fetchIngredients();
        // this.props.fetchRecipes()
    }
    componentWillReceiveProps(newState) {
        // this.setState({recipes: newState.recipes})
    }

	formatSteps(instructions){
		

	}

    render() {
		let recipe = {
			name:"dinkypoo",
		 	ingredients:["vodhah", "arange"],
			reviews:"this will be review summary",
			instructions:"take the vodkah \n drink it \n eat the orage  \n be done"
		}
		return (
		<div className="webpage">
			<div className="two-col">
				<div className="recipe-left">
					<div className="show-photo">
						<img src="https://www.liquor.com/thmb/yOze-jG9Dr7UjvNyQ3mKLELJh08=/720x720/filters:fill(auto,1)/__opt__aboutcom__coeus__resources__content_migration__liquor__2019__04__24153243__revolver-720x720-recipe-1-f662b26f4c3e49588c629a4533c8830b.jpg" alt="" />
					</div>
					<div className="recipe-show-details">
						<div>Ingredients
							<ul>
								{recipe.ingredients.map((ingredient)=>(<li key={ingredient}>
									<GiOrangeSlice/> {ingredient}</li>))}
							</ul>
						</div>
						
						<div>Steps
							<ol>
								{recipe.instructions.split("\n").map((step)=> (<li key={step}>{step}</li>))}
							</ol>
						</div>
					</div>
				</div>
				<div className="recipe-right">
					<div className="review-show">
						{recipe.reviews}
					</div>
					<div className="review-form-box">
						this will be a form
					</div>
				</div>
			</div>
			<div className="review-show-container">
				this will be the review-show
			</div>
		</div>
	)}
}

export default RecipeShow;