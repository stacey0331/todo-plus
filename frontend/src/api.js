import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000/api',
});

const addItem = (itemName, categoryName, time, priority) => {
    api.post('/addItem', {
        item_name: itemName,
        category_name: categoryName,
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

const deleteItemById = id => api.delete(`/deleteItem/${id}`);

const updateTodoById = (id, payload) => {
    console.log(payload);
    api.put(`updateTodo/${id}`, payload)
    .then(() => {
        console.log('Client: item updated');
    })
    .catch(() => {
        console.log('Client: fail to update item');
    })
}

// export const getTodoListByCategory = category_name => api.get(`/list/${category_name}`);
// export const deleteCategoryByName = 

const apis = {
    addItem,
    getTodoList,
    deleteItemById,
    updateTodoById
}

export default apis;

