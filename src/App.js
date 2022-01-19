import TodoList from "./TodoList";
import react, { useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';

const LOCAL_STORAGE_KEY = 'TodoApp.Todos';

function App() {
  const [todos, setTodos] = useState(() => {
    return [
      { id: uuidv4(), name: 'Get Milk', complete: false },
      { id: uuidv4(), name: 'Do Laundry', complete: true }
    ]
  });

  const todoNameRef = useRef();

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedTodos) {
      setTodos(storedTodos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  function toggleTodo(id) {
    const newTodos = [...todos];
    const todoToUpdate = newTodos.find(todo => todo.id === id);
    todoToUpdate.complete = !todoToUpdate.complete;
    setTodos(newTodos);
  }

  function handleAddTodo(e) {
    const name = todoNameRef.current.value;

    if (name === '') return;

    setTodos(prevTodos => {
      return [...prevTodos, { id: uuidv4(), name: name, complete: false }];
    });
    todoNameRef.current.value = null;
  }

  function handleClearComplted() {
    const newTodos = todos.filter(todo => !todo.complete);
    setTodos(newTodos);
  }

  return (
    <>
      <TodoList todos={todos} toggleTodo={toggleTodo} />
      <input type="text" name="todoName" ref={todoNameRef}></input>
      <button onClick={handleAddTodo}>Add Todo</button>
      <button onClick={handleClearComplted}>Clear Completed Todos</button>
      <div>{todos.filter(todo => !todo.complete).length} left to do</div>
    </>
  );
}

export default App;
