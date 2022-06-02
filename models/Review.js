const mongoose = require('mongoose');
const Recipe = require('./Recipe');
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
    rating: [
                {boozy: {type: Number, default:0}},
                {sweet: {type: Number, default:0}},
                {sour: {type: Number, default:0}},
                {bitter: {type: Number, default:0}},
                {salty: {type: Number, default:0}},
                {umami: {type: Number, default:0}},
                {rating: {type: Number, default:0}}
                    ],
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
    Recipe.update(
        {reviews: this._id},
        {$pull: { reviews: this._id}},
        {multi:true}
    ).exec();
    next();
});

module.exports = Review = mongoose.model('Review', ReviewSchema);