import React from "react";
import { GiOrangeSlice, GiTrophiesShelf } from "react-icons/gi";
import ReviewIndex from "../reviews/review_index";
import ReviewForm from "../reviews/review_form";
import ReviewGraphic from "../reviews/review_graphic";
import {Link} from "react-router-dom"
class RecipeShow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            recipe: {},
            ingredients: [],
            reviews: [],
        };
        // console.log('recipe show props:', this.props)
        this.rerenderPage = this.rerenderPage.bind(this);
    }
    componentDidMount() {
        this.props.fetchRecipe().then(() =>
            this.setState({
                loading: false,
                recipe: this.props.recipe,
                ingredients: this.props.ingredients,
                reviews: this.props.reviews,
            })
        );
    }
    
    rerenderPage() {
        this.props.fetchRecipe().then(() =>
            this.setState({
                loading: false,
                recipe: this.props.recipe,
                ingredients: this.props.ingredients,
                reviews: this.props.reviews,
            })
        );
    }
    parseSteps() {
        if (this.state.recipe.instructions.includes("\n")) {
            return this.state.recipe.instructions
                .split("\n")
                .map((step, idx) => <li key={idx}>{step}</li>);
        } else {
            return this.state.recipe.instructions
                .split(". ")
                .map((step, idx) => <li key={idx}>{step}</li>);
        }
    }
    handleDelete() {
        this.props.deleteRecipe()
            .then(()=>this.props.history.push("/recipes"))
    }

    render() {
        if (Object.keys(this.state.recipe).length === 0 ) {
            return <div className="loading"></div>;
        }

        const recipe = this.state.recipe;
        let update = null;
        if ( this.props.user && this.props.user.id === recipe.user) {
            update = (
                <div className="two-col recipe-update">
                    <Link to={`/recipes/${recipe._id}/edit`}>Edit</Link>
                    <div onClick={this.handleDelete.bind(this)}>Delete</div>
                </div>
            )
        }
        console.log('The props in the recipe show are',this.props)
        return (
            <div className="recipe-show">
                <div className="two-col">
                    <div className="recipe-left">
                        <div className="show-photo">
                            <img src={this.props.recipe.imgUrl} alt="" />
                        </div>
                        <h1 className="recipe-title">{recipe.name}</h1>
                        {update}
                        <div className="recipe-bottom-left">
                            <p className="recipe-description">
                                {recipe.description
                                    ? recipe.description
                                    : "A classical drink with hint of sweet and bitterness."}
                            </p>
                        </div>
                    </div>
                    <div className="recipe-right">
                        <div className="two-col">
                            <div className="recipe-ingredients">
                                <h2>Ingredients</h2>
                                <ul>
                                    {this.state.ingredients.map(
                                        (ingredient) => (
                                            <li key={ingredient._id}>
                                                <GiOrangeSlice className="orange" />
                                                <p>{ingredient.name}</p>
                                            </li>
                                        )
                                    )}
                                </ul>
                            </div>
                            <div className="graphic-title-box">
                                <h2>Flavor Profile</h2>
                                <ReviewGraphic
                                    className="review-graphic"
                                    flavor_profile={recipe.creator_flavor_profile}
                                    size={100}
                                />
                            </div>
                        </div>
                        <div className="recipe-steps">
                            <h2>Steps</h2>
                            <ol>
                                {this.parseSteps()}
                            </ol>
                        </div>
                        <div className="review-form-container">
                            <ReviewForm
                                rerenderPage={this.rerenderPage}
                                createReview={this.props.createReview}
                                fetchReviews={this.props.fetchReviews}
                                recipe={recipe}
                                modal={this.props.modal}
                                openModal={this.props.openModal}
                                closeModal={this.props.closeModal}
                                currentUser={this.props.user}
                                onSubmit={() => alert("hello")}
                            />
                        </div>
                    </div>
                </div>
                <div className="separator"></div>

                <div className="review-index-container">
                    <ReviewIndex
                        fetchReviews={this.props.fetchReviews}
                        reviews={this.state.reviews}
                        propReviews={this.props.reviews}
                    />
                </div>
            </div>
        );
    }
}

export default RecipeShow;
