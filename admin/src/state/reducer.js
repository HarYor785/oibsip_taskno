import { combineReducers } from "redux";
import userSlice from "./userSlice";
import settingsSlice from "./settingsSlice";

const rootReducer = combineReducers({
    user: userSlice,
    settings: settingsSlice
})

export default rootReducer