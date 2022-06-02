const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RecipeSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    imgUrl: {
      type: String,
      default: "https://www.yummymummykitchen.com/wp-content/uploads/2019/06/greyhound-drink-cocktail-10-720x720.jpg"
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    ingredients: [{type: Schema.Types.ObjectId, ref: 'ingredients'}],
    reviews: [{type: Schema.Types.ObjectId, ref: 'reviews'}],
    instructions: {
        type: String,
        required: true
    },
    // Suggested ingredient brands
    additionalInfo: {
        type: String,
        default: ""
    }
}, {
    timestamps: true
});

module.exports = Recipe = mongoose.model('Recipe', RecipeSchema);
