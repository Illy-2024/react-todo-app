import { useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import SaveIcon from '@mui/icons-material/Save';
import ReplayIcon from '@mui/icons-material/Replay';

function TodoItem(props) {

    const [editText, setEditText] = useState(props.task.text);

    return (
        <li className="todo-item">

            {props.task.isEditing ? (
                <div className="todo-item-content">
                    <input 
                        aria-label="Edit task"
                        value={editText}
                        onChange={ (event) => setEditText(event.target.value)}
                    />

                    <button 
                        aria-label="Update task"
                        onClick={() => props.handleUpdateTask(props.task.id, editText)}>
                        <SaveIcon />
                    </button>
                </div>
            ) : (
                <div className="todo-item-content">
                    <span 
                        style={{
                        textDecoration: props.task.completed ? 'line-through' : 'none',
                        opacity: props.task.completed ? 0.6 : 1
                        }}
                    >
                        {props.task.text} 
                    </span>
                                        
                    <button 
                        aria-label={props.task.completed ? "Mark task as active" : "Complete task"}
                        onClick={() => props.handleToggleComplete(props.task.id)}>
                        {props.task.completed ? <ReplayIcon /> : <CheckIcon />}
                    </button>

                    <button 
                        aria-label="Edit task"
                        onClick={ () => props.handleToggleEdit(props.task.id)}>
                        <EditIcon />
                    </button>

                    <button 
                        aria-label="Delete task"
                        onClick={() => props.handleDeleteTask(props.task.id)}>
                        <DeleteIcon />
                    </button>
                </div>
            )}

            

        </li>
    )
}

export default TodoItem;