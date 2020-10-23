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
