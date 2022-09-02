import React, {useState} from 'react';

type Props = {
    addTodo: any,
}

function TodoInput({addTodo}: Props) {
    const [newTodo, setNewTodo] = useState('');
    const [todoCompleted, setTodoCompleted] = useState(false);

    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            if (newTodo != '')
                addTodo(newTodo.toString(), todoCompleted);
            setNewTodo('');
        }} className={'todo-item'}>
            <div className={'flex flex-row justify-start items-center'}>

                <label className={'flex flex-row items-center w-full flex-1'}>
                    <input className={'todo-checkbox'} type={"checkbox"} onChange={() => {
                        const completed = !todoCompleted;
                        setTodoCompleted(completed);
                    }} checked={todoCompleted}/>
                    <label className={'check'}></label>
                    <label className={'gradient'}></label>
                    <input onChange={(e) => {
                        setNewTodo(e.target.value)
                    }} className={'w-full ml-8 p-2 bg-dark-blue-500 outline-none text-dark-blue-100'} value={newTodo} placeholder={'Create a new todo...'}/>

                </label>

            </div>
        </form>
    );
}

export default TodoInput;