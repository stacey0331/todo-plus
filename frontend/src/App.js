import React, { useState, useEffect } from "react";
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

import api from './api';

library.add(fas, fab)

const App = (props) => {
    const [categories, setCategories] = useState(props.categories);
    const [todos, setTodos] = useState(null);
    const [showAddPopup, setShowAddPopup] = useState(false);
    let todoList = 'hi';

    const categoryList = categories
        .map(category => (
            <CategoryItem
                id={category.id}
                name={category.name}
                selected={false}
            />
        )
    );

    if (todos) {
        todoList = todos.map(todo => (
            <TodoItem
                id={todo._id}
                text={todo.item_name}
                category={todo.category_name}
                completed={todo.completed}
                priority={todo.priority}
                time={todo.time}
            />
        ));
    }

    useEffect(() => {
        api.getTodoList().then(todos => {
            setTodos(todos.data.data);
        });
    }, []);

    function addCategory() {
        const newCategory = { key: "category-" + nanoid(), name: 'The name', numOfItems: 0 };
        setCategories([...categories, newCategory]);
    }

    function showAddTaskPopup() {
        setShowAddPopup(true);
    }

    function closePopup() {
        setShowAddPopup(false);
    }

    function submitAddTaskForm(event) {
        event.preventDefault();
        const name = document.getElementById('todoName').value;
        const time = new Date(document.getElementById('selectDate').value + 'T' + document.getElementById('selectTime').value);
        const priority = document.getElementById('selectPriority').value;

        api.addItem(name, 'test  category', time, priority);
    }

    return (
        <div className="grid2C">
            {/* Add task pop up */}
            <div className={`modal ${showAddPopup ? "displayBlock" : "displayNone"}`}>
                <div className="modal-content">
                    <span className="close" onClick={closePopup}>&times;</span>
                    <form onSubmit={submitAddTaskForm}>
                        <h3>Add task</h3>
                        <textarea id="todoName"></textarea>
                        <div>
                            <input id="selectDate" type="date" />
                            <input id="selectTime" type="time" />
                            <select id="selectPriority">
                                <option value={3}>Low</option>
                                <option value={2}>Medium</option>
                                <option value={1}>High</option>
                            </select>
                        </div>
                        <input className="coloredBtn" type="submit" value="Add" />
                    </form>
                </div>
            </div>

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
                <button className="noBackgroundBtn" onClick={showAddTaskPopup}>
                    <FontAwesomeIcon icon={['fas', 'plus']} />
                    Add task
                </button>
                <button>Delete category</button>
                <select>
                    <option>Time created</option>
                    <option>Priority: high to low</option>
                    <option>Time</option>
                </select>
                <div>
                    {todoList}
                </div>
            </div>
        </div>
    );
}

export default hot(module)(App);