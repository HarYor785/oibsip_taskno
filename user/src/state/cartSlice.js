import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    cart: [],
    toggle: false,
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        openCart: (state, action)=> {
            state.toggle = action.payload
        },
        setCart: (state, action)=> {
            state.cart = action.payload
        }
    },
})

export const handleCart = (val)=>{
    return dispatch => {
        dispatch(cartSlice.actions.openCart(val))
    }
}

export const handleCartItem = (val)=>{
    return dispatch => {
        dispatch(cartSlice.actions.setCart(val))
    }
}

export default cartSlice.reducer