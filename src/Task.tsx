import React, { ChangeEvent, useCallback } from "react";
import { TaskType } from "./App";
import EditableSpan from "./EditableSpan";
import { IconButton, Button, Checkbox } from '@material-ui/core';
import { Delete } from '@material-ui/icons';

type TaskPropsType = {
    changeTaskTitle: (id: string, title: string, todoListID: string) => void
    removeTask: (taskId: string, todoListID: string) => void
    changeStatus: (id: string, isDone: boolean, todoListID: string) => void
    task: TaskType
    todoListID: string
}

const Task = React.memo((props: TaskPropsType) => {
   
        const removeTask = () => {
            props.removeTask(props.task.id, props.todoListID)
        }
        const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeStatus(props.task.id, e.currentTarget.checked, props.todoListID)
        }
        const changeTaskTitle = useCallback( (title: string) => {
            props.changeTaskTitle(props.task.id, title, props.todoListID)
        }, [props.changeTaskTitle, props.task.id, props.todoListID])
        return (
            <div key={props.task.id} className={props.task.isDone ? "is-done" : ""}>

                <Checkbox
                    checked={props.task.isDone}
                    onChange={changeStatus}
                    color="primary" />

                <EditableSpan value={props.task.title} changeValue={changeTaskTitle} />
                <IconButton onClick={removeTask}>
                    <Delete />
                </IconButton>

            </div>
        )
    
})

export default Task;