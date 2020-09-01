import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType, TaskType} from "./App";
import {AddItemForm} from './AddItemForm';
import EditableSpan from "./EditableSpan";
import {IconButton, Button, Checkbox} from '@material-ui/core';
import {Delete} from '@material-ui/icons';

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    removeTask: (taskId: string, todoListID: string) => void
    changeFilter: (value: FilterValuesType, todoListID: string) => void
    addTask: (title: string, todoListID: string) => void
    changeStatus: (id: string, isDone: boolean, todoListID: string) => void
    removeTodoList: (todoListID: string) => void
    changeTaskTitle: (id: string, title: string, todoListID: string) => void
    changeTodoListTitle: (value: string, todoListID: string) => void
}

export function Todolist(props: PropsType) {

    const addTask=(title: string) => {
        props.addTask(title, props.id);
    }
    const changeTodoListTitle= (title: string) => {
        props.changeTodoListTitle(props.id, title)
    }

    const onAllClickHandler = () => {
        props.changeFilter("all", props.id )
    };
    const onActiveClickHandler = () => {
        props.changeFilter("active", props.id)
    };
    const onCompletedClickHandler = () => {
        props.changeFilter("completed", props.id)
    };

    return <div>
        <h3>
            <EditableSpan value={props.title} changeValue={changeTodoListTitle} />
            <IconButton onClick={()=>{props.removeTodoList(props.id)}}>
                <Delete />
            </IconButton>
            
            </h3>
        <AddItemForm addItem={addTask} />
        
        <div> {
            props.tasks.map(task => {
                const removeTask = () => {
                    props.removeTask(task.id, props.id)
                }
                const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
                    props.changeStatus(task.id, e.currentTarget.checked, props.id)
                }
                const changeTaskTitle = (title: string) => {
                    props.changeTaskTitle(task.id, title, props.id)
                }
                return (
                    <div key={task.id} className={task.isDone ? "is-done" : ""}>
                        
                        <Checkbox 
                                    checked={task.isDone}
                                    onChange={changeStatus}
                                    color="primary" />               
                        
                        <EditableSpan value={task.title} changeValue={changeTaskTitle} />
                        <IconButton onClick={removeTask}>
                        <Delete />
                        </IconButton>
                        
                    </div>
                )
            })
        }
        </div>
        <div>
            <Button color="default" onClick={onAllClickHandler}
            variant={props.filter === "all" ? "outlined" : "text"}>All</Button>
            <Button  color="primary" onClick={onActiveClickHandler}
                    variant={props.filter === "active" ? "outlined" : "text"}>Active</Button>
            <Button  color="secondary" onClick={onCompletedClickHandler}
                    variant={props.filter === "completed" ? "outlined" : "text"}
            >Completed</Button>
            
        </div>
    </div>
}