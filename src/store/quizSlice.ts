import { createSlice } from "@reduxjs/toolkit";
import { QuizState } from "../helpers/types";


const initialState: { quizData: QuizState[] | [], answers:number[]|[] } ={
    
    quizData:[],
    answers:[],
}

const quizSlice = createSlice({
    name:'quizeState',
    initialState:initialState,

    reducers:{

        saveQuizedata:(state,action)=>{

            state.quizData= action.payload,
            state.answers = new Array(10).fill(null);
        },
        removeQuizeData:(state)=>{
            state.quizData=[];
            state.answers=[]
        },
        addAnswers:(state,action)=>{
            
            const {index,answer} = action.payload;
            state.answers[index]=answer;
        }
    }
})

export const { saveQuizedata, removeQuizeData,addAnswers } = quizSlice.actions;

export default quizSlice.reducer;