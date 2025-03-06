import { createSlice } from "@reduxjs/toolkit";




const initialState={

    status:false,
    data:null,
}

const authSlice = createSlice({
    name:'authState',
    initialState:initialState,

    reducers:{

        signin:(state,action)=>{
            state.status=true;
            state.data=action.payload
        },

        signout:(state)=>{
            state.status=false,
            state.data=null;
        }
    }
})

export const {signin,signout}  = authSlice.actions;

export default authSlice.reducer;