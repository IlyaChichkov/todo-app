import React, {useEffect, useState} from 'react';
import './TodoPage.scss'
import TodoList from "../components/TodoList";
import TodoInput from "../components/TodoInput";

const defaultTodos =
[
    {id: 0, completed: false, text: 'Create new design logo'},
    {id: 1, completed: false, text: 'Call team for a meetup for Saturday'},
    {id: 2, completed: false, text: 'Read for 1 hour'},
    {id: 3, completed: true, text: 'Pick up groceries'},
]

function getTodosOnCreate(){
    try{
        const todos = JSON.parse(localStorage.getItem('todoList') || "");
        console.log('loaded:')
        console.log(todos)
        if(todos){
            return todos;
        }
    } catch (e){
        return defaultTodos;
    }
}

class TodoItem {
    completed?: boolean
    text?: string

    constructor(completed = false, text = '') {
        this.completed = completed;
        this.text = text;
    }
}

function TodoPage() {
    const [todoList, setTodoList] = useState(getTodosOnCreate());
    const [showTodo, setShowTodo] = useState<TodoItem[]>(todoList);
    const [todoFilter, setTodoFilter] = useState('all');

    const addTodo = (newTodo: string, isCompleted: boolean) => {
        setTodoList([...todoList, {id: Date.now(), completed: isCompleted, text: newTodo}]);
    }

    const removeTodo = (removeId: number) => {
        const updatedTodo = [...todoList];
        updatedTodo.splice(updatedTodo.findIndex((item) => item.id === removeId), 1);
        setTodoList(updatedTodo);
    }

    const completeTodo = (completeId: number) => {
        console.log('completed change state at ' + completeId)
        const updatedTodo = [...todoList];
        const itemIndex = updatedTodo.findIndex((item) => item.id === completeId);
        updatedTodo[itemIndex].completed = !updatedTodo[itemIndex].completed;
        setShowTodo(updatedTodo);
        showFilterTodo(todoFilter.toString());
    }

    const clearCompletedTodo = () => {
        const clearedList = [];
        for (const todoListElement of todoList) {
            if(!todoListElement.completed){
                clearedList.push(todoListElement);
            }
        }
        setTodoList(clearedList);
    }

    const showFilterTodo = (filter: string = 'all') => {
        let showList = [];
        for (const todoListElement of todoList) {
            if(filter === 'active' && !todoListElement.completed){
                showList.push(todoListElement);
            }
            if(filter === 'completed' && todoListElement.completed){
                showList.push(todoListElement);
            }
            if(filter === 'all'){
                showList.push(todoListElement);
            }
        }
        setShowTodo(showList);
    }

    useEffect(() => {
        showFilterTodo(todoFilter.toString());
    }, [todoFilter, todoList]);

    useEffect(() => {
        SaveTodo()
    }, [todoList]);

    function SaveTodo() {
        console.log('save')
        console.log(todoList)
        localStorage.setItem('todoList', JSON.stringify(todoList));
    }

    return (
        <div className={'todo'}>
            <section>
                <h1 className={'uppercase text-white font-bold text-3xl tracking-[0.26em] mt-0 sm:mt-0 md:mt-12 mb-8'}>ToDo</h1>
            </section>
            <section className={'todo-section'}>
                <TodoInput addTodo={addTodo}/>
            </section>
            <section className={'todo-section'}>
                <TodoList todoList={showTodo} removeTodo={removeTodo} completeTodo={completeTodo}/>
                <div className={'flex flex-row justify-between todo-item'}>
                    <p className={'text-dark-blue-200'}>{showTodo.length} items left</p>
                    <div className={'hidden md:block'}>
                        <a className={`link-btn p-2 ${todoFilter === 'all'? 'text-main-blue-100':'text-dark-blue-200'}`} onClick={()=>{setTodoFilter('all')}}>All</a>
                        <a className={`link-btn p-2 ${todoFilter === 'active'? 'text-main-blue-100':'text-dark-blue-200'}`} onClick={()=>{setTodoFilter('active')}}>Active</a>
                        <a className={`link-btn p-2 ${todoFilter === 'completed'? 'text-main-blue-100':'text-dark-blue-200'}`} onClick={()=>{setTodoFilter('completed')}}>Completed</a>
                    </div>
                    <a className={'link-btn text-dark-blue-200'} onClick={clearCompletedTodo}>Clear completed</a>
                </div>
            </section>
            <section className={'todo-section md:hidden block'}>
                <div className={'flex flex-row justify-center items-center todo-item'}>
                    <div>
                        <a className={`link-btn p-2 ${todoFilter === 'all'? 'text-main-blue-100':'text-dark-blue-200'}`} onClick={()=>{setTodoFilter('all')}}>All</a>
                        <a className={`link-btn p-2 ${todoFilter === 'active'? 'text-main-blue-100':'text-dark-blue-200'}`} onClick={()=>{setTodoFilter('active')}}>Active</a>
                        <a className={`link-btn p-2 ${todoFilter === 'completed'? 'text-main-blue-100':'text-dark-blue-200'}`} onClick={()=>{setTodoFilter('completed')}}>Completed</a>
                    </div>
                </div>
            </section>
            <p className={'text-center text-dark-blue-300 my-12'}>Drag and drop to reorder list</p>
        </div>
    );
}

export default TodoPage;