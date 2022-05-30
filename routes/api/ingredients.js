const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const Ingredient = require("../../models/Ingredient");
const validateIngredientInput = require("../../validation/ingredient");

router.get("/", (req,res)=> {
    Ingredient.find()
        .sort({ date: -1})
        .then((ingredients) => {
            let newIngredients = {}
            for (let i = 0; i < ingredients.length; i++) {
                newIngredients[ingredients[i].id] = ingredients[i]
            }
            return res.json(newIngredients)
        })
        .catch(err =>
            res.status(404).json({noingredientsfound: "No Ingredients Found"})
        );
})

router.post("/",
    passport.authenticate('jwt', {session: false}),
    (req,res) => {
        const {errors, isValid} = validateIngredientInput(req.body);
        if (!isValid) {
            return res.status(400).json(errors);
        }
        const newIngredient = new Ingredient({
            name: req.body.name
        })
        newIngredient.save().then(ingredients => res.json(ingredients));
    }
);
module.exports = router;