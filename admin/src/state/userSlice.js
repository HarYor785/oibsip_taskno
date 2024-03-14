import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: JSON.parse(localStorage.getItem('admin')) || {},
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        login: (state, action)=>{
            state.user = action.payload
            localStorage.setItem('admin', JSON.stringify(action.payload))
        },
        logout: (state, action)=>{
            state.user = action.payload
            localStorage.removeItem('admin')
        }
    }
})

export const loginSlice = (val)=>{
    return (dispatch) => dispatch(userSlice.actions.login(val))
}

export const logoutSlice = ()=>{
    return (dispatch) => dispatch(userSlice.actions.logout())
}

export default userSlice.reducer