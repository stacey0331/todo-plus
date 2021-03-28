import React, { useState, useEffect } from "react";
import { BrowserRouter as Router,
    NavLink,
    Route,
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

library.add(fas, fab)

const App = () => {
    const [categories, setCategories] = useState(null);

    useEffect(() => {
        api.getCategories().then(categories => {
            setCategories(categories.data.data);
        });
    }, []);

    function addCategory() {
        api.addCategory('new category');
    }

    // window.location.href.substring(window.location.href.indexOf('/') + 1)

    return (
        <Router>
            <div className="grid2C">
                <div className="category">
                    <ul>
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