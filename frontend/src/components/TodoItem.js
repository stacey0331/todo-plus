import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const TodoItem = (props) => {
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
            <button className="noBackgroundBtn">
                <FontAwesomeIcon icon={['fas', 'times']} />
            </button>
            <div> {props.time} </div>
        </div>
    );
}

export default TodoItem;