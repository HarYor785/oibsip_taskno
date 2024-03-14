import { combineReducers } from "redux";
import userSlice from "./userSlice";
import cartSlice from "./cartSlice";
import settingsSlice from "./settingsSlice";
import orderSlice from "./orderSlice";

const rootReducer = combineReducers({
    user: userSlice,
    cart: cartSlice,
    settings: settingsSlice,
    orders: orderSlice,
})

export default rootReducer