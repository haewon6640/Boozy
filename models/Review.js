const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
    reviewer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }, 
    recipe: {
        type: Schema.Types.ObjectId,
        ref: 'Recipe'
    },
    rating:   {boozy: {type: Number, default:0}, 
              sweet: {type: Number, default:0},
              sour: {type: Number, default:0},
              bitter: {type: Number, default:0},
              salty: {type: Number, default:0},
              umami: {type: Number, default:0},
              rating: {type: Number, default:0}},
    title: {
        type: String,
        default: ""
    },
    body: {
        type: String,
        default: ""
    }
}, {
    timestamps: true
})

ReviewSchema.pre('remove',function(next) {
    const Recipe = require("./Recipe");
    Recipe.updateOne(
        {_id: this.recipe},
        {$pull: {reviews: this._id}}
    );
    next();
});

module.exports = Review = mongoose.model('Review', ReviewSchema);