import { SHOW_LOADER, HIDE_LOADER, SHOW_ERROR, HIDE_ERROR, SHOW_BG_LOADER, HIDE_BG_LOADER, RERENDER_COMPONENT, SHOW_MESSAGE, HIDE_MESSAGE } from "./types"

const initialState = {
	loading: true,
	loading_bg: true,
	error: '',
	message: '',
	rerender_component: {},
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
		case SHOW_MESSAGE: 
			return {...state, message: action.payload}
		case HIDE_MESSAGE: 
			return {...state, message: ''}
		case RERENDER_COMPONENT:
			return {...state, rerender_component: {}}
		default: return state
	}
}
 
export default appReducer;