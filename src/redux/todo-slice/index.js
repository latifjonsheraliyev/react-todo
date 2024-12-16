import { createSlice } from "@reduxjs/toolkit";
import { data } from "react-router-dom";

const initialState = {
    data:JSON.parse(localStorage.getItem('todo'))||[],
}


const todoSlice = createSlice({
    name:"todo-list",
    initialState,
    reducers:{
        getData(state, {payload}){
        
       state.data = [...state.data,{...payload , id:Date.now()}]
            localStorage.setItem("todo",JSON.stringify(state.data))
            // state.data.push(payload)
        },
        deleteData(state , {payload}){
            state.data = state.data.filter((item) => item.id !== payload)
            localStorage.setItem("todo",JSON.stringify(state.data))
        },
        editData(state,{payload}){
            state.data = state.data.map((item) => item.id === payload.id ? {...item,todo:payload.newText} : item)
            localStorage.setItem("todo",JSON.stringify(state.data))
        },
        checkedData(state,{payload}){
            state.data = state.data.map((item) => item.id === payload.id && item.cheked ? {...item,cheked:true}:item)  
          
            localStorage.setItem("todo",JSON.stringify(state.data))
            console.log(state.data);
            
        },
        selectDelete(state, {payload}){
            state.data = state.data.filter((item) => item.cheked !== true)
            localStorage.setItem("todo",JSON.stringify(state.data))
        }

    },
})

export const  {getData , deleteData,editData,checkedData,selectDelete} = todoSlice.actions
export default todoSlice.reducer