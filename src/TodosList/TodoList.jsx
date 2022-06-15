import {useState} from "react";
import React from 'react'

export const AllTodoList = () => {

    const [task, setTask] = useState()

    const handleChange = (e) => {
        setTask(e.currentTarget.value)
    }
    return (
        <div>
            <h1>todos</h1>
            <div>
                <form action="">
                    <input type="text"
                           placeholder={'Add a task'}
                           value={task}
                           onChange={() => handleChange()}
                    />
                </form>
            </div>
        </div>
    )
}