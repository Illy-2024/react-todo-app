import TodoItem from "./TodoItem";


function TodoList(props) {

  if (props.tasks.length === 0) {
    return (
      <p className="empty-state">
        No tasks here yet.
      </p>
    );
  }
    
  return (
        <ul className="todo-list">
        {props.tasks.map((task) => (
          <TodoItem
            key={task.id}
            task={task}
            handleDeleteTask={props.handleDeleteTask}
            handleToggleComplete={props.handleToggleComplete}
            handleToggleEdit={props.handleToggleEdit}
            handleUpdateTask={props.handleUpdateTask}
          />
        ))}
      </ul>
    )
}

export default TodoList;