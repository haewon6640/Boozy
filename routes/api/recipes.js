// routes/api/tweets.js
// Go ahead and delete the test route

const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const Ingredient = require("../../models/Ingredient");
const Recipe = require("../../models/Recipe");
const validateRecipeInput = require("../../validation/recipe");
const Review = require('../../models/Review');
const recipe = require("../../validation/recipe");

router.get("/", (req, res) => {
    Recipe.find()
        .sort({ date: -1 })
        .then((recipes) => {
            let response = {};
            for (var i = 0; i < recipes.length; i++) {
                response[recipes[i].id] = recipes[i]
            }
            return res.json(response);
        })
        .catch((err) =>
            res.status(404).json({ norecipesfound: "No recipes found" })
        );
});

router.get('/user/:user_id', (req, res) => {
    Recipe.find({user: req.params.user_id})
        .then(recipes => res.json(recipes))
        .catch(err =>
            res.status(404).json({ norecipesfound: 'No recipes found from that user' }
        )
    );
});

router.get('/:id', (req, res) => {
    Recipe.findById(req.params.id)
        .then(async recipe => {
            let recipeState = {recipe: {[recipe.id] : recipe}};
            // console.log(res);
            let ingredients = await Ingredient.find({'_id': {$in: recipe.ingredients}});
            let reviews = await Review.find({'_id': {$in: recipe.reviews}});
            console.log(ingredients);
            // console.log(recipe.reviews);
            console.log(reviews);
            let ingredientState = {};
            for (var i = 0; i < ingredients.length; i++) {
                ingredientState[ingredients[i].id] = ingredients[i]
            }
            let reviewsState = {};
            for (var i = 0; i < reviews.length; i++) {
                reviewsState[reviews[i].id] = reviews[i]
            }
            let response = Object.assign({},recipeState,{ingredients:ingredientState}, {reviews: reviewsState})
            return res.json(response);

        })
        .catch(err =>
            res.status(404).json({err})
        );
});

router.post('/',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
      const { errors, isValid } = validateRecipeInput(req.body);
  
      if (!isValid) {
        return res.status(400).json(errors);
      }
      const newRecipe = new Recipe({
          name: req.body.name,
          user: req.user.id,
          ingredients: req.body.ingredients
      })
      newRecipe.save()
        .then(recipe => res.json(recipe))
        .catch(err=> res.json(err));
    }
  );

router.post('/:id/review',
    passport.authenticate('jwt', {session: false}),
    async (req,res) => {
        let newReview = new Review({
            reviewer: req.user.id,
            rating: req.body.rating,
            title: req.body.title,
            body: req.body.body,
            recipe: req.params.id
        });
        try {
            newReview = await newReview.save();
            Recipe.findByIdAndUpdate(
                {_id: req.params.id},
                { 
                    $addToSet: {
                        reviews: newReview.id
                    }
                },
                {new: true}
            ).then(recipe => res.json({[recipe.id]: recipe}));
        } catch(err) {
            return res.status(400).send({
                message: err.message
            })
        }
    });

module.exports = router;