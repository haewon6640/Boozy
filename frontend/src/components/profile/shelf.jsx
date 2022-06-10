import React, {useEffect} from 'react'
import {AiOutlineCloseCircle} from 'react-icons/ai'; 

export default function Shelf(props) {
  useEffect(()=> props.findCanDrinks(), [props.user.shelf.length])
  console.log(props)
  return (
    <ul>
      {props.user.shelf.map((item) => (
          <li className="bar-items" key={item}>
              {<h3>{props.ingredients[item].name}</h3>}
              <AiOutlineCloseCircle 
                  onClick={()=>props.remove(item, props.user.id)
                      .then(()=>props.fetchUser())}
                  className="remove"
              />
          </li>
      ))}
    </ul>
  )
}