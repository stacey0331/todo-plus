import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000/api',
});

const addItem = (itemName, categoryName, time, priority) => {
    var promise = api.post('/addItem', {
        item_name: itemName,
        category_name: categoryName,
        time: time,
        priority: priority,
        completed: false,
    })
    .then(res => {
        alert('Can\'t create item');
        console.log('Client: Item created');
    })
    .catch(err => {
        console.log('Client: fail to create item');
    });
    return promise;
};

const getTodoList = () => api.get('/getTodoList');

// export const getTodoListByCategory = category_name => api.get(`/list/${category_name}`);
// export const updateTodoById = (id, payload) => api.put(`list/${}`);
// export const deleteItemById = id => api.delete(`/movie/${id}`);
// export const deleteCategoryByName = 

const apis = {
    addItem,
    getTodoList
}

export default apis;

