// routes/api/tweets.js
// Go ahead and delete the test route

const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const Recipe = require("../../models/Recipe");
const validateRecipeInput = require("../../validation/recipe");

router.get("/", (req, res) => {
    Recipe.find()
        .sort({ date: -1 })
        .then((recipes) => res.json(recipes))
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
        .then(recipe => res.json(recipe))
        .catch(err =>
            res.status(404).json({ notrecipefound: 'No recipe found with that ID' })
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
      newRecipe.save().then(recipe => res.json(recipe));
    }
  );

module.exports = router;