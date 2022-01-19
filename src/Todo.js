import react from "react";

export default function Todo({ todo, toggleTodo }) {
    function handleToggleTodo(e) {
        toggleTodo(todo.id);
    }

    return (
        <div>
            <label>
                <input type="checkbox" checked={todo.complete} onChange={handleToggleTodo}></input>
                {todo.name}
            </label>
        </div>
    );
}