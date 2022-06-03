import React from "react";
import { GiOrangeSlice, GiTrophiesShelf } from 'react-icons/gi';
import Boozymap from '../map/map'
import BoozyMap2 from '../map/map2'
import ReviewGraphic from "../reviews/review_graphic";

class BarCartRecipeShow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            recipe: this.props.recipe,
            ingredients: this.props.ingredients,
            missing: this.props.missing,
            selectedMissing: ""
        }
        this.setMissing = this.setMissing.bind(this)

    }

    setMissing(missingIngredient) {
        return e => this.setState({
            selectedMissing: missingIngredient
        });
        
    }

    render() {
      let ingredients_we_have;
		  if(this.props.missing) ingredients_we_have = this.props.ingredients.filter((el)=>(!this.props.missing.includes(el)))

        const recipe = this.props.recipe;
        if (Object.values(recipe).length === 0) {
            return null;
        }
		return (
		<div className="barcart-recipe-show">
			<div className="two-col">
				<div className="recipe-left">
                    <h1 className="recipe-title">{recipe.name}</h1>
					<div className="show-photo">
						<img src={recipe.imgUrl} alt="" />
					</div>					
				</div>
				<div className="recipe-right">
					<div className="two-col a-asym">
                    <div className="recipe-ingredients">
                        <h2>Ingredients</h2>
                        <ul>
                            {ingredients_we_have.map((ingredient)=>(
                                <li key={ingredient._id}>
                                    <GiOrangeSlice className="orange"/> 
                                    <p>{ingredient.name}</p>
                                </li>
                            ))}
                            {this.props.missing.length > 0 && <div>setMissing
                                <p className="missing-title">--Missing Ingredients--</p>
                                {this.props.missing.map((ingredient)=>(
                                    <li onClick={this.setMissing(ingredient.name)} className="missing-ingredient" key={ingredient._id}>
                                        <GiOrangeSlice className="orange"/> 
                                        <p>{ingredient.name}</p>
                                    </li>
                                ))}
                            </div>}
                        </ul>
					</div>
					<div className="review-graphic">
						<ReviewGraphic/>
					</div>

					</div>
                    <div className="recipe-bottom-left">
                       <p className="recipe-description">{recipe.description ? recipe.description : "A classical drink with hint of sweet and bitterness."}</p>
                    </div>	
                    <div className="recipe-steps">
						<h2>Steps</h2>
                        <ol>
                            {this.props.recipe.instructions.split("\n").map((step,idx)=> (<li key={idx}>{step}</li>))}
                        </ol>
                    </div>
				</div>
			</div>
            {this.props.missing.length > 0 && <BoozyMap2 query={this.state.selectedMissing}/>}
		</div>
	)}
}

export default BarCartRecipeShow;