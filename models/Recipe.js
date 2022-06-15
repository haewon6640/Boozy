const mongoose = require("mongoose");
const Review = require("./Review");
const User = require("./User");
const Schema = mongoose.Schema;
const RecipeSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        imgUrl: {
            type: String,
            default:
                "https://www.yummymummykitchen.com/wp-content/uploads/2019/06/greyhound-drink-cocktail-10-720x720.jpg",
        },
        name: {
            type: String,
            required: true,
            unique: true,
        },
        description: {
            type: String,
            required: true,
        },
        ingredients: [{ type: Schema.Types.ObjectId, ref: "Ingredient" }],
        reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
        instructions: {
            type: String,
            required: true,
        },
        creater_flavor_profile: {
            boozy: { type: Number, default: 0 },
            sweet: { type: Number, default: 0 },
            sour: { type: Number, default: 0 },
            bitter: { type: Number, default: 0 },
            salty: { type: Number, default: 0 },
            umami: { type: Number, default: 0 },
            rating: { type: Number, default: 0 },
        },
        // Suggested ingredient brands
        additionalInfo: {
            type: String,
            default: "",
        },
    },
    {
        timestamps: true,
    }
);

RecipeSchema.pre("remove", function (next) {
    Review.remove({ recipe: this._id }).exec();
    next();
});
module.exports = Recipe = mongoose.model("Recipe", RecipeSchema);
