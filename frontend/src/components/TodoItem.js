import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

import api from '../api';

const TodoItem = (props) => {

    function deleteItem() {
        api.deleteItemById(props.id);
        window.location.reload();
    }

    return (
        <div key={props.id}>
            <span 
                className={props.priority === 'High' ?
                'redDot': props.priority === 'Medium' ?
                'yellowDot' : props.priority === 'Low' ?
                'greenDot' : 'greyDot'}>
            </span>
            <label> {props.text} </label>
            <input type="checkbox" defaultChecked={props.completed} />
            <button className="noBackgroundBtn" onClick={deleteItem}>
                <FontAwesomeIcon icon={['fas', 'times']} />
            </button>
            <div> {props.time} </div>
        </div>
    );
}

export default TodoItem;