import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000/api',
});

const addCategory = name => {
    return api.post('/addCategory', {
        name: name,
        num_of_item: 0,
    });
};

const addItem = (itemName, categoryId, time, priority) => {
    api.post('/addItem', {
        item_name: itemName,
        category_id: categoryId,
        time: time,
        priority: priority,
        completed: false,
    })
    .then(() => {
        console.log('Client: Item created');
    })
    .catch(() => {
        alert('Can\'t create item. Please make sure you fill out all the fields');
        console.log('Client: fail to create item');
    });

    api.put(`/updateCategoryNumOfItemPlusOne/${categoryId}`)
    .then(() => {
        console.log('Client: num_of_item increased 1');
    })
    .catch(() => {
        console.log('Client: num_of_item failed to increase 1');
    });

    window.location.reload();
};

const getTodoList = () => api.get('/getTodoList');

const getCategories = () => api.get('/getCategories');

const deleteItemById = id => api.delete(`/deleteItem/${id}`);

const deleteCategoryById = id => api.delete(`/deleteCategory/${id}`);

const updateTodoById = (id, payload) => {
    api.put(`updateTodo/${id}`, payload)
    .then(() => {
        console.log('Client: item updated');
    })
    .catch(() => {
        console.log('Client: fail to update item');
    })
}

const updateCategoryById = (id, name, num_of_item) => {
    api.put(`updateCategory/${id}`, {
        name: name,
        num_of_item: num_of_item
    })
    .then(() => {
        console.log('Client: category updated');
        window.location.reload();
    })
    .catch(() => {
        console.log('Client: some error occurs while updating category');
    })
}

const apis = {
    addItem,
    getTodoList,
    deleteItemById,
    updateTodoById,
    addCategory,
    getCategories,
    deleteCategoryById,
    updateCategoryById,
}

export default apis;

