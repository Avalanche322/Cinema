import { CHANGE_USER_SETTINGS, INIT_USER } from "./types";

const initialState = {
	user : JSON.parse(localStorage.getItem('user')),
	settings: JSON.parse(localStorage.getItem('settings')),
};

const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case INIT_USER:
			return {...state, user: action.payload}
		case CHANGE_USER_SETTINGS:
			return {...state, settings: {...action.payload} }
		default:
			return state
	}
}
 
export default userReducer;