import { CHANGE_USER_SETTINGS, INIT_USER, UPLOAD_PLANS } from "./types";

const initialState = {
	user : JSON.parse(localStorage.getItem('user')),
	settings: JSON.parse(localStorage.getItem('settings')),
	plans: [],
};

const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case INIT_USER:
			return {...state, user: action.payload}
		case CHANGE_USER_SETTINGS:
			return {...state, settings: {...action.payload} }
		case UPLOAD_PLANS:
			return {...state, plans: action.payload }
		default:
			return state
	}
}
 
export default userReducer;