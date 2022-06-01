const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Review = require('../../models/Review');

router.get("/", (req,res) => {
    Review.find()
        .sort({date:-1})
        .then(reviews => res.json(reviews))
        .catch(err=> res.status(404).json(err))
})

router.get('/user/:user_id', (req, res) => {
    Review.find({reviewer: req.params.user_id})
        .then(reviews => res.json(reviews))
        .catch(err => res.status(404).json(err));
});

module.exports = router;
