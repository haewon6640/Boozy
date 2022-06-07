import React, {useEffect, useState} from "react";
import { GiOrangeSlice, GiShoppingCart } from 'react-icons/gi';
import BoozyMap2 from '../map/map2'
import ReviewGraphic from "../reviews/review_graphic";

export default function BarCartRecipeShow(props) {
  const recipe = props.recipe;
  useEffect(()=> props.handleSelection('curr_recipe', recipe), [props.shelf])
  const[selectedMissing, setSelectedMissing] = useState();
  
  if (Object.values(recipe).length === 0) {
    return <div className="go-shopping">
      <GiShoppingCart className="shopping-cart"/>
      <h1>Looks like you need to go shopping! <br/>
      Checkout the drinks you can nearly make to get some ideas.</h1>
      </div>;
  }

  let ingredients_we_have=[];
  let missingIngredients=[];
  recipe.ingredients.forEach((el)=> {
    if (props.shelf.includes(el)) {
      ingredients_we_have.push(props.ingredients[el])
    } else {
      missingIngredients.push(props.ingredients[el])
    }
  })

  return (
    <div className="barcart-recipe-show">
      <div className="two-col">
        <div className="show-top-left">
          <h2 className="recipe-title">{recipe.name}</h2>
          <div className="show-photo">
            <img src={recipe.imgUrl} alt="" />
          </div>
        </div>
        <div className="show-top-right">
          <div className="recipe-ingredients">
            <h2>Ingredients</h2>
            <ul>
              {ingredients_we_have.map((ingredient)=>(
                <li key={ingredient._id} className='in-line'>
                <GiOrangeSlice className="orange ico"/> 
                <p>{ingredient.name}</p>
                </li>
              ))}
              {missingIngredients.length > 0 && <div>
                  <p className="missing-title">--click to find missing ingredients--</p>
                  {missingIngredients.map((ingredient)=>(
                    <li className="missing-ingredient in-line" 
                      key={ingredient._id} 
                      onClick={()=>setSelectedMissing(ingredient)}
                      >
                        <GiOrangeSlice className="orange ico"/> 
                        <p>{ingredient.name}</p>
                    </li>
                  ))}
              </div>}
          </ul>
        </div>

        </div>
      </div>
      <div className="two-col">
        <div className="show-btm-left"></div>
        <div className="show-btm-right"></div>
      </div>







        {/* <ReviewGraphic className="review-graphic" flavor_profile={recipe.avg_rating}/> */}
        {/* <div className="recipe-bottom-left">
          <p className="recipe-description">{recipe.description ? recipe.description : "A classical drink with hint of sweet and bitterness."}</p>
        </div>	 */}
        {/* <div className="recipe-steps">
          <h2>Steps</h2>
          <ol>
            {props.recipe.instructions.split("\n").map((step,idx)=> (<li key={idx}>{step}</li>))}
          </ol>
        </div> */}
          {/* {missingIngredients.length > 0 && <BoozyMap2 query={selectedMissing}/>} */}
  </div>
  )
}
// setMissing(missingIngredient) {
//   return e => this.setState({
//       selectedMissing: missingIngredient
//   });
  
// }