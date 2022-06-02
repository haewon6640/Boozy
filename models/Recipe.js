const mongoose = require('mongoose');
const Review = require('./Review');
const User = require('./User');
const Schema = mongoose.Schema;
const RecipeSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
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
    ingredients: [{type: Schema.Types.ObjectId, ref: 'Ingredient'}],
    reviews: [{type: Schema.Types.ObjectId, ref: 'Review'}],
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

RecipeSchema.pre('remove', function(next) {
    Review.remove({reviewer: this._id }).exec();
    next();
})
module.exports = Recipe = mongoose.model('Recipe', RecipeSchema);
