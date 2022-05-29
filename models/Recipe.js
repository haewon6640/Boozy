const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RecipeSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    name: {
        type: String,
        required: true
    } 
    // ingredients: [{type: ObjectId, ref: 'ingredients'}]
}, {
    timestamps: true
});

module.exports = Recipe = mongoose.model('Recipe', RecipeSchema);
