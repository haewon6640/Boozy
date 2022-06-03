const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Review = require('../../models/Review');
const passport = require("passport");
router.get("/", (req,res) => {
    Review.find()
        .sort({date:-1})
        .then(reviews => res.json(reviews))
        .catch(err=> res.status(404).json(err))
})

router.get("/:id", (req,res) => {
    Review.findById(req.params.id)
        .then(reviews => res.json(reviews))
        .catch(err=> res.status(404).json(err))
})

router.get('/user/:user_id', (req, res) => {
    Review.find({reviewer: req.params.user_id})
        .then(reviews => res.json(reviews))
        .catch(err => res.status(404).json(err));
});

router.post('/:id/update',
    passport.authenticate('jwt', { session: false }),
    async (req,res) => {
        Review.findByIdAndUpdate(req.params.id, req.body.review, {new:true})
            .then(review=> res.json(review))
            .catch(err=>res.status(400).send({message: err.message}))
    })

router.post('/:id/delete',
    passport.authenticate('jwt', { session: false }),
    async (req,res) => {
        Review.findByIdAndDelete(req.params.id, {new:true})
            .then(review => res.json(review))
            .catch(err=>res.status(400).send({message: err.message})) 
    });

module.exports = router;
