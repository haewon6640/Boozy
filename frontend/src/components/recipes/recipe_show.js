import React from "react";
import { GiOrangeSlice, GiTrophiesShelf } from 'react-icons/gi';
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
        console.log('recipe show props:', this.props)
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
			// instructions:"take the vodkah \n drink it \n eat the orage  \n be done"
		// }
        const recipe = this.state.recipe;
        console.log("recipe show:",this.props)
		return (
		<div className="recipe-show">
			<div className="two-col">
				<div className="recipe-left">
					<div className="show-photo">
						<img src={this.props.recipe.imgUrl} alt="" />
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
                            {this.state.ingredients.map((ingredient)=>(
                                <li key={ingredient._id}>
                                    <GiOrangeSlice className="orange"/> 
                                    <p>{ingredient.name}</p>
                                </li>
                            ))}
                        </ul>
					</div>
                    <div className="recipe-steps">
						<h2>Steps</h2>
                        <ol>
                            {this.state.recipe.instructions.split("\n").map((step,idx)=> (<li key={idx}>{step}</li>))}
                        </ol>
                    </div>
                    <div className="review-form-container">
				              <ReviewForm createReview={this.props.createReview} props={this.props} />
			              </div>
				</div>
			</div>
            <div className="separator"></div>
      
			<div className="review-index-container">
				<ReviewIndex reviews={this.state.reviews}/>
			</div>
		</div>
	)}
}

export default RecipeShow;