import React, {useReducer} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";
import { AddItemForm } from './AddItemForm';
import { Button, AppBar, Toolbar, IconButton, Typography, Container, Grid, Paper } from '@material-ui/core';
import { Menu } from '@material-ui/icons'
import { AddTodoListAC, ChangeTodoListAC, ChangeTodoListFiltertAC, RemoveTodoListAC, todoListReducer } from './state/todolist-reducer';
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer } from './state/tasks-reducer';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TaskStateType ={
        [key: string] : Array<TaskType>
}

export type FilterValuesType = "all" | "active" | "completed"

function AppWithReducers() {

    let todoListID1 = v1();
    let todoListID2 = v1();

    let [todoLists, dispatchToTodoList] = useReducer(todoListReducer, [
        {id: todoListID1, title: "What to learn", filter: "all"},
        {id: todoListID2, title: "What to buy", filter: "active"}
    ])

    let [tasks, dispatchToTasks] = useReducer(tasksReducer, {
        [todoListID1]: [
        {id: v1(), title: "JS", isDone: true },
        {id: v1(), title: "CSS", isDone: true },
        {id: v1(), title: "React", isDone: false },
        {id: v1(), title: "Redux", isDone: false}
        ],
        [todoListID2]: [
        {id: v1(), title: "Milk", isDone: true },
        {id: v1(), title: "Bread", isDone: true },
        {id: v1(), title: "Eggs", isDone: false },
        {id: v1(), title: "Banana", isDone: false}
    ]
    })

    function changeFilter(value: FilterValuesType, todoListID: string) {
        dispatchToTodoList(ChangeTodoListFiltertAC(todoListID, value))
    }

    function removeTask(taskId:string, todoListID: string) {
    dispatchToTasks(removeTaskAC(taskId, todoListID))
}

function addTask(title: string, todoListID: string) {
        dispatchToTasks(addTaskAC(title, todoListID))
}

function changeStatus (id: string, isDone: boolean, todoListID: string) {
    dispatchToTasks(changeTaskStatusAC(id, isDone, todoListID))
}

function removeTodoList (todoListID: string) {
    const action = RemoveTodoListAC(todoListID)
    dispatchToTodoList(action)
    dispatchToTodoList(action)
}

function addTodoList(title: string) {
    const action = AddTodoListAC(title)
    dispatchToTodoList(action);
    dispatchToTodoList(action);
}

function changeTaskTitle (id: string, title: string, todoListID: string) {
        dispatchToTasks(changeTaskTitleAC(id, title, todoListID))
}

function changeTodoListTitle (todoListID: string, newTitle: string) {
    dispatchToTodoList(ChangeTodoListAC(todoListID, newTitle))
}

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start"
                    color="inherit"
                    aria-label="menu">
                        <Menu />
                    </IconButton>
                    <Typography variant="h6" >
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "20px"}}>
            <AddItemForm addItem={addTodoList} />
            </Grid>
            <Grid container spacing={3}>
            {
                todoLists.map(tl => {
                    let tasksForTodoList = tasks[tl.id];
    if(tl.filter === "active") {
        tasksForTodoList = tasks[tl.id].filter(t=>t.isDone === false)
            }
    if(tl.filter ==="completed") {
        tasksForTodoList = tasks[tl.id].filter(t=>t.isDone === true)
    }
                    return <Grid item>
                        <Paper style={{padding:"10px"}}>
                        <Todolist 
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        tasks={tasksForTodoList}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeStatus={changeStatus}
                        filter={tl.filter}
                        removeTodoList={removeTodoList}
                        changeTaskTitle={changeTaskTitle}
                        changeTodoListTitle={changeTodoListTitle}

                        /> 
                        </Paper> 
                    </Grid>
                }) 
            }
            </Grid>
            </Container>
            </div>
    );
}

export default AppWithReducers;
