import { useState, useEffect } from 'react';
import './App.css';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

function App() {
  const [task, setTask] = useState("");
  const [filter, setFilter] = useState("all");

  // Add dark/light mode state
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");

    return savedTheme || "dark";
  });
  // Load saved tasks when the App starts
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");

    if (savedTasks) {
      return JSON.parse(savedTasks);
    }

    return [];
  });

  const handleAddTask = () => {
    if (task.trim() === "")
      return;

    setTasks((prevTasks) => [
      ...prevTasks,
      {
        id: crypto.randomUUID(),
        text: task.trim(),
        completed: false,
        isEditing: false,
      },
    ]);
    setTask("");
  };

  const handleDeleteTask = (taskId) => {
    const newTasks = tasks.filter((task) => task.id !== taskId);

    setTasks(newTasks);
  };

  const handleToggleComplete = (taskId) => {
    const newTasks = tasks.map((task) =>
      task.id === taskId
        ? { ...task, completed: !task.completed }
        : task
    );

    setTasks(newTasks);
  };

  const handleToggleEdit = (taskId) => {
    const newTasks = tasks.map((task) =>
      task.id === taskId
        ? { ...task, isEditing: !task.isEditing }
        : task
    );
    
    setTasks(newTasks);
  };

  const handleUpdateTask = (taskId, newText) => {

    if (newText.trim() === "") return;

    const newTasks = tasks.map((task) =>
      task.id === taskId
        ? { 
            ...task, 
            text: newText.trim(), 
            isEditing: false 
          }
        : task
    );
    
    setTasks(newTasks);
  }

  const filteredTasks = tasks.filter( (task) => {
    if (filter === "completed") return task.completed;
    if(filter === "active") return !task.completed;
    return true;
  });

    // Save tasks whenever they change
    useEffect (() => {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    useEffect(() => {
      localStorage.setItem("theme", theme);
    }, [theme]);

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;
  const activeTasks = totalTasks - completedTasks;

  return (
    <div className={`page ${theme}`}>
      <div className="app">
        <h1 className='app-title'>Task Engine</h1>
        <p className="app-subtitle">Organize your day efficiently</p>

        <button 
          className='theme-toggle' 
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
          {theme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>

        <div className="task-counter">
          <span>Tasks: {totalTasks}</span>
          <span>Active: {activeTasks}</span>
          <span>Completed: {completedTasks}</span>
        </div>

        <TodoForm 
          task={task}
          setTask={setTask}
          handleAddTask={handleAddTask}
        />
        
        <TodoList 
          tasks={filteredTasks}
          handleDeleteTask={handleDeleteTask}
          handleToggleComplete={handleToggleComplete}
          handleToggleEdit={handleToggleEdit}
          handleUpdateTask={handleUpdateTask}
        />

        <div className='filter-buttons'>
          <button 
            className={filter === "all" ? "active" : ""} 
            onClick={() => setFilter("all")}
          >
            All
          </button>

          <button
            className={filter === "active" ? "active" : ""} 
            onClick={()=> setFilter("active")}
          >
            Active
          </button>

          <button 
            className={filter === "completed" ? "active" : ""}  
            onClick={() => setFilter("completed")}
          >
            Completed
          </button>
        </div>

      </div>

    </div>
  )
}

export default App
