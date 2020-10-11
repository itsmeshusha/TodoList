import React, { ChangeEvent, useCallback } from "react";
import { FilterValuesType, TaskType } from "./App";
import { AddItemForm } from './AddItemForm';
import EditableSpan from "./EditableSpan";
import { IconButton, Button, Checkbox } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import Task from './Task';

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    changeTodoListTitle: (value: string, todoListID: string) => void
    changeFilter: (value: FilterValuesType, todoListID: string) => void
    addTask: (title: string, todoListID: string) => void
    removeTodoList: (todoListID: string) => void
    changeTaskTitle: (id: string, title: string, todoListID: string) => void
    removeTask: (taskId: string, todoListID: string) => void
    changeStatus: (id: string, isDone: boolean, todoListID: string) => void
    
}

export const Todolist = React.memo( function (props: PropsType) {
    console.log("Todolist called");

    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id);
    }, [props.addTask, props.id]);

    const changeTodoListTitle = useCallback((title: string) => {
        props.changeTodoListTitle(props.id, title)
    }, [props.changeTodoListTitle, props.id]);

    const onAllClickHandler = useCallback(() => {
        props.changeFilter("all", props.id)
    }, [props.changeFilter, props.id]);
    const onActiveClickHandler = useCallback(() => {
        props.changeFilter("active", props.id)
    }, [props.changeFilter, props.id]);
    const onCompletedClickHandler = useCallback(() => {
        props.changeFilter("completed", props.id)
    }, [props.changeFilter, props.id]);

    let tasksForTodoList = props.tasks;
    if (props.filter === "active") {
        tasksForTodoList = props.tasks.filter(t => t.isDone === false)
    }
    if (props.filter === "completed") {
        tasksForTodoList = props.tasks.filter(t => t.isDone === true)
    }

    return <div>
        <h3>
            <EditableSpan value={props.title} changeValue={changeTodoListTitle} />
            <IconButton onClick={() => { props.removeTodoList(props.id) }}>
                <Delete />
            </IconButton>

        </h3>
        <AddItemForm addItem={addTask} />

        <div> {
            props.tasks.map(t => 
                { return <Task 
                        task={t}
                        changeStatus={props.changeStatus}
                        changeTaskTitle={props.changeTaskTitle}
                        removeTask={props.removeTask}
                        todoListID={props.id}
                        key={t.id}

            />
                
            })
        }
        </div>
        <div>
            <Button color="default" onClick={onAllClickHandler}
                variant={props.filter === "all" ? "outlined" : "text"}>All</Button>
            <Button color="primary" onClick={onActiveClickHandler}
                variant={props.filter === "active" ? "outlined" : "text"}>Active</Button>
            <Button color="secondary" onClick={onCompletedClickHandler}
                variant={props.filter === "completed" ? "outlined" : "text"}
            >Completed</Button>

        </div>
    </div>
});

