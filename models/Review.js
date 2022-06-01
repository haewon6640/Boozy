const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
    reviewer: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }, 
    recipe: {
        type: Schema.Types.ObjectId,
        ref: 'recipes'
    },
    rating: [
                {spicy: {type: Number, default:0}},
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

module.exports = Review = mongoose.model('Review', ReviewSchema);