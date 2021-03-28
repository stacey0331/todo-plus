const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categoryModel = new Schema(
    {
        name: {type: String, required: true},
        num_of_item: {type: Number, required: true},
    },
)

module.exports = mongoose.model('categories', categoryModel);