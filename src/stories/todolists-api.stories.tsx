import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {todolistAPI} from "../api/todolist-api";

export default {
   title: 'API'
}


export const GetTodolists = () => {
   const [state, setState] = useState<any>(null)
   useEffect(() => {
       todolistAPI.getTodolist()
           .then(res => {
              setState(res.data)
           })

   }, [])

   return <div> {JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
   const [state, setState] = useState<any>(null)
   useEffect(() => {

       todolistAPI.createTodolist("1111")
           .then((res) => {

              setState(res.data)
           })

   }, [])

   return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
   const [state, setState] = useState<any>(null)
   useEffect(() => {
      const todolistId = '';
       todolistAPI.deleteTodolist(todolistId)
           .then((res) => {
              setState(res.data)
           })
   }, [])

   return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
   const [state, setState] = useState<any>(null)
   useEffect(() => {
      const todolistId = '57f65afd-0d08-4e2d-8b97-5f926387c597'
       todolistAPI.updateTodolistTitle("some new todolist", todolistId)
           .then( (res) => {
              setState(res.data)
           })
   }, [])

   return <div> {JSON.stringify(state)}</div>
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId ='43097387-6744-43fa-a9b3-0b4471cea61b'
        todolistAPI.getTasks(todolistId)
            .then(res => {
                setState(res.data)
            })

    }, [])

    return <div> {JSON.stringify(state)} </div>

}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId ='43097387-6744-43fa-a9b3-0b4471cea61b'
        todolistAPI.createTask(todolistId, 'to go to the street')
            .then(res => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)} </div>

}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '';
        const taskId = ''
        todolistAPI.deleteTask(todolistId, taskId)
            .then(res => {
                setState(res.data)
            })

    }, [])

    return <div> {JSON.stringify(state)} </div>

}

export const UpdateTaskTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '43097387-6744-43fa-a9b3-0b4471cea61b';
        const taskId = '726f5c16-7955-46ea-b786-0b9875cbd3ea'
        todolistAPI.updateTaskTitle(todolistId, taskId, 'flsdmkf')
            .then(res => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)} </div>

}

