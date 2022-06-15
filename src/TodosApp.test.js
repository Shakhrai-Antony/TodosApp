import React from 'react'
import {render, fireEvent} from '@testing-library/react'
import App from "./App";

test('renders the correct initial DOM', () => {
    const doc = render(<App />);
    const inputElement = doc.queryByTestId('input');
    const todosCount = doc.queryByTestId('todos count');
    expect(inputElement.value).toBe('');
    expect(todosCount.children.length).toBe(0);
});

test('add a new task', () => {
    const doc = render(<App />);
    const inputElement = doc.queryByTestId('input');
    const addTodoButton = doc.queryByTestId('add todo button');
    const todosCount = doc.queryByTestId('todos count');
    fireEvent.change(inputElement, {target: {value: 'walk with dog'}});
    fireEvent.click(addTodoButton);
    const todo = doc.queryByTestId('todo')
    const todoNameElement = todo.firstChild;
    expect(todoNameElement.textContent).toBe('walk with dog');
    expect(todosCount.children.length).toBe(1);
    expect(inputElement.value).toBe('');
})

test('delete task, change task status', () => {
    const doc = render(<App />);
    const inputElement = doc.queryByTestId('input');
    const todosCount = doc.queryByTestId('todos count');
    const addTodoButton = doc.queryByTestId('add todo button');
    fireEvent.change(inputElement, {target: {value: 'go to gym'}});
    fireEvent.click(addTodoButton);
    const todo = doc.queryByTestId('todo')
    const todoTask = todo.firstChild;
    expect(todoTask.textContent).toBe('go to gym');
    const todoStatus = doc.queryByTestId('change todo status')
    fireEvent.click(todoStatus);
    expect(todoTask.getAttribute('active' === true))
    const deleteTodoButton = doc.queryByTestId('delete todo button');
    fireEvent.click(deleteTodoButton);
    expect(todo).not.toBeInTheDocument();
    expect(todosCount.children.length).toBe(0);
    expect(inputElement.value).toBe('');
})
