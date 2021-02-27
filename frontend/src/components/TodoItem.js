import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const TodoItem = (props) => {
    
    return (
        <>
            <span class="redDot"></span>
            <label> {props.text} </label>
            <input type="checkbox" defaultChecked={props.completed} />
            <button className="noBackgroundBtn">
                <FontAwesomeIcon icon={['fas', 'times']} />
            </button>
            <div> {props.time} </div>
        </>
    );
}

export default TodoItem;