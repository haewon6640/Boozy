# Boozy

## Want to make new cocktails? 
We've all been there - hanging out at home on a Saturday night and looking to make a cocktail with what we have on hand in our kitchen.  But what can we actually make?  With Boozy, users will be able to add alcohol, mixers and syrups to a virtual "Shelf" and generate a list of cocktails they can make with what they have on hand.  If a user is missing ingredients, they will be shown grocery stores, liqour stores or specialty shops where they might be able to find those ingredients.  
Users will also be able to submit, share and update their own cocktail recipes, as well as post what they are drinking, and review, comment and share if they are drinking another user's recipe.

## Check it out, live!
[On Heroku](https://Boozy1.herokuapp.com/#/)

## Technologies Used
+ MongoDB schema database
+ Mongoose for seeding ingredients and recipes
+ ExpressJS setting up backend routes
+ ReactJS and ReduxJS create frontend routes for webpage rendering
+ NodeJS runtime environment that enables broswer-external Javascript
+ D3.js to create dynamic flavor profiles

## Features

### Recipe Creation and Recipe Update
<!-- description
```
paste snippet here
 ``` 
 
 add link for gif showing implementation-->

### Reviews
<!-- description
```
paste snippet here
 ``` 
 
 add link for gif showing implementation-->

### Bar Cart Shelf
The Bar Cart Shelf is generated using an auto complete bar, which will populate the bar cart with the first ingredient that matches a partial input.
```
  handleSubmit(e){
    e.preventDefault()
    let ing = this.findIngredient(this.state.inputVal)
    if(ing.length > 0) {
      this.props.addItem(ing)
      this.setState({inputVal: ""})
    } else {
      ing = this.returnFirstIngredient(this.state.inputVal)
      this.props.addItem(ing)
      this.setState({inputVal: ""})
    }
  }
 ``` 

 <!-- add link for gif showing implementation -->

### Bar Cart Drink Filter
The Bar Cart Shelf is used to dynamically update what drinks the user is able to create.
```
 	findCanDrinks = ()=>{   
		let canMake = Object.values(this.props.recipes.all).filter(recipe=>(
			recipe.ingredients.every(ingredient=>(
        this.props.user.shelf.includes(ingredient)|| ingredient === null))) &&
				(recipe.avg_rating[this.state.filter_choice] >= 3 || this.state.filter_choice === "")
		)
		this.setState({can_make:canMake})
	}
 ``` 
 ```
  componentDidMount() {
		this.props.fetchUser().then(() => {
			this.props.fetchIngredients().then(()=>this.setState({loading:false}));
			this.props.fetchRecipes().then(this.findCanDrinks);
    })
  }
 ``` 
 
 
 <!-- add link for gif showing implementation -->

### Google Map to find missing ingredient
<!-- description
```
paste snippet here
 ``` 
 
 add link for gif showing implementation-->
