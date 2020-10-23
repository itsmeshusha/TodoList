import axios from 'axios';

type TodolistType= {
    id: string
    addedDate: string
    order: number
    title: string
}

type ResponseType<T={}> = {
    resultCode: number
    messages: Array<string>
    data: T
}



const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': 'a77ea86a-925e-4bb9-81e9-a41d0c7337ce'
    }
})


export const todolistAPI = {
    getTodolist() {
        const promise =
            instance.get<Array<TodolistType>>('todo-lists')
        return promise;
    },
    createTodolist(title: string) {

        const promise =
           instance.post<ResponseType<{item: TodolistType}>>('todo-lists', {title: title})
        return promise;
    },
    deleteTodolist(todolistId: string) {
        const promise =
            instance.delete<ResponseType>(`todo-lists/${todolistId}`)
        return promise;
    },
    updateTodolistTitle(title: string, todolistId: string) {
        const promise =
            instance.put<ResponseType>(`todo-lists/${todolistId}`, {title: title})
        return promise;
    }
}