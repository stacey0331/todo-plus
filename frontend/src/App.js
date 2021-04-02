import React, { useState, useEffect } from "react";
import { BrowserRouter as Router,
    NavLink,
    Route,
    useHistory
} from 'react-router-dom';
import { hot } from "react-hot-loader";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';

import "./App.css";

// Components
import Main from './components/Main';

import api from './api';

library.add(fas, fab);

const App = () => {
    const [todos, setTodos] = useState(null);
    const [categories, setCategories] = useState(null);
    const history = useHistory();

    useEffect(() => {
        api.getCategories().then(categories => {
            setCategories(categories.data.data);
        });

        api.getTodoList().then(todosIn => {
            setTodos(todosIn.data.data);
        });
    }, []);

    function addCategory() {
        api.addCategory('new category')
        .then((res) => {
            console.log('Client: Category created');
            history.replace(`${res.data.id}`);
            window.location.reload();
        })
        .catch(() => {
            alert('Can\'t create category.');
            console.log('Client: fail to create category');
        });
    }

    return (
        <Router>
            <div className="grid2C">
                <div className="category">
                    {categories ? (
                        categories.map(category => (
                            <NavLink activeClassName="selectedCategory" to={`/${category._id}`}>
                                <span className="categoryName">{category.name}</span>
                                <div className="numOfItems">{category.num_of_item}</div>
                            </NavLink>
                        ))
                    ) : (
                        <div>Loading ...</div> 
                    )}
                    <button className="noBackgroundBtn newFolder" onClick={addCategory}>
                        <FontAwesomeIcon icon={['fas', 'plus-circle']} />
                        New Folder
                    </button>
                </div>

                <div className="todoList">
                    <Route exact path="/" render={() => (
                        <h1>Welcome to TODO +</h1>
                    )} />
                    {todos && (
                        <Route path="/:category_id" render={({ match }) => (
                            <Main 
                                todos={todos.filter(todo => todo.category_id === match.params.category_id )}
                                categoryName={categories.find(category => category._id === match.params.category_id).name}
                            />
                        )} />
                    )}
                </div>
            </div>
        </Router>
    );
}

export default hot(module)(App);