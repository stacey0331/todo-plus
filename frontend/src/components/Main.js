import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";

import api from '../api';

const Main = ({ todosIn, categoryName }) => {
    const category_id = useLocation().pathname.substring(1);
    const history = useHistory();
    const [showAddPopup, setShowAddPopup] = useState(false);
    const [titleToggle, setTitleToggle] = useState(true);
    const [newTitle, setNewTitle] = useState(categoryName);
    const [todos, setTodos] = useState(todosIn);
    const [sortType, setSortType] = useState('created');

    useEffect(() => {
        // When switching categoreis
        setTitleToggle(true);
        setNewTitle(categoryName);
        setSortType('created');
    }, [todosIn]);

    useEffect(() => {
        setTodos(todosIn);
    }, [todosIn]);

    useEffect(() => {
        let sortedTodos = todos;
        if (sortType === 'created') {
            setTodos(todosIn);
            return;
        } else if (sortType === 'priority') {
            sortedTodos = [...todos].sort((a, b) => a[sortType] - b[sortType]);
        } else if (sortType === 'time') {
            sortedTodos = [...todos].sort((a, b) => new Date(a[sortType]) - new Date(b[sortType]));
        }
        setTodos(sortedTodos);
    }, [sortType]);

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

    function handleCheckbox(id) {
        let todo = todos.find(todo => todo._id === id);
        let newTodo = JSON.parse(JSON.stringify(todo));
        newTodo.completed = !newTodo.completed;

        const payload = {
            item_name: newTodo.item_name,
            category_id: newTodo.category_id,
            time: newTodo.time,
            priority: newTodo.priority,
            completed: newTodo.completed,
        }

        api.updateTodoById(todo._id, payload);
        window.location.reload();
    }

    function handleDeleteCategory() {
        if (confirm('Delete category?')) {
            api.deleteCategoryById(category_id);
            history.replace('/');
            window.location.reload();
        }
    }

    function handleEditTitle(evt) {
        setTitleToggle(true);
        evt.preventDefault();
        evt.stopPropagation();
        api.updateCategoryById(category_id, newTitle, todos.length);
    }

    function handleDeleteTodo(todoId) {
        if (confirm('Delete item?')) {
            api.deleteItemById(todoId) && api.updateCategoryById(category_id, newTitle, todos.length - 1);
        }
    }

    return (
        <div id="mainAll">
            {/* Add task pop up starts */}
            <div className={`modal ${showAddPopup ? "displayBlock" : "displayNone"}`}>
                <div className="modal-content">
                    <span className="close" onClick={closePopup}>&times;</span>
                    <form id="addTaskForm" onSubmit={submitAddTaskForm}>
                        <h3>Add task</h3>
                        <textarea id="todoName"></textarea>
                        <div id="addTaskSelect">
                            <input id="selectDate" type="date" />
                            <input id="selectTime" type="time" />
                            <select id="selectPriority">
                                <option value={3}>Low</option>
                                <option value={2}>Medium</option>
                                <option value={1}>High</option>
                            </select>
                        </div>
                        <input id="submitNewTaskBtn" className="coloredBtn" type="submit" value="Add" />
                    </form>
                </div>
            </div>
            {/* Add task pop up ends */}


            { titleToggle ? (
                <div className="tooltip">
                    <h2
                        onDoubleClick={() => {
                            setTitleToggle(false)
                        }}> {categoryName} </h2>
                    <span className="tooltiptext">Double click to edit</span>
                </div>
            ) : (
                <h2>
                    <input
                        id="changeCategoryInput"
                        type='text'
                        value={newTitle}
                        onChange={evt => {
                            setNewTitle(evt.target.value);
                        }}
                        onKeyDown={evt => {
                            if (evt.key === 'Enter') {
                                handleEditTitle(evt);
                            }
                        }}
                    />
                    <button className="coloredBtn" onClick={handleEditTitle}>Done</button>
                </h2>
            )}
            
            <div id="mainCtrl">
                <div>
                    <button id="addTaskBtn" className="noBackgroundBtn" onClick={showAddTaskPopup}>
                        <FontAwesomeIcon icon={['fas', 'plus']} /> &nbsp;
                        Add task
                    </button>
                </div>
                <button id="deleteCategoryBtn" onClick={handleDeleteCategory}>Delete category</button>
                <select id="sortSelect" onChange={e => setSortType(e.target.value)} value={sortType}>
                    <option value="created">Time created</option>
                    <option value="priority">Priority: high to low</option>
                    <option value="time">Due</option>
                </select>
            </div>

            <div id="mainTodos">
                {todos.length ? (
                    todos.map(todo => (
                        <div id="oneTodoItem" key={todo._id}>
                            <span 
                                className={todo.priority === 1 ?
                                'redDot': todo.priority === 2 ?
                                'yellowDot' : todo.priority === 3 ?
                                'greenDot' : 'greyDot'}>
                            </span>
                            <label id="todoNameLabel" className={todo.completed ? 'completedItem' : 'incompleteItem'}> {todo.item_name} </label>
                            <input type="checkbox" id="completeCheckbox" defaultChecked={todo.completed} onChange={handleCheckbox.bind(null, todo._id)} />
                            <button className="noBackgroundBtn" onClick={handleDeleteTodo.bind(null, todo._id)}>
                                <FontAwesomeIcon id="deleteItemCross" icon={['fas', 'times']} size="lg" />
                            </button>
                            <div id="todoDate">
                                {new Intl.DateTimeFormat('en-US', options).format(new Date(todo.time))}
                            </div>
                        </div>
                    ))
                ) : (
                    <div>
                        <div>No todos here yet!</div>
                        <div>Add some todos by clicking the "+ Add task" on the top right corner.</div>
                    </div> 
                )}
            </div>
        </div>
    );
}

export default Main;