import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    pizza: false,
    sidebar: false
}

const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        togglePizza: (state, action) => {
            state.pizza = action.payload;
        },
        toggleSidebar: (state, action) => {
            state.sidebar = action.payload
        }
    }
})


export const toggleCreatePizza = (state) => {
    return dispatch => {
        dispatch(settingsSlice.actions.togglePizza(state))
    }
}

export const openSidebar = (state) => {
    return dispatch => {
        dispatch(settingsSlice.actions.toggleSidebar(state))
    }
}

export default settingsSlice.reducer