import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    orders: [],
}

const orderSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        setOrders: (state, action)=> {
            state.orders = action.payload
        }
    },
})

export const handleOrders = (val)=>{
    return dispatch => {
        dispatch(orderSlice.actions.setOrders(val))
    }
}


export default orderSlice.reducer