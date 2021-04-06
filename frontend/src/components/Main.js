import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import api from '../api';

const Main = ({ todosIn, categoryName }) => {
  const categoryId = useLocation().pathname.substring(1);
  const history = useHistory();
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [titleToggle, setTitleToggle] = useState(true);
  const [newTitle, setNewTitle] = useState(categoryName);
  const [todos, setTodos] = useState(todosIn);
  const [sortType, setSortType] = useState('created');

  //   useEffect(() => {
  //     console.log(document.getElementById("todoName").tabIndex);
  //     console.log(document.getElementById("selectDate").tabIndex);
  //   });

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
    } if (sortType === 'priority') {
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
    document.getElementById('todoName').value = '';
    document.getElementById('selectDate').value = '';
    document.getElementById('selectTime').value = '';
    document.getElementById('selectPriority').value = 3;
  }

  function submitAddTaskForm(event) {
    event.preventDefault();
    const name = document.getElementById('todoName').value;
    const time = new Date(`${document.getElementById('selectDate').value}T${document.getElementById('selectTime').value}`);
    const priority = document.getElementById('selectPriority').value;

    api.addItem(name, categoryId, time, priority);
  }

  const options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: false,
    timeZone: 'Asia/Shanghai',
  };

  function handleCheckbox(id) {
    let newTodo = todos.find((todo) => todo._id === id);
    newTodo = JSON.parse(JSON.stringify(newTodo));
    newTodo.completed = !newTodo.completed;

    const payload = {
      item_name: newTodo.item_name,
      category_id: newTodo.category_id,
      time: newTodo.time,
      priority: newTodo.priority,
      completed: newTodo.completed,
    };

    api.updateTodoById(id, payload);
    window.location.reload();
  }

  function handleDeleteCategory() {
    if (window.confirm('Delete category?')) {
      api.deleteCategoryById(categoryId);
      history.replace('/');
      window.location.reload();
    }
  }

  function handleEditTitle(evt) {
    setTitleToggle(true);
    evt.preventDefault();
    evt.stopPropagation();
    api.updateCategoryById(categoryId, newTitle, todos.length);
  }

  function handleDeleteTodo(todoId) {
    if (window.confirm('Delete item?')) {
      api.deleteItemById(todoId) && api.updateCategoryById(categoryId, newTitle, todos.length - 1);
    }
  }

  return (
    <div id="mainAll">
      {/* Add task pop up starts */}
      <div className={`modal ${showAddPopup ? 'displayBlock' : 'displayNone'}`}>
        <div className="modal-content">
          <button type="button" className="close noBackgroundBtn" onClick={closePopup} onKeyDown={(evt) => evt.key === 'Enter' && closePopup()}>&times;</button>
          <form id="addTaskForm" onSubmit={submitAddTaskForm}>
            <h3>Add task</h3>
            <textarea id="todoName" />
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
              setTitleToggle(false);
            }}
            onKeyDown={(evt) => {
              if (evt.key === 'Backspace') {
                setTitleToggle(false);
              }
            }}
            tabIndex="0"
          >
            {' '}
            {categoryName}
            {' '}

          </h2>
          <span className="tooltiptext">Double click to edit</span>
        </div>
      ) : (
        <h2>
          <input
            id="changeCategoryInput"
            type="text"
            value={newTitle}
            onChange={(evt) => {
              setNewTitle(evt.target.value);
            }}
            onKeyDown={(evt) => {
              if (evt.key === 'Enter') {
                handleEditTitle(evt);
              }
            }}
          />
          <button type="submit" className="coloredBtn" onClick={handleEditTitle}>Done</button>
        </h2>
      )}

      <div id="mainCtrl">
        <div>
          <button type="button" id="addTaskBtn" className="noBackgroundBtn" onClick={showAddTaskPopup}>
            <FontAwesomeIcon icon={['fas', 'plus']} />
            {' '}
            &nbsp;
            Add task
          </button>
        </div>
        <button type="button" id="deleteCategoryBtn" onClick={handleDeleteCategory}>Delete category</button>
        <select id="sortSelect" onChange={(e) => setSortType(e.target.value)} value={sortType}>
          <option value="created">Time created</option>
          <option value="priority">Priority: high to low</option>
          <option value="time">Due</option>
        </select>
      </div>

      <div id="mainTodos">
        {todos.length ? (
          todos.map((todo) => (
            <div id="oneTodoItem" key={todo._id}>
              <span
                className={todo.priority === 1
                  ? 'redDot' : todo.priority === 2
                    ? 'yellowDot' : todo.priority === 3
                      ? 'greenDot' : 'greyDot'}
              />
              <div id="todoNameLabel" className={todo.completed ? 'completedItem' : 'incompleteItem'}>
                {' '}
                {todo.item_name}
                {' '}
              </div>
              <input type="checkbox" id="completeCheckbox" defaultChecked={todo.completed} onChange={handleCheckbox.bind(null, todo._id)} />
              <button type="button" className="noBackgroundBtn" onClick={handleDeleteTodo.bind(null, todo._id)}>
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
            <div>
                Add some todos by clicking the &quot;+ Add task&quot; on the top right corner.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Main;
