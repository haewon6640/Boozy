const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RecipeSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    name: {
        type: String,
        required: true,
        unique: true
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
