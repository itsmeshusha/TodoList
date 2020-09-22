import { FilterValuesType } from './../App';
import {TodoListType} from "../App";
import {v1} from 'uuid';

type ActionType = RemoveTodoListActionType | AddTodoListActionType | ChangeTodoListActionType | ChangeTodoListFilterActionType

export type RemoveTodoListActionType = {
    type: "REMOVE-TODOLIST"
    id: string
} 

export type AddTodoListActionType = {
    type: "ADD-TODOLIST",
    title: string
    todolistId: string
}

export type ChangeTodoListActionType = {
    type: "CHANGE-TODOLIST-TITLE",
    id: string
    title: string
}

export type ChangeTodoListFilterActionType = {
    type: "CHANGE-TODOLIST-FILTER",
    id: string
    filter: FilterValuesType
}




export const todoListReducer = (state: Array<TodoListType>, action: ActionType) => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return state.filter(tl => tl.id !== action.id);
        case "ADD-TODOLIST":
            let newTodoList: TodoListType = {
                id: action.todolistId,
                title: action.title,
                filter: "all" 
            }
            return [...state, newTodoList] ;
        case 'CHANGE-TODOLIST-TITLE':
            const todoList = state.find(tl => tl.id === action.id);
                if (todoList) {
                todoList.title = action.title;
                }
                return state;
        case 'CHANGE-TODOLIST-FILTER' :
            const todolist = state.find(tl => tl.id === action.id);
                if (todolist) {
                    todolist.filter = action.filter;
                    return [...state]
                }
                return state
            default:
                throw new Error("I dont understand this action type")
    }
}

export const RemoveTodoListAC = (todoListId: string): RemoveTodoListActionType => {
    return { type: 'REMOVE-TODOLIST', id: todoListId}
 }

 export const AddTodoListAC = (todoListTitle: string): AddTodoListActionType => {
    return { type: "ADD-TODOLIST", title: todoListTitle, todolistId: v1()}
 }

 export const ChangeTodoListAC = (todoListId: string, todoListTitle: string): ChangeTodoListActionType => {
    return { type: "CHANGE-TODOLIST-TITLE", id: todoListId, title: todoListId  }
 }

 export const ChangeTodoListFiltertAC = (todoListId: string, todoListFilter: FilterValuesType ): ChangeTodoListFilterActionType => {
    return { type: "CHANGE-TODOLIST-FILTER", id: todoListId, filter: todoListFilter}
 }
 
 