import React from "react";
import FilterItem from "./ingredient_filter_item";
import LoadingSpinner from "../loading/loading";
export default class RecipeForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            ingredients: [], 
            instructions: "",
            additionalInfo: "",
            categories: {
                alcohol: [],
                produce: [],
                mixers: [],
                garnish: []
            }, 
            description: "",
            imageFile: "",
            imgUrl: "",
            loading: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.addToCart = this.addToCart.bind(this);
        this.handleFile = this.handleFile.bind(this);
        this.handleFormData = this.handleFormData.bind(this);
    }

    handleFile(e){
        const file = e.target.files[0];
        const fileReader = new FileReader();
        fileReader.onloadend = function () {
            this.setState({imageFile: file, imgUrl: fileReader.result})
        }.bind(this)
        if (file){
            fileReader.readAsDataURL(file);
        }
    }

    handleFormData(state){
        let formData = new FormData();
        formData.append("recipe[name]", state.name)
        formData.append("recipe[ingredients]", JSON.stringify(state.ingredients))
        formData.append("recipe[instructions]", state.instructions)
        formData.append("recipe[additionalInfo]", state.additionalInfo)
        formData.append("recipe[description]", state.description)
        formData.append("recipe[photo]", state.imageFile)
        
        return formData;
    }

    combineCategories(type){
        let cats = [];
        this.props.ingredients.forEach((ingredient) => {
            if (ingredient.category === type) {
                cats.push(ingredient)
            }
        })
        return cats;
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
        this.setState({loading: true})
        this.props.action(this.handleFormData(this.state))
            .then(()=>{
                this.setState({loading: false});
                this.props.history.push("/recipes");
            });
    }

    addToCart(ing) {
        this.setState({ingredients: this.state.ingredients.concat([ing])})
    }

    render() {
        const description_explanation = "Write a short description of your cocktail.";
        const description_placeholder = 'The cosmopolitan cocktail, typically referred to as the "cosmo," gained popularity during the 1990s when it was frequently mentioned on the television show Sex and the City. The combination of vodka, orange liqueur, lime juice, and cranberry juice have made it a timeless classic.';
        const instructions_explanation = "Give detailed step by step instructions to create your cocktail."
        const instructions_placeholder = 'Combine vodka, lime juice, triple sec, and cranberry juice in a cocktail shaker. Add ice, cover and shake until chilled. Strain into a chilled cocktail glass.\nGarnish with a lime wedge.'
        const additionalInfo_explanation = "Provide suggested alcohol brands, or ingredient replacements."
        const additionalInfo_placeholder = "Use high quality vodka such as Hangar 1, Square One. \n Fresh lime juice is best. Don't throw that peel away! You can use it as a garnish." 

        this.alcoholArray = this.combineCategories("Alcohol")
        this.produceArray = this.combineCategories("Produce")
        this.mixersArray = this.combineCategories("Mixers")
        this.garnishArray = this.combineCategories("Garnish")
        
        if (!this.state.loading) {
            return <LoadingSpinner />
        }
        return (
            <div className="webpage outer-create-recipe-form">
                <div className="inner-create-recipe-form">
                    <aside className="ingredient-list">
                        <div className="ingredient-list-title">Add Ingredients</div>
                        <FilterItem addToCart={this.addToCart} subtitle="Alcohol" array={this.alcoholArray}/>
                        <FilterItem addToCart={this.addToCart} subtitle="Produce" array={this.produceArray}/>
                        <FilterItem addToCart={this.addToCart} subtitle="Mixers" array={this.mixersArray}/>
                        <FilterItem addToCart={this.addToCart} subtitle="Garnish" array={this.garnishArray}/>
                        {/* {"Ingredient List -   "}
                        {this.state.ingredients.map(ingredient=><span >{ingredient.name}  </span>)} */}
                    </aside>
                    <div className="recipe-form-container">
                        <form onSubmit={this.handleSubmit} className="create-recipe-form">
                            <h1 className="form-title">{this.props.formType}</h1>
                            <label className="main-label">Recipe Name</label>
                                <input onChange={this.update("name")} type="text" value={this.state.name} placeholder="Cosmopolitan" />
                            <label className="main-label" htmlFor="description">Description</label>
                            <p className="description-label">{description_explanation}</p>
                            <textarea name="description" type="text" onChange={this.update("description")} value={this.state.description} 
                                placeholder={description_placeholder}/>

                            <label className="main-label" htmlFor="instruction">Instructions</label>
                            <p className="description-label">{instructions_explanation}</p>
                            <textarea name="instruction" type="text" onChange={this.update("instructions")} value={this.state.instructions} 
                                placeholder={instructions_placeholder}/>

                            <label className="main-label" htmlFor="additional-info">Additional Info</label>
                            <p className="description-label">{additionalInfo_explanation}</p>
                            <textarea name="additional-info" type="text" onChange={this.update("additionalInfo")} value={this.state.additionalInfo} 
                                placeholder={additionalInfo_placeholder}/>
                            <input type="file" name="photo" onChange={this.handleFile} />
                            <button className="btn">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}