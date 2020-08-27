import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType, TaskType} from "./App";
import {AddItemForm} from './AddItemForm';
import EditableSpan from "./EditableSpan";

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

    // let [title, setTitle] = useState<string>("");
    // let [error, setError] = useState<string | null>(null)
    // const onAddTaskClick = () => {
    //     if (title.trim() !=="") {
    //         props.addTask(title.trim(), props.id);
    //         setTitle("");
    //     } else {
    //         setError("Title is required!");
    //     }
    // };

    // const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    //     setError(null);
    //     setTitle(e.currentTarget.value);
    // };

    // const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    //     setError(null);
    //     if (e.key === "Enter") {
    //         onAddTaskClick()
    //     }
    // }

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
            <button onClick={()=>{props.removeTodoList(props.id)}}>X</button></h3>
        <AddItemForm addItem={addTask} />
        {/* <div>
            <input value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   className={error ? "error" : ""}
            />
            <button onClick={onAddTaskClick}>add</button>
            { error && <div className="error-message">{error}</div>}
        </div> */}
        <ul> {
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
                    <li key={task.id} className={task.isDone ? "is-done" : ""}><input type="checkbox"
                                             checked={task.isDone}
                                             onChange={changeStatus}/>
                        {/* <span>{task.title}</span> */}
                        <EditableSpan value={task.title} changeValue={changeTaskTitle} />
                        <button onClick={removeTask}>x</button>
                    </li>
                )
            })
        }
            {/*<li><input type="checkbox" checked={props.tasks[0].isDone}/> <span>{props.tasks[0].title}</span></li>*/}
            {/*<li><input type="checkbox" checked={props.tasks[1].isDone}/> <span>{props.tasks[1].title}</span></li>*/}
            {/*<li><input type="checkbox" checked={props.tasks[2].isDone}/> <span>{props.tasks[2].title}</span></li>*/}
        </ul>
        <div>
            <button onClick={onAllClickHandler}
            className={props.filter === "all" ? "active-filter" : ""}
            >All</button>
            <button onClick={onActiveClickHandler}
                    className={props.filter === "active" ? "active-filter" : ""}
            >Active</button>
            <button onClick={onCompletedClickHandler}
                    className={props.filter === "completed" ? "active-filter" : ""}
            >Completed</button>
        </div>
    </div>
}