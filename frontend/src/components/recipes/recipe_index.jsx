import React from "react";
import RecipeIndexItem from "./recipe_index_item";
import {Link} from "react-router-dom";
import { AiOutlinePlusCircle } from 'react-icons/ai';

class RecipeIndex extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            recipes: [],
        };
    }
    componentDidMount() {
        this.props.fetchIngredients();
        this.props.fetchRecipes()
    }
    componentWillReceiveProps(newState) {
        this.setState({recipes: newState.recipes})
    } 
    componentDidUpdate(prevProps) {
        if (prevProps.location.search != this.props.location.search) {
            this.props.fetchRecipes();
        }
    }
    dummyItem(){
      const recipe = {
        dummy: true, 
        imgUrl: "https://www.kindpng.com/picc/m/87-875382_cocktails-black-and-white-png-transparent-png.png",
        name: "Create Your Own!"
      }
      return (
        <RecipeIndexItem
        key="first"
        recipe={recipe}
        className="red-text"
        />
      )
    }

    render() {
        if (this.state.recipes.length === 0) {
          return <div className="loading webpage go-shopping"> <h1>No Drinks Found</h1></div>;
        } else {
            return (
            <div className="webpage recipe-index">
                {/* <Link  to="/recipes/new"><AiOutlinePlusCircle className='add-recipe'/></Link> */}
                <ul className="recipe-index-container">
                    {this.dummyItem()}
                    {this.state.recipes.map((recipe, idx)=> (
                        <RecipeIndexItem
                            key={recipe._id} 
                            ingredients={this.props.ingredients} 
                            recipe={recipe}
                        />
                    ))}
                </ul>
            </div>
        );
        }
    }
}

export default RecipeIndex;
 