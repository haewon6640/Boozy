import React from "react";
import { GiOrangeSlice } from 'react-icons/gi';
import ReviewIndex from '../reviews/review_index'
import ReviewForm from '../reviews/review_form'
import ReviewGraphic from '../reviews/review_graphic'

class RecipeShow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            recipe: {},
            ingredients: [],
            reviews: []
        }
    }
    componentDidMount() {
        this.props.fetchRecipe()
            .then(()=> this.setState({
                loading: false,
                recipe: this.props.recipe,
                ingredients: this.props.ingredients,
                reviews: this.props.reviews
            }))
    }
    render() {
        if ( Object.keys(this.state.recipe).length === 0) {
            return null;
        }
		// let recipe = {
		// 	name:"dinkypoo",
		//  	ingredients:["vodhah", "arange"],
		// 	reviews:"this will be review summary",
		// 	instructions:"take the vodkah \n drink it \n eat the orage  \n be done"
		// }
		return (
		<div className="webpage">
			<div className="two-col">
				<div className="recipe-left">
					<div className="show-photo">
						<img src="https://www.liquor.com/thmb/yOze-jG9Dr7UjvNyQ3mKLELJh08=/720x720/filters:fill(auto,1)/__opt__aboutcom__coeus__resources__content_migration__liquor__2019__04__24153243__revolver-720x720-recipe-1-f662b26f4c3e49588c629a4533c8830b.jpg" alt="" />
					</div>
					<div className="recipe-show-details">
						<div> <h2>Ingredients</h2>
							<ul>
								{this.state.ingredients.map((ingredient)=>(<li key={ingredient._id}>
									<GiOrangeSlice/> {ingredient.name}</li>))}
							</ul>
						</div>
						
						<div><h2>Steps</h2>
							<ol>
								{this.state.recipe.instructions.split("\n").map((step,idx)=> (<li key={idx}>{step}</li>))}
							</ol>
						</div>
					</div>
				</div>
				<div className="recipe-right">
					<div className="review-show">
                        <div>{this.state.recipe.name}'s Flavor Profile</div>
						<ReviewGraphic/>
					</div>
					<div className="review-form-box">
						<ReviewForm/>
					</div>
				</div>
			</div>
			<div className="review-index-container">
				<ReviewIndex/>
			</div>
		</div>
	)}
}

export default RecipeShow;