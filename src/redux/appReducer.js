import { SHOW_LOADER, HIDE_LOADER, SHOW_ERROR, HIDE_ERROR, SHOW_BG_LOADER, HIDE_BG_LOADER } from "./types"

const initialState = {
	loading: true,
	loading_bg: true,
	error: ''
}

const appReducer = (state = initialState, action) => {
	switch (action.type) {
		case SHOW_LOADER: 
			return {...state, loading: true}
		case HIDE_LOADER: 
			return {...state, loading: false}
		case SHOW_BG_LOADER: 
			return {...state, loading_bg: true}
		case HIDE_BG_LOADER: 
			return {...state, loading_bg: false}
		case SHOW_ERROR: 
			return {...state, error: action.payload}
		case HIDE_ERROR: 
			return {...state, error: ''}
		default: return state
	}
}
 
export default appReducer;