import { useState, useEffect,  type ChangeEvent, type FormEvent, type MouseEvent,} from "react";
import "./Header.css";

interface Todo {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

const Header = () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<string>("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (title.trim() === "") {
      setError("Vazifa nomi majburiy");
      return;
    }

    const newTodo: Todo = {
      id: Date.now(),
      title: title.trim(),
      description: description.trim(),
      completed: false,
    };

    setTodos([...todos, newTodo]);
    setTitle("");
    setDescription("");
    setError("");
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleDescChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };

  const handleToggle = (event: MouseEvent<HTMLDivElement>, id: number) => {
    event.preventDefault();
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleDelete = (event: MouseEvent<HTMLButtonElement>, id: number) => {
    event.stopPropagation();
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="todo-container">
      <h2>Todo App</h2>

      <form onSubmit={handleSubmit} className="todo-form">
        <input type="text"
          placeholder="Vazifa nomi *" value={title}
          onChange={handleTitleChange} />
        <input type="text"
          placeholder="Izoh (ixtiyoriy)" value={description}
          onChange={handleDescChange}/>
        <button type="submit">Qo‘shish</button>
      </form>

      {error && <div className="error-message">{error}</div>}

      <p className="count">Jami: {todos.length} ta vazifa</p>
      <div className="todo-list">
        {todos.map((todo) => (
          <div  key={todo.id}
            className={`todo-item ${todo.completed ? "completed" : ""}`}
            onClick={(e) => handleToggle(e, todo.id)} >
            <div className="todo-text">
              <strong>{todo.title}</strong>
              {todo.description && (
                <span className="description">{todo.description}</span>
              )}
            </div>
            <button onClick={(e) => handleDelete(e, todo.id)}>X</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Header;
