const Validator = require('validator');
const validText = require('./valid-text');
module.exports = function validateReviewInput(data) {
    let errors = {};
    data.rating
    if (Validator.isEmpty(data.name)) {
        errors.text = 'Name cannot be empty';
    }

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    }
}

