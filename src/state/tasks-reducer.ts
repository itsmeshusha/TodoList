import { FilterValuesType } from '../App';
import {TodoListType, TaskStateType} from "../App";
import {v1} from 'uuid';
import {AddTodoListActionType, RemoveTodoListActionType} from './todolist-reducer'

type ActionType = RemoveTaskActionType | AddTaskActionType | ChangeTaskStatusActionType | 
                    ChangeTaskTitleActionType | AddTodoListActionType | RemoveTodoListActionType

export type RemoveTaskActionType = {
    type: "REMOVE-TASK"
    taskId: string
    todoListId: string
} 

export type AddTaskActionType = {
    type: "ADD-TASK",
    title: string
    todoListId: string
}

export type ChangeTaskStatusActionType = {
    type: "CHANGE-TASK-STATUS",
    taskId: string
    isDone: boolean
    todoListId: string
}

export type ChangeTaskTitleActionType = {
    type: "CHANGE-TASK-TITLE",
    taskId: string
    title: string
    todoListId: string
}




export const tasksReducer = (state: TaskStateType , action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const stateCopy = {...state};
            const tasks = state[action.todoListId];
            const filteredTasks = tasks.filter(t => t.id !== action.taskId);
            stateCopy[action.todoListId] = filteredTasks
        return stateCopy;
        }

        case 'ADD-TASK': {
            const stateCopy = {...state}
            let newTask={id: v1(), title: action.title, isDone: false};
            let todoListTasks = stateCopy[action.todoListId];
            todoListTasks = [newTask, ...todoListTasks]
            return {...stateCopy, [action.todoListId]: todoListTasks};
        }

        case 'CHANGE-TASK-STATUS': {
            const stateCopy = {...state}
            let todolistTasks = stateCopy[action.todoListId]
            .map(task => {
                if(task.id !== action.taskId) {
                    return task
                } else {
                    return {...task, isDone: action.isDone}
                }
            });
            return {...stateCopy, [action.todoListId]: todolistTasks};
    }
    case 'CHANGE-TASK-TITLE': {
        const stateCopy = {...state}
        let todolistTasks = stateCopy[action.todoListId]
        .map(task => {
            if(task.id !== action.taskId) {
                return task
            } else {
                return {...task, title: action.title}
            }
        });
        return {...stateCopy, [action.todoListId]: todolistTasks};
        } 
        
        case 'ADD-TODOLIST': {
            const stateCopy = {...state}
            stateCopy[action.todolistId] = [];
            return stateCopy;
        }

        case 'REMOVE-TODOLIST': {
            const stateCopy = {...state};
            delete stateCopy[action.id]
            return stateCopy
        }

        default:
            throw new Error("I don't understand this type")
    }
}

export const removeTaskAC = (taskId: string, todoListId: string): RemoveTaskActionType => {
    return { type: 'REMOVE-TASK', taskId: taskId, todoListId: todoListId}
 }

 export const addTaskAC = (title: string, todoListId: string): AddTaskActionType => {
    return { type: "ADD-TASK", title: title, todoListId: todoListId}
 }

 export const changeTaskStatusAC = (taskId: string, isDone: boolean, todoListId: string): ChangeTaskStatusActionType => {
    return { type: "CHANGE-TASK-STATUS", taskId: taskId, isDone: isDone, todoListId: todoListId}
 }

 export const changeTaskTitleAC = (taskId: string, title: string, todoListId: string ): ChangeTaskTitleActionType => {
    return { type: "CHANGE-TASK-TITLE", taskId: taskId, title: title, todoListId: todoListId}
 }
 