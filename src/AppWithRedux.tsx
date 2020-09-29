import React, {useReducer} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";
import { AddItemForm } from './AddItemForm';
import { Button, AppBar, Toolbar, IconButton, Typography, Container, Grid, Paper } from '@material-ui/core';
import { Menu } from '@material-ui/icons'
import { AddTodoListAC, ChangeTodoListAC, ChangeTodoListFiltertAC, RemoveTodoListAC, todoListReducer } from './state/todolist-reducer';
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer } from './state/tasks-reducer';
import { useSelector, useDispatch } from 'react-redux';
import { AppRootStateType } from './state/store';

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

function AppWithRedux() {

    let todoListID1 = v1();
    let todoListID2 = v1();

    const todoLists = useSelector<AppRootStateType, Array<TodoListType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TaskStateType>(state => state.tasks)
    const dispatch = useDispatch();

    

    function changeFilter(value: FilterValuesType, todoListID: string) {
        dispatch(ChangeTodoListFiltertAC(todoListID, value))
    }

    function removeTask(taskId:string, todoListID: string) {
        dispatch(removeTaskAC(taskId, todoListID))
}

function addTask(title: string, todoListID: string) {
    dispatch(addTaskAC(title, todoListID))
}

function changeStatus (id: string, isDone: boolean, todoListID: string) {
    dispatch(changeTaskStatusAC(id, isDone, todoListID))
}

function removeTodoList (todoListID: string) {
    const action = RemoveTodoListAC(todoListID)
    dispatch(action)
 
}

function addTodoList(title: string) {
    const action = AddTodoListAC(title)
    dispatch(action);

}

function changeTaskTitle (id: string, title: string, todoListID: string) {
    dispatch(changeTaskTitleAC(id, title, todoListID))
}

function changeTodoListTitle (todoListID: string, newTitle: string) {
    dispatch(ChangeTodoListAC(todoListID, newTitle))
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

export default AppWithRedux;
