import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

import api from '../api';

const TodoItem = (props) => {
    const [todo, setTodo] = useState(props);

    const options = {
        year: 'numeric', month: 'numeric', day: 'numeric',
        hour: 'numeric', minute: 'numeric', second: 'numeric',
        hour12: false,
        timeZone: 'Asia/Shanghai'
    };
    
    function deleteItem() {
        if (confirm('Delete item?')) {
            api.deleteItemById(props.id);
            window.location.reload();
        }
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
                className={todo.priority === 1 ?
                'redDot': todo.priority === 2 ?
                'yellowDot' : todo.priority === 3 ?
                'greenDot' : 'greyDot'}>
            </span>
            <label className={todo.completed ? 'completedItem' : 'incompleteItem'}> {todo.text} </label>
            <input type="checkbox" id="completeCheckbox" defaultChecked={todo.completed} onChange={handleCheckbox} />
            <button className="noBackgroundBtn" onClick={deleteItem}>
                <FontAwesomeIcon icon={['fas', 'times']} />
            </button>
            <div>{new Intl.DateTimeFormat('en-US', options).format(new Date(todo.time))}</div>
        </div>
    );
}

export default TodoItem;