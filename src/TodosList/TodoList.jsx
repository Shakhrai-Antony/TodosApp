import {useEffect, useState} from "react";
import React from 'react'
import s from './todos.module.scss'

export const AllTodoList = ({todosList, setTodosList}) => {

    const [edit, setEdit] = useState(null)
    const [editTodo, setEditTodo] = useState('')
    const [filtredTodoList, setFiltredTodoList] = useState(todosList)
    const [filtredButtonStatus, setFiltredButtonStatus] = useState(1)

    useEffect(() => {
        setFiltredTodoList(todosList)
    }, [todosList])

    const filterTodoList = (buttonStatus) => {
        if (buttonStatus === 'all') {
            setFiltredTodoList(todosList)
        } else {
            let newItem = [...todosList].filter((item) => item.status === buttonStatus)
            setFiltredTodoList(newItem)
        }
    }

    const resolvedTasks = (id) => {
        setTodosList([
            ...todosList.map((item) =>
                item.id === id ? {...item, status: !item.status} : {...item}
            )
        ])
    }

    const deleteTasks = () => {
        setTodosList([...todosList.filter((item) => item.status === false)])
    }

    const editTask = (id, task) => {
        setEdit(id)
        setEditTodo(task)
    }

    const handleChange = (e) => {
        setEditTodo(e.currentTarget.value)
    }

    const saveEditTask = (id) => {
        let newTodo = todosList.map((item) => {
            if (item.id === id) {
                item.newTask = editTodo
            }
            return item
        })
        setTodosList(newTodo)
        setEdit(null)
    }

    return (
        <div className={s.todosList_section}>
            <div className={s.filter_section}>
                <button className={filtredButtonStatus === 1 ? s.filtred_button_active : ''}
                        onClick={() => {
                            filterTodoList('all');
                            setFiltredButtonStatus(1)
                        }}>
                    All
                </button>
                <button className={filtredButtonStatus === 2 ? s.filtred_button_active : ''}
                        onClick={() => {
                            filterTodoList(false);
                            setFiltredButtonStatus(2)
                        }}>
                    Active
                </button>
                <button className={filtredButtonStatus === 3 ? s.filtred_button_active : ''}
                        onClick={() => {
                            filterTodoList(true);
                            setFiltredButtonStatus(3)
                        }}>
                    Closed
                </button>
            </div>
            <div className={s.todoList_section_content}>
                <ul data-testid="todos count">
                    {filtredTodoList.map((item) => {
                        return (
                            <li data-testid="todo" key={item.id}>
                                {
                                    edit === item.id ?
                                        <div className={s.edit_input_section}>
                                            <input type="text"
                                                   value={editTodo} onChange={handleChange}/>
                                        </div>
                                        :
                                        <div
                                             className={!item.status ? s.todo_item : s.todo_item_done}
                                             active={!item.status ? 'true' : 'false'}>
                                            {item.newTask}
                                        </div>
                                }

                                {
                                    edit === item.id ?
                                        <div className={s.buttons_section}>
                                            <button onClick={() => saveEditTask(item.id)}>Save</button>
                                        </div>
                                        :
                                        <div className={s.buttons_section}>
                                            <span data-testid="change todo status" onClick={() => resolvedTasks(item.id)}
                                                  className={item.status ? s.task_status_active : s.task_status}>
                                            </span>
                                            <button onClick={() => editTask(item.id, item.newTask)}>Edit</button>
                                            <button className={s.delete_button}
                                                    onClick={() => deleteTasks(item.status)}
                                                    data-testid="delete todo button">
                                                Delete task
                                            </button>
                                        </div>
                                }
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}