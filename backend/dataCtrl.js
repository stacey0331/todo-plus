const dataModel = require('./dataModel.js');

// getCategories = async (req, res) => {

// };

getTodoList = async (req, res) => {
    await dataModel.find({}, (err, responses) => { // find { // fill this out // }
        if (err) {
            return res.status(400).json({ success: false, error: err });
        }
        if (!responses.length) {
            return res
                .status(404)
                .json({ success: false, error: 'Response not found' })
        }
        return res.status(200).json({ success: true, data: responses })
    }).catch(err => console.log('Error getting list: ' + err));
};

addItem = (req, res) => {
    const body = req.body;

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'Fail to add item',
        });
    }

    const response = new dataModel(body);

    if (!response) {
        return res.status(400).json({ success: false, error: err });
    }

    response
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: response._id,
                message: 'Server: Item created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Server: Failed to create item...'
            })
        });
};

// deleteItem = (req, res) => {

// };


module.exports = {
    // TODO: add in all the methods
    addItem,
    getTodoList
}