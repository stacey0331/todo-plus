import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

import api from '../api';

const TodoItem = (props) => {
    const [todo, setTodo] = useState(props);

    function deleteItem() {
        api.deleteItemById(props.id);
        window.location.reload();
    }

    function handleCheckbox() {
        let newTodo = JSON.parse(JSON.stringify(todo));
        newTodo.completed = !newTodo.completed;
        setTodo(newTodo);

        const payload = {
            item_name: newTodo.text,
            category_name: newTodo.category,
            time: newTodo.time,
            priority: newTodo.priority,
            completed: newTodo.completed,
        }
        api.updateTodoById(props.id, payload);
    }

    return (
        <div key={props.id}>
           <span 
                className={todo.priority === 'High' ?
                'redDot': todo.priority === 'Medium' ?
                'yellowDot' : todo.priority === 'Low' ?
                'greenDot' : 'greyDot'}>
            </span>
            <label className={todo.completed ? 'completedItem' : 'incompleteItem'}> {todo.text} </label>
            <input type="checkbox" id="completeCheckbox" defaultChecked={todo.completed} onChange={handleCheckbox} />
            <button className="noBackgroundBtn" onClick={deleteItem}>
                <FontAwesomeIcon icon={['fas', 'times']} />
            </button>
            <div> {todo.time} </div>
        </div>
    );
}

export default TodoItem;