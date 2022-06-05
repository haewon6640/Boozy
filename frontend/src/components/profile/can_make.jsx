import React, { useState, useEffect } from 'react'
import { IoIosArrowBack, IoIosArrowDown } from 'react-icons/io';

export default function CanMake(props) {
  const [limit, setLimit] = useState(5);
  useEffect(()=>props.autoPopulate())

  const toggleList=()=>{
    if (limit === 5) {
      setLimit(20)
    } else {
      setLimit(5)
    }
  }

  return (
    <div className="make-box">
      <div className="in-line"onClick={()=>props.toggleBarCart("can_open")}>
        <h2 >You can make</h2>
        {!props.open && <IoIosArrowBack className='arrow'/>}
        { props.open && <IoIosArrowDown className='arrow'/>}
      </div>
      {props.open && <div>
          <ul>
            {props.drinks.map((recipe, i)=> ( i < limit && <li 
        onClick={()=>props.handleSelection("curr_recipe", recipe)} 
        key={"canMake" + i}>{recipe.name}</li>))}
          </ul>
          {props.drinks.length > 5 && limit === 5 && <button onClick={toggleList}>(Show More)</button>}
          {props.drinks.length > 5 && limit === 20 && <button onClick={toggleList}>(Show Less)</button>}
        </div>}
    </div>
  )
}


