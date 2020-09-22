import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";
import { AddItemForm } from './AddItemForm';
import { Button, AppBar, Toolbar, IconButton, Typography, Container, Grid, Paper } from '@material-ui/core';
import { Menu } from '@material-ui/icons'

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

function App() {

    let todoListID1 = v1();
    let todoListID2 = v1();

    let [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListID1, title: "What to learn", filter: "all"},
        {id: todoListID2, title: "What to buy", filter: "active"}
    ])

    let [tasks, setTasks] = useState<TaskStateType>({
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
        let todoList = todoLists.find( tl => tl.id ===todoListID);
        if (todoList) {
            todoList.filter = value;
            setTodoLists([...todoLists])
        }
    }

    function removeTask(taskId:string, todoListID: string) {
    let todoList = tasks[todoListID];
    tasks[todoListID]=todoList.filter(t => t.id !==taskId)
    setTasks({...tasks})
}

function addTask(title: string, todoListID: string) {
        let newTask={id: v1(), title: title, isDone: false};
        let todoList = tasks[todoListID];
        tasks[todoListID] = [newTask,...todoList]
        setTasks({...tasks})
        
}

function changeStatus (id: string, isDone: boolean, todoListID: string) {
    let todoList = tasks[todoListID];
    let task = todoList.find(task => task.id === id);
        if (task) {
            task.isDone = isDone;
            setTasks({...tasks})
        }
}

function removeTodoList (todoListID: string) {
    let newTodoLists = todoLists.filter(tl => tl.id !== todoListID);
    setTodoLists(newTodoLists);
    delete tasks[todoListID];
    setTasks({...tasks});
}

function addTodoList(title: string) {
    let newTodoListID = v1();
    let newTodoList: TodoListType = {
        id: newTodoListID,
        title: title,
        filter: "all" 
    };
    setTodoLists([...todoLists, newTodoList]);
    setTasks({
        ...tasks,
        [newTodoListID]: []
    })
}

function changeTaskTitle (id: string, title: string, todoListID: string) {
    let todoList = tasks[todoListID];
    let task = todoList.find(task => task.id === id);
        if (task) {
            task.title = title;
            setTasks({...tasks})
        }
}

function changeTodoListTitle (todoListID: string, newTitle: string) {
    const todoList = todoLists.find(tl => tl.id === todoListID);
    if (todoList) {
        todoList.title = newTitle;
        setTodoLists([...todoLists])
    }
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

export default App;
