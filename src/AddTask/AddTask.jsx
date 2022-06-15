import React from 'react'
import s from './addtask.module.scss'

export const AddTask = ({task, setTask, todosList, setTodosList}) => {

    const handleChange = (e) => {
        setTask(e.currentTarget.value)
    }

    const addNewTask = (e) => {
        e.preventDefault()
        if (task) {
            const newItem = {
                id: Math.random().toString().substr(2, 4),
                newTask: task,
                status: false
            }
            setTodosList([...todosList, newItem])
            setTask('')
        }
    }
    return (
        <div className={s.form_section}>
            <form className={s.form_content} action="">
                <input type="text"
                       placeholder='Add a task'
                       value={task}
                       onChange={handleChange}
                       data-testid="input"
                />
                <button onClick={addNewTask} data-testid="add todo button">
                    Add task
                </button>
            </form>
        </div>
    )
}