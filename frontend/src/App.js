import React, { useState } from "react";
import { nanoid } from "nanoid";
import { hot } from "react-hot-loader";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import "./App.css";

// Components
import CategoryItem from './components/CategoryItem';
import TodoItem from './components/TodoItem';

library.add(fas, fab)

const App = (props) => {
    const [categories, setCategories] = useState(props.categories);

    const categoryList = categories
        .map(category => (
            <CategoryItem
                id={category.id}
                name={category.name}
                key={category.id}
                selected={false}
            />
        )
    );
    
    function addCategory(name) {
        const newCategory = { key: "category-" + nanoid(), name: 'The name', numOfItems: 0 };
        setCategories([...categories, newCategory]);
    }

    return (
        <div className="grid2C">
            <div className="category">
                <ul>
                    {categoryList}
                </ul>
                <button className="noBackgroundBtn newFolder" onClick={addCategory}>
                    <FontAwesomeIcon icon={['fas', 'plus-circle']} />
                    New Folder
                </button>
            </div>

            <div className="todoList">
                <h2> {props.categories[0].name} </h2>
                <button className="noBackgroundBtn">
                    <FontAwesomeIcon icon={['fas', 'plus']} />
                    Add task
                </button>
                <button>Clear all</button>
                <select>
                    <option>Priority: high to low</option>
                    <option>Time</option>
                </select>
                <div>
                    <TodoItem
                        text="This is a demo text this is a demo"
                        priority="high"
                        completed={true}
                        time="1/30/2021, 9:00 A.M."
                    />
                </div>
            </div>
        </div>
    );
}

export default hot(module)(App);