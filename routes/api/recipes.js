// routes/api/tweets.js
// Go ahead and delete the test route

const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const Ingredient = require("../../models/Ingredient");
const Recipe = require("../../models/Recipe");
const validateRecipeInput = require("../../validation/recipe");
const Review = require("../../models/Review");
const recipe = require("../../validation/recipe");
const multer = require("multer"); // multer used to handle form data
const Aws = require("aws-sdk"); // aws-sdk lib used to upload images to s3 bucket
require("dotenv/config");

function getAverageRating(recipe) {
    let rate = { boozy: 0, sweet: 0, sour: 0, bitter: 0, salty: 0, umami: 0 };
    if (recipe.reviews.length === 0) {
        return rate;
    }
    let reviews = recipe.reviews;
    let count = 0;
    for (var j = 0; j < reviews.length; j++) {
        count += 1;
        rate["boozy"] += reviews[j]["rating"]["boozy"];
        rate["sweet"] += reviews[j]["rating"]["sweet"];
        rate["sour"] += reviews[j]["rating"]["sour"];
        rate["bitter"] += reviews[j]["rating"]["bitter"];
        rate["salty"] += reviews[j]["rating"]["salty"];
        rate["umami"] += reviews[j]["rating"]["umami"];
        rate["rating"] += reviews[j]["rating"]["rating"];
    }
    rate["boozy"] = Math.floor(rate["boozy"] / count);
    rate["sweet"] = Math.floor(rate["sweet"] / count);
    rate["sour"] = Math.floor(rate["sour"] / count);
    rate["bitter"] = Math.floor(rate["bitter"] / count);
    rate["salty"] = Math.floor(rate["salty"] / count);
    rate["umami"] = Math.floor(rate["umami"] / count);
    rate["rating"] = Math.floor(rate["rating"] / count);
    return rate;
}

router.get("/", (req, res) => {
    Recipe.find({ name: { $regex: req.query.search, $options: "i" } })
        .populate("reviews")
        .sort({ date: -1 })
        .then((recipes) => {
            let response = {};
            for (var i = 0; i < recipes.length; i++) {
                let recipe = Object.assign({}, recipes[i]._doc, {
                    avg_rating: getAverageRating(recipes[i]),
                });
                response[recipes[i].id] = recipe;
            }
            return res.json(response);
        })
        .catch((err) =>
            res.status(404).json({ norecipesfound: "No recipes found" })
        );
});

router.get("/user/:user_id", (req, res) => {
    Recipe.find({ user: req.params.user_id })
        .then((recipes) => {
            let response = {};
            for (var i = 0; i < recipes.length; i++) {
                response[recipes[i].id] = recipes[i];
            }
            return res.json(response);
        })
        .catch((err) =>
            res
                .status(404)
                .json({ norecipesfound: "No recipes found from that user" })
        );
});
router.get("/random", async (req, res) => {
    let today = new Date().getDay();
    let count = await Recipe.count().exec();
    var random = today % count;
    let recipe = await Recipe.findOne().skip(random).exec();
    res.json({ [recipe.id]: recipe });
});

router.get("/:id", (req, res) => {
    Recipe.findById(req.params.id)
        .populate("reviews")
        .populate("ingredients")
        .then(async (recipe) => {
            let rec = Object.assign({}, recipe._doc, {
                avg_rating: getAverageRating(recipe),
            });
            let recipeState = { recipe: { [recipe.id]: rec } };
            let ingredients = await Ingredient.find({
                _id: { $in: recipe.ingredients },
            });
            let reviews = await Review.find({
                _id: { $in: recipe.reviews },
            }).populate("reviewer");
            let ingredientState = {};
            for (var i = 0; i < ingredients.length; i++) {
                ingredientState[ingredients[i].id] = ingredients[i];
            }
            let reviewsState = {};
            for (var i = 0; i < reviews.length; i++) {
                reviewsState[reviews[i].id] = reviews[i];
            }
            let response = Object.assign(
                {},
                recipeState,
                { ingredients: ingredientState },
                { reviews: reviewsState }
            );
            return res.json(response);
        })
        .catch((err) => res.status(404).json({ err }));
});

// AWS

const storage = multer.memoryStorage({
    destination: function (req, file, cb) {
        cb(null, "");
    },
});

const filefilter = (req, file, cb) => {
    if (
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/png"
    ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({ storage: storage, fileFilter: filefilter });

const s3 = new Aws.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_ACCESS_KEY_SECRET,
});

router.post(
    "/",
    passport.authenticate("jwt", { session: false }),
    upload.single("recipe[photo]"),
    (req, res) => {
        const { errors, isValid } = validateRecipeInput(req.body.recipe);

        if (!isValid) {
            return res.status(400).json(errors);
        }
        const params = {
            Bucket: process.env.AWS_BUCKET_NAME, // bucket that we made earlier
            Key: req.file.originalname, // Name of the image
            Body: req.file.buffer, // Body which will contain the image in buffer format
            // ACL:"public-read-write",                 // defining the permissions to get the public link
            ContentType: "image/jpeg", // Necessary to define the image content-type to view the photo in the browser with the link
        };
        s3.upload(params, (error, data) => {
            if (error) {
                res.status(500).send({ err: error });
            }
            const newRecipe = new Recipe({
                imgUrl: data.Location,
                name: req.body.recipe.name,
                user: req.user.id,
                ingredients: JSON.parse(req.body.recipe.ingredients),
                description: req.body.recipe.description,
                instructions: req.body.recipe.instructions,
                additionalInfo: req.body.recipe.additionalInfo,
                creator_flavor_profile: JSON.parse(req.body.recipe.rating)
            });
            newRecipe
                .save()
                .then((recipe) => res.json({ [recipe.id]: recipe }))
                .catch((err) => console.log(err));
        });
    }
);

router.post(
    "/:id/review",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        let newReview = new Review({
            reviewer: req.user.id,
            rating: req.body.rating,
            title: req.body.title,
            body: req.body.body,
            recipe: req.params.id,
        });
        try {
            newReview = await newReview.save();
            Recipe.findByIdAndUpdate(
                { _id: req.params.id },
                {
                    $addToSet: {
                        reviews: newReview.id,
                    },
                },
                { new: true }
            ).then((recipe) => res.json(recipe));
            // ).then(recipe => res.json({[recipe.id]: recipe}));
        } catch (err) {
            return res.status(400).send({
                message: err.message,
            });
        }
    }
);

router.post(
    "/:id/update",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        let val = {}
        for (const key in req.body) {
            val = JSON.parse(key)
        }
        const newRecipe = {
            imgUrl: val["recipe[imgUrl]"],
            name: val["recipe[name]"],
            user: req.user.id,
            ingredients: JSON.parse(val["recipe[ingredients]"]),
            description: val["recipe[description]"],
            instructions: val["recipe[instructions]"],
            additionalInfo: val["recipe[additionalInfo]"],
            creator_flavor_profile: JSON.parse(val["recipe[rating]"])
        };
        Recipe.updateOne(
            {_id: req.params.id},
            {$set: newRecipe},
            {new: true})
            .then((recipe) => res.json(recipe))
            .catch((err) => console.log(err));
    }
);

router.post(
    "/:id/delete",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        let recipe = await Recipe.findById(req.params.id);
        recipe.remove();
        res.json(recipe);
    }
);

module.exports = router;
