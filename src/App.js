import {AllTodoList} from "./TodosList/TodoList";
import React, {useState} from 'react'
import s from './app.module.scss'
import {Header} from "./Header/Header";
import {AddTask} from "./AddTask/AddTask";

function App() {

    const [task, setTask] = useState('')
    const [todosList, setTodosList] = useState([])

    return (
        <div className={s.app_section}>
            <div className={s.app_section_content}>
                <Header/>
                <AddTask task={task} setTask={setTask} todosList={todosList} setTodosList={setTodosList}/>
                <AllTodoList todosList={todosList} setTodosList={setTodosList}/>
            </div>
        </div>
    );
}

export default App;
