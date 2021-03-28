import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";

import api from '../api';

const Main = ({ todos }) => {
    const [showAddPopup, setShowAddPopup] = useState(false);
    const category_id = window.location.pathname.substring(1);

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

        api.addItem(name, category_id, time, priority);
    }

    const options = {
        year: 'numeric', month: 'numeric', day: 'numeric',
        hour: 'numeric', minute: 'numeric', second: 'numeric',
        hour12: false,
        timeZone: 'Asia/Shanghai'
    };

    function handleCheckbox() {
        let newTodo = JSON.parse(JSON.stringify(todo));
        newTodo.completed = !newTodo.completed;
        setTodo(newTodo);

        const payload = {
            item_name: newTodo.text,
            category_id: newTodo.category_id,
            time: newTodo.time,
            priority: newTodo.priority,
            completed: newTodo.completed,
        }
        api.updateTodoById(props.id, payload);
    }

    return (
        <>
            {/* Add task pop up starts */}
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
            {/* Add task pop up ends */}


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
                {todos ? (
                    todos.map(todo => (
                        <div key={todo._id}>
                            <span 
                                className={todo.priority === 1 ?
                                'redDot': todo.priority === 2 ?
                                'yellowDot' : todo.priority === 3 ?
                                'greenDot' : 'greyDot'}>
                            </span>
                            <label className={todo.completed ? 'completedItem' : 'incompleteItem'}> {todo.item_name} </label>
                            <input type="checkbox" id="completeCheckbox" defaultChecked={todo.completed} onChange={handleCheckbox} />
                            <button className="noBackgroundBtn" onClick={() => (confirm('Delete item?') && api.deleteItemById(todo._id) && window.location.reload())}>
                                <FontAwesomeIcon icon={['fas', 'times']} />
                            </button>
                            <div>{new Intl.DateTimeFormat('en-US', options).format(new Date(todo.time))}</div>
                        </div>
                    ))
                ) : (
                    <div>Loading ...</div> 
                )}
            </div>
        </>
    );
}

export default Main;