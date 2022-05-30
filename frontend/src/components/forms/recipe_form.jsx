import React from "react";

export default class RecipeForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            ingredients: []
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.props.fetchIngredients();
    }

    update(field) {
        return e => (
            this.setState({
                [field]: e.target.value
            })
        )
    }
    handleSubmit(e) {
        e.preventDefault();
        this.props.action(this.state)
    }
    addToCart(ing) {
        return (e) => {
            e.preventDefault();
            this.setState({ingredients: this.state.ingredients.concat([ing])})
        }
    }

    render() {
        return (
            <div>
                {this.props.formType}
                <div></div>
                {"Ingredient List   "}
                {this.state.ingredients.map(ingredient=><span>{ingredient.name}</span>)}
                <form onSubmit={this.handleSubmit}>
                    <label>Recipe Name
                        <input onChange={this.update("name")} type="text" value={this.state.name} />
                    </label>
                    <div></div>
                    {Object.values(this.props.ingredients).map(ing=>(
                        <span><button onClick={this.addToCart(ing)}>Add {ing.name}</button></span>
                    ))}
                    <div></div>
                    <button>Submit</button>
                </form>
            </div>
        )
    }
}