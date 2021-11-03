import { 
	INIT_USER, 
	CHANGE_USER_SETTINGS, 
	SHOW_LOADER, 
	HIDE_LOADER, 
	SHOW_ERROR, 
	HIDE_ERROR,
	FETCH_MOVIES_SEARCH, 
	SHOW_BG_LOADER,
	HIDE_BG_LOADER,
	UPLOAD_MOVIES_FAVORITE,
	REMOVE_MOVIES_FAVORITE,
	FETCH_TV_SEASONS,
} from "./types";
import firebase from "../firebase";
import profileImg from '../img/user.svg';
import { history } from "../helpers/history";

export function hideError(){
	return {
		type: HIDE_ERROR
	}
}
export function showError(text){
	return dispatch => {
		dispatch({
			type: SHOW_ERROR, 
			payload: text
		})
	}
}
export function singup(email,password){
	return async dispatch => {
		try{
			dispatch({type: HIDE_ERROR});
			dispatch({type: SHOW_LOADER});
			const u = await firebase.auth().createUserWithEmailAndPassword(email, password);
			await u.user.updateProfile({
				photoURL: profileImg
			});
			dispatch({type: INIT_USER, payload: u.user});
			history.push('/sing-up/platform');
			dispatch({type: HIDE_LOADER});
		} catch(e){
			dispatch(showError(e.message) );
			dispatch({type: HIDE_LOADER});
		}
	}
}
export function singInWithGoogle(path){ // non importent value
	return async dispatch => {
		try{
			dispatch({type: HIDE_ERROR});
			dispatch({type: SHOW_LOADER});
			const u = await firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider());
			dispatch({type: INIT_USER, payload: u.user});
			history.push(path);
			dispatch({type: HIDE_LOADER});
		} catch(e){
			dispatch(showError(e.message) );
			dispatch({type: HIDE_LOADER});
		}
	}
}
export function logout(){
	return async dispatch => {
		try{
			dispatch({type: HIDE_ERROR});
			dispatch({type: SHOW_LOADER});
			await firebase.auth().signOut();
			history.push('/prevue');
			dispatch({type: HIDE_LOADER});
		} catch(e){
			dispatch(showError(e.message) );
			dispatch({type: HIDE_LOADER});
		}
	}
}
export function singin(email,password){
	return async dispatch => {
		try{
			dispatch({type: HIDE_ERROR});
			dispatch({type: SHOW_LOADER});
			const u = await firebase.auth().signInWithEmailAndPassword(email, password);
			dispatch({type: INIT_USER, payload: u.user});
			history.push('/');
			dispatch({type: HIDE_LOADER});
		} catch(e){
			dispatch(showError(e.message) );
			dispatch({type: HIDE_LOADER});
		}
	}
}

export function changeSettings(state){
	return dispatch => {
		const settings = {...JSON.parse(localStorage.getItem('settings')), ...state};
		dispatch({type: CHANGE_USER_SETTINGS, payload: settings});
		localStorage.setItem('settings', JSON.stringify(settings));
	}
}

export function uploadSettings(settings, user, patch){
	return async dispatch => {
		try{
			dispatch({type: HIDE_ERROR});
			dispatch({type: SHOW_LOADER});
			const settingsRef = firebase.database().ref(`users/${user.uid}/settings`);
			await settingsRef.update(settings);
			delete settings.card;
			localStorage.setItem('settings', JSON.stringify(settings));
			dispatch({type: CHANGE_USER_SETTINGS, payload: settings});
			history.push(patch);
			dispatch({type: HIDE_LOADER});
		} catch(e){
			dispatch(showError(e.message) );
			dispatch({type: HIDE_LOADER});
		}
	}
}
export function uploadFavorite(movie, user){
	return async dispatch => {
		try{
			dispatch({type: HIDE_ERROR});
			dispatch({type: SHOW_LOADER});
			const favoriteRef = firebase.database().ref(`users/${user.uid}/favorite`);
			const insertData = await favoriteRef.push(movie);
			movie.db_id = insertData.key;
			dispatch({type: UPLOAD_MOVIES_FAVORITE, payload: [movie]});
			dispatch({type: HIDE_LOADER});
		} catch(e){
			dispatch(showError(e.message) );
			dispatch({type: HIDE_LOADER});
		}
	}
}
export function removeFavorite(movie, user){
	return async dispatch => {
		try{
			dispatch({type: HIDE_ERROR});
			dispatch({type: SHOW_LOADER});
			const favoriteRef = firebase.database().ref(`users/${user.uid}/favorite`).child(movie.db_id);
			await favoriteRef.remove();
			dispatch({type: REMOVE_MOVIES_FAVORITE, payload: movie});
			dispatch({type: HIDE_LOADER});
		} catch(e){
			dispatch(showError(e.message) );
			dispatch({type: HIDE_LOADER});
		}
	}
}
export function fetchMovies(categoryUrl, page){
	return async (dispatch, getState) => {
		try{
			dispatch({type: HIDE_ERROR});
			dispatch({type: SHOW_LOADER});
			let selectedContent = {};
			const contents = getState().contents.contents;
			for (const key in contents) {
				if (Object.hasOwnProperty.call(contents, key)) {
					if(contents[key].categoryUrl === categoryUrl){
					selectedContent = contents[key];
				}
				}
			}
			const movies = await fetch(`https://api.themoviedb.org/3/${selectedContent.typeContent}/${selectedContent.category}?api_key=${process.env.REACT_APP_CINEMA_API_KEY}&language=en-US&page=${page}`);
			const moviesData = await movies.json();
			dispatch({type: selectedContent.type, payload: moviesData.results });
			dispatch({type: HIDE_LOADER});
		} catch(e){
			dispatch(showError(e.message) );
			dispatch({type: HIDE_LOADER});
		}
	}
}
function fetchData(user){
	return async (dispatch, getState) => {
		try{
			document.body.classList.add('overflow-hidden');
			// Settings
			dispatch({type: HIDE_ERROR});
			dispatch({type: SHOW_BG_LOADER});
			const settingsRef = firebase.database().ref(`users/${user.uid}/settings`);
			await settingsRef.once('value', (snapshot) => {
				const settingsVal = snapshot.val();
				if(settingsVal){
					delete settingsVal.card;
					localStorage.setItem('settings', JSON.stringify(settingsVal));
					dispatch({type: CHANGE_USER_SETTINGS, payload: settingsVal});
				}
			})
			// Movies
			const contents = getState().contents.contents;
			let movies = '';
			let moviesData = '';
			for (const key in contents) {
				if (Object.hasOwnProperty.call(contents, key)) {
					movies = await fetch(`https://api.themoviedb.org/3/${contents[key].typeContent}/${contents[key].category}?api_key=${process.env.REACT_APP_CINEMA_API_KEY}&language=en-US&page=1`);
					moviesData = await movies.json();
					dispatch({type: contents[key].type, payload: moviesData.results });
				}
			}
			// Favorite
			const favoriteRef = firebase.database().ref(`users/${user.uid}/favorite`);
			await favoriteRef.once('value', (snapshot) => {
				const favorite = snapshot.val();
				if(favorite){
					const favoriteAll = [];
					for (const id in favorite) {
						favoriteAll.push({db_id: id, ...favorite[id]});
					}
					dispatch({type: UPLOAD_MOVIES_FAVORITE, payload: favoriteAll});
				}
			})
			dispatch({type: HIDE_BG_LOADER});
			document.body.classList.remove('overflow-hidden');
		} catch(e){
			dispatch(showError(e.message) );
			dispatch({type: HIDE_BG_LOADER});
			document.body.classList.remove('overflow-hidden');
		}
	}
}

export function searchMovie(id, typeContent){
	return async dispatch =>{
		try{
			dispatch({type: HIDE_ERROR});
			dispatch({type: SHOW_LOADER});
			const search = await fetch(`https://api.themoviedb.org/3/${typeContent}/${id}?api_key=${process.env.REACT_APP_CINEMA_API_KEY}&language=en-US`);
			const searchsData = await search.json();
			dispatch({type: FETCH_MOVIES_SEARCH, payload: searchsData})
			dispatch({type: HIDE_LOADER});
		} catch(e){
			dispatch(showError(e.message) );
			dispatch({type: HIDE_LOADER});
			document.body.classList.remove('overflow-hidden');
		}
	}
}
export function searchSeasons(id, season_number = 1){
	return async dispatch =>{
		try{
			dispatch({type: HIDE_ERROR});
			dispatch({type: SHOW_LOADER});
			let arrSeasons = [];
			for (let i = 1; i <= season_number; i++) {
				const search = await fetch(`https://api.themoviedb.org/3/tv/${id}/season/${i}?api_key=${process.env.REACT_APP_CINEMA_API_KEY}&language=en-US`);
				arrSeasons.push(await search.json())
			}
			dispatch({type: FETCH_TV_SEASONS, payload: arrSeasons})
			dispatch({type: HIDE_LOADER});
		} catch(e){
			dispatch(showError(e.message) );
			dispatch({type: HIDE_LOADER});
			document.body.classList.remove('overflow-hidden');
		}
	}
}

export function unsubscribe() {
	return async dispatch => {
		firebase.auth().onAuthStateChanged(async (user) => {
			if(user){
				//document.body.classList.add('overflow-hidden');
				dispatch({type: INIT_USER, payload: user});
				localStorage.setItem('user', JSON.stringify(user)); // set local user
				dispatch(fetchData(user));
				//document.body.classList.remove('overflow-hidden');
			} else{
				dispatch({type: INIT_USER, payload: {}});
				localStorage.removeItem('user');
				localStorage.removeItem('settings');
				dispatch({type: HIDE_BG_LOADER});
				dispatch({type: HIDE_LOADER});
				document.body.classList.remove('overflow-hidden');
			}
		})
	}
}