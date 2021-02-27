const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dataModel = new Schema(
    {
        category_name: {type: String, required: true },
        item_list: { type: Array, required: true }
    },
)

module.exports = mongoose.model('responses', dataModel);