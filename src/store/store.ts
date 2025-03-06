import {configureStore} from '@reduxjs/toolkit'
import authReducers from './authSlice'
import quizeReducers from './quizSlice'
const store = configureStore({
    reducer:{
        auth:authReducers,
        quiz:quizeReducers,
    }
})

export type RootState = ReturnType<typeof store.getState>
export default store;