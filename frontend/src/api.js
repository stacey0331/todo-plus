import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000/api',
});

const addCategory = name => {
    api.post('/addCategory', {
        name: name,
        num_of_item: 10,
    })
    .then(() => {
        console.log('Client: Category created');
        window.location.reload();
    })
    .catch(() => {
        alert('Can\'t create category.');
        console.log('Client: fail to create category');
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
        window.location.reload();
    })
    .catch(() => {
        alert('Can\'t create item. Please make sure you fill out all the fields');
        console.log('Client: fail to create item');
    });
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

const apis = {
    addItem,
    getTodoList,
    deleteItemById,
    updateTodoById,
    addCategory,
    getCategories,
    deleteCategoryById
}

export default apis;

