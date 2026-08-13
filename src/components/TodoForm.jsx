import AddIcon from '@mui/icons-material/Add';

function TodoForm(props) {
    return (
        <div className="todo-form">
        <input 
          type="text" 
          placeholder="Enter your task"
          value= {props.task}
          onChange={(event) => props.setTask(event.target.value)} 
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              props.handleAddTask();
            }
          }}
        />
        
        <button 
          aria-label="Add task"
          onClick={props.handleAddTask}>
            <AddIcon />
        </button>
      </div>
    )
}

export default TodoForm;