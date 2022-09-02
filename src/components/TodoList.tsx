import React, {useEffect, useState} from 'react';
import {CSSTransition, TransitionGroup} from "react-transition-group";
import deleteIcon from "../assets/icon-cross.svg";

type TodoListProps = {
    todoList: any,
    removeTodo: any,
    completeTodo: any
}

const initialDnDState = {
    draggedFrom: null,
    draggedTo: null,
    isDragging: false,
    originalOrder: [],
    updatedOrder: []
}

function TodoList({todoList, removeTodo, completeTodo}: TodoListProps) {
    const [list, setList] = useState(todoList);
    const [dragAndDrop, setDragAndDrop] = useState(initialDnDState);

    const onDragStart = (event: any) => {
        const initialPosition = Number(event.currentTarget.dataset.position);

        setDragAndDrop({
            ...dragAndDrop,
            // @ts-ignore
            draggedFrom: initialPosition,
            isDragging: true,
            originalOrder: list
        });

        event.dataTransfer.setData("text/html", '');
    }


    const onDragOver = (event: any) => {
        event.preventDefault();
        let newList = dragAndDrop.originalOrder;
        const draggedFrom = dragAndDrop.draggedFrom;
        const draggedTo = Number(event.currentTarget.dataset.position);

        // @ts-ignore
        const itemDragged = newList[draggedFrom];
        const remainingItems = newList.filter((item, index) => index !== draggedFrom);

        // @ts-ignore
        newList = [
            ...remainingItems.slice(0, draggedTo),
            itemDragged,
            ...remainingItems.slice(draggedTo)
        ];

        if (draggedTo !== dragAndDrop.draggedTo) {
            setDragAndDrop({
                ...dragAndDrop,
                updatedOrder: newList,
                // @ts-ignore
                draggedTo: draggedTo
            })
        }

    }

    const onDrop = (event: any) => {
        setList(dragAndDrop.updatedOrder);
        setDragAndDrop({
            ...dragAndDrop,
            draggedFrom: null,
            draggedTo: null,
            isDragging: false
        });
    }

    const onDragLeave = () => {
        setDragAndDrop({
            ...dragAndDrop,
            draggedTo: null
        });

    }

    useEffect(() => {

        setList(todoList);

    }, [todoList])


    const duration = 300;

    return (
        <TransitionGroup>
            <div>
                {todoList.length > 0 ?
                    list.map(function (todo: any, index: number) {
                        return (
                            <CSSTransition key={todo.id} timeout={700} classNames="item">
                                <div>
                                    <div data-position={index}
                                         draggable={true}

                                         onDragStart={onDragStart}
                                         onDragOver={onDragOver}
                                         onDrop={onDrop}

                                         onDragLeave={onDragLeave}
                                         className={'todo-list-item todo-item'}
                                         key={todo.id}>
                                        <label className={'flex flex-row items-center w-full'}>
                                            <input className={'todo-checkbox'} onChange={(e) => {
                                                completeTodo(todo.id);
                                            }} type={"checkbox"} checked={todo.completed}/>
                                            <label className={'check'}></label>
                                            <label className={'gradient'}></label>
                                            <p className={`todo-task-text ${todo.completed ? 'line-through text-dark-blue-300' : ''}`}>{todo.text}</p>
                                        </label>
                                        <div onClick={(e: any) => {
                                            removeTodo(todo.id);
                                        }}
                                             className={'delete-icon'}
                                        >
                                            <img className={'delete-icon-img'} src={deleteIcon} alt="delete"/>
                                        </div>
                                    </div>
                                </div>
                            </CSSTransition>
                        )
                    }) : <p className={'todo-item text-center'}>No items found!</p>
                }
            </div>
        </TransitionGroup>
    );
}

export default TodoList;