import { combineReducers } from "redux";
import userReducer from "./userReducer";
import appReducer from "./appReducer";
import contentsReducer from "./contentsReducer";

const rootReducer = combineReducers({
	user: userReducer,
	app: appReducer,
	contents: contentsReducer
})
 
export default rootReducer;