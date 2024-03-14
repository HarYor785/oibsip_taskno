import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    sidebar: false,
    notification: false
}

const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        openSideBar(state, action) {
            state.sidebar = action.payload;
        },
        openNotification(state, action){
            state.notification = action.payload;
        }
    }
})


export const toggleSideBar = (val) => {
    return dispatch => dispatch(settingsSlice.actions.openSideBar(val))
}

export const toggleNotification = (val) => {
    return dispatch => dispatch(settingsSlice.actions.openNotification(val))
}

export default settingsSlice.reducer