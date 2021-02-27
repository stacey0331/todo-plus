const dataModel = require('./dataModel.js');

createResponse = (req, res) => {
    const body = req.body;

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'Please fill out all the fields before you submit',
        })
    }

    const response = new dataModel(body)

    if (!response) {
        return res.status(400).json({ success: false, error: err })
    }

    response
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: response._id,
                message: 'Server: Response created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Server: Failed to create message...'
            })
        })

}

getResponses = async (req, res) => {
    await dataModel.find({}, (err, responses) => {
        if (err) {
            return res.status(400).json({ success: false, error: err });
        }
        if (!responses.length) {
            return res
                .status(404)
                .json({ success: false, error: 'Response not found' })
        }
        return res.status(200).json({ success: true, data: responses })
    }).catch(err => console.log('Error getting responses: ' + err))
}


module.exports = {
    createResponse,
    getResponses
}