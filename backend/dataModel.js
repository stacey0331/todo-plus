const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dataModel = new Schema(
    {
        item_name: {type: String, required: true},
        category_name: {type: String, required: true},
        time: {type: Date, required: true},
        priority: {type: Number, required: true},
        completed: {type: Boolean, required: true},
    },
)

module.exports = mongoose.model('todo', dataModel);