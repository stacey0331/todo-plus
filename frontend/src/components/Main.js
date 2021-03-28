import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";

import TodoItem from './TodoItem';
import api from '../api';

const Main = (props) => {
    const [todos, setTodos] = useState(null);
    const [showAddPopup, setShowAddPopup] = useState(false);
    const categoryId = props.match.params.category_id;

    console.log(props.match.params.category_id);
    let todoList = 'hi';

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

        api.addItem(name, categoryId, time, priority);
    }

    return (
        <>
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
            {/* Add task pop up */}


            <h2> Title </h2>
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
        </>
    );
}

export default Main;