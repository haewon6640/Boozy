import React, {useEffect, useState} from "react";
import { GiOrangeSlice, GiShoppingCart } from 'react-icons/gi';
import BoozyMap2 from '../map/map2'
import ReviewGraphic from "../reviews/review_graphic";
import {Link} from "react-router-dom";

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
  // boolean to determine word wrap on ingredients
  let longIng;
  recipe.ingredients.length > 9 ? longIng = true : longIng = false;


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
      <div className="three-col">
        <Link className="show-top-left centered-col"
        // to={'/'}
        to={`/recipes/${recipe._id}`}
        >
          <h2 className="recipe-title">{recipe.name}</h2>
          <div className="show-photo">
            <img src={recipe.imgUrl} alt="" />
          </div>
      
        </Link>
        <div className="show-top-middle">
          <div>
            <div className="triangle"></div>
            <h2>Ingredients</h2>
            <ul
            className={ longIng ? "long-list": ''}
            >
              {ingredients_we_have.map((ingredient)=>(
                <li key={ingredient._id} className='in-line'>
                <GiOrangeSlice className="orange ico"/> 
                <p>{ingredient.name}</p>
                </li>
              ))}
              {missingIngredients.length > 0 && <div>
                  <span className="missing-title">--missing--</span>
                  {missingIngredients.map((ingredient)=>(
                    <li className="missing-ingredient in-line" 
                      key={ingredient._id} 
                      onClick={()=>setSelectedMissing(ingredient)}
                      >
                        <GiOrangeSlice className="orange ico"/> 
                        <p>{ingredient.name}</p>
                        {/* <span className="tooltiptext">click to find on map</span> */}
                    </li>
                  ))}
              </div>}
          </ul>
        </div>
        </div>
        <div className="show-top-right centered-col">
          <h2 id="profile">Flavor Profile</h2>
          <ReviewGraphic flavor_profile={recipe.creator_flavor_profile} size={68}/>
          <p className="recipe-description">{recipe.description ? recipe.description : "A classical drink with hint of sweet and bitterness."}</p>
        </div>
      </div>
      <div className="two-col">
        <div className="show-btm-left">
          <h3>(Click on ingredients to search)</h3>
           <BoozyMap2 query={selectedMissing}/>
        </div>
        <div className="show-btm-right">
          <h2>How to Make It</h2>
          <ol>
            {props.recipe.instructions.split("...")
            .filter(el=> el!=="")
            .join(" ")
            .split(". ")
            .filter(el=> el!=="")
            .join(".")
            .split(".")
            .filter(el=> el!=="")
            .map((step,idx)=> (<li key={idx}>{step}.</li>))}
          </ol>
        </div>
      </div>
        <div className="recipe-bottom-left">
      </div>	
  </div>
  )
}
