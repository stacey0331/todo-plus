import React, { useState } from "react";
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import { nanoid } from "nanoid";
import { hot } from "react-hot-loader";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import "./App.css";

// Components
import Main from './components/Main';

import api from './api';

library.add(fas, fab)

const App = (props) => {
    const [categories, setCategories] = useState(props.categories);
    
    let categoryId = '';

    function addCategory() {
        api.addCategory('new category');
        const newCategory = { key: "category-" + nanoid(), name: 'The name', numOfItems: 0 };
        setCategories([...categories, newCategory]);
    }

    return (
        <Router>
            <div className="grid2C">
                <div className="category">
                    <ul>
                        {categories ? (
                            categories.map(category => (
                                <Link to={`/${category._id}`}>
                                    <span className="categoryName">{category.name}</span>
                                    <div className="numOfItems">{ category.num_of_items }</div>
                                </Link>
                            ))
                        ) : (
                            <div>Loading ...</div> 
                        )}
                    </ul>
                    <button className="noBackgroundBtn newFolder" onClick={addCategory}>
                        <FontAwesomeIcon icon={['fas', 'plus-circle']} />
                        New Folder
                    </button>
                </div>

                <div className="todoList">
                    <Route exact path="/" render={() => (
                        <h1>Welcome to TODO +</h1>
                    )} />

                    <Route path="/:category_id" component={Main} />
                </div>
            </div>
        </Router>
    );
}

export default hot(module)(App);