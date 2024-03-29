const todoModel = require('./todoModel.js');
const categoryModel = require('./categoryModel.js');

getCategories = async (req, res) => {
    await categoryModel.find({}, (err, categories) => {
        if (err) {
            return res.status(400).json({ success: false, error: err });
        }
        if (!categories.length) {
            return res
                .status(404)
                .json({ success: false, error: 'Categories not found' })
        }
        return res.status(200).json({ success: true, data: categories })
    }).catch(err => console.log('Error getting categories: ' + err));
};

addCategory = (req, res) => {
    const body = req.body;

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'Fail to add item',
        });
    }

    const category = new categoryModel(body);

    if (!category) {
        return res.status(400).json({ success: false, error: err });
    }

    category
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: category._id,
                message: 'Server: Category created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Server: Failed to create category...'
            })
        });
};

getTodoList = async (req, res) => {
    await todoModel.find({}, (err, todos) => { // find { // fill this out // }
        if (err) {
            return res.status(400).json({ success: false, error: err });
        }
        if (!todos.length) {
            return res
                .status(404)
                .json({ success: false, error: 'Todos not found' })
        }
        return res.status(200).json({ success: true, data: todos })
    }).catch(err => console.log('Error getting todo list: ' + err));
};

addItem = (req, res) => {
    const body = req.body;

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'Fail to add item',
        });
    }

    const todo = new todoModel(body);

    if (!todo) {
        return res.status(400).json({ success: false, error: err });
    }

    todo
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: todo._id,
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

deleteItem = async (req, res) => {
    await todoModel.findOneAndDelete({ _id: req.params.id }, (err, todo) => {
        if (err) {
            return res.status(400).json({ success: false, error: err });
        }

        if (!todo) {
            return res
                .status(404)
                .json({ success: false, error: `Todo item not found` });
        }

        return res.status(200).json({ success: true, data: todo });
    }).catch(err => console.log(err));
};

deleteCategory = async (req, res) => {
    await categoryModel.findOneAndDelete({ _id: req.params.id }, (err, category) => {
        if (err) {
            return res.status(400).json({ success: false, error: err });
        }

        if (!category) {
            return res
                .status(404)
                .json({ success: false, error: `Category not found` });
        }
    }).catch(err => console.log(err));

    await todoModel.deleteMany({ category_id: req.params.id }, (err, todo) => {
        if (err) {
            return res.status(400).json({ success: false, error: err });
        }

        if (!todo) {
            return res
                .status(404)
                .json({ success: false, error: `Todo not found` });
        }
    }).catch(err => console.log(err));
};

updateTodo = (req, res) => {
    const body = req.body;

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        });
    }

    todoModel.findOne({ _id: req.params.id }, (err, todo) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Todo not found!',
            })
        }
        todo.item_name = body.item_name;
        todo.category_id = body.category_id;
        todo.time = body.time;
        todo.priority = body.priority;
        todo.completed = body.completed;
        todo
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: todo._id,
                    message: 'Todo updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Todo not updated!',
                })
            })
    });
};

updateCategory = (req, res) => {
    const body = req.body;

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        });
    }

    categoryModel.findOne({ _id: req.params.id }, (err, category) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Category not found!',
            })
        }
        category.name = body.name;
        category.num_of_item = body.num_of_item;
        category
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: category._id,
                    message: 'Category updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Category not updated!',
                })
            })
    });
};

updateCategoryNumOfItemPlusOne = (req, res) => {
    categoryModel.findOne({ _id: req.params.id }, (err, category) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Category not found!',
            })
        }
        category.num_of_item = category.num_of_item + 1;
        category
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: category._id,
                    message: 'Category number of item updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Category number of item not updated!',
                })
            })
    });
};

module.exports = {
    addItem,
    getTodoList,
    deleteItem,
    updateTodo,
    addCategory,
    getCategories,
    deleteCategory,
    updateCategory,
    updateCategoryNumOfItemPlusOne
}