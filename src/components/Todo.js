import React, { useState, useEffect } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import Data from './Data';

function Todo() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/todos')
        .then(response => response.json())
        .then(data => setTodos(data));
  }, []);

  const handleSubmit = (event) => {
   // event.preventDefault(); // forhindrer formen i at genindlæse siden
    if (newTodo !== '') {
      fetch('http://localhost:5000/todos', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body:JSON.stringify({todo: newTodo })
      })
      .then(response => response.json())
      .then(data => setTodos([...todos, data]));
      setNewTodo('');
  }
}

  const handleDelete = (idToDelete) => {
    fetch(`http://localhost:5000/todos/${idToDelete}`, {method: 'DELETE'})
        .then(()=> setTodos(todos.filter(({ id_T}) => id_T !==idToDelete))); 
  }
  

  return (
    <div className="bg bg-success bg-gradient vh-100 pt-5">
      <div className="container pt-4 pb-4 mt-5 bg-light rounded ps-5 pe-4">
        <h3 className="title">Todo app</h3>
        <form className="form" onSubmit={handleSubmit}>
          <div className="row d-flex align-items-center"> 
            <div className="col-md-10">
              <input 
                type="text" 
                className="form-control" 
                placeholder="Add item"
                value={newTodo}
                onChange={(event) => setNewTodo(event.target.value)}
              />

              
            </div>
            <div className="col-md-2">
              <button className="btn btn-block bg-white" type="submit">
                <AiOutlinePlus />
              </button>
            </div>
          </div>
        </form>
        <ul className="list-unstyled pt-5">
      {todos.map((todo, index) => (
        <Data key={index} data={todo} onDelete={() => handleDelete(todo.id_T)} />
      ))}
    </ul>
      </div>
    </div>

    
  )

  
}

export default Todo;
